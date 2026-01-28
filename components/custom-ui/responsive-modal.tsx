"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/use-media-query";
import * as React from "react";

interface ResponsiveModalProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResponsiveModal({
  children,
  trigger,
  title,
  description,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ResponsiveModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Allow the parent to control the state, or default to internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>

            <DialogDescription className="hidden">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className=" max-h-[calc(80dvh)] px-1 py-4 overflow-y-auto">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className="hidden">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {/* Drawer content usually needs a bit of padding wrapper */}
        <div className="px-4 max-h-[calc(80dvh)] overflow-y-auto">
          {children}
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
