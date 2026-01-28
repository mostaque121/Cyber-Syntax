import { DocumentType, PaymentMethod } from "@/prisma/generated/prisma";

export interface BillingFrom {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  logoUrl?: string;
}
export interface BillingTo {
  customerName: string;
  companyName?: string;
  emailAddress: string;
  phoneNumber: string;
  fullAddress: string;
}
export interface OrderProducts {
  productName: string;
  serialNumber: string;
  quantity: number;
  price: number;
  warranty: string | null;
}
export interface OrderServices {
  name: string;
  price: number;
}
export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
}
export interface MobilePayment {
  provider: string;
  number: string;
  instructions?: string;
}
export interface paymentInstructions {
  bankDetails?: BankDetails;
  mobilePayments?: MobilePayment[];
  notes?: string;
}
export interface Invoice {
  invoiceNumber?: string;
  issuedDate: Date;
  dueDate?: Date;

  billingFrom: BillingFrom;
  billingTo: BillingTo;

  orderProducts: OrderProducts[];
  orderServices: OrderServices[];

  productTaxPercentage?: number;
  serviceTaxPercentage?: number;
  shippingCost?: number;
  discount?: number;

  paymentInstructions: paymentInstructions;

  paymentStatus: "PAID" | "UNPAID" | "PARTIALLY_PAID";
  paidAmount?: number;

  notes?: string;
}
export interface Quotation {
  quotationNumber: string;
  issuedDate: Date;
  validUntil?: Date;

  billingFrom: BillingFrom;

  billingTo: BillingTo;

  orderProducts: OrderProducts[];
  orderServices: OrderServices[];

  productTaxPercentage?: number;
  serviceTaxPercentage?: number;
  shippingCost?: number;
  discount?: number;

  notes?: string;
}
export interface Receipt {
  receiptNumber?: string;
  issuedDate: Date;

  billingFrom: BillingFrom;

  billingTo: BillingTo;

  orderProducts: OrderProducts[];
  orderServices: OrderServices[];

  productTaxPercentage?: number;
  serviceTaxPercentage?: number;
  shippingCost?: number;
  discount?: number;

  paymentMethod: PaymentMethod;
  paymentDate: Date;
  paidAmount: number;
  paymentReference?: string;

  notes?: string;
}
export interface Document {
  type: DocumentType;
  id: string;
  orderId: string;
  data: Invoice | Quotation | Receipt;
  issuedBy: { name: string; id: string };
  createdAt: Date;
  updatedAt: Date;
}
