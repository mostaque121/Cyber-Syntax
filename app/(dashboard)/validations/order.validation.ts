import { PaymentMethod, ServiceType } from "@/prisma/generated/prisma";
import z from "zod";

export const customerInfoSchema = z.object({
  customerName: z.string().min(2, "First name must be at least 2 characters"),
  companyName: z.string().optional(),
  emailAddress: z.email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  whatsappNumber: z.string().optional(),
  fullAddress: z.string().min(5, "Address must be at least 5 characters"),
});
export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

export const orderSummarySchema = z.object({
  shippingCost: z.number().min(0, "Shipping cost cannot be negative"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100"),
  productTax: z
    .number()
    .min(0, "Tax cannot be negative")
    .max(100, "Tax cannot be more than 100"),
  serviceTax: z
    .number()
    .min(0, "Tax cannot be negative")
    .max(100, "Tax cannot be higher than 100"),
});
export type OrderSummaryFormData = z.infer<typeof orderSummarySchema>;

export const orderProductSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  warranty: z.string().optional(),
});

export const orderProductListSchema = z.object({
  products: z
    .array(orderProductSchema)
    .min(1, "At least one product is required"),
});
export type OrderProductFormData = z.infer<typeof orderProductSchema>;
export type OrderProductListFormData = z.infer<typeof orderProductListSchema>;

export const orderServiceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  serviceType: z.enum(ServiceType, "Invalid service type"),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

export const orderServiceListSchema = z.object({
  services: z
    .array(orderServiceSchema)
    .min(1, "At least one product is required"),
});
export type OrderServiceFormData = z.infer<typeof orderServiceSchema>;
export type OrderServiceListFormData = z.infer<typeof orderServiceListSchema>;

export const orderCostSchema = z.object({
  productCost: z.number().min(0, "Product cost cannot be negative"),
  serviceCost: z.number().min(0, "Service cost cannot be negative"),
  transportCost: z.number().min(0, "Discount cannot be negative"),
});
export type OrderCostFormData = z.infer<typeof orderCostSchema>;

export const paymentSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  method: z.enum(PaymentMethod, "Invalid payment method"),
  note: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
