import { format } from "date-fns";

interface SectionProps {
  receiptNumber: string;
  orderId: string;
  issuedDate: Date;
  paymentDate: Date;
  paidAmount: number;
  due?: number;
}
export default function ReceiptInfo({
  receiptNumber,
  issuedDate,
  paidAmount,
  orderId,
  paymentDate,
  due = 0,
}: SectionProps) {
  return (
    <div>
      <table className="text-sm">
        <tbody>
          <tr>
            <td className="font-bold pr-2">Bill Number:</td>
            <td>{receiptNumber}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Order Number:</td>
            <td>{orderId}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Issued Date :</td>
            <td>{format(issuedDate, "MMMM d, yyyy")}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Payment Date :</td>
            <td>{format(paymentDate, "MMMM d, yyyy")}</td>
          </tr>

          <tr>
            <td colSpan={2}>
              <div className="mt-2 bg-gray-200 font-bold py-1 px-2">
                Paid Amount (BDT): {paidAmount}
              </div>
              {due > 0 && (
                <div className="mt-2 bg-gray-200 font-bold py-1 px-2">
                  Due: {due}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
