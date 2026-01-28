import { ProductType } from "@/prisma/generated/prisma";
import z from "zod";
const productImageSchema = z.object({
  id: z.string().optional(),
  imageId: z.string(),
  url: z.url("Invalid image URL"),
  isFeatured: z.boolean(),
  productId: z.string().optional(),
});
export const productSchema = z
  .object({
    title: z
      .string()
      .min(1, "Product title is required")
      .max(255, "Title must be less than 255 characters"),
    inputSlug: z.string().optional(),
    brand: z
      .string()
      .min(1, "Brand is required")
      .max(100, "Brand must be less than 100 characters"),
    productType: z.enum(ProductType, "Please select a valid product type"),

    price: z.number().min(0.01, "Price must be greater than 0"),
    discountPercentage: z
      .number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),
    warranty: z.string().optional(),

    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    additionalData: z
      .array(z.object({ title: z.string(), value: z.string() }))
      .optional(),

    isHotDeal: z.boolean(),
    isAvailable: z.boolean(),
    isFeatured: z.boolean(),

    categoryId: z.string().min(1, "Please select a category"),
    images: z.array(productImageSchema),
  })
  .refine((data) => (data.images?.length || 0) > 0, {
    message: "At least one product image is required",
    path: ["images"],
  })
  .refine((data) => data.images.filter((img) => img.isFeatured).length === 1, {
    message: "Exactly one featured image must be selected",
    path: ["images"],
  });

export type ProductFormData = z.infer<typeof productSchema>;
