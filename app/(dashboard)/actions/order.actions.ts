"use server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@/prisma/generated/prisma";
import {
  CustomerInfoFormData,
  customerInfoSchema,
  OrderCostFormData,
  orderCostSchema,
  OrderProductFormData,
  OrderProductListFormData,
  OrderServiceFormData,
  OrderServiceListFormData,
  OrderSummaryFormData,
  orderSummarySchema,
} from "../validations/order.validation";

export async function fetchOrders({
  page = 1,
  limit = 10,
  search,
  statusFilter = "ALL",
}: {
  page: number;
  limit?: number;
  search: string;
  statusFilter: OrderStatus | "ALL";
}) {
  const skip = (page - 1) * limit;
  let whereClause: Prisma.OrderWhereInput = {};

  // Status filter
  if (statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  // Search filter
  if (search) {
    const searchCondition = {
      contains: search,
      mode: "insensitive" as Prisma.QueryMode,
    };

    whereClause = {
      ...whereClause,
      OR: [
        { orderId: searchCondition },
        { customerName: searchCondition },
        { emailAddress: searchCondition },
        { phoneNumber: searchCondition },
      ],
    };
  }

  // Fetch orders with their productOrders
  const orders = await prisma.order.findMany({
    where: whereClause,
    skip,
    take: limit,
    include: {
      serviceOrders: true,
      productOrders: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Count total items for pagination
  const totalItems = await prisma.order.count({ where: whereClause });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    orders,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}
export async function fetchOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { orderId },
    include: {
      documents: {
        include: {
          issuedBy: true,
        },
      },
      payments: true,
      serviceOrders: true,
      productOrders: {
        include: {
          product: true,
        },
      },
    },
  });
}
export async function updateOrderCustomerInfo(
  orderId: string,
  customer: CustomerInfoFormData
) {
  try {
    const parsed = customerInfoSchema.safeParse(customer);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues,
      };
    }
    await prisma.order.update({
      where: { orderId },
      data: customer,
    });
    return { success: true };
  } catch (error) {
    console.error("Error editing customer:", error);
    return { success: false, error: "Failed to edit customer" };
  }
}
export async function updateOrderSummary(
  orderId: string,
  orderSummary: OrderSummaryFormData
) {
  try {
    const parsed = orderSummarySchema.safeParse(orderSummary);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues,
      };
    }
    await prisma.order.update({
      where: { orderId },
      data: {
        shippingCost: orderSummary.shippingCost,
        discount: orderSummary.discount,
        productTax: orderSummary.productTax,
        serviceTax: orderSummary.serviceTax,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error editing summary to order:", error);
    return { success: false, error: "Failed to edit summary" };
  }
}
export async function editOrderCost(
  orderId: string,
  orderCost: OrderCostFormData
) {
  try {
    const parsed = orderCostSchema.safeParse(orderCost);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues,
      };
    }
    await prisma.order.update({
      where: { orderId },
      data: orderCost,
    });

    return { success: true };
  } catch (error) {
    console.error("Error editing cost to order:", error);
    return { success: false, error: "Failed to edit cost" };
  }
}
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await prisma.order.update({
    where: { orderId },
    data: { status },
  });

  return { success: true };
}
export async function deleteOrder({ orderId }: { orderId: string }) {
  try {
    await prisma.order.delete({
      where: { orderId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting  order:", error);

    return {
      success: false,
      error: "Failed to delete order",
    };
  }
}

export async function addProductsToOrder({
  orderId,
  items,
}: {
  orderId: string;
  items: OrderProductListFormData;
}) {
  try {
    // Prepare new items
    const productData = items.products.map((p) => ({
      orderId,
      productName: p.productName,
      serialNumber: p.serialNumber,
      quantity: p.quantity,
      price: p.price,
      productId: p.productId ?? null,
      warranty: p.warranty ?? null,
    }));

    // Insert all items
    await prisma.productOrder.createMany({
      data: productData,
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding product to order:", error);
    return { success: false, error: "Failed to add product" };
  }
}
export async function editProductOnOrder({
  productOrderId,
  item,
}: {
  productOrderId: string;
  item: OrderProductFormData;
}) {
  try {
    await prisma.productOrder.update({
      where: { id: productOrderId },
      data: item,
    });
    return { success: true };
  } catch (error) {
    console.error("Error editing product on order:", error);
    return { success: false, error: "Failed to edit product" };
  }
}
export async function deleteProductFromOrder({
  productOrderId,
}: {
  productOrderId: string;
}) {
  try {
    await prisma.productOrder.delete({
      where: { id: productOrderId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting product from order:", error);

    return {
      success: false,
      error: "Failed to delete product",
    };
  }
}

export async function addServicesToOrder({
  orderId,
  items,
}: {
  orderId: string;
  items: OrderServiceListFormData;
}) {
  try {
    // Prepare new items
    const serviceData = items.services.map((p) => ({
      orderId,
      name: p.name,
      serviceType: p.serviceType,
      price: p.price,
    }));

    // Insert all items
    await prisma.serviceOrder.createMany({
      data: serviceData,
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding service to order:", error);
    return { success: false, error: "Failed to add service" };
  }
}
export async function editServiceOnOrder({
  serviceOrderId,
  item,
}: {
  serviceOrderId: string;
  item: OrderServiceFormData;
}) {
  try {
    await prisma.serviceOrder.update({
      where: { id: serviceOrderId },
      data: item,
    });
    return { success: true };
  } catch (error) {
    console.error("Error editing service on order:", error);
    return { success: false, error: "Failed to edit service" };
  }
}
export async function deleteServiceFromOrder({
  serviceOrderId,
}: {
  serviceOrderId: string;
}) {
  try {
    await prisma.serviceOrder.delete({
      where: { id: serviceOrderId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting service from order:", error);

    return {
      success: false,
      error: "Failed to delete service",
    };
  }
}
