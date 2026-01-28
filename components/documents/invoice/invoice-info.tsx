import { format } from "date-fns";

interface SectionProps {
  invoiceNumber: string;
  orderId: string;
  invoiceDate: Date;
  dueDate?: Date;
  amountDue: number;
}
export default function InvoiceInfo({
  invoiceNumber,
  invoiceDate,
  amountDue,
  dueDate,
  orderId,
}: SectionProps) {
  return (
    <div>
      <table className="text-sm">
        <tbody>
          <tr>
            <td className="font-bold pr-2">Invoice Number:</td>
            <td>{invoiceNumber}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Order Number:</td>
            <td>{orderId}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Invoice Date:</td>
            <td>{format(invoiceDate, "MMMM d, yyyy")}</td>
          </tr>
          {dueDate && (
            <tr>
              <td className="font-bold pr-2">Payment Due:</td>
              <td>{format(dueDate, "MMMM d, yyyy")}</td>
            </tr>
          )}

          <tr>
            <td colSpan={2}>
              <div className="mt-2 bg-gray-200 font-bold py-1 px-2">
                Amount Due (BDT): {amountDue}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
