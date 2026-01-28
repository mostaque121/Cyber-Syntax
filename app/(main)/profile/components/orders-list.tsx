"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/prisma/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getUserOrders } from "../actions/profile.action";
import { OrderDetail } from "./order-detail";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  PROCESSING: "bg-purple-100 text-purple-800 border-purple-300",
  SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
  RETURNED: "bg-gray-100 text-gray-800 border-gray-300",
};

export function OrdersList() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => getUserOrders({ page: 1, limit: 50 }),
  });

  const orders = data?.data ?? [];

  if (selectedOrderId) {
    return (
      <OrderDetail
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          My Orders
        </CardTitle>
        <CardDescription>
          View your order history and track order status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              You haven&apos;t placed any orders yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const totalItems =
                order.productOrders.length + order.serviceOrders.length;
              const totalPaid = order.payments.reduce(
                (sum, p) => sum + p.amount,
                0
              );

              return (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrderId(order.orderId)}
                  className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">
                          {order.orderId}
                        </span>
                        <Badge
                          className={cn("text-xs", statusColors[order.status])}
                        >
                          {order.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {order.orderType}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(
                          new Date(order.createdAt),
                          "MMM dd, yyyy 'at' h:mm a"
                        )}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-600">
                          {totalItems} item{totalItems > 1 ? "s" : ""}
                        </span>
                        {totalPaid > 0 && (
                          <span className="text-green-600 font-medium">
                            Paid: ৳{totalPaid.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Order Total</p>
                      <p className="font-bold text-primary">
                        ৳
                        {(
                          (order.productCost || 0) +
                          (order.serviceCost || 0) +
                          order.shippingCost +
                          order.productTax +
                          order.serviceTax -
                          order.discount
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
