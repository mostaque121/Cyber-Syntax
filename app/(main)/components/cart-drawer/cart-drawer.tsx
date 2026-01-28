"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-provider";
import { useUrlParams } from "@/hooks/use-url-params";
import { formatPrice } from "@/lib/format-price";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { cart, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { searchParams, setParam } = useUrlParams();
  const cartParam = searchParams.get("cart");
  const open = cartParam === "open";
  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const totalPrice = cart
    ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setParam("cart", null);
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-screen">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Your cart is empty"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Area */}
        <ScrollArea className="flex-1 overflow-auto px-6 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some items to get started
              </p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow p-3 space-y-2 md:space-y-0 md:space-x-4"
              >
                {/* Image */}
                {item.image && (
                  <div className="h-20 w-20 shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Name and Price */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  {/* Decrease Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // disable if 1
                    className="h-8 w-8 flex items-center justify-center p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  {/* Quantity Input */}
                  <Button className="w-10 h-8 text-center" variant="outline">
                    {item.quantity}
                  </Button>

                  {/* Increase Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10} // disable if 10
                    className="h-8 w-8 flex items-center justify-center p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {/* Remove Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 flex items-center justify-center p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t px-6 py-4 shrink-0 bg-white space-y-3">
          <div className="flex items-center justify-between text-lg font-medium">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/checkout" passHref>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
