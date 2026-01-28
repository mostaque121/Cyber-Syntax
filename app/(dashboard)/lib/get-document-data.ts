import {
  BillingFrom,
  BillingTo,
  Invoice,
  Quotation,
  Receipt,
} from "../types/documents.types";
import { OrderWithMappedDocuments } from "../types/order.types";

// -------------------- INVOICE --------------------
export function getInvoiceData(order: OrderWithMappedDocuments): Invoice {
  const doc = order.mappedDocuments?.INVOICE;
  const paidAmount = order.payments.reduce(
    (total, payment) => total + (payment.amount ?? 0),
    0
  );

  if (doc && doc.data) {
    // Existing invoice — return as is
    return doc.data as Invoice;
  } else {
    // No invoice exists — generate defaults from the order
    const defaultBillingFrom: BillingFrom = {
      companyName: "Cyber Syntax and Engineering Ltd.",
      address: "Shewrapara,Mirpur,Dhaka",
      email: "cybersyntax@gmai.com",
      phone: "01912334567",
      website: "www.cybersyntax.com",
    };

    const defaultBillingTo: BillingTo = {
      customerName: order.customerName,
      companyName: order.companyName || undefined,
      emailAddress: order.emailAddress,
      phoneNumber: order.phoneNumber,
      fullAddress: order.fullAddress,
    };

    return {
      invoiceNumber: undefined,
      issuedDate: new Date(),
      dueDate: undefined,

      billingFrom: defaultBillingFrom,
      billingTo: defaultBillingTo,

      orderProducts: order.productOrders,
      orderServices: order.serviceOrders,

      productTaxPercentage: order.productTax,
      serviceTaxPercentage: order.serviceTax,
      shippingCost: order.shippingCost,
      discount: order.discount,

      paymentInstructions: {
        bankDetails: undefined,
        mobilePayments: [],
        notes: "",
      },

      paymentStatus: "UNPAID",
      paidAmount: paidAmount,
      notes: "",
    };
  }
}

// -------------------- QUOTATION --------------------
export function getQuotationData(order: OrderWithMappedDocuments): Quotation {
  const doc = order.mappedDocuments?.QUOTATION;

  if (doc?.data) {
    return doc.data as Quotation;
  }

  const billingFrom: BillingFrom = {
    companyName: "Cyber Syntax and Engineering Ltd.",
    address: "Shewrapara,Mirpur,Dhaka",
    email: "cybersyntax@gmai.com",
    phone: "01912334567",
    website: "www.cybersyntax.com",
  };

  const billingTo: BillingTo = {
    customerName: order.customerName,
    companyName: order.companyName || undefined,
    emailAddress: order.emailAddress,
    phoneNumber: order.phoneNumber,
    fullAddress: order.fullAddress,
  };

  return {
    quotationNumber: "",
    issuedDate: new Date(),
    validUntil: undefined,

    billingFrom,
    billingTo,

    orderProducts: order.productOrders,
    orderServices: order.serviceOrders,

    productTaxPercentage: order.productTax,
    serviceTaxPercentage: order.serviceTax,
    shippingCost: order.shippingCost,
    discount: order.discount,

    notes: "",
  };
}

// -------------------- RECEIPT --------------------
export function getReceiptData(order: OrderWithMappedDocuments): Receipt {
  const doc = order.mappedDocuments?.RECEIPT;
  const paidAmount = order.payments.reduce(
    (total, payment) => total + (payment.amount ?? 0),
    0
  );

  if (doc?.data) {
    return doc.data as Receipt;
  }

  const billingFrom: BillingFrom = {
    companyName: "Cyber Syntax and Engineering Ltd.",
    address: "Shewrapara,Mirpur,Dhaka",
    email: "cybersyntax@gmai.com",
    phone: "01912334567",
    website: "www.cybersyntax.com",
  };

  const billingTo: BillingTo = {
    customerName: order.customerName,
    companyName: order.companyName || undefined,
    emailAddress: order.emailAddress,
    phoneNumber: order.phoneNumber,
    fullAddress: order.fullAddress,
  };

  return {
    receiptNumber: "",
    issuedDate: new Date(),

    billingFrom,
    billingTo,

    orderProducts: order.productOrders,
    orderServices: order.serviceOrders,

    productTaxPercentage: order.productTax,
    serviceTaxPercentage: order.serviceTax,
    shippingCost: order.shippingCost,
    discount: order.discount,

    paymentMethod: "BANK_TRANSFER",
    paymentDate: new Date(),
    paidAmount: paidAmount,
    paymentReference: "",
    notes: "",
  };
}
