/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCart } from "@/contexts/cart-provider"; // Adjust path as needed
import { authClient } from "@/lib/auth-client";
import { useEffect, useMemo, useState } from "react";
import { createProductOrder } from "../actions/product-order-action"; // Adjust path
import { CartItemType } from "../types/cart-items.types"; // Adjust path

// Components
import { CheckoutFormData } from "../validation/checkout.validation";
import { EmptyCart } from "./components/empty-cart";
import { LoadingCart } from "./components/loading-cart";
import { OrderSummary } from "./components/order-summary";
import { PaymentMethod } from "./components/payment-method";
import { ShippingForm } from "./components/shipping-form";
import { CheckoutSuccess } from "./components/success";
import { TrustIndicators } from "./components/trust-indicators";

export default function CheckoutPage() {
  const { cart, isLoading, removeItems } = useCart();
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  // Local state for items allows us to handle price updates from server
  // without waiting for a full cart refetch
  const [localItems, setLocalItems] = useState<CartItemType[]>([]);

  // Sync local items with global cart initially
  useEffect(() => {
    if (cart?.items) {
      setLocalItems(cart.items);
    }
  }, [cart]);

  // Selection Logic
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Select all items by default when they load
  useEffect(() => {
    if (localItems.length > 0 && selectedIds.length === 0) {
      setSelectedIds(localItems.map((item) => item.id));
    }
  }, [localItems, selectedIds]);

  const [isInsideDhaka, setIsInsideDhaka] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string>("");

  // Feedback States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [priceUpdates, setPriceUpdates] = useState<
    { productId: string; name: string; oldPrice: number; newPrice: number }[]
  >([]);
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle Checkbox logic
  const handleItemToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Calculations
  const selectedItems = useMemo(
    () => localItems.filter((item) => selectedIds.includes(item.id)),
    [localItems, selectedIds],
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = selectedItems.length === 0 ? 0 : isInsideDhaka ? 50 : 100;
  const total = subtotal + shipping;

  const handleShippingChange = (inside: boolean) => setIsInsideDhaka(inside);

  // Submit Handler
  const handleSubmit = async (formData: CheckoutFormData) => {
    if (!selectedItems.length) {
      setErrorMsg("Please select at least one item to checkout.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setPriceUpdates([]);
    setUnavailableItems([]);

    try {
      const res = await createProductOrder({
        formData,
        items: selectedItems,
      });

      switch (res.type) {
        case "EMPTY_CART":
          setErrorMsg(res.error ?? "Cart is empty");
          break;

        case "UNAVAILABLE":
          setUnavailableItems(res.missingProducts ?? []);
          // Deselect unavailable items automatically so user can proceed
          if (res.missingProducts) {
            setSelectedIds((prev) =>
              prev.filter((id) => !res.missingProducts!.includes(id)),
            );
          }
          setErrorMsg(res.error ?? "Some items are unavailable.");
          break;

        case "PRICE_UPDATED":
          // CRITICAL: Update local state with new prices.
          // This allows the user to review the new total and click "Submit" again
          // without getting the same error loop.
          setPriceUpdates(res.updates ?? []);
          if (res.updates) {
            setLocalItems((prev) =>
              prev.map((item) => {
                const update = res.updates?.find(
                  (u: any) => u.productId === item.productId,
                );
                return update ? { ...item, price: update.newPrice } : item;
              }),
            );
          }
          setErrorMsg(res.error ?? "Prices have changed.");
          break;

        case "ORDER_CREATED":
          setSuccessEmail(formData.email);
          setOrderId(res.orderId ?? "");
          // Clear the bought items from the Client Context
          await removeItems(selectedIds);
          break;

        case "SERVER_ERROR":
          setErrorMsg(res.error ?? "Server error occurred.");
          break;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Success View
  if (orderId) {
    return (
      <CheckoutSuccess
        orderId={orderId}
        total={total}
        email={successEmail}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  // ✅ Loading / Empty Views
  if (isLoading) return <LoadingCart />;
  if (!cart?.items || cart.items.length === 0) return <EmptyCart />;

  // ✅ Main Form View
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Summary & Payment */}
          <div className="space-y-6">
            <OrderSummary
              orderItems={localItems} // Use localItems to reflect price updates
              selectedIds={selectedIds}
              isInsideDhaka={isInsideDhaka}
              onItemToggle={handleItemToggle}
            />
            <PaymentMethod />
          </div>

          {/* Right Column: Form & Feedback */}
          <div className="space-y-6">
            <ShippingForm
              selectedItemsCount={selectedIds.length}
              total={total}
              onShippingChange={handleShippingChange}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />

            {/* Error & Warning Messages */}
            <div className="space-y-4">
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-md text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  ⚠️ {errorMsg}
                </div>
              )}

              {unavailableItems.length > 0 && (
                <div className="p-4 bg-orange-50 border border-orange-100 text-orange-800 rounded-md text-sm">
                  <p className="font-bold mb-1">Items removed:</p>
                  The following items are no longer available and have been
                  deselected:
                  <ul className="list-disc pl-5 mt-1">
                    {unavailableItems.map((id) => (
                      <li key={id}>
                        {localItems.find((i) => i.productId === id)?.name ||
                          "Unknown Item"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {priceUpdates.length > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-100 text-blue-800 rounded-md text-sm">
                  <p className="font-bold mb-2">Prices have been updated:</p>
                  <ul className="space-y-1">
                    {priceUpdates.map((u) => (
                      <li key={u.productId} className="flex justify-between">
                        <span>{u.name}</span>
                        <span>
                          <span className="line-through text-blue-400 mr-2">
                            ৳{u.oldPrice}
                          </span>
                          <span className="font-bold">৳{u.newPrice}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-blue-600">
                    Please review the new total above and click Place Order
                    again to confirm.
                  </p>
                </div>
              )}
            </div>

            <TrustIndicators />
          </div>
        </div>
      </div>
    </div>
  );
}
