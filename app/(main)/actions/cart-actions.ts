"use server";

import { auth } from "@/lib/auth"; // Adjust import path if needed
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// ---------------------
// Helper: get session user
// ---------------------
async function getUserId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    // Note: Throwing here allows the client try/catch to handle the "not logged in" state
    // rather than hard redirecting inside an API call.
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

// ---------------------
// Ensure cart exists
// ---------------------
export async function ensureCart(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }

  return cart;
}

// ---------------------
// Get cart
// ---------------------
export async function getCart() {
  const userId = await getUserId();

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { orderBy: { createdAt: "asc" } } },
  });

  if (!cart) {
    return await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }

  return cart;
}

// ---------------------
// Add item
// ---------------------
export async function addItem(item: {
  productId: string;
  name: string;
  image?: string | null;
  price: number;
  quantity?: number;
}) {
  const userId = await getUserId();
  const cart = await ensureCart(userId);

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: item.productId },
  });

  if (existing) {
    const newQty = Math.min(existing.quantity + (item.quantity ?? 1), 10);
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
    });
  } else {
    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: item.productId,
        name: item.name,
        image: item.image ?? null,
        price: item.price,
        quantity: Math.min(item.quantity ?? 1, 10),
      },
    });
  }
}

// ---------------------
// Remove item (by item id)
// ---------------------
export async function removeItem(itemId: string) {
  const userId = await getUserId();

  // Verify ownership before deleting
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!item) throw new Error("Item not found");
  if (item.cart.userId !== userId) throw new Error("No permission");

  return prisma.cartItem.delete({ where: { id: itemId } });
}

// ---------------------
// Update quantity (by item id)
// ---------------------
export async function updateQuantity(itemId: string, qty: number) {
  const userId = await getUserId();

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!item) throw new Error("Item not found");
  if (item.cart.userId !== userId) throw new Error("No permission");

  if (qty <= 0) {
    return removeItem(itemId);
  }

  const safeQty = Math.min(qty, 10);

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity: safeQty },
  });
}

// ---------------------
// Clear cart
// ---------------------
export async function clearCart() {
  const userId = await getUserId();

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return { cleared: true };
}
