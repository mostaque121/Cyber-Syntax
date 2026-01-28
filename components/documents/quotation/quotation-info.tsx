import { format } from "date-fns";

interface SectionProps {
  quotationNumber: string;
  orderId: string;
  quotationDate: Date;
  validUntil?: Date;
}
export default function QuotationInfo({
  quotationNumber,
  quotationDate,
  validUntil,
  orderId,
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
        </tbody>
      </table>
    </div>
  );
}
