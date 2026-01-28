"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import * as React from "react";

interface DeleteDialogProps {
  children: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteDialog({
  children,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
}: DeleteDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false); // 🔥 instantly close dialog
    onConfirm(); // run async delete in background
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmClick}
            className={buttonVariants({ variant: "destructive" })}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
