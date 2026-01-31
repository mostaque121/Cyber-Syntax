"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

// Profile update schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  fullAddress: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Get current user profile
export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: {
          select: {
            providerId: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update user profile
export async function updateProfile(data: ProfileFormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate data
    const parsed = profileSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid form data" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: parsed.data.name,
        companyName: parsed.data.companyName || null,
        phoneNumber: parsed.data.phoneNumber || null,
        whatsappNumber: parsed.data.whatsappNumber || null,
        fullAddress: parsed.data.fullAddress || null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

// Get user orders
export async function getUserOrders(params: { page?: number; limit?: number }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
        data: [],
        pagination: null,
      };
    }

    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          orderId: true,
          status: true,
          orderType: true,
          createdAt: true,
          productCost: true,
          serviceCost: true,
          shippingCost: true,
          productTax: true,
          serviceTax: true,
          discount: true,
          productOrders: {
            select: { id: true },
          },
          serviceOrders: {
            select: { id: true },
          },
          payments: {
            select: { amount: true },
          },
        },
      }),
      prisma.order.count({ where: { userId: session.user.id } }),
    ]);

    return {
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      success: false,
      error: "Failed to fetch orders",
      data: [],
      pagination: null,
    };
  }
}

// Get single order details
export async function getOrderDetails(orderId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const order = await prisma.order.findFirst({
      where: {
        orderId,
        userId: session.user.id, // Ensure user can only see their own orders
      },
      select: {
        orderId: true,
        status: true,
        createdAt: true,
        customerName: true,
        phoneNumber: true,
        fullAddress: true,
        productCost: true,
        serviceCost: true,
        shippingCost: true,
        productTax: true,
        serviceTax: true,
        discount: true,
        productOrders: {
          select: {
            id: true,
            productName: true,
            productImage: true,
            quantity: true,
            price: true,
            warranty: true,
            serialNumber: true,
            product: {
              select: {
                images: {
                  where: { isFeatured: true },
                  take: 1,
                  select: { url: true },
                },
              },
            },
          },
        },
        serviceOrders: {
          select: {
            id: true,
            name: true,
            serviceType: true,
            price: true,
          },
        },
        payments: {
          orderBy: { date: "desc" },
          select: {
            id: true,
            amount: true,
            method: true,
            date: true,
          },
        },
      },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error: "Failed to fetch order" };
  }
}

// Check if user has password auth (can change password)
export async function hasPasswordAuth() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return false;
    }

    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        providerId: "credential",
      },
    });

    return !!account;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
}
