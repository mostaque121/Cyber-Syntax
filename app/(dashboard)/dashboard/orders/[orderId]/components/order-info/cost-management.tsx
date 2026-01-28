"use client";

import { OrderCost } from "@/app/(dashboard)/types/order.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateOrderTotal } from "@/lib/calculate-total";
import { formatPrice } from "@/lib/format-price";
import { Pencil, TrendingUp } from "lucide-react";

interface CostManagementProps {
  order: OrderCost;
  onEditClick: () => void;
}

export function CostManagement({ order, onEditClick }: CostManagementProps) {
  const totalAmount = calculateOrderTotal(order).finalTotal;
  const totalCost = (order.productCost ?? 0) + (order.transportCost ?? 0);
  const profit = totalAmount - totalCost;
  const profitMargin =
    totalAmount > 0 ? ((profit / totalAmount) * 100).toFixed(1) : "0";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <TrendingUp className="h-4 w-4" />
            Cost & Revenue
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
      <CardContent className="space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Product Cost</span>
            {order.productCost ? (
              <span>{formatPrice(order.productCost)}</span>
            ) : (
              "N/A"
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Service Cost</span>
            {order.serviceCost ? (
              <span>{formatPrice(order.serviceCost)}</span>
            ) : (
              "N/A"
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transport Cost</span>
            {order.transportCost ? (
              <span>{formatPrice(order.transportCost ?? 0)}</span>
            ) : (
              "N/A"
            )}
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Cost</span>
            <span className="font-medium">{formatPrice(totalCost)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Revenue</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">Profit</span>
            <div className="text-right">
              <p className="font-semibold text-emerald-700">
                {formatPrice(profit)}
              </p>
              <p className="text-xs text-emerald-600">{profitMargin}% margin</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
