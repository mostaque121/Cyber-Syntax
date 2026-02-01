"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import { deleteProduct } from "../../../actions/product-actions";
import { useProducts } from "../../../hooks/use-product";
import { AddProductBtn } from "./add-product-btn";
import DashBoardProductFilter from "./filter-product";
import { ProductForm } from "./product-form";
import DashboardProductList from "./product-list";

export function ProductClient() {
  const { searchParams, setParam } = useUrlParams();
  const editId = searchParams.get("editProduct");
  const limit = 20;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const filter = searchParams.get("filter");

  const { products, pagination, isLoading, isError, error, refetch } =
    useProducts({
      page,
      limit,
      search,
      filter,
    });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      refetch();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete product");
    },
  });

  const editItem = useMemo(
    () => products.find((p) => p.id === editId),
    [products, editId],
  );

  const isOpen = Boolean(editId && editItem);

  const handleEdit = (id: string) => {
    setParam("editProduct", id);
  };

  const handleClose = () => {
    setParam("editProduct", null);
  };

  const handleSuccess = () => {
    handleClose();
    refetch();
  };

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-bold text-2xl ">Manage Product</h1>
        <AddProductBtn onSuccess={refetch} className="text-right" />
      </div>

      <DashBoardProductFilter
        filter={filter || "all"}
        onFilterChange={(val) => setParam("filter", val)}
        onSearch={(val) => setParam("search", val)}
        searchValue={search || ""}
      />
      <DashboardProductList
        className="mt-6"
        isLoading={isLoading}
        isDeleting={deleteMutation.isPending}
        onDelete={deleteMutation.mutate}
        onEdit={handleEdit}
        isError={isError}
        error={error}
        products={products}
      />
      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />

      <AddEditPanel
        title="Edit Product"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <ProductForm
          item={editItem}
          onSuccess={handleSuccess}
          onCloseForm={handleClose}
        />
      </AddEditPanel>
    </div>
  );
}
