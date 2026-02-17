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
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import * as React from "react";
import MobileModal from "./mobile-modal";
import { ServiceRequestFormContent } from "./service-request-form";

import { ReactNode } from "react";

interface GetServiceButtonProps {
  buttonText?: ReactNode;
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

  // Mobile: use custom MobileModal
  return (
    <>
      <Button
        variant={buttonVariant}
        className={cn("bg-green-600 text-white", buttonClassName)}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>
      <MobileModal
        title="Request a Service"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <p className="mb-2 text-gray-600">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
        <ServiceRequestFormContent onSuccess={handleSuccess} />
      </MobileModal>
    </>
  );
}
