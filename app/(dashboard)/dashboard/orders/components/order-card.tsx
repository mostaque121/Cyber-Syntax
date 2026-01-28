"use client";

import { OrderWithList } from "@/app/(dashboard)/types/order.types";
import { Card, CardContent } from "@/components/ui/card";
import { calculateOrderTotal } from "@/lib/calculate-total";
import { formatPrice } from "@/lib/format-price";
import { Building2, CalendarDays, User2, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "./status-badge";

interface OrderCardProps {
  order: OrderWithList;
}

export function OrderCard({ order }: OrderCardProps) {
  const total = calculateOrderTotal(order);

  // Combine products and services to create a single preview line
  const allItems = [
    ...order.productOrders.map((p) => ({ ...p, type: "product" as const })),
    ...order.serviceOrders.map((s) => ({ ...s, type: "service" as const })),
  ];

  const displayLimit = 4;
  const remainingCount = allItems.length - displayLimit;

  return (
    <Link href={`/dashboard/orders/${order.orderId}`}>
      <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 bg-card">
        <CardContent className="p-4 space-y-4">
          {/* Header: ID, Date, Status */}
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                  {order.orderId}
                </span>
                <StatusBadge status={order.status} size="sm" />
              </div>
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                <CalendarDays className="h-3 w-3" />
                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-foreground leading-none">
                {formatPrice(total.finalTotal)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {allItems.length} {allItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          {/* Customer Info Section */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-foreground/90">
              <User2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium truncate">{order.customerName}</span>
            </div>
            {order.companyName && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span className="truncate">{order.companyName}</span>
              </div>
            )}
          </div>

          {/* Unified Visual Preview Strip */}
          {allItems.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {allItems.slice(0, displayLimit).map((item, index) => (
                <div
                  key={`${item.type}-${item.id}-${index}`}
                  className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-muted/50"
                  title={"productName" in item ? item.productName : item.name}
                >
                  {item.type === "product" ? (
                    <Image
                      src={item.productImage || "/placeholder.svg"}
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                      <Wrench className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Counter for remaining items */}
              {remainingCount > 0 && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-background text-xs font-medium text-muted-foreground">
                  +{remainingCount}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
