"use client";

import AddEditPanel from "@/components/custom-ui/add-edit-panel";
import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/use-url-params";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ProductForm } from "./product-form";

export function AddProductBtn({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const { searchParams, setParam } = useUrlParams();
  const isOpen = searchParams.get("addProduct") === "true";

  const handleOpen = () => {
    setParam("addProduct", "true");
  };

  const handleClose = () => {
    setParam("addProduct", null);
  };

  return (
    <div className={cn(className)}>
      <Button onClick={handleOpen}>
        <Plus />
        Add Product
      </Button>

      <AddEditPanel
        title="Add New Product"
        isOpen={isOpen}
        onClose={handleClose}
        maxWidth="800px"
        disableOutsideClick={false}
        disableEscapeKey={false}
      >
        <ProductForm
          onSuccess={() => {
            handleClose();
            onSuccess?.();
          }}
          onCloseForm={handleClose}
        />
      </AddEditPanel>
    </div>
  );
}
