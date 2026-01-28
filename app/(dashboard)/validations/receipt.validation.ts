import { PaymentMethod } from "@/prisma/generated/prisma";
import { z } from "zod";

// -----------------------------
// 1. Receipt Dates
// -----------------------------
export const receiptDateSchema = z.object({
  issuedDate: z.date("Issued date is required"),
});

// -----------------------------
// 2. Billing From
// -----------------------------
export const billingFromSchema = z.object({
  billingFrom: z.object({
    companyName: z
      .string("Company name is required")
      .min(1, "Company name cannot be empty"),
    address: z.string("Address is required").min(1, "Address cannot be empty"),
    email: z.email("Invalid email format"),
    website: z.string("Invalid website"),
    phone: z
      .string("Phone number is required")
      .min(3, "Phone number must be at least 3 characters"),
    logoUrl: z.url("Logo URL must be a valid URL").optional(),
  }),
});

// -----------------------------
// 3. Billing To
// -----------------------------
export const billingToSchema = z.object({
  billingTo: z.object({
    customerName: z
      .string("Customer name is required")
      .min(1, "Customer name cannot be empty"),
    companyName: z.string().optional(),
    emailAddress: z.email("Invalid email format"),
    phoneNumber: z
      .string("Customer phone number is required")
      .min(3, "Phone number must be at least 3 characters"),
    fullAddress: z
      .string("Full address is required")
      .min(1, "Full address cannot be empty"),
  }),
});

// -----------------------------
// 4. Order Products
// -----------------------------
export const orderProductsSchema = z.object({
  orderProducts: z
    .array(
      z.object({
        productName: z
          .string("Product name is required")
          .min(1, "Product name cannot be empty"),
        serialNumber: z
          .string("Serial number is required")
          .min(1, "Serial number cannot be empty"),
        quantity: z
          .number("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        price: z
          .number("Price is required")
          .min(0, "Price must be a positive number"),
        warranty: z.string().optional().nullable(),
      })
    )
    .optional(),
});

// -----------------------------
// 5. Order Services
// -----------------------------
export const orderServicesSchema = z.object({
  orderServices: z
    .array(
      z.object({
        name: z
          .string("Service name is required")
          .min(1, "Service name cannot be empty"),
        price: z
          .number("Service price is required")
          .min(0, "Price must be a positive number"),
      })
    )
    .optional(),
});

// -----------------------------
// 6. Costs & Taxes
// -----------------------------
export const receiptCostSchema = z.object({
  shippingCost: z
    .number()
    .min(0, "Shipping cost cannot be negative")
    .optional(),

  productTaxPercentage: z
    .number()
    .min(0, "Product tax must be at least 0%")
    .max(100, "Product tax cannot exceed 100%")
    .optional(),

  serviceTaxPercentage: z
    .number()
    .min(0, "Service tax must be at least 0%")
    .max(100, "Service tax cannot exceed 100%")
    .optional(),

  discount: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
});

// -----------------------------
// 7. Payment Status
// -----------------------------
export const paymentStatusSchema = z.object({
  paymentMethod: z.enum(PaymentMethod, "Invalid Payment method"),
  paymentDate: z.date("Payment date is required"),
  paymentReference: z.string().optional(),
  paidAmount: z
    .number("Paid amount is required")
    .min(0, "Paid amount cannot be negative"),
});

// -----------------------------
// 8. Extra Notes
// -----------------------------
export const receiptNotesSchema = z.object({
  notes: z.string().optional(),
});

// -----------------------------
// --- Full Receipt Schema ---
// -----------------------------
export const receiptFullSchema = z.object({
  ...receiptDateSchema.shape,
  ...billingFromSchema.shape,
  ...billingToSchema.shape,
  ...orderProductsSchema.shape,
  ...orderServicesSchema.shape,
  ...receiptCostSchema.shape,
  ...paymentStatusSchema.shape,
  ...receiptNotesSchema.shape,
  receiptNumber: z.string().min(4, "Invalid Receipt Number"),
});

// Optional Type
export type ReceiptFormData = z.infer<typeof receiptFullSchema>;
