"use client";

import { createUniqueId } from "@/lib/generate-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createDocuments, updateDocument } from "../actions/documents.actions";
import { Receipt } from "../types/documents.types";
import { orderServicesSchema } from "../validations/quotation.validation";
import {
  billingFromSchema,
  billingToSchema,
  orderProductsSchema,
  paymentStatusSchema,
  receiptCostSchema,
  receiptDateSchema,
  ReceiptFormData,
  receiptFullSchema,
  receiptNotesSchema,
} from "../validations/receipt.validation";

export const receiptTabs = [
  { id: "date", label: "Receipt Date", schema: receiptDateSchema },
  { id: "billingFrom", label: "Billing From", schema: billingFromSchema },
  { id: "billingTo", label: "Billing To", schema: billingToSchema },
  { id: "products", label: "Products", schema: orderProductsSchema },
  { id: "services", label: "Services", schema: orderServicesSchema },
  { id: "costs", label: "Costs & Taxes", schema: receiptCostSchema },
  { id: "paymentStatus", label: "Payment Status", schema: paymentStatusSchema },
  { id: "notes", label: "Notes & Send Email", schema: receiptNotesSchema },
];

export function useReceiptWizard({
  initialData,
  onSuccess,
}: {
  initialData?: Receipt;
  onSuccess?: () => void;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [sendEmail, setSendEmail] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<boolean[]>(
    Array(receiptTabs.length).fill(false),
  );

  const currentTab = receiptTabs[currentTabIndex];

  // -----------------------------
  // ✅ Form hook always runs safely
  // -----------------------------
  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptFullSchema),
    mode: "onBlur",
    defaultValues: {
      receiptNumber: initialData?.receiptNumber || createUniqueId("BILL"),
      issuedDate: initialData?.issuedDate
        ? new Date(initialData.issuedDate)
        : new Date(),

      paymentDate: initialData?.paymentDate
        ? new Date(initialData.paymentDate)
        : undefined,

      billingFrom: initialData?.billingFrom || {
        companyName: "",
        address: "",
        email: "",
        phone: "",
        website: "",
      },

      billingTo: initialData?.billingTo || {
        customerName: "",
        emailAddress: "",
        phoneNumber: "",
        fullAddress: "",
        companyName: "",
      },

      orderProducts: initialData?.orderProducts || [],
      orderServices: initialData?.orderServices || [],

      shippingCost: initialData?.shippingCost ?? 0,
      productTaxPercentage: initialData?.productTaxPercentage ?? 0,
      serviceTaxPercentage: initialData?.serviceTaxPercentage ?? 0,
      discount: initialData?.discount ?? 0,

      paidAmount: initialData?.paidAmount ?? 0,
      paymentReference: initialData?.paymentReference ?? "",
      paymentMethod: initialData?.paymentMethod ?? undefined,
      notes: initialData?.notes || "",
    },
  });

  // -----------------------------
  // Validation
  // -----------------------------
  const validateCurrentTab = async () => {
    if (!currentTab.schema) return true;

    const fields = Object.keys(
      currentTab.schema.shape,
    ) as (keyof ReceiptFormData)[];
    const isValid = await form.trigger(fields);

    if (isValid) {
      setCompletedTabs((prev) => {
        const updated = [...prev];
        updated[currentTabIndex] = true;
        return updated;
      });
    }

    return isValid;
  };

  // -----------------------------
  // Navigation
  // -----------------------------
  const handleNext = async () => {
    const valid = await validateCurrentTab();
    if (!valid) return;

    if (currentTabIndex < receiptTabs.length - 1) {
      setCurrentTabIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setCurrentTabIndex((i) => i - 1);
    }
  };

  const jumpToStep = async (index: number, validateCurrent = false) => {
    if (validateCurrent) {
      const valid = await validateCurrentTab();
      if (!valid) return;
    }

    if (index >= 0 && index < receiptTabs.length) {
      setCurrentTabIndex(index);
    }
  };

  // -----------------------------
  // Reset Wizard State
  // -----------------------------
  const resetWizard = () => {
    setCurrentTabIndex(0);
    setCompletedTabs(Array(receiptTabs.length).fill(false));
    setSendEmail(false);
    form.reset();
  };

  // -----------------------------
  // Mutations
  // -----------------------------
  const mutation = useMutation({
    mutationFn: async ({
      orderId,
      data,
      isEditMode,
      docId,
    }: {
      orderId: string;
      data: ReceiptFormData;
      isEditMode: boolean;
      docId?: string;
    }) => {
      if (isEditMode) {
        if (!docId) throw new Error("Missing docId for update");

        return await updateDocument({
          docId,
          doc: data,
          docType: "RECEIPT",
        });
      }

      return await createDocuments({
        orderId,
        doc: data,
        docType: "RECEIPT",
      });
    },

    onSuccess: () => {
      toast.success("Receipt saved successfully");
      resetWizard();
      onSuccess?.();
    },
    onError: () => toast.error("Failed to save receipt"),
  });

  // -----------------------------
  // API
  // -----------------------------
  return {
    form,
    currentTab,
    currentTabIndex,
    completedTabs,
    totalTabs: receiptTabs.length,

    handleNext,
    handlePrevious,
    jumpToStep,
    resetWizard,

    mutation,

    sendEmail,
    setSendEmail,
  };
}
