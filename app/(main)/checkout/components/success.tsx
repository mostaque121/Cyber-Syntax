"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CheckoutSuccessProps {
  orderId: string;
  total: number;
  email: string;
}

export function CheckoutSuccess({
  orderId,
  total,
  email,
}: CheckoutSuccessProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000); // Reset after 5 seconds
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-700">
          Thank you for your purchase. We have received your payment of{" "}
          <span className="font-semibold">৳ {total.toLocaleString()}</span>.
        </p>

        <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center space-y-2">
          <p className="text-gray-800">Your Order ID:</p>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-gray-900">{orderId}</span>
            <button
              onClick={handleCopy}
              className="flex items-center px-2 py-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" /> Copied
                </>
              ) : (
                "Copy"
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-600">
          We will send a confirmation email and any updates regarding your order
          to <span className="font-semibold">{email}</span>.
        </p>

        <Link
          href={`/orders/${orderId}`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
        >
          View Your Order
        </Link>

        <p className="text-sm text-gray-500 mt-4">
          You can track your order status and download the invoice from the
          order page.
        </p>
      </div>
    </div>
  );
}
