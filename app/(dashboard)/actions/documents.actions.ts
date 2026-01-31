"use server";

import { auth } from "@/lib/auth";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { DocumentType } from "@/prisma/generated/prisma";
import { headers } from "next/headers";
import { InvoiceFormData } from "../validations/invoice.validation";
import { QuotationFormData } from "../validations/quotation.validation";
import { ReceiptFormData } from "../validations/receipt.validation";

export async function createDocuments({
  orderId,
  doc,
  docType,
}: {
  orderId: string;
  doc: InvoiceFormData | QuotationFormData | ReceiptFormData;
  docType: DocumentType;
}) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    await prisma.orderDocument.create({
      data: {
        data: doc,
        type: docType,
        orderId,
        issuedByUserId: session.user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error editing summary to order:", error);
    return { success: false, error: "Failed to edit summary" };
  }
}
export async function updateDocument({
  docId,
  doc,
  docType,
}: {
  docId: string;
  doc: InvoiceFormData | QuotationFormData | ReceiptFormData;
  docType: DocumentType;
}) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    await prisma.orderDocument.update({
      where: {
        id: docId,
        type: docType,
      },
      data: {
        data: doc,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error editing summary to order:", error);
    return { success: false, error: "Failed to edit summary" };
  }
}
export async function deleteDocument({ docId }: { docId: string }) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    await prisma.orderDocument.delete({
      where: {
        id: docId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error delete order document", error);
    return { success: false, error: "Failed to delete document" };
  }
}
