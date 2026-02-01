"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useCctvPackage } from "../../../hooks/use-cctvpackage";
import { AddCctvPackageBtn } from "./add-cctvpackage-btn";
import { CctvPackageForm } from "./cctv-package-form";
import DashboardCctvPackageList from "./cctvpackage-list";
import DashBoardCctvPackageFilter from "./filter-cctvpackage";

export function CctvPackageClient() {
  const queryClient = useQueryClient();
  const { searchParams, setParam } = useUrlParams();
  const editId = searchParams.get("editPackage");
  const limit = 20;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const isAvailable = searchParams.get("isAvailable");

  const { cctvPackages, pagination, isLoading, isError, error } =
    useCctvPackage({
      page,
      limit,
      search,
      isAvailable,
    });

  const editItem = useMemo(
    () => cctvPackages.find((p) => p.id === editId),
    [cctvPackages, editId],
  );

  const isOpen = Boolean(editId && editItem);

  const handleEdit = (id: string) => {
    setParam("editPackage", id);
  };

  const handleClose = () => {
    setParam("editPackage", null);
  };

  const handleSuccess = () => {
    handleClose();
    queryClient.invalidateQueries({ queryKey: ["cctv-packages"] });
  };

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-bold text-2xl ">Manage CCTV Package</h1>
        <AddCctvPackageBtn
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["cctv-packages"] });
          }}
          className="text-right"
        />
      </div>

      <DashBoardCctvPackageFilter
        isAvailable={isAvailable || "all"}
        onAvailableChange={(val) => setParam("isAvailable", val)}
        onSearch={(val) => setParam("search", val)}
        searchValue={search || ""}
      />
      <DashboardCctvPackageList
        className="mt-6"
        isLoading={isLoading}
        isDeleting={false}
        onDelete={() => {}}
        onEdit={handleEdit}
        isError={isError}
        error={error}
        cctvPackages={cctvPackages}
      />
      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />

      <AddEditPanel
        title="Edit CCTV Package"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <CctvPackageForm
          item={editItem}
          onSuccess={handleSuccess}
          onCloseForm={handleClose}
        />
      </AddEditPanel>
    </div>
  );
}
