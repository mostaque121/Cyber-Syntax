"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";

type CartItem = {
  name: string;
  id: string;
  cartId: string;
  productId: string;
  image: string | null;
  quantity: number;
  price: number;
};

interface OrderSummaryProps {
  orderItems: CartItem[];
  selectedIds: string[];
  isInsideDhaka: boolean;
  onItemToggle: (itemId: string) => void;
}

export function OrderSummary({
  orderItems,
  selectedIds,
  isInsideDhaka,
  onItemToggle,
}: OrderSummaryProps) {
  const selectedItems = orderItems.filter((item) =>
    selectedIds.includes(item.id)
  );
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = selectedItems.length === 0 ? 0 : isInsideDhaka ? 50 : 100;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-muted rounded-lg"
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onItemToggle(item.id)}
                className="shrink-0"
              />
              <div className="w-16 h-16 overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    isSelected
                      ? "text-card-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          );
        })}

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
