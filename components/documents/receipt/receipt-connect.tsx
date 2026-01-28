import { Receipt } from "@/app/(dashboard)/types/documents.types";
import ReceiptFooter from "./invoice-footer";
import ReceiptInfo from "./receipt-info";
import ReceiptItems from "./receipt-items";
import ReceiptPaymentInfo from "./receipt-payment";
import ReceiptTo from "./receipt-to";
import ReceiptTopLeftPart from "./receipt-top-left";
import ReceiptTopRightPart from "./receipt-top-right";

interface SectionProps {
  receipt: Receipt;
  orderId: string;
}
export default function ReceiptConnect({ receipt, orderId }: SectionProps) {
  return (
    <div className="min-h-[256mm] w-[210mm] shrink-0 bg-white flex flex-col">
      <div className="flex border-b-[1.5px] border-gray-200 pb-4 justify-between">
        <ReceiptTopLeftPart img={receipt.billingFrom.logoUrl} />
        <ReceiptTopRightPart billingFrom={receipt.billingFrom} />
      </div>

      <div className="flex justify-between px-8 py-6">
        <ReceiptTo billingTo={receipt.billingTo} />
        <ReceiptInfo
          receiptNumber={receipt.receiptNumber ?? "RCP-1234"}
          paymentDate={receipt.paymentDate}
          paidAmount={receipt.paidAmount}
          issuedDate={receipt.issuedDate}
          orderId={orderId}
        />
      </div>

      <div>
        <ReceiptItems
          orderProducts={receipt.orderProducts}
          orderServices={receipt.orderServices}
          serviceTaxRate={receipt.serviceTaxPercentage}
          productTaxRate={receipt.productTaxPercentage}
          discount={receipt.discount}
          shippingCost={receipt.shippingCost}
        />
      </div>

      <div className=" break-togeather">
        <ReceiptPaymentInfo
          paidAmount={receipt.paidAmount}
          paymentMethod={receipt.paymentMethod}
          paymentReference={receipt.paymentReference}
          note={receipt.notes}
        />
        <div className="mt-auto ">
          <ReceiptFooter />
        </div>
      </div>
    </div>
  );
}
