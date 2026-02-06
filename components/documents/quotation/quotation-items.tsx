import {
  OrderProducts,
  OrderServices,
} from "@/app/(dashboard)/types/documents.types";
import { calculateOrderTotal } from "@/lib/calculate-total";
import { formatPrice } from "@/lib/format-price";

interface SectionProps {
  orderServices: OrderServices[];
  orderProducts: OrderProducts[];
  productTaxRate?: number; // e.g., 0.1 for 10%
  serviceTaxRate?: number; // e.g., 0.05 for 5%
  shippingCost?: number;
  discount?: number; // percentage, e.g., 10 for 10%
}

export default function QuotationItems({
  orderProducts,
  orderServices,
  productTaxRate = 0,
  serviceTaxRate = 0,
  shippingCost = 0,
  discount = 0,
}: SectionProps) {
  const calculate = calculateOrderTotal({
    productOrders: orderProducts,
    serviceOrders: orderServices,
    productTax: productTaxRate,
    serviceTax: serviceTaxRate,
    shippingCost,
    discount,
  });

  const productSubTotal = calculate.productSubtotal;
  const serviceSubTotal = calculate.serviceSubtotal;
  const productTax = calculate.productTaxAmount;
  const serviceTax = calculate.serviceTaxAmount;
  const total = calculate.finalTotal;
  const subTotal = productSubTotal + serviceSubTotal;
  const discountAmount = calculate.discountAmount;
  const totalTax = productTax + serviceTax;

  // Dynamic tax label
  const taxLabelParts = [];
  if (productTaxRate > 0)
    taxLabelParts.push(`Products ${productTaxRate.toFixed(0)}%`);
  if (serviceTaxRate > 0)
    taxLabelParts.push(`Services ${serviceTaxRate.toFixed(0)}%`);
  const taxLabel = taxLabelParts.join(", ");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-300 text-gray-800 text-sm">
          <tr>
            <th className="pl-8 py-2 text-left w-10">No</th>
            <th className="px-4 py-2 text-left w-[300px]">Product / Service</th>
            <th className="px-4 py-2 text-right w-24">Warranty</th>
            <th className="px-4 py-2 text-right w-18">Quantity</th>
            <th className="px-4 py-2 text-right w-24">Unit Price</th>
            <th className="pr-8 pl-4 py-2 text-right w-26">Total</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orderProducts.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-100 border-b">
              <td className="pl-8 pr-4 py-2 text-center">{idx + 1}</td>
              <td className="px-4 py-2 text-left">
                <p>{item.productName}</p>
              </td>
              <td className="px-4 py-2 text-right">{item.warranty}</td>
              <td className="px-4 py-2 text-right">{item.quantity}</td>
              <td className="px-4 py-2 text-right">
                {formatPrice(item.price)}
              </td>
              <td className="pr-8 pl-4 py-2 text-right">
                {formatPrice(item.price * item.quantity)}
              </td>
            </tr>
          ))}

          {orderServices.map((item, idx) => (
            <tr key={item.name} className="hover:bg-gray-100 border-b">
              <td className="pl-8 pr-4 py-2 text-center">
                {orderProducts.length + idx + 1}
              </td>
              <td className="px-4 py-2 text-left">{item.name}</td>
              <td className="px-4 py-2 text-right"></td>
              <td className="px-4 py-2 text-right"></td>
              <td className="px-4 py-2 text-right">
                {formatPrice(item.price)}
              </td>
              <td className="pr-8 pl-4 py-2 text-right">
                {formatPrice(item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-3 invoice-footer flex justify-between w-full text-sm font-semibold">
        <div className="flex-1"></div>
        <div className="pr-5 text-sm font-semibold">
          <div className="flex justify-end px-3 py-1">
            <span className="text-right">Subtotal</span>
            <span className="w-22 text-right">{formatPrice(subTotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-end px-3 py-1">
              <span>Discount ({discount.toFixed(0)}%)</span>
              <span className="w-22 text-right">
                -{formatPrice(discountAmount)}
              </span>
            </div>
          )}
          {totalTax > 0 && (
            <div className="flex justify-end px-3 py-1">
              <span className="text-right">Tax ({taxLabel})</span>
              <span className="w-22 text-right">{formatPrice(totalTax)}</span>
            </div>
          )}

          {shippingCost > 0 && (
            <div className="flex justify-end px-3 py-1">
              <span>Shipping</span>
              <span className="w-22 text-right">
                {formatPrice(shippingCost)}
              </span>
            </div>
          )}
          <div className="flex justify-end font-semibold text-lg pt-2 pb-2">
            <div className="items-center px-3 flex bg-gray-300">
              <span>Total</span>
              <span className="w-22 text-right">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
