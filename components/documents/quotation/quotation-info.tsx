import { format } from "date-fns";

interface SectionProps {
  quotationNumber: string;
  orderId: string;
  quotationDate: Date;
  validUntil?: Date;
  total: number;
}
export default function QuotationInfo({
  quotationNumber,
  quotationDate,
  validUntil,
  orderId,
  total,
}: SectionProps) {
  return (
    <div>
      <table className="text-sm">
        <tbody>
          <tr>
            <td className="font-bold pr-2">Quotation Number:</td>
            <td>{quotationNumber}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Order Number:</td>
            <td>{orderId}</td>
          </tr>
          <tr>
            <td className="font-bold pr-2">Quotation Date:</td>
            <td>{format(quotationDate, "MMMM d, yyyy")}</td>
          </tr>
          {validUntil && (
            <tr>
              <td className="font-bold pr-2">Valid Until:</td>
              <td>{format(validUntil, "MMMM d, yyyy")}</td>
            </tr>
          )}

          <tr>
            <td colSpan={2}>
              <div className="mt-2 bg-gray-200 font-bold py-1 px-2">
                Total (BDT): {total}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
