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
import { cn } from "@/lib/utils";
import * as React from "react";
import { ServiceRequestFormContent } from "./service-request-form";

interface GetServiceButtonProps {
  buttonText?: string;
  buttonClassName?: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export function GetServiceButton({
  buttonText = "Get Service",
  buttonClassName,
  buttonVariant = "default",
}: GetServiceButtonProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSuccess = () => {
    // Close the modal/drawer after successful submission
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={buttonVariant}
            className={cn(
              "bg-primary hover:bg-green-600 text-white",
              buttonClassName,
            )}
          >
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Request a Service
            </DialogTitle>
            <DialogDescription>
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <ServiceRequestFormContent onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={buttonVariant}
          className={cn(
            "bg-primary hover:bg-green-600 text-white",
            buttonClassName,
          )}
        >
          {buttonText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl font-bold">
            Request a Service
          </DrawerTitle>
          <DrawerDescription>
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 max-h-[60dvh] overflow-y-auto">
          <ServiceRequestFormContent onSuccess={handleSuccess} />
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
