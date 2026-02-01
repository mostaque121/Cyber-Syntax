"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/use-url-params";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { BannerSliderForm } from "./banner-slider-form";

export function AddBannerBtn({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const { searchParams, setParam } = useUrlParams();
  const isOpen = searchParams.get("addBanner") === "true";

  const handleOpen = () => {
    setParam("addBanner", "true");
  };

  const handleClose = () => {
    setParam("addBanner", null);
  };

  return (
    <div className={cn(className)}>
      <Button onClick={handleOpen}>
        <Plus />
        Add Banner
      </Button>

      <AddEditPanel
        title="Add New Banner"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <BannerSliderForm
          onSuccess={() => {
            handleClose();
            onSuccess?.();
          }}
          onOpenChange={handleClose}
        />
      </AddEditPanel>
    </div>
  );
}
