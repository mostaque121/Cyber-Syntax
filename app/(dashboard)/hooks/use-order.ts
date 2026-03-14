import { DocumentType } from "@/prisma/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderById, fetchOrders } from "../actions/order.actions";
import {
  Document,
  Invoice,
  Quotation,
  Receipt,
} from "../types/documents.types";

export function useOrder(params: {
  page?: string | null;
  limit?: number;
  search?: string | null;
  status?: string | null;
}) {
  const pageNumber = params.page ? Number(params.page) : 1;
  const status = (() => {
    const val = params.status;
    if (
      val === "ALL" ||
      val === "PENDING" ||
      val === "CONFIRMED" ||
      val === "PROCESSING" ||
      val === "SHIPPED" ||
      val === "DELIVERED" ||
      val === "CANCELLED" ||
      val === "RETURNED"
    )
      return val;
    return "ALL";
  })();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", pageNumber, params.search, params.status],
    queryFn: () =>
      fetchOrders({
        page: pageNumber,
        limit: params.limit,
        search: params.search || "",
        statusFilter: status,
      }),
    placeholderData: (prev) => prev,
  });

  return {
    orders: data?.orders ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
  };
}

export function useOrderById(orderId: string) {
  return useQuery({
    queryKey: ["productOrderById", orderId],
    queryFn: () => fetchOrderById(orderId),
    retry: 1,

    select: (order) => {
      if (!order) return undefined;

      const orderProductLookup = new Map(
        order.productOrders.map((product) => [
          `${product.productName}::${product.serialNumber}`,
          product,
        ]),
      );

      const hydrateOrderProducts = (
        orderProducts:
          | Invoice["orderProducts"]
          | Quotation["orderProducts"]
          | Receipt["orderProducts"]
          | undefined,
      ) => {
        const source =
          orderProducts && orderProducts.length > 0
            ? orderProducts
            : order.productOrders;

        return source.map((item, itemIndex) => {
          const matched =
            orderProductLookup.get(
              `${item.productName}::${item.serialNumber}`,
            ) ?? order.productOrders[itemIndex];

          return {
            ...item,
            unit: item.unit ?? matched?.unit ?? null,
            index: item.index ?? matched?.index ?? itemIndex + 1,
          };
        });
      };

      const mappedDocs: Partial<Record<DocumentType, Document>> = {
        QUOTATION: undefined,
        INVOICE: undefined,
        RECEIPT: undefined,
      };

      order.documents?.forEach((doc) => {
        const type = doc.type as DocumentType;
        let data: Invoice | Quotation | Receipt;

        switch (type) {
          case "INVOICE":
            data = doc.data as unknown as Invoice;
            break;
          case "QUOTATION":
            data = doc.data as unknown as Quotation;
            break;
          case "RECEIPT":
            data = doc.data as unknown as Receipt;
            break;
        }

        const hydratedData = {
          ...data,
          orderProducts: hydrateOrderProducts(data.orderProducts),
        } as Invoice | Quotation | Receipt;

        mappedDocs[type] = {
          type,
          id: doc.id,
          orderId: doc.orderId,
          data: hydratedData,
          issuedBy: {
            id: doc.issuedBy.id,
            name: doc.issuedBy.name,
          },
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        };
      });
      console.log(
        "order.productOrders",
        order.productOrders?.map((product) => ({
          id: product.id,
          productName: product.productName,
          unit: product.unit,
          index: product.index,
        })),
      );
      return {
        ...order,
        mappedDocuments: mappedDocs,
      };
    },
  });
}
