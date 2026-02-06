import type { OrderSummaryType } from "@/app/(dashboard)/types/order.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateOrderTotal } from "@/lib/calculate-total";
import { formatPrice } from "@/lib/format-price";
import { Calculator, Pencil } from "lucide-react";

interface OrderSummaryProps {
  order: OrderSummaryType;
  onEditClick: () => void;
}

export function OrderSummary({ order, onEditClick }: OrderSummaryProps) {
  const total = calculateOrderTotal(order);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Calculator className="h-4 w-4" />
            Order Summary
          </CardTitle>

          <Button
            size="sm"
            variant="outline"
            className="h-8 bg-transparent"
            onClick={onEditClick}
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {/* PRODUCTS SUBTOTAL */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Products Subtotal</span>
          <span>{formatPrice(total.productSubtotal)}</span>
        </div>

        {/* SERVICES SUBTOTAL */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Services Subtotal</span>
          <span>{formatPrice(total.serviceSubtotal)}</span>
        </div>

        {/* DISCOUNT */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Discount ({order.discount}%)
          </span>
          <span className="text-emerald-600">
            -{formatPrice(total.discountAmount)}
          </span>
        </div>

        <div className="my-3 h-px bg-border" />

        {/* SUBTOTAL AFTER DISCOUNT */}
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(total.discountedSubtotal)}</span>
        </div>

        {/* PRODUCT TAX */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Product Tax ({order.productTax}%)
          </span>
          <span>{formatPrice(total.productTaxAmount)}</span>
        </div>

        {/* SERVICE TAX */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Service Tax ({order.serviceTax}%)
          </span>
          <span>{formatPrice(total.serviceTaxAmount)}</span>
        </div>

        {/* SHIPPING */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{formatPrice(order.shippingCost)}</span>
        </div>

        <div className="my-3 h-px bg-border" />

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total.finalTotal)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
