"use client";

import { OrderWithList } from "@/app/(dashboard)/types/order.types";
import { LoadingDots } from "@/components/custom-ui/loading-dots";
import { OrderCard } from "./order-card";

interface ProductListProps {
  orders: OrderWithList[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  className?: string;
}

export default function DashboardProductOrderList({
  orders,
  isLoading = false,
  isError = false,
  error,
  className,
}: ProductListProps) {
  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading orders:{" "}
        {typeof error === "string" ? error : "Something went wrong."}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center py-10">No orders found.</div>;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className || ""}`}>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}
