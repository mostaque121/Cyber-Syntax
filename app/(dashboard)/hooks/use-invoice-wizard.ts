"use client";

import {
  billingFromSchema,
  billingToSchema,
  invoiceCostSchema,
  invoiceDateSchema,
  InvoiceFormData,
  invoiceFullSchema,
  invoiceNotesSchema,
  orderProductsSchema,
  orderServicesSchema,
  paymentInstructionsSchema,
  paymentStatusSchema,
} from "@/app/(dashboard)/validations/invoice.validation";
import { createUniqueId } from "@/lib/generate-unique-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createDocuments, updateDocument } from "../actions/documents.actions";
import { Invoice } from "../types/documents.types";

export const invoiceTabs = [
  { id: "date", label: "Invoice Date", schema: invoiceDateSchema },
  { id: "billingFrom", label: "Billing From", schema: billingFromSchema },
  { id: "billingTo", label: "Billing To", schema: billingToSchema },
  { id: "products", label: "Products", schema: orderProductsSchema },
  { id: "services", label: "Services", schema: orderServicesSchema },
  { id: "costs", label: "Costs & Taxes", schema: invoiceCostSchema },
  {
    id: "paymentInstructions",
    label: "Payment Instructions",
    schema: paymentInstructionsSchema,
  },
  { id: "paymentStatus", label: "Payment Status", schema: paymentStatusSchema },
  { id: "notes", label: "Notes & Send Email", schema: invoiceNotesSchema },
];

export function useInvoiceWizard({
  initialData,
  onSuccess,
}: {
  initialData?: Invoice;
  onSuccess?: () => void;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [sendEmail, setSendEmail] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<boolean[]>(
    Array(invoiceTabs.length).fill(false)
  );

  const currentTab = invoiceTabs[currentTabIndex];

  // -----------------------------
  // ✅ Form hook always runs safely
  // -----------------------------
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFullSchema),
    mode: "onBlur",
    defaultValues: {
      invoiceNumber: initialData?.invoiceNumber || createUniqueId("INV"),
      issuedDate: initialData?.issuedDate
        ? new Date(initialData.issuedDate)
        : new Date(),

      dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : undefined,

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

      paymentInstructions: initialData?.paymentInstructions || {
        bankDetails: undefined,
        mobilePayments: [],
        notes: "",
      },

      paymentStatus: initialData?.paymentStatus || "UNPAID",
      paidAmount: initialData?.paidAmount ?? 0,

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
    ) as (keyof InvoiceFormData)[];
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

    if (currentTabIndex < invoiceTabs.length - 1) {
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

    if (index >= 0 && index < invoiceTabs.length) {
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
      data: InvoiceFormData;
      isEditMode: boolean;
      docId?: string;
    }) => {
      if (isEditMode) {
        if (!docId) throw new Error("Missing docId for update");

        return await updateDocument({
          docId,
          doc: data,
          docType: "INVOICE",
        });
      }

      return await createDocuments({
        orderId,
        doc: data,
        docType: "INVOICE",
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
    totalTabs: invoiceTabs.length,

    handleNext,
    handlePrevious,
    jumpToStep,

    mutation,

    sendEmail,
    setSendEmail,
  };
}
