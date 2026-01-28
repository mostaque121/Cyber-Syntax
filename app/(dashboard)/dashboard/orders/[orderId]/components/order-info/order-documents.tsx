"use client";

import type { Document } from "@/app/(dashboard)/types/documents.types";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentType } from "@/prisma/generated/prisma";
import { format } from "date-fns";
import {
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Pencil,
  Plus,
  Receipt,
  Trash2,
} from "lucide-react";
import type React from "react";

interface OrderDocumentsProps {
  documents: Partial<Record<DocumentType, Document>>;
  onGenerate?: (type: DocumentType) => void;
  onEdit?: (type: DocumentType) => void;
  onView?: (type: DocumentType) => void;
  onDownload?: (type: DocumentType) => void;
  onDelete?: (id: string, type: DocumentType) => void;
  deleting?: (type: DocumentType) => void;
}

const docConfig: Record<
  DocumentType,
  { label: string; icon: React.ElementType; bgColor: string; iconColor: string }
> = {
  QUOTATION: {
    label: "Quotation",
    icon: FileSpreadsheet,
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  INVOICE: {
    label: "Invoice",
    icon: FileText,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  RECEIPT: {
    label: "Receipt",
    icon: Receipt,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
};

export function OrderDocuments({
  documents,
  onGenerate,
  onEdit,
  onView,
  onDownload,
  onDelete,
  deleting,
}: OrderDocumentsProps) {
  const documentTypes: DocumentType[] = ["QUOTATION", "INVOICE", "RECEIPT"];

  function getDocumentNumber(doc: Document, type: DocumentType) {
    switch (type) {
      case "INVOICE":
        return "invoiceNumber" in doc.data ? doc.data.invoiceNumber : doc.id;
      case "QUOTATION":
        return "quotationNumber" in doc.data
          ? doc.data.quotationNumber
          : doc.id;
      case "RECEIPT":
        return "receiptNumber" in doc.data ? doc.data.receiptNumber : doc.id;
      default:
        return doc.id;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <FileText className="h-4 w-4" />
          Documents
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-1">
          {documentTypes.map((type) => {
            const config = docConfig[type];
            const Icon = config.icon;
            const doc = documents[type];

            return (
              <div
                key={type}
                className={`rounded-xl border p-4 transition-all ${
                  doc ? "bg-background" : "bg-muted/30 border-dashed"
                }`}
              >
                {/* Row 1: Icon + Name */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bgColor}`}
                  >
                    <Icon className={`h-4 w-4 ${config.iconColor}`} />
                  </div>

                  <p className="font-medium text-sm">{config.label}</p>
                </div>

                {/* Row 2: Document Number */}
                {doc ? (
                  <>
                    <p className="text-xs font-mono mb-1">
                      {doc
                        ? `${docConfig[type].label} Number: ${getDocumentNumber(
                            doc,
                            type
                          )}`
                        : null}
                    </p>

                    {/* Row 3: Issued By */}
                    <p className="text-xs text-muted-foreground mb-1">
                      Issued By: {doc.issuedBy?.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Issued Date:{" "}
                      {format(new Date(doc.createdAt), "d MMMM yyyy")}
                    </p>

                    {/* Row 4: Actions */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onView?.(type)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onDownload?.(type)}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onEdit?.(type)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <DeleteDialog
                        title={`Delete ${config.label}?`}
                        description={`Are you sure you want to permanently delete this ${config.label.toLowerCase()}? This action cannot be undone.`}
                        onConfirm={() => onDelete?.(doc.id, type)}
                      >
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-7 px-2"
                          disabled={Boolean(deleting && deleting(type))}
                        >
                          {deleting && deleting(type) ? (
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-b-2 border-white"></span>
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </DeleteDialog>
                    </div>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-7 px-2 text-xs"
                    onClick={() => onGenerate?.(type)}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Generate
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
