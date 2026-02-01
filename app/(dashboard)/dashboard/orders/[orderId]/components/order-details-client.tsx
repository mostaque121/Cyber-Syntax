"use client";

import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";

// UI Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Feature Components
import ProductOrderEditForm from "./edit-form";

// Actions
import { deleteDocument } from "@/app/(dashboard)/actions/documents.actions";
import { useOrderById } from "@/app/(dashboard)/hooks/use-order";
import {
  Invoice,
  Quotation,
  Receipt,
} from "@/app/(dashboard)/types/documents.types";
import { useUrlParams } from "@/hooks/use-url-params";
import {
  DocumentType,
  Payment,
  ProductOrder,
  ServiceOrder,
} from "@/prisma/generated/prisma";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import InvoicePreview from "./doc-preview/invoice-preview";
import QuotationPreview from "./doc-preview/quotation-preview";
import ReceiptPreview from "./doc-preview/receipt-preview";
import InvoiceFormWizard from "./invoice-form-wizard";
import OrderInfo from "./order-info";
import QuotationFormWizard from "./quotation-form-wizard";
import ReceiptFormWizard from "./receipt-form-wizard";

export type EditSectionType =
  | "add-products"
  | "edit-product"
  | "add-services"
  | "edit-service"
  | "add-payments"
  | "edit-payment"
  | "edit-productList"
  | "edit-orderSummary"
  | "edit-orderCost"
  | "edit-customerInfo"
  | null;

interface OrderDetailsClientProps {
  orderId: string;
}

export function OrderDetailsClient({ orderId }: OrderDetailsClientProps) {
  const { searchParams, setParam } = useUrlParams();
  const [editingProduct, setEditingProduct] = useState<ProductOrder | null>(
    null,
  );
  const [editingService, setEditingService] = useState<ServiceOrder | null>(
    null,
  );
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [deletingType, setDeletingType] = useState<DocumentType | null>(null);

  const {
    data: order,
    isLoading,
    isError,
    error,
    refetch,
  } = useOrderById(orderId);

  const deleteDoc = useMutation({
    mutationFn: async (docId: string) => {
      if (!docId) throw new Error("Missing docId for delete");
      return await deleteDocument({ docId });
    },

    onSuccess: () => {
      toast.success("Document deleted successfully");
      setDeletingType(null);
      refetch();
    },

    onError: () => {
      toast.error("Failed to delete document");
      setDeletingType(null);
    },
  });

  // 1. Loading State
  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load order details."}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // 3. Not Found State
  if (!order) {
    return notFound();
  }

  const openEdit = (sec: EditSectionType) => {
    setParam("edit", sec);
  };
  const editOpenParam = searchParams.get("edit");

  const openEditProduct = (id: string) => {
    if (!order?.productOrders) return;

    const toEdit = order.productOrders.find((p) => p.id === id);
    if (toEdit) {
      setEditingProduct(toEdit);
      openEdit("edit-product");
    }
  };
  const openEditService = (id: string) => {
    if (!order?.serviceOrders) return;

    const toEdit = order.serviceOrders.find((p) => p.id === id);
    if (toEdit) {
      setEditingService(toEdit);
      openEdit("edit-service");
    }
  };
  const openEditPayment = (id: string) => {
    if (!order?.payments) return;

    const toEdit = order.payments.find((p) => p.id === id);
    if (toEdit) {
      setEditingPayment(toEdit);
      openEdit("edit-payment");
    }
  };
  const closeEdit = () => {
    setParam("edit", null);
  };
  const handleEditSuccess = () => {
    refetch();
    closeEdit();
  };
  const handleViewDoc = (type: DocumentType) => {
    setParam("view-doc", type);
  };
  const docViewParam = searchParams.get("view-doc");
  const handleDeleteDoc = (id: string, type: DocumentType) => {
    setDeletingType(type);
    deleteDoc.mutate(id);
  };
  const handleSuccessDoc = () => {
    refetch();
    setParam("edit-doc", null);
  };
  const handleEditDoc = (docType: DocumentType) => {
    setParam("edit-doc", docType);
  };
  const docEditParam = searchParams.get("edit-doc");

  return (
    <div className="bg-muted/40 min-h-screen">
      <OrderInfo
        onDeleteDoc={handleDeleteDoc}
        openEditPayment={openEditPayment}
        openEditService={openEditService}
        openEditProduct={openEditProduct}
        onEditDoc={handleEditDoc}
        onGenerateDoc={handleEditDoc}
        order={order}
        openEdit={openEdit}
        onSuccess={refetch}
        onViewDoc={handleViewDoc}
        deletingDoc={(type) => deletingType === type}
      />

      <ProductOrderEditForm
        drawerOpen={editOpenParam !== null}
        onDrawerOpenChange={() => closeEdit()}
        editingProduct={editingProduct}
        editingService={editingService}
        editingPayment={editingPayment}
        section={editOpenParam as EditSectionType}
        itemData={order}
        onClose={closeEdit}
        onSuccess={handleEditSuccess}
      />

      <InvoiceFormWizard
        open={docEditParam === "INVOICE"}
        onOpenChange={(open) => !open && setParam("edit-doc", null)}
        onSuccess={handleSuccessDoc}
        order={order}
      />
      <QuotationFormWizard
        open={docEditParam === "QUOTATION"}
        onOpenChange={(open) => !open && setParam("edit-doc", null)}
        onSuccess={handleSuccessDoc}
        order={order}
      />
      <ReceiptFormWizard
        open={docEditParam === "RECEIPT"}
        onOpenChange={(open) => !open && setParam("edit-doc", null)}
        onSuccess={handleSuccessDoc}
        order={order}
      />
      {order.mappedDocuments?.INVOICE && (
        <InvoicePreview
          open={docViewParam === "INVOICE"}
          onOpenChange={(open) => !open && setParam("view-doc", null)}
          invoice={order.mappedDocuments.INVOICE.data as Invoice}
          orderId={order.orderId}
        />
      )}
      {order.mappedDocuments?.QUOTATION && (
        <QuotationPreview
          open={docViewParam === "QUOTATION"}
          onOpenChange={(open) => !open && setParam("view-doc", null)}
          quotation={order.mappedDocuments.QUOTATION.data as Quotation}
          orderId={order.orderId}
        />
      )}
      {order.mappedDocuments?.RECEIPT && (
        <ReceiptPreview
          open={docViewParam === "RECEIPT"}
          onOpenChange={(open) => !open && setParam("view-doc", null)}
          receipt={order.mappedDocuments.RECEIPT.data as Receipt}
          orderId={order.orderId}
        />
      )}
    </div>
  );
}

// --- Sub-component for Loading State ---
function OrderDetailsSkeleton() {
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="mx-auto container px-4 py-8 md:px-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Main Content Skeleton */}
          <div className="space-y-6 w-full lg:col-span-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6 lg:col-span-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-56 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
