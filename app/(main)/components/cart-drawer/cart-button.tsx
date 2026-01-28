"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { useUrlParams } from "@/hooks/use-url-params";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { cart, isLoading } = useCart();
  const { setParam } = useUrlParams();

  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative bg-transparent"
      onClick={() => setParam("cart", "open")}
      disabled={isLoading}
    >
      <ShoppingCart className="h-4 w-4" />
      {!isLoading && itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
      <span className="sr-only">Open cart</span>
    </Button>
  );
}
