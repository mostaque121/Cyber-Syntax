"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessStepProps {
  onBackToLogin: () => void;
}

export function SuccessStep({ onBackToLogin }: SuccessStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Password reset successful
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>
      </div>

      <Button onClick={onBackToLogin} className="w-full">
        Back to sign in
      </Button>
    </div>
  );
}
