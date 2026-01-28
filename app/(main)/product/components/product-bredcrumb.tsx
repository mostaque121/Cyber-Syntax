"use client";

import { ChevronsRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  fullPath: string; // Example: "electronics/computers/laptops"
  parent?: Category | null;
}

interface BreadcrumbProps {
  category: Category | null;
  productTitle: string;
}

export function ProductBreadcrumb({ category, productTitle }: BreadcrumbProps) {
  // Build hierarchy: bottom → top
  const hierarchy: Category[] = [];
  let current = category;

  while (current) {
    hierarchy.unshift(current);
    current = current.parent || null;
  }

  return (
    <nav className="text-[14px] text-black flex flex-wrap items-center gap-1.5 mb-4">
      {/* Root Products */}
      <Link href="/products" className="hover:text-primary">
        Products
      </Link>

      {hierarchy.length > 0 && <ChevronsRight className="w-3 h-3" />}

      {/* Render hierarchy */}
      {hierarchy.map((cat, index) => (
        <span key={cat.id} className="flex items-center gap-1.5">
          <Link
            href={`/products/${cat.fullPath}`}
            className="hover:text-primary "
          >
            {cat.name}
          </Link>

          {index < hierarchy.length - 1 && (
            <ChevronsRight className="w-3 h-3" />
          )}
        </span>
      ))}

      {/* Product title */}
      {productTitle && (
        <>
          <ChevronsRight className="w-3 h-3" />
          <span className="text-primary font-semibold">{productTitle}</span>
        </>
      )}
    </nav>
  );
}
