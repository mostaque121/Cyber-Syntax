"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | "ellipsis")[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;

      if (start > 2) pageNumbers.push("ellipsis");

      for (let i = start; i <= end; i++) pageNumbers.push(i);

      if (end < totalPages - 1) pageNumbers.push("ellipsis");

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p, index) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <Button
                size="icon"
                variant={currentPage === p ? "outline" : "ghost"}
                onClick={() => goToPage(p)}
                disabled={currentPage === p}
              >
                {p}
              </Button>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
