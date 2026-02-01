"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface DrawerFormProps<T> {
  item?: T;
  FormComponent: React.ComponentType<{
    item?: T;
    onCloseForm: () => void;
    onSuccess?: () => void;
  }>;
  open: boolean;
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function DrawerForm<T>({
  item,
  FormComponent,
  open,
  onOpenChange,
  onSuccess,
}: DrawerFormProps<T>) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className=" max-h-[70vh] sm:h-auto">
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto max-w-4xl mx-auto w-full pb-8 max-h-[90dvh]">
          <FormComponent
            onSuccess={onSuccess}
            item={item}
            onCloseForm={() => onOpenChange(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
