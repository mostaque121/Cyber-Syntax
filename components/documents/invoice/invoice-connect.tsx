import { Invoice } from "@/app/(dashboard)/types/documents.types";
import InvoiceFooter from "./invoice-footer";
import InvoiceInfo from "./invoice-info";
import InvoiceItems from "./invoice-items";
import InvoicePaymentInfo from "./invoice-payment-info";
import InvoiceTo from "./invoice-to";
import InvoiceTopLeftPart from "./invoice-top-left";
import InvoiceTopRightPart from "./invoice-top-right";

interface SectionProps {
  invoice: Invoice;
  orderId: string;
}
export default function InvoiceConnect({ invoice, orderId }: SectionProps) {
  // Safe helper to default undefined values to 0
  const safeNumber = (value?: number) => value ?? 0;

  // Calculate subtotals
  const productSubTotal = invoice.orderProducts?.reduce(
    (sum, item) => sum + safeNumber(item.price) * safeNumber(item.quantity),
    0
  );

  const serviceSubTotal = invoice.orderServices?.reduce(
    (sum, item) => sum + safeNumber(item.price),
    0
  );

  const subTotal = productSubTotal + serviceSubTotal;

  // Calculate taxes safely
  const productTax = productSubTotal * safeNumber(invoice.productTaxPercentage);
  const serviceTax = serviceSubTotal * safeNumber(invoice.serviceTaxPercentage);
  const totalTax = productTax + serviceTax;

  // Calculate discount as percentage of subtotal
  const discountPercentage = safeNumber(invoice.discount); // e.g., 10 for 10%
  const discountAmount = subTotal * (discountPercentage / 100);

  // Calculate total and due
  const total =
    subTotal + totalTax + safeNumber(invoice.shippingCost) - discountAmount;
  const due = total - safeNumber(invoice.paidAmount);
  return (
    <div className="min-h-[256mm] w-[210mm] shrink-0 bg-white flex flex-col">
      <div className="flex border-b-[1.5px] border-gray-200 pb-4 justify-between">
        <InvoiceTopLeftPart img={invoice.billingFrom.logoUrl} />
        <InvoiceTopRightPart billingFrom={invoice.billingFrom} />
      </div>

      <div className="flex justify-between px-8 py-6">
        <InvoiceTo billingTo={invoice.billingTo} />
        <InvoiceInfo
          invoiceDate={invoice.issuedDate}
          dueDate={invoice.dueDate}
          amountDue={due}
          invoiceNumber={invoice.invoiceNumber ?? "INV-1234"}
          orderId={orderId}
        />
      </div>

      <div>
        <InvoiceItems
          orderProducts={invoice.orderProducts}
          orderServices={invoice.orderServices}
          serviceTaxRate={invoice.serviceTaxPercentage}
          productTaxRate={invoice.productTaxPercentage}
          discount={invoice.discount}
          shippingCost={invoice.shippingCost}
          paid={invoice.paidAmount}
        />
      </div>

      <div className=" break-togeather">
        <InvoicePaymentInfo
          paymentInstructions={invoice.paymentInstructions}
          note={invoice.notes}
        />
        <div className="mt-auto ">
          <InvoiceFooter />
        </div>
      </div>
    </div>
  );
}
