"use client";

import { OrderWithMappedDocuments } from "@/app/(dashboard)/types/order.types";
import { DocumentType } from "@/prisma/generated/prisma";
import { EditSectionType } from "../../page";
import { CostManagement } from "./cost-management";
import { CustomerInfo } from "./customer-info";
import { OrderActions } from "./order-actions";
import { OrderDocuments } from "./order-documents";
import { OrderHeader } from "./order-header";
import { OrderProducts } from "./order-products";
import { OrderServices } from "./order-services";
import { OrderSummary } from "./order-summary";
import { PaymentHistory } from "./payment-history";

interface SectionProps {
  order: OrderWithMappedDocuments;
  openEdit: (sec: EditSectionType) => void;
  openEditProduct: (id: string) => void;
  openEditService: (id: string) => void;
  openEditPayment: (id: string) => void;
  onGenerateDoc: (type: DocumentType) => void;
  onEditDoc: (type: DocumentType) => void;
  onDeleteDoc: (id: string, type: DocumentType) => void;
  onSuccess: () => void;
  onViewDoc?: (type: DocumentType) => void;
  deletingDoc: (type: DocumentType) => void;
}
export default function OrderInfo({
  order,
  openEdit,
  onEditDoc,
  onDeleteDoc,
  openEditProduct,
  openEditService,
  openEditPayment,
  onGenerateDoc,
  onSuccess,
  onViewDoc,
  deletingDoc,
}: SectionProps) {
  return (
    <div className="mx-auto container px-4 py-8 md:px-8">
      <OrderHeader order={order} />

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Main Content - Takes 8 columns */}
        <div className="space-y-6 w-full lg:col-span-8">
          <OrderProducts
            onEdit={openEditProduct}
            onAdd={() => openEdit("add-products")}
            products={order.productOrders}
          />
          <OrderServices
            onEdit={openEditService}
            onAdd={() => openEdit("add-services")}
            services={order.serviceOrders}
          />

          <PaymentHistory
            data={order}
            onEdit={openEditPayment}
            onAdd={() => openEdit("add-payments")}
          />
          <OrderDocuments
            onGenerate={onGenerateDoc}
            onEdit={onEditDoc}
            onDelete={onDeleteDoc}
            documents={order.mappedDocuments}
            onView={onViewDoc ?? undefined}
            deleting={deletingDoc}
          />
        </div>

        {/* Sidebar - Takes 4 columns */}
        <div className="space-y-6 lg:col-span-4">
          <CustomerInfo
            onEditClick={() => openEdit("edit-customerInfo")}
            order={order}
          />

          <OrderSummary
            onEditClick={() => openEdit("edit-orderSummary")}
            order={order}
          />

          <CostManagement
            order={order}
            onEditClick={() => openEdit("edit-orderCost")}
          />
          <OrderActions onSuccess={onSuccess} order={order} />
        </div>
      </div>
    </div>
  );
}
