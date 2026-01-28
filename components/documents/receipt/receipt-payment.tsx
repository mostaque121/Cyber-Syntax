import { PaymentMethod } from "@/prisma/generated/prisma";

interface SectionProps {
  paymentMethod: PaymentMethod;
  paidAmount: number;
  paymentReference?: string;
  note?: string;
}

export default function ReceiptPaymentInfo({
  paymentMethod,
  paidAmount,
  paymentReference,
  note,
}: SectionProps) {
  function formatPaymentMethod(method: PaymentMethod): string {
    switch (method) {
      case "CASH":
        return "Cash";

      case "BANK_TRANSFER":
        return "Bank Transfer";

      case "CARD":
        return "Card Payment";

      case "MOBILE_BANKING":
        return "Mobile Banking";

      case "OTHER":
        return "Other";

      default:
        return method;
    }
  }

  return (
    <div className="px-8 pt-6 pb-4 space-y-4">
      {/* Payment Info */}
      <div>
        <p className="font-bold text-sm mb-2">Payment Information:</p>

        <p className="text-sm">
          <span className="font-medium">Payment Method:</span>{" "}
          {paymentMethod
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </p>

        <p className="text-sm">
          <span className="font-medium">Payment Method:</span>{" "}
          {formatPaymentMethod(paymentMethod)}
        </p>

        <p className="text-sm">
          <span className="font-medium">Paid Amount:</span>{" "}
          {paidAmount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD", // change if needed
          })}
        </p>

        {paymentReference && (
          <p className="text-sm">
            <span className="font-medium">Reference:</span> {paymentReference}
          </p>
        )}
      </div>

      {/* Note / Terms */}
      {note && (
        <div className="pt-2">
          <p className="font-bold text-sm mb-1">Note:</p>
          <p className="text-sm text-gray-700">{note}</p>
        </div>
      )}
    </div>
  );
}
