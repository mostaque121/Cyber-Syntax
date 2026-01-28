import { paymentInstructions } from "@/app/(dashboard)/types/documents.types";

interface SectionProps {
  paymentInstructions: paymentInstructions;
  note?: string;
}

export default function InvoicePaymentInfo({
  paymentInstructions,
  note,
}: SectionProps) {
  const { notes, bankDetails, mobilePayments } = paymentInstructions || {};

  return (
    <div className="px-8 pt-6 pb-4">
      {/* Notes Section */}
      {notes && (
        <div className="mb-4 note-section">
          <p className="font-bold text-sm mb-1">Notes / Terms:</p>
          <p className="max-w-2/3 text-sm leading-relaxed wrap-break-word">
            {notes}
          </p>
        </div>
      )}

      {/* Bank Details */}
      {bankDetails && (
        <div className="mb-4 bank-section">
          <p className="font-bold text-sm mb-2">Banking Details:</p>
          <p className="text-sm">
            <span className="font-medium">Bank Name:</span>{" "}
            {bankDetails.bankName}
          </p>
          <p className="text-sm">
            <span className="font-medium">Account Holder:</span>{" "}
            {bankDetails.accountName}
          </p>
          <p className="text-sm">
            <span className="font-medium">Account Number:</span>{" "}
            {bankDetails.accountNumber}
          </p>
          {bankDetails.routingNumber && (
            <p className="text-sm">
              <span className="font-medium">Routing Number:</span>{" "}
              {bankDetails.routingNumber}
            </p>
          )}
        </div>
      )}

      {/* Mobile Payments */}
      {mobilePayments && mobilePayments.length > 0 && (
        <div className="mb-4 mobile-section">
          <p className="font-bold text-sm mb-2">Mobile Payments:</p>
          {mobilePayments.map((mp, idx) => (
            <div key={idx} className="text-sm mb-1">
              <p>
                <span className="font-medium">{mp.provider}:</span> {mp.number}
              </p>
              {mp.instructions && (
                <p className="text-xs text-gray-600 ml-2">{mp.instructions}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Standard Terms */}
      {note && <p className="text-sm mt-2">{note}</p>}
    </div>
  );
}
