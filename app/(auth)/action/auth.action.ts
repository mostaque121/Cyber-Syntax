"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { ZodError } from "zod";
import { ProfileFormData, profileSchema } from "../validation/auth.validation";

export async function addProfile(email: string, data: ProfileFormData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { data: null, error: "Unauthorized: No active session" };
    }

    if (session.user.email !== email) {
      return { data: null, error: "You can only update your own profile" };
    }

    const validatedData = profileSchema.parse(data);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        companyName: validatedData.companyName ?? undefined,
        fullAddress: validatedData.fullAddress ?? undefined,
        phoneNumber: validatedData.phoneNumber ?? undefined,
        whatsappNumber: validatedData.whatsappNumber ?? undefined,
      },
    });

    return {
      data: { user: updatedUser, message: "Profile updated successfully!" },
      error: null,
    };
  } catch (err: unknown) {
    // Zod validation error
    if (err instanceof ZodError) {
      const firstErrorMessage = err.issues[0]?.message;
      return { data: null, error: firstErrorMessage };
    }

    // Prisma or other known errors
    if (err instanceof Error) {
      return {
        data: null,
        error: err.message || "Failed to update profile. Please try again.",
      };
    }

    // Fallback for unknown errors
    return { data: null, error: "Failed to update profile. Please try again." };
  }
}
