"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-provider";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { Check, Loader2, Plus, ShoppingCart } from "lucide-react";
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
        </span>,
      );

      if (onOrderClick) onOrderClick();
    } catch (err) {
      console.error(err);
      setMessage(
        <span className="text-red-600 text-sm">
          Failed to add item to cart. Please try again.
        </span>,
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

interface OrderNowBtn2Props {
  currentPrice: number;
  name: string;
  productId: string;
  image: string | null;
  quantity?: number;
  price: number;
  discountPercentage?: number;
  onOrderClick?: () => void;
}

export function OrderNowBtn2({
  currentPrice,
  price,
  name,
  productId,
  image,
  quantity = 1,
  discountPercentage = 0,
  onOrderClick,
}: OrderNowBtn2Props) {
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
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-2">
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">
            Added to cart!{" "}
            <Link
              href="/checkout"
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            >
              View Cart & Checkout
            </Link>
          </span>
        </div>,
      );

      if (onOrderClick) onOrderClick();
    } catch (err) {
      console.error(err);
      setMessage(
        <span className="text-red-600 text-sm bg-red-50 p-2 rounded-md block">
          Failed to add item to cart. Please try again.
        </span>,
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-3 flex-wrap">
        <div className="text-4xl font-bold text-gray-900 leading-none">
          {formatPrice(currentPrice)}
        </div>
        {(price > currentPrice || discountPercentage > 0) && (
          <div className="flex flex-col mb-1">
            <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full w-fit">
              -{Math.round(discountPercentage)}% OFF
            </span>
            <span className="line-through text-lg text-gray-400 font-medium">
              {formatPrice(price)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Button
          className={cn(
            "w-full h-14 text-lg font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
            isAdded
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
              : "bg-linear-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white shadow-gray-200",
          )}
          onClick={handleOrderClick}
          disabled={isAdding || isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-6 w-6 mr-2" />
              Added to Cart
            </>
          ) : isAdding ? (
            <>
              <Loader2 className="h-6 w-6 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-6 w-6 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        {/* Message */}
        {message && (
          <div className="transition-all duration-300 ease-out">{message}</div>
        )}
      </div>
    </div>
  );
}
