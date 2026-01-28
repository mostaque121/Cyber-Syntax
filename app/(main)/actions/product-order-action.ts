"use server";

import { auth } from "@/lib/auth";
import { createUniqueId } from "@/lib/generate-unique-id";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// 1. DEFINING THE TYPES
export type CreateOrderResult =
  | { success: false; type: "EMPTY_CART"; error: string }
  | {
      success: false;
      type: "UNAVAILABLE";
      error: string;
      missingProducts: string[];
    }
  | {
      success: false;
      type: "PRICE_UPDATED";
      error: string;
      updates: {
        productId: string;
        name: string;
        oldPrice: number;
        newPrice: number;
      }[];
    }
  | { success: false; type: "SERVER_ERROR"; error: string }
  | { success: true; type: "ORDER_CREATED"; orderId: string; message: string };

type ProductOrderProps = {
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    whatsappNumber?: string;
    companyName?: string;
    fullAddress: string;
    isInsideDhaka: "inside" | "outside";
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
};

// 2. APPLYING THE RETURN TYPE PROMISE<CreateOrderResult>
export async function createProductOrder({
  formData,
  items,
}: ProductOrderProps): Promise<CreateOrderResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!items || items.length === 0) {
    return { success: false, type: "EMPTY_CART", error: "Your cart is empty." };
  }

  try {
    const productIds = items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: true },
    });

    // --- CHECK UNAVAILABLE ---
    if (dbProducts.length !== items.length) {
      const dbIds = dbProducts.map((p) => p.id);
      const missingIds = productIds.filter((id) => !dbIds.includes(id));

      return {
        success: false,
        type: "UNAVAILABLE",
        error: "Some items in your cart are no longer available.",
        missingProducts: missingIds, // TypeScript now knows this is required here
      };
    }

    // --- CHECK PRICES ---
    const priceUpdates: {
      productId: string;
      name: string;
      oldPrice: number;
      newPrice: number;
    }[] = [];

    const serviceProducts = items.map((item) => {
      const dbProduct = dbProducts.find((p) => p.id === item.productId)!;
      const effectivePrice =
        dbProduct.price * (1 - (dbProduct.discountPercentage ?? 0) / 100);

      if (item.price !== effectivePrice) {
        priceUpdates.push({
          productId: item.productId,
          name: dbProduct.title,
          oldPrice: item.price,
          newPrice: effectivePrice,
        });
      }

      return {
        productId: dbProduct.id,
        name: dbProduct.title,
        price: effectivePrice,
        qty: item.quantity,
        total: effectivePrice * item.quantity,
        warranty: dbProduct.warranty ?? undefined,
        image:
          dbProduct.images.find((img) => img.isFeatured)?.url ||
          dbProduct.images[0]?.url,
        brand: dbProduct.brand,
      };
    });

    if (priceUpdates.length > 0) {
      return {
        success: false,
        type: "PRICE_UPDATED",
        updates: priceUpdates, // TypeScript knows this belongs here
        error: "Product prices have changed. Please review.",
      };
    }

    // --- CREATE ORDER ---
    const shippingCost = formData.isInsideDhaka === "inside" ? 50 : 100;
    const orderId = createUniqueId("ORD");

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderType: "PRODUCT",
          userId: userId || null,
          orderId,
          customerName: formData.fullName,
          emailAddress: formData.email,
          phoneNumber: formData.phoneNumber,
          whatsappNumber: formData.whatsappNumber || null,
          companyName: formData.companyName || null,
          fullAddress: formData.fullAddress,
          shippingCost,
          status: "PENDING",
          discount: 0,
        },
      });

      await Promise.all(
        serviceProducts.map((item) =>
          tx.productOrder.create({
            data: {
              orderId: order.orderId,
              productId: item.productId,
              price: item.price,
              quantity: item.qty,
              productImage: item.image,
              productName: item.name,
              warranty: item.warranty,
            },
          })
        )
      );
    });

    return {
      success: true,
      type: "ORDER_CREATED",
      orderId: orderId,
      message: "Order placed successfully.",
    };
  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      type: "SERVER_ERROR",
      error: "Something went wrong while creating your order.",
    };
  }
}
/* 
export type ProductOrderWithDetails = {
  productId: string;
  price: number;
  quantity: number;
  product: {
    title: string;
    image: string | null;
    warranty: string | null;
  };
};

export type OrderWithProducts = {
  orderId: string;
  customerName: string;
  emailAddress: string;
  phoneNumber: string;
  whatsappNumber: string | null;
  companyName: string | null;
  fullAddress: string;
  shippingCost: number;
  totalAmount: number;
  discount: number;
  productsList: any;
  status: string;
  createdAt: Date;
  productOrders: ProductOrderWithDetails[];
};

/**
 * Fetch all product orders for the logged-in user
 */

/* export async function getAllUserProductOrders(page = 1, limit = 10) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, data: null, error: "User not logged in" };
    }

    const skip = (page - 1) * limit;

    // Total orders count for pagination
    const totalOrders = await prisma.order.count({ where: { userId } });

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        orderId: true,
        customerName: true,
        emailAddress: true,
        phoneNumber: true,
        whatsappNumber: true,
        companyName: true,
        fullAddress: true,
        shippingCost: true,
        totalAmount: true,
        discount: true,
        productsList: true,
        status: true,
        createdAt: true,
        productOrders: {
          select: {
            productId: true,
            price: true,
            quantity: true,
            product: {
              select: {
                title: true,
                images: true,
                warranty: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total: totalOrders,
          totalPages: Math.ceil(totalOrders / limit),
        },
      },
      error: null,
    };
  } catch (err) {
    console.error("Failed to fetch user product orders", err);
    return { success: false, data: null, error: "Failed to fetch orders" };
  }
} */

/**
 * Fetch a single product order by orderId
 */
/* export async function getUserProductOrderById(orderId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, data: null, error: "User not logged in" };
    }

    const order = await prisma.order.findUnique({
      where: { orderId },
      select: {
        orderId: true,
        customerName: true,
        emailAddress: true,
        phoneNumber: true,
        whatsappNumber: true,
        companyName: true,
        fullAddress: true,
        shippingCost: true,
        totalAmount: true,
        discount: true,
        productsList: true,
        status: true,
        createdAt: true,
        productOrders: {
          select: {
            productId: true,
            price: true,
            quantity: true,
            product: {
              select: {
                title: true,
                images: true,
                warranty: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return { success: false, data: null, error: "Order not found" };
    }

    return { success: true, data: order, error: null };
  } catch (err) {
    console.error("Failed to fetch user product order", err);
    return { success: false, data: null, error: "Failed to fetch order" };
  }
} */

/* export async function getUserProductOrders(page = 1, limit = 10) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const skip = (page - 1) * limit;

  try {
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          orderId: true,
          status: true,
          totalAmount: true,
          shippingCost: true,
          discount: true,
          createdAt: true,
          productOrders: {
            select: {
              id: true,
              orderId: true,
              productId: true,
              quantity: true,
              price: true,
              warranty: true,
              productName: true,
              productImage: true,
              productBrand: true,
              product: {
                select: {
                  isAvailable: true,
                  link: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return {
      orders,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch orders");
  }
}  */
