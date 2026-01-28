"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(/^\+?[0-9]{10,}$/, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function createContactSubmission(formData: ContactFormData) {
  try {
    // Validate form data
    const parsed = contactFormSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: "Invalid form data",
      };
    }

    // Create contact submission in the database
    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        category: parsed.data.category,
        message: parsed.data.message,
      },
    });

    return {
      success: true,
      message: "Contact submission created successfully",
    };
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return {
      success: false,
      error: "Failed to submit contact form. Please try again.",
    };
  }
}
