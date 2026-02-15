import { BillingTo } from "@/app/(dashboard)/types/documents.types";

interface SectionProps {
  billingTo: BillingTo;
}
export default function QuotationTo({ billingTo }: SectionProps) {
  return (
    <div>
      <div className="w-80 text-wrap">
        <p className="font-semibold text-gray-700 text-sm">QUOTATION TO</p>
        <p className="font-semibold mt-1.5">{billingTo.customerName}</p>
        {billingTo.companyName && (
          <p className="text-sm font-medium mt-0.5">{billingTo.companyName}</p>
        )}
        <p className="mt-0.5 text-sm">{billingTo.fullAddress}</p>
        <p className="mt-0.5 text-sm">{billingTo.emailAddress}</p>
      </div>
    </div>
  );
}
