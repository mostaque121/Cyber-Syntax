"use client";

import { Invoice } from "@/app/(dashboard)/types/documents.types";
import InvoiceConnect from "@/components/documents/invoice/invoice-connect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface InvoicePreviewProps {
  invoice: Invoice;
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InvoicePreview({
  invoice,
  orderId,
  open,
  onOpenChange,
}: InvoicePreviewProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: invoice.invoiceNumber ?? "Invoice",
    pageStyle: `
    @page {
      size: A4;
      margin: 12mm 0;
    }
    @media print {
        body { 
        -webkit-print-color-adjust: exact;
         font-family: var(--font-roboto-flex), sans-serif;
      }
      thead { display: table-header-group; }
      thead tr { background-color: #e5e7eb; color: #1f2937; box-shadow: none; margin: 0; padding: 0; }
      tfoot { display: table-row-group; }
      tr, td, th { page-break-inside: avoid; break-inside: avoid; }
      .page-break { page-break-before: always; }
      .break-togeather { page-break-inside: avoid; break-inside: avoid; }
    }
  `,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="hidden">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className="h-full max-h-screen w-full max-w-full min-w-full! rounded-none border-0 p-0">
        <div className="min-h-screen overflow-y-auto bg-gray-100">
          <div className="flex bg-gray-400 justify-center">
            <div className="py-8 bg-white">
              <div ref={componentRef}>
                <InvoiceConnect orderId={orderId} invoice={invoice} />
              </div>
            </div>
          </div>
          <Button className="absolute top-4 left-4" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
