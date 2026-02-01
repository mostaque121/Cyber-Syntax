import {
  OrderCustomerInfo,
  OrderSummaryEditType,
  OrderWithAllRelation,
} from "@/app/(dashboard)/types/order.types";
import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import { Payment, ProductOrder, ServiceOrder } from "@/prisma/generated/prisma";
import { EditSectionType } from "../order-details-client";
import AddPayment from "./add-payments";
import AddProducts from "./add-products";
import AddServices from "./add-services";
import EditProductOrderCostManagement from "./edit-cost-management";
import EditProductOrderCustomer from "./edit-customer-info";
import EditPayment from "./edit-payments";
import EditProduct from "./edit-products";
import EditService from "./edit-service";
import EditOrderSummary from "./edit-summary";
interface OrderEditFormProps {
  section: EditSectionType;
  editingProduct: ProductOrder | null;
  editingService: ServiceOrder | null;
  editingPayment: Payment | null;
  itemData: OrderWithAllRelation;
  onClose: () => void;
  onSuccess: () => void;
  drawerOpen: boolean;
  onDrawerOpenChange: (open: boolean) => void;
}

export default function ProductOrderEditForm({
  section,
  itemData,
  onClose,
  onSuccess,
  editingProduct,
  editingService,
  editingPayment,
  drawerOpen,
  onDrawerOpenChange,
}: OrderEditFormProps) {
  const orderSummary: OrderSummaryEditType = {
    discount: itemData.discount,
    shippingCost: itemData.shippingCost,
    productTax: itemData.productTax,
    serviceTax: itemData.serviceTax,
  };
  const orderCost = {
    productCost: itemData.productCost,
    transportCost: itemData.transportCost,
    serviceCost: itemData.serviceCost,
  };
  const customer: OrderCustomerInfo = {
    customerName: itemData.customerName,
    companyName: itemData.companyName,
    emailAddress: itemData.emailAddress,
    phoneNumber: itemData.phoneNumber,
    whatsappNumber: itemData.whatsappNumber,
    fullAddress: itemData.fullAddress,
  };
  const drawerTitleMap: Record<Exclude<EditSectionType, null>, string> = {
    "add-products": "Add Products",
    "edit-product": "Edit Product",
    "add-services": "Add Services",
    "edit-service": "Edit Service",
    "add-payments": "Add Payments",
    "edit-payment": "Edit Payment",
    "edit-productList": "Edit Product",
    "edit-orderSummary": "Edit Order Summary",
    "edit-orderCost": "Edit Order Cost",
    "edit-customerInfo": "Edit Customer Info",
  };
  return (
    <AddEditPanel
      title={section ? drawerTitleMap[section] : "Edit"}
      isOpen={drawerOpen}
      onClose={() => onDrawerOpenChange(false)}
      maxWidth="800px"
      disableOutsideClick={false}
      disableEscapeKey={false}
    >
      {/* Guard against section being null to ensure form has context */}
      {section && (
        <div className="space-y-4">
          {section === "add-products" && (
            <AddProducts
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-product" && editingProduct && (
            <EditProduct
              initialItem={editingProduct}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "add-services" && (
            <AddServices
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-service" && editingService && (
            <EditService
              initialItem={editingService}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "add-payments" && (
            <AddPayment
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-payment" && editingPayment && (
            <EditPayment
              initialData={editingPayment}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-orderSummary" && (
            <EditOrderSummary
              orderSummary={orderSummary}
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-orderCost" && (
            <EditProductOrderCostManagement
              orderCost={orderCost}
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
          {section === "edit-customerInfo" && (
            <EditProductOrderCustomer
              customer={customer}
              orderId={itemData.orderId}
              onSuccess={onSuccess}
              onCloseForm={onClose}
            />
          )}
        </div>
      )}
    </AddEditPanel>
  );
}
