import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Passward is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    email: z.email("Invalid email address"),
    name: z.string("Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export const profileSchema = z.object({
  companyName: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .optional(),
  whatsappNumber: z.string().optional(),
  fullAddress: z.string().optional(),
});
export type ProfileFormData = z.infer<typeof profileSchema>;
