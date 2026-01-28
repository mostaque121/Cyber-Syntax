"use client";

import { useCategory } from "@/contexts/category-provider";
import { generateBreadcrumb } from "@/lib/generate-breadcrumb";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProductBreadcrumb({ path }: { path?: string }) {
  const { categories } = useCategory();

  const breadcrumbs = path ? generateBreadcrumb(path, categories) : [];

  // Build link using fullPath
  const getHref = (index: number) => `/products/${breadcrumbs[index].fullPath}`;

  return (
    <nav className="  tracking-tight text-xl font-semibold flex flex-wrap items-center gap-1 mb-4">
      {breadcrumbs.length === 0 ? (
        <span className="text-primary ">Products</span>
      ) : (
        <>
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          {breadcrumbs.map((item, index) => (
            <span key={item.id} className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-primary ">{item.name}</span>
              ) : (
                <Link
                  href={getHref(index)}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </>
      )}
    </nav>
  );
}
