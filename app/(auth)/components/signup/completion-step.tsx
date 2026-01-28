"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function CompletionStep() {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Account Created Successfully!
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to our platform. You can now start using all the features.
        </p>
      </div>
      <Button
        className="w-full"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
