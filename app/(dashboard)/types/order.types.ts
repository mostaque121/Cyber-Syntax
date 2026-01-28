import { DocumentType, Payment, Prisma } from "@/prisma/generated/prisma";
import { Document } from "./documents.types";
export interface OrderCustomerInfo {
  customerName: string;
  emailAddress: string;
  phoneNumber: string;
  whatsappNumber?: string | null;
  companyName?: string | null;
  fullAddress: string;
}
export interface OrderProduct {
  name: string;
  serialNumber: string;
  qty: number;
  price: number;
  total: number;
  warranty?: string;
}
export interface OrderService {
  name: string;
  total: number;
}
export interface OrderSummaryType {
  productOrders: {
    price: number;
    quantity: number;
  }[];
  serviceOrders: {
    price: number;
  }[];
  productTax: number; // percentage
  serviceTax: number; // percentage
  shippingCost: number;
  discount: number;
}
export interface OrderSummaryEditType {
  shippingCost: number;
  discount: number;
  productTax: number;
  serviceTax: number;
}
export interface OrderCost {
  productCost: number | null;
  serviceCost: number | null;
  transportCost: number | null;
  productOrders: {
    price: number;
    quantity: number;
  }[];
  serviceOrders: {
    price: number;
  }[];
  productTax: number; // percentage
  serviceTax: number; // percentage
  shippingCost: number;
  discount: number;
}
export interface PaymentHistoryProps {
  productOrders: {
    price: number;
    quantity: number;
  }[];
  serviceOrders: {
    price: number;
  }[];
  productTax: number; // percentage
  serviceTax: number; // percentage
  shippingCost: number;
  discount: number;
  payments: Payment[];
}
export type OrderWithAllRelation = Prisma.OrderGetPayload<{
  include: {
    productOrders: { include: { product: true } };
    serviceOrders: true;
    payments: true;
    documents: { include: { issuedBy: true } };
  };
}>;
// Order type extended with mappedDocuments
export type OrderWithMappedDocuments = OrderWithAllRelation & {
  mappedDocuments: Partial<Record<DocumentType, Document>>;
};

export type OrderWithList = Prisma.OrderGetPayload<{
  include: {
    productOrders: { include: { product: true } };
    serviceOrders: true;
  };
}>;
