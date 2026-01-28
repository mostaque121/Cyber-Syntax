"use server";

import { prisma } from "@/lib/prisma";
import { PaymentFormData } from "../validations/order.validation";

interface AddPaymentParams {
  orderId: string;
  data: PaymentFormData;
}

export async function addPaymentToOrder({ orderId, data }: AddPaymentParams) {
  try {
    await prisma.payment.create({
      data: {
        orderId,
        amount: data.amount,
        method: data.method,
        note: data.note ?? null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error: "Failed to add payment" };
  }
}

interface EditPaymentParams {
  paymentId: string;
  data: PaymentFormData;
}

export async function editPaymentOnOrder({
  paymentId,
  data,
}: EditPaymentParams) {
  try {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        amount: data.amount,
        method: data.method,
        note: data.note ?? null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error editing payment:", error);
    return { success: false, error: "Failed to edit payment" };
  }
}
export async function deletePayment({ paymentId }: { paymentId: string }) {
  try {
    await prisma.payment.delete({
      where: { id: paymentId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error delete payment:", error);
    return { success: false, error: "Failed to delete payment" };
  }
}
