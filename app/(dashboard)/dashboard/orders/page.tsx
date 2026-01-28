"use client";
import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { useOrder } from "../../hooks/use-order";
import { OrderFilter } from "./components/filter";
import DashboardProductOrderList from "./components/order-list";

export default function OrderPage() {
  const { searchParams, setParam } = useUrlParams();
  const limit = 30;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  const { orders, pagination, isLoading, isError, error } = useOrder({
    page,
    limit,
    search,
    status,
  });
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-bold text-2xl ">Manage Order</h1>
      </div>
      <OrderFilter
        status={status || "ALL"}
        onStatusChange={(val) => setParam("status", val)}
        onSearch={(val) => setParam("search", val)}
        searchValue={search || ""}
      />
      <DashboardProductOrderList
        className="mt-6"
        isError={isError}
        error={error}
        isLoading={isLoading}
        orders={orders}
      />

      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />
    </div>
  );
}
