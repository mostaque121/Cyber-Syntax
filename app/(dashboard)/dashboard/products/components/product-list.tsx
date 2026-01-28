"use client";

import { ProductWithRelation } from "@/app/(dashboard)/types/products.types";
import { LoadingDots } from "@/components/custom-ui/loading-dots";
import { DashboardProductCard } from "./product-card";

interface ProductListProps {
  products: ProductWithRelation[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  className?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isDeleting?: boolean;
}

export default function DashboardProductList({
  products,
  isLoading = false,
  isError = false,
  error,
  className,
  onEdit,
  onDelete,
  isDeleting,
}: ProductListProps) {
  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading products:{" "}
        {typeof error === "string" ? error : "Something went wrong."}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  return (
    <div
      className={`grid grid-cols-1 pb-6 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
        className || ""
      }`}
    >
      {products.map((product) => (
        <DashboardProductCard
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
