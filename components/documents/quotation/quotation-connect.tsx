import { Quotation } from "@/app/(dashboard)/types/documents.types";
import { calculateOrderTotal } from "@/lib/calculate-total";
import QuotationFooter from "./quotation-footer";
import QuotationInfo from "./quotation-info";
import QuotationItems from "./quotation-items";
import QuotationTo from "./quotation-to";
import QuotationTopLeftPart from "./quotation-top-left";
import QuotationTopRightPart from "./quotation-top-right";

interface SectionProps {
  quotation: Quotation;
  orderId: string;
}
export default function QuotationConnect({ quotation, orderId }: SectionProps) {
  const safeNumber = (value?: number) => value ?? 0;
  const calculate = calculateOrderTotal({
    productOrders: quotation.orderProducts,
    serviceOrders: quotation.orderServices,
    productTax: quotation.productTaxPercentage,
    serviceTax: quotation.serviceTaxPercentage,
    shippingCost: quotation.shippingCost,
    discount: quotation.discount,
  });
  return (
    <div className="min-h-[256mm] w-[210mm] shrink-0 bg-white flex flex-col">
      <div className="flex border-b-[1.5px] border-gray-200 pb-4 justify-between">
        <QuotationTopLeftPart img={quotation.billingFrom.logoUrl} />
        <QuotationTopRightPart billingFrom={quotation.billingFrom} />
      </div>

      <div className="flex justify-between px-8 py-6">
        <QuotationTo billingTo={quotation.billingTo} />
        <QuotationInfo
          quotationDate={quotation.issuedDate}
          validUntil={quotation.validUntil}
          quotationNumber={quotation.quotationNumber ?? "QUO-1234"}
          orderId={orderId}
          total={safeNumber(calculate.finalTotal)}
        />
      </div>

      <div>
        <QuotationItems
          orderProducts={quotation.orderProducts}
          orderServices={quotation.orderServices}
          serviceTaxRate={quotation.serviceTaxPercentage}
          productTaxRate={quotation.productTaxPercentage}
          discount={quotation.discount}
          shippingCost={quotation.shippingCost}
        />
      </div>

      <div className="break-togeather">
        {quotation.notes && (
          <p className="text-sm mt-4 px-8">{quotation.notes}</p>
        )}
        <div className="mt-auto ">
          <QuotationFooter />
        </div>
      </div>
    </div>
  );
}
