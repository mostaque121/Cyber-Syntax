import { z } from "zod";

// -----------------------------
// 1. Invoice Dates
// -----------------------------
export const invoiceDateSchema = z.object({
  issuedDate: z.date("Issued date is required"),
  dueDate: z.date().optional(),
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
export const invoiceCostSchema = z.object({
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
// 7. Payment Instructions
// -----------------------------
export const paymentInstructionsSchema = z.object({
  paymentInstructions: z
    .object({
      bankDetails: z
        .object({
          bankName: z.string().min(1),
          accountName: z.string().min(1),
          accountNumber: z.string().min(1),
          routingNumber: z.string().min(1),
        })
        .optional(),

      mobilePayments: z
        .array(
          z.object({
            provider: z.string().min(1),
            number: z.string().min(1),
            instructions: z.string().optional(),
          })
        )
        .optional(),

      notes: z.string().optional(),
    })
    // <-- refine ensures at least one method is selected
    .refine(
      (data) =>
        !!data.bankDetails ||
        (!!data.mobilePayments && data.mobilePayments.length > 0),
      {
        message: "You must select at least one payment method",
        path: ["bankDetails"], // can point to bankDetails for error display
      }
    ),
});

// -----------------------------
// 8. Payment Status
// -----------------------------
export const paymentStatusSchema = z.object({
  paymentStatus: z.enum(
    ["PAID", "UNPAID", "PARTIALLY_PAID"],
    "Payment status is required"
  ),
  paidAmount: z.number().min(0, "Paid amount cannot be negative").optional(),
});

// -----------------------------
// 9. Extra Notes
// -----------------------------
export const invoiceNotesSchema = z.object({
  notes: z.string().optional(),
});

// -----------------------------
// --- Full Invoice Schema ---
// -----------------------------
export const invoiceFullSchema = z.object({
  ...invoiceDateSchema.shape,
  ...billingFromSchema.shape,
  ...billingToSchema.shape,
  ...orderProductsSchema.shape,
  ...orderServicesSchema.shape,
  ...invoiceCostSchema.shape,
  ...paymentInstructionsSchema.shape,
  ...paymentStatusSchema.shape,
  ...invoiceNotesSchema.shape,
  invoiceNumber: z.string().min(4, "Invalid Invoice Number"),
});

// Optional Type
export type InvoiceFormData = z.infer<typeof invoiceFullSchema>;
