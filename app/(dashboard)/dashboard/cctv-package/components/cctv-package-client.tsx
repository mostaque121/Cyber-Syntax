"use client";

import { DrawerForm } from "@/components/custom-ui/form-drawer";
import PaginationControl from "@/components/custom-ui/pagination-control";
import { useUrlParams } from "@/hooks/use-url-params";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useCctvPackage } from "../../../hooks/use-cctvpackage";
import { AddCctvPackageBtn } from "./add-cctvpackage-btn";
import { CctvPackageForm } from "./cctv-package-form";
import DashboardCctvPackageList from "./cctvpackage-list";
import DashBoardCctvPackageFilter from "./filter-cctvpackage";

export function CctvPackageClient() {
  const queryClient = useQueryClient();
  const { searchParams, setParam } = useUrlParams();
  const [editId, setEditId] = useState<string | null>(null);
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
  const isDrawerOpen = Boolean(editId && editItem);
  const setDrawerOpen = (open: boolean) => {
    if (!open) {
      setEditId(null);
    }
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
        onEdit={(id) => setEditId(id)}
        isError={isError}
        error={error}
        cctvPackages={cctvPackages}
      />
      <PaginationControl
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(page) => setParam("page", page.toString())}
      />

      <DrawerForm
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
        FormComponent={CctvPackageForm}
        item={editItem}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["cctv-packages"] });
        }}
      />
    </div>
  );
}
