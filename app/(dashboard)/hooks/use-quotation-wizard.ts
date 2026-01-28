"use client";

import { createUniqueId } from "@/lib/generate-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createDocuments, updateDocument } from "../actions/documents.actions";
import { Quotation } from "../types/documents.types";
import {
  billingFromSchema,
  billingToSchema,
  orderProductsSchema,
  orderServicesSchema,
  quotationCostSchema,
  quotationDateSchema,
  QuotationFormData,
  quotationFullSchema,
  quotationNotesSchema,
} from "../validations/quotation.validation";

export const quotationTabs = [
  { id: "date", label: "Quotation Date", schema: quotationDateSchema },
  { id: "billingFrom", label: "Billing From", schema: billingFromSchema },
  { id: "billingTo", label: "Billing To", schema: billingToSchema },
  { id: "products", label: "Products", schema: orderProductsSchema },
  { id: "services", label: "Services", schema: orderServicesSchema },
  { id: "costs", label: "Costs & Taxes", schema: quotationCostSchema },
  { id: "notes", label: "Notes & Send Email", schema: quotationNotesSchema },
];

export function useQuotationWizard({
  initialData,
  onSuccess,
}: {
  initialData?: Quotation;
  onSuccess?: () => void;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [sendEmail, setSendEmail] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<boolean[]>(
    Array(quotationTabs.length).fill(false)
  );

  const currentTab = quotationTabs[currentTabIndex];

  // -----------------------------
  // ✅ Form hook always runs safely
  // -----------------------------
  const form = useForm<QuotationFormData>({
    resolver: zodResolver(quotationFullSchema),
    mode: "onBlur",
    defaultValues: {
      quotationNumber: initialData?.quotationNumber || createUniqueId("QUO"),
      issuedDate: initialData?.issuedDate
        ? new Date(initialData.issuedDate)
        : new Date(),

      validUntil: initialData?.validUntil
        ? new Date(initialData.validUntil)
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
      notes: initialData?.notes || "",
    },
  });

  // -----------------------------
  // Validation
  // -----------------------------
  const validateCurrentTab = async () => {
    if (!currentTab.schema) return true;

    const fields = Object.keys(
      currentTab.schema.shape
    ) as (keyof QuotationFormData)[];
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

    if (currentTabIndex < quotationTabs.length - 1) {
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

    if (index >= 0 && index < quotationTabs.length) {
      setCurrentTabIndex(index);
    }
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
      data: QuotationFormData;
      isEditMode: boolean;
      docId?: string;
    }) => {
      if (isEditMode) {
        if (!docId) throw new Error("Missing docId for update");

        return await updateDocument({
          docId,
          doc: data,
          docType: "QUOTATION",
        });
      }

      return await createDocuments({
        orderId,
        doc: data,
        docType: "QUOTATION",
      });
    },

    onSuccess: () => {
      toast.success("Invoice saved successfully");
      onSuccess?.();
    },
    onError: () => toast.error("Failed to save invoice"),
  });

  // -----------------------------
  // API
  // -----------------------------
  return {
    form,
    currentTab,
    currentTabIndex,
    completedTabs,
    totalTabs: quotationTabs.length,

    handleNext,
    handlePrevious,
    jumpToStep,

    mutation,

    sendEmail,
    setSendEmail,
  };
}
