export function calculateOrderTotal(order: {
  productOrders?: { price: number; quantity: number }[];
  serviceOrders?: { price: number }[];
  productTax?: number; // percentage
  serviceTax?: number; // percentage
  shippingCost?: number;
  discount?: number; // percentage
}) {
  // Safe defaults
  const productOrders = order.productOrders ?? [];
  const serviceOrders = order.serviceOrders ?? [];
  const productTax = order.productTax ?? 0;
  const serviceTax = order.serviceTax ?? 0;
  const shippingCost = order.shippingCost ?? 0;
  const discountPercent = order.discount ?? 0;

  // 1) Product subtotal
  const productSubtotal = productOrders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 2) Service subtotal
  const serviceSubtotal = serviceOrders.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // 3) Tax amounts
  const productTaxAmount = (productSubtotal * productTax) / 100;
  const serviceTaxAmount = (serviceSubtotal * serviceTax) / 100;

  // 4) Total before discount including shipping
  const totalBeforeDiscountAndShipping =
    productSubtotal +
    serviceSubtotal +
    productTaxAmount +
    serviceTaxAmount +
    shippingCost;

  // 5) Discount as percentage
  const discountAmount =
    (totalBeforeDiscountAndShipping * discountPercent) / 100;

  // 6) Final total after discount
  const finalTotal = totalBeforeDiscountAndShipping - discountAmount;

  return {
    productSubtotal,
    serviceSubtotal,
    productTaxAmount,
    serviceTaxAmount,
    shippingCost,
    discountAmount,
    totalBeforeDiscountAndShipping,
    finalTotal,
  };
}
