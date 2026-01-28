"use client";
import { DrawerForm } from "@/components/custom-ui/form-drawer";
import { useUrlParams } from "@/hooks/use-url-params";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getBannerSliders } from "../../actions/banner-slider";
import { AddBannerBtn } from "./components/add-banner-btn";
import { BannerSliderForm } from "./components/banner-slider-form";
import BannersList from "./components/banners-list";
import BannerSliderFilter from "./components/filter";

export default function DashboardBannerSliderPage() {
  const { searchParams, setParam } = useUrlParams();
  const [editId, setEditId] = useState<string | null>(null);
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
    [data, editId]
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
        onEdit={setEditId}
      />

      <DrawerForm
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
        FormComponent={BannerSliderForm}
        item={editItem}
        onSuccess={refetch}
      />
    </div>
  );
}
