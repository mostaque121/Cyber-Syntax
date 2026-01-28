"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface InvoiceSuccessStepProps {
  invoiceNumber: string;
  onPreview: () => void;
}

export function InvoiceSuccessStep({
  invoiceNumber,
  onPreview,
}: InvoiceSuccessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      {/* Success Icon */}
      <CheckCircle className="w-16 h-16 text-primary" />

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-center">
        Invoice Created Successfully!
      </h2>
      <p className="text-center text-gray-600">
        Invoice Number:{" "}
        <span className="font-mono text-gray-800">{invoiceNumber}</span>
      </p>

      {/* Preview Button */}
      <Button variant="default" onClick={onPreview}>
        Preview Invoice
      </Button>
    </div>
  );
}
