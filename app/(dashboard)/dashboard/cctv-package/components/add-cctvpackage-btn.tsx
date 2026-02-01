"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/use-url-params";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { CctvPackageForm } from "./cctv-package-form";

export function AddCctvPackageBtn({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const { searchParams, setParam } = useUrlParams();
  const isOpen = searchParams.get("addPackage") === "true";

  const handleOpen = () => {
    setParam("addPackage", "true");
  };

  const handleClose = () => {
    setParam("addPackage", null);
  };

  return (
    <div className={cn(className)}>
      <Button onClick={handleOpen}>
        <Plus />
        Add Package
      </Button>

      <AddEditPanel
        title="Add New Package"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <CctvPackageForm
          onSuccess={() => {
            handleClose();
            onSuccess?.();
          }}
        />
      </AddEditPanel>
    </div>
  );
}
