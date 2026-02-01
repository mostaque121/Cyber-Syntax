"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import { useUrlParams } from "@/hooks/use-url-params";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getBannerSliders } from "../../../actions/banner-slider";
import { AddBannerBtn } from "./add-banner-btn";
import { BannerSliderForm } from "./banner-slider-form";
import BannersList from "./banners-list";
import BannerSliderFilter from "./filter";

export function BannerSliderClient() {
  const { searchParams, setParam } = useUrlParams();
  const editId = searchParams.get("editBanner");
  const isActiveParam = searchParams.get("isActive");

  const isActive = (() => {
    const val = isActiveParam;
    if (val === "true" || val === "false" || val === "all") return val;
    return "all";
  })();

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["banner-slider", isActive],
    queryFn: () =>
      getBannerSliders({
        isActive,
      }),
    placeholderData: (prev) => prev,
  });

  const editItem = useMemo(
    () => data?.find((p) => p.id === editId),
    [data, editId],
  );

  const isOpen = Boolean(editId && editItem);

  const handleEdit = (id: string) => {
    setParam("editBanner", id);
  };

  const handleClose = () => {
    setParam("editBanner", null);
  };

  return (
    <div className="px-4 md:px-8 py-8 container mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-bold text-2xl ">Manage Banner</h1>
        <AddBannerBtn onSuccess={refetch} className="text-right" />
      </div>
      <BannerSliderFilter
        className="justify-end"
        onActiveChange={(val) => setParam("isActive", val)}
        isActive={isActive}
      />
      <BannersList
        className="mt-6"
        banners={data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onEdit={handleEdit}
      />

      <AddEditPanel
        title="Edit Banner"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <BannerSliderForm
          onSuccess={() => {
            handleClose();
            refetch();
          }}
          item={editItem}
          onOpenChange={handleClose}
        />
      </AddEditPanel>
    </div>
  );
}
