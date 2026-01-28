"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export function LoadingCart() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center space-y-4">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto" />

          {/* Loading text */}
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <span className="animate-spin inline-block">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </span>
            Loading...
          </h2>

          <p className="text-muted-foreground">
            Fetching your cart items, please wait...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
