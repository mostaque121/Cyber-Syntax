"use client";

import { DrawerForm } from "@/components/custom-ui/form-drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BannerSliderForm } from "./banner-slider-form";

export function AddBannerBtn({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className={cn(className)}>
      <Button onClick={() => setDrawerOpen(true)}>
        <Plus />
        Add Product
      </Button>

      <DrawerForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        FormComponent={BannerSliderForm}
        onSuccess={onSuccess}
      />
    </div>
  );
}
