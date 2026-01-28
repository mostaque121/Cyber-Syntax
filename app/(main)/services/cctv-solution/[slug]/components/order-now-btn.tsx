"use client";

import { ResponsiveModal } from "@/components/custom-ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { ServiceContactForm } from "../../../components/contact-form";

interface OrderNowBtnProps {
  currentPrice: number;
  name: string;
  price: number;
}

export function OrderNowBtn({ currentPrice, name, price }: OrderNowBtnProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      {/* Price */}
      <div className="text-3xl font-bold text-gray-900">
        {formatPrice(currentPrice)}
        {price > currentPrice && (
          <span className="line-through text-sm text-gray-500 ml-3">
            {formatPrice(price)}
          </span>
        )}
      </div>
      <ResponsiveModal
        title={name}
        trigger={
          <Button className="w-full bg-primary text-white py-3 text-lg font-medium flex items-center justify-center">
            Order Now
          </Button>
        }
      >
        <ServiceContactForm serviceType="CCTV_SOLUTION" serviceName={name} />
      </ResponsiveModal>
    </div>
  );
}
