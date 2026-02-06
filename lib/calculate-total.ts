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
    0,
  );

  // 2) Service subtotal
  const serviceSubtotal = serviceOrders.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  // 3) Total subtotal before discount
  const subtotal = productSubtotal + serviceSubtotal;

  // 4) Discount applied to subtotal
  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discountAmount;

  // 5) Tax amounts applied to discounted subtotal
  // Calculate proportion of products and services in original subtotal
  const productProportion = subtotal > 0 ? productSubtotal / subtotal : 0;
  const serviceProportion = subtotal > 0 ? serviceSubtotal / subtotal : 0;

  // Apply proportional discount to get discounted amounts
  const discountedProductAmount = discountedSubtotal * productProportion;
  const discountedServiceAmount = discountedSubtotal * serviceProportion;

  // Tax on discounted amounts
  const productTaxAmount =
    productTax < 100
      ? (discountedProductAmount * productTax) / (100 - productTax)
      : 0;
  const serviceTaxAmount =
    serviceTax < 100
      ? (discountedServiceAmount * serviceTax) / (100 - serviceTax)
      : 0;

  // 6) Total after tax
  const totalAfterTax =
    discountedSubtotal + productTaxAmount + serviceTaxAmount;

  // 7) Final total with shipping
  const finalTotal = totalAfterTax + shippingCost;

  return {
    productSubtotal,
    serviceSubtotal,
    subtotal,
    discountAmount,
    discountedSubtotal,
    productTaxAmount,
    serviceTaxAmount,
    shippingCost,
    finalTotal,
  };
}
