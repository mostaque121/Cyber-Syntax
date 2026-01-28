"use server";

import { auth } from "@/lib/auth";
import { createUniqueId } from "@/lib/generate-unique-id";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@/prisma/generated/prisma";
import { headers } from "next/headers";
import {
  ServiceContactFormData,
  serviceContactFormSchema,
} from "../validation/order-contact-validation";

interface ServiceOrderProps {
  formData: ServiceContactFormData;
  serviceType: ServiceType;
  serviceName?: string;
}

export async function createServiceOrder({
  formData,
  serviceType,
  serviceName,
}: ServiceOrderProps) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Validate form data
    const parsed = serviceContactFormSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: "Invalid form data",
      };
    }

    const userId = session?.user?.id || null;
    const orderId = createUniqueId("ORD");

    // Create order in the database
    await prisma.order.create({
      data: {
        orderType: "SERVICE",
        orderId,
        userId,
        customerName: parsed.data.fullName,
        emailAddress: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,
        companyName: parsed.data.companyName || null,
        fullAddress: parsed.data.fullAddress,
        serviceOrders: {
          create: {
            serviceType,
            name: serviceName || serviceType,
          },
        },
      },
    });

    return {
      success: true,
      message: "Order placed successfully.",
    };
  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      error: "Something went wrong while creating your order.",
    };
  }
}
