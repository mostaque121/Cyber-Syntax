"use client";

import { DrawerForm } from "@/components/custom-ui/form-drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CctvPackageForm } from "./cctv-package-form";

export function AddCctvPackageBtn({
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
        Add Package
      </Button>

      <DrawerForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        FormComponent={CctvPackageForm}
        onSuccess={onSuccess}
      />
    </div>
  );
}
