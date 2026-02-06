"use server";

import { auth } from "@/lib/auth";
import { createUniqueId } from "@/lib/generate-unique-id";
import { prisma } from "@/lib/prisma";
import { ServiceType } from "@/prisma/generated/prisma";
import { headers } from "next/headers";
import {
  ServiceRequestFormData,
  serviceRequestFormSchema,
} from "../validation/service-request.validation";

export async function createServiceRequest(formData: ServiceRequestFormData) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Validate form data
    const parsed = serviceRequestFormSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: "Invalid form data",
      };
    }

    const userId = session?.user?.id || null;
    const orderId = createUniqueId("ORD");

    // Create order in the database
    // The problem description is saved as the service name
    await prisma.order.create({
      data: {
        orderType: "SERVICE",
        orderId,
        userId,
        customerName: parsed.data.name,
        emailAddress: parsed.data.email,
        phoneNumber: parsed.data.phone,
        fullAddress: "", // Not collected in this form
        serviceOrders: {
          create: {
            serviceType: parsed.data.serviceType as ServiceType,
            name: parsed.data.problem, // Problem description saved as service name
          },
        },
      },
    });

    return {
      success: true,
      message: "Service request submitted successfully.",
    };
  } catch (error) {
    console.error("Service request creation failed:", error);
    return {
      success: false,
      error: "Something went wrong while submitting your request.",
    };
  }
}
