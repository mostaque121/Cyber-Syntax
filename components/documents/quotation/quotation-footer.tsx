export default function QuotationFooter() {
  return (
    <div className="px-8 pt-6 w-full">
      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <p className="text-gray-700 text-sm">_____________________</p>
          <p className="text-gray-700 text-sm mt-1">Customer Signature</p>
        </div>
        <div className="w-1/2 pl-4 text-right">
          <p className="text-gray-700 text-sm">______________________</p>
          <p className="text-gray-700 text-sm mt-1">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
