"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { formatPrice } from "@/lib/format-price";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface OrderNowBtnProps {
  currentPrice: number;
  name: string;
  productId: string;
  image: string | null;
  quantity?: number;
  price: number;
  onOrderClick?: () => void;
}

export function OrderNowBtn({
  currentPrice,
  price,
  name,
  productId,
  image,
  quantity = 1,
  onOrderClick,
}: OrderNowBtnProps) {
  const { addItem } = useCart();

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState<React.ReactNode | null>(null);

  const handleOrderClick = async () => {
    setMessage(null);
    setIsAdding(true);

    try {
      await addItem({
        price: currentPrice,
        productId,
        image,
        name,
        quantity,
      });

      setIsAdded(true);
      setMessage(
        <span className="text-green-600 text-sm ">
          Added to cart!{" "}
          <Link
            href="/checkout"
            className="text-primary text-left underline mt-1"
          >
            Go to Checkout
          </Link>
        </span>
      );

      if (onOrderClick) onOrderClick();
    } catch (err) {
      console.error(err);
      setMessage(
        <span className="text-red-600 text-sm">
          Failed to add item to cart. Please try again.
        </span>
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
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

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-primary text-white py-3 text-lg font-medium flex items-center justify-center"
          onClick={handleOrderClick}
          disabled={isAdding || isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : isAdding ? (
            <>
              <Plus className="h-4 w-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        {/* Message */}
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}
