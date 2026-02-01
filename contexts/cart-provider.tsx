"use client";

import {
  addItem as serverAddItem,
  clearCart as serverClearCart,
  getCart as serverGetCart,
  removeItem as serverRemoveItem,
  updateQuantity as serverUpdateQuantity,
} from "@/app/(main)/actions/cart-actions";
import { authClient } from "@/lib/auth-client";
import { nanoid } from "nanoid";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItemType } from "@/app/(main)/types/cart-items.types";

export type CartState = {
  id: string;
  items: CartItemType[];
  total: number;
};

interface CartContextType {
  cart: CartState | null;
  isLoading: boolean;
  addItem: (item: Omit<CartItemType, "id" | "cartId">) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  removeItems: (itemIds: string[]) => Promise<void>;
  updateQuantity: (itemId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const LOCAL_CART_KEY = "guest_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [cart, setCart] = useState<CartState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart (Merges Guest Cart into Server Cart on login)
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);

      // 1. Get Guest items
      const guestCartJson = localStorage.getItem(LOCAL_CART_KEY);
      const guestItems: CartItemType[] = guestCartJson
        ? JSON.parse(guestCartJson).items
        : [];

      if (userId) {
        // 2. If User is logged in, sync with server
        try {
          // If we have guest items, we need to push them to the server first
          if (guestItems.length > 0) {
            // Fetch current server cart first to check for duplicates logic if needed
            // Or simply fire add requests
            await Promise.all(guestItems.map((item) => serverAddItem(item)));
            // Clear local storage after syncing
            localStorage.removeItem(LOCAL_CART_KEY);
          }

          // Fetch fresh server state
          const serverCart = await serverGetCart();

          setCart({
            id: serverCart.id,
            items: serverCart.items.map((i) => ({ ...i, cartId: i.cartId })),
            total: serverCart.items.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          });
        } catch (error) {
          console.error("Failed to load server cart", error);
        }
      } else {
        // 3. If Guest, just load from local storage
        setCart({
          id: "guest",
          items: guestItems.map((i) => ({ ...i, cartId: "guest" })),
          total: guestItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      }

      setIsLoading(false);
    };

    loadCart();
  }, [userId]);

  // Persist guest cart to LocalStorage
  useEffect(() => {
    if (!userId && cart) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
    }
  }, [cart, userId]);

  // ---------------------------
  // Optimistic Helper
  // ---------------------------
  const runWithOptimism = async <T,>(
    optimisticUpdate: (prev: CartState | null) => CartState | null,
    serverAction: () => Promise<T>,
    onServerSuccess?: (
      serverResult: T,
      prev: CartState | null,
    ) => CartState | null,
  ) => {
    const prev = cart;
    const optimisticState = optimisticUpdate(prev);
    setCart(optimisticState);

    try {
      const result = await serverAction();
      if (onServerSuccess) {
        // Use functional state update to ensure we are working with latest state
        setCart((current) => onServerSuccess(result, current));
      }
      return result;
    } catch (err) {
      console.error("Cart sync failed", err);
      setCart(prev); // Revert on error
      return null;
    }
  };

  // ---------------------------
  // Actions
  // ---------------------------

  const handleAddItem = async (item: Omit<CartItemType, "id" | "cartId">) => {
    // GUEST LOGIC
    if (!userId) {
      setCart((prev) => {
        if (!prev) return { id: "guest", items: [], total: 0 };

        const existing = prev.items.find((i) => i.productId === item.productId);
        let items;

        if (existing) {
          items = prev.items.map((i) =>
            i.productId === item.productId
              ? {
                  ...i,
                  quantity: Math.min(i.quantity + (item.quantity || 1), 10),
                }
              : i,
          );
        } else {
          items = [
            ...prev.items,
            {
              ...item,
              id: "guest-" + nanoid(),
              cartId: "guest",
              quantity: item.quantity || 1,
            },
          ];
        }

        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      });
      return;
    }

    // SERVER LOGIC
    const tempId = "temp-" + nanoid();

    await runWithOptimism(
      // 1. Optimistic Update
      (prev) => {
        if (!prev) return prev;
        const existing = prev.items.find((i) => i.productId === item.productId);
        let items;

        if (existing) {
          items = prev.items.map((i) =>
            i.productId === item.productId
              ? {
                  ...i,
                  quantity: Math.min(i.quantity + (item.quantity || 1), 10),
                }
              : i,
          );
        } else {
          items = [
            ...prev.items,
            {
              ...item,
              id: tempId,
              cartId: prev.id,
              quantity: item.quantity || 1,
            },
          ];
        }
        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      },
      // 2. Server Action
      () => serverAddItem(item),
      // 3. On Success (Swap Temp ID with Real ID)
      (serverItem, prev) => {
        if (!prev) return prev;
        // Check if we updated an existing one or added a new one
        const isUpdate = prev.items.some(
          (i) => i.id === serverItem.id && i.id !== tempId,
        );

        let items;
        if (isUpdate) {
          items = prev.items.map((i) =>
            i.id === serverItem.id ? serverItem : i,
          );
        } else {
          // We added a new item, so swap the temp ID for the server ID
          items = prev.items.map((i) =>
            i.id === tempId
              ? { ...i, id: serverItem.id, cartId: serverItem.cartId }
              : i,
          );
        }

        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      },
    );
  };

  const handleRemoveItem = async (itemId: string) => {
    // We need to find the item to ensure we don't try to remove a temp item incorrectly
    const item = cart?.items.find((i) => i.id === itemId);
    if (!item) return;

    if (!userId) {
      setCart((prev) => {
        if (!prev) return prev;
        const items = prev.items.filter((i) => i.id !== itemId);
        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      });
    } else {
      await runWithOptimism(
        (prev) => {
          if (!prev) return prev;
          const items = prev.items.filter((i) => i.id !== itemId);
          return {
            ...prev,
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        },
        () => serverRemoveItem(itemId), // Pass itemId (CartItem ID), not ProductID
      );
    }
  };

  const handleUpdateQuantity = async (itemId: string, qty: number) => {
    const item = cart?.items.find((i) => i.id === itemId);
    if (!item) return;

    if (!userId) {
      setCart((prev) => {
        if (!prev) return prev;
        const items = prev.items.map((i) =>
          i.id === itemId ? { ...i, quantity: qty } : i,
        );
        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      });
    } else {
      await runWithOptimism(
        (prev) => {
          if (!prev) return prev;
          const items = prev.items.map((i) =>
            i.id === itemId ? { ...i, quantity: qty } : i,
          );
          return {
            ...prev,
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        },
        // FIX: Pass 'itemId' (the CartItem row ID), not 'item.productId'
        () => serverUpdateQuantity(itemId, qty),
      );
    }
  };

  const handleClearCart = async () => {
    if (!userId) {
      setCart({ id: "guest", items: [], total: 0 });
    } else {
      if (cart && cart.items.length > 0) {
        await runWithOptimism(
          (prev) => (prev ? { ...prev, items: [], total: 0 } : prev),
          () => serverClearCart(),
        );
      }
    }
  };

  const handleRemoveItems = async (itemIds: string[]) => {
    if (!userId) {
      setCart((prev) => {
        if (!prev) return prev;
        const items = prev.items.filter((i) => !itemIds.includes(i.id));
        return {
          ...prev,
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      });
    } else {
      await runWithOptimism(
        (prev) => {
          if (!prev) return prev;
          const items = prev.items.filter((i) => !itemIds.includes(i.id));
          return {
            ...prev,
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        },
        async () => Promise.all(itemIds.map((id) => serverRemoveItem(id))),
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,
        removeItems: handleRemoveItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
