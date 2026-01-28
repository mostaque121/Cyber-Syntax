import z from "zod";
const CCTVImageSchema = z.object({
  id: z.string().optional(),
  imageId: z.string(),
  url: z.url("Invalid image URL"),
  isFeatured: z.boolean(),
  cctvId: z.string().optional(),
});
export const cctvPackageSchema = z
  .object({
    title: z
      .string()
      .min(1, "Product title is required")
      .max(255, "Title must be less than 255 characters"),
    inputSlug: z.string().optional(),
    price: z.number().min(0.01, "Price must be greater than 0"),
    discountPercentage: z
      .number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),

    shortDescription: z
      .string()
      .min(1, "Product title is required")
      .max(255, "short description must be less than 255 characters"),
    longDescription: z.string().min(1, "long description is required"),

    isAvailable: z.boolean(),

    images: z.array(CCTVImageSchema),
  })
  .refine((data) => (data.images?.length || 0) > 0, {
    message: "At least one product image is required",
    path: ["images"],
  })
  .refine((data) => data.images.filter((img) => img.isFeatured).length === 1, {
    message: "Exactly one featured image must be selected",
    path: ["images"],
  });

export type CCTVPackageFormData = z.infer<typeof cctvPackageSchema>;
