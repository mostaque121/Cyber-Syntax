"use client";
import { DrawerForm } from "@/components/custom-ui/form-drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductForm } from "./products/components/product-form";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setDrawerOpen(true)}>Add Product</Button>

      <DrawerForm
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        FormComponent={ProductForm}
      />
    </div>
  );
}
