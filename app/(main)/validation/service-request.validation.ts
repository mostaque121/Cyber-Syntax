import z from "zod";

export const serviceRequestFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,}$/, "Please enter a valid phone number"),
  problem: z
    .string()
    .min(10, "Problem description must be at least 10 characters"),
  serviceType: z.enum([
    "IT_SUPPORT",
    "CCTV_SOLUTION",
    "NETWORKING_SOLUTION",
    "SOFTWARE_DEVELOPMENT",
  ]),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestFormSchema>;
