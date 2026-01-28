import z from "zod";

export const serviceContactFormSchema = z.object({
  fullName: z.string().min(2, "First name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  fullAddress: z.string().min(5, "Address must be at least 5 characters"),
});
export type ServiceContactFormData = z.infer<typeof serviceContactFormSchema>;
