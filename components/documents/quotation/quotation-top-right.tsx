import { BillingFrom } from "@/app/(dashboard)/types/documents.types";

interface SectionProps {
  billingFrom: BillingFrom;
}
export default function QuotationTopRightPart({ billingFrom }: SectionProps) {
  return (
    <div className="pr-8">
      <div className="text-right">
        <h2 className="text-xl font-bold m-0">QUOTATION</h2>
        <p className="mt-2 leading-tight font-semibold text-base">
          {billingFrom.companyName}
        </p>
        <p className="mt-1 text-sm">{billingFrom.address}</p>
        <p className="mt-0.5 text-sm">Email: {billingFrom.email}</p>
        <p className="mt-0.5 text-sm">Mobile: {billingFrom.phone}</p>
        <p className="mt-0.5 text-sm">{billingFrom.website}</p>
      </div>
    </div>
  );
}
