"use client";

import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/prisma/generated/prisma";
import { OrderNowBtn } from "./order-now-btn";

interface ProductDetailsProps {
  title: string;
  brand: string;
  productId: string;
  description: string;
  productType: ProductType;
  price: number;
  discountPercentage?: number;
  isHotDeal: boolean;
  image: string;
  warranty: string | null; // <-- NEW FIELD
}

export function ProductDetails({
  title,
  brand,
  description,
  productType,
  price,
  discountPercentage = 0,
  isHotDeal,
  image,
  productId,
  warranty, // <-- ADDED
}: ProductDetailsProps) {
  const currentPrice = price * (1 - discountPercentage / 100);

  const typeLabels: Record<ProductType, string> = {
    NEW: "New",
    USED: "Used",
    RECONDITION: "Recondition",
  };

  const typeColors: Record<ProductType, string> = {
    NEW: "bg-green-100 text-green-800",
    USED: "bg-yellow-100 text-yellow-800",
    RECONDITION: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="space-y-6 bg-[#f5f5f5] rounded-lg p-8 w-full md:ml-[8.33%] md:w-1/2">
      {/* Title and description */}
      <div>
        <h1 className="md:text-3xl text-xl flex items-center gap-3 font-bold text-gray-900 mb-2">
          {title}
          {isHotDeal && <Badge className="bg-primary ">Hot Deal</Badge>}
        </h1>
        <h2 className="text-gray-700 text-lg font-semibold mb-2">{brand}</h2>
        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
          {description}
        </p>
      </div>

      {/* Product Type */}
      <div>
        <h3 className="font-medium text-gray-900 mb-1">Product Type</h3>
        <span
          className={`px-3 py-1 rounded-full font-medium text-sm ${typeColors[productType]}`}
        >
          {typeLabels[productType]}
        </span>
      </div>

      {/* Warranty */}
      {warranty && (
        <div>
          <h3 className="font-medium text-gray-900 mb-1">Warranty</h3>
          <p className="text-gray-700 text-sm font-medium bg-white px-3 py-2 rounded-md border">
            {warranty}
          </p>
        </div>
      )}

      {/* Price and Add to Cart */}
      <OrderNowBtn
        image={image}
        name={title}
        productId={productId}
        price={price}
        currentPrice={currentPrice}
      />
    </div>
  );
}
