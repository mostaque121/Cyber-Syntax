"use client";

import PaginationControl from "@/components/custom-ui/pagination-control";
import { useMemo, useState } from "react";
import ProductCard, {
  ProductCardType,
} from "../../components/card/product-card";
import { ProductNotFound } from "./not-found";
import ProductCategorySection from "./product-category";
import { ProductSorting } from "./sorting";
// Ensure you have this type or use 'any' if strictly needed,
// but sticking to your Prisma type is best:

interface ProductListProps {
  initialProducts: ProductCardType[];
  categoryName?: string; // Passed from the server page
}

export function ProductList({
  initialProducts,
  categoryName,
}: ProductListProps) {
  // 1. STATE: Manage Sort and Page locally
  const [sortOrder, setSortOrder] = useState<
    "DEFAULT" | "LOW_TO_HIGH" | "HIGH_TO_LOW"
  >("DEFAULT");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // 2. LOGIC: Sort & Paginate (Runs instantly in memory)
  const { visibleProducts, totalPages } = useMemo(() => {
    // A. Create a shallow copy to avoid mutating props
    const sorted = [...initialProducts];

    // B. Apply Sorting
    if (sortOrder === "LOW_TO_HIGH") {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "HIGH_TO_LOW") {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }
    // "DEFAULT" uses the original server order (usually createdAt desc)

    // C. Calculate Pagination
    const total = sorted.length;
    const pages = Math.ceil(total / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // D. Slice the data for the current view
    const slicedData = sorted.slice(startIndex, endIndex);

    return { visibleProducts: slicedData, totalPages: pages };
  }, [initialProducts, sortOrder, currentPage]);

  // 3. HANDLERS
  const handleSort = (value: "DEFAULT" | "LOW_TO_HIGH" | "HIGH_TO_LOW") => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to page 1 when sorting changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. GUARD CLAUSE: No products
  if (!initialProducts || initialProducts.length < 1) {
    return <ProductNotFound />;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center w-full justify-between gap-6">
        <h1 className="text-2xl font-semibold capitalize">
          {categoryName || "All Products"}
        </h1>
        <div className="hidden md:block">
          <ProductSorting onChangeSort={handleSort} />
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="mt-6 md:mt-4 flex md:flex-row md:gap-8 flex-col">
        {/* SIDEBAR */}
        <div className="flex md:items-start items-center justify-between gap-6">
          <div>
            <ProductCategorySection />
          </div>
          {/* Mobile Sort */}
          <div className="block md:hidden">
            <ProductSorting onChangeSort={handleSort} />
          </div>
        </div>

        {/* PRODUCT CARDS */}
        <div className="mb-8 grid mt-6 md:mt-0 md:flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* FOOTER: Pagination */}
      {totalPages > 1 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
