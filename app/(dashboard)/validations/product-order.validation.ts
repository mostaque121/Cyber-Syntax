import z from "zod";

export const productOrderCostSchema = z.object({
  productCost: z.number().min(0, "Shipping cost cannot be negative"),
  transportCost: z.number().min(0, "Discount cannot be negative"),
});
export type ProductOrderCostFormData = z.infer<typeof productOrderCostSchema>;
