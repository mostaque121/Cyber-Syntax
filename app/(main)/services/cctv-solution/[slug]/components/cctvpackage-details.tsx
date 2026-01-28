"use client";

import { OrderNowBtn } from "./order-now-btn";

interface CctvPackageDetailsProps {
  title: string;
  shortDescription: string;
  price: number;
  discountPercentage?: number;
}

export function CctvPackageDetails({
  title,
  shortDescription,
  price,
  discountPercentage = 0,
}: CctvPackageDetailsProps) {
  const currentPrice = price * (1 - discountPercentage / 100);

  return (
    <div className="space-y-6 bg-[#f5f5f5] rounded-lg p-8 w-full md:ml-[8.33%] md:w-1/2">
      {/* Title and description */}
      <div>
        <h1 className="text-3xl flex items-center gap-3 font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 leading-relaxed">{shortDescription}</p>
      </div>

      <OrderNowBtn name={title} price={price} currentPrice={currentPrice} />
    </div>
  );
}
