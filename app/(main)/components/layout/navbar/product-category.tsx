"use client";

import { useCategory } from "@/contexts/category-provider";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProductCategoryMenu() {
  const { categories } = useCategory();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );

  const handleMenuItemClick = () => {
    setActiveMenu(null);
    setActiveCategory(null);
    setActiveSubCategory(null);
  };

  // Helper to build nested paths
  const buildPath = (segments: string[]) => `/products/${segments.join("/")}`;

  return (
    <div>
      <div
        className="relative group"
        onMouseEnter={() => setActiveMenu("product-category")}
        onMouseLeave={() => {
          setActiveMenu(null);
          setActiveCategory(null);
          setActiveSubCategory(null);
        }}
      >
        <Link prefetch={false} href="/products">
          <button
            className={cn(
              "text-slate-700 hover:text-emerald-600 flex items-center cursor-pointer gap-1 font-medium px-2",
              pathname === "/products" && "text-emerald-600"
            )}
          >
            Products
            <ChevronDown className="h-4 w-4" />
          </button>
        </Link>

        {/* First level dropdown */}
        <div
          className={cn(
            "absolute left-0 top-full min-w-[180px] bg-white shadow-md border border-gray-200 z-50 transition-all duration-200",
            activeMenu === "product-category"
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          )}
        >
          {categories?.map((category) => (
            <div
              key={category.id}
              className="relative group/sub"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                prefetch={false}
                href={buildPath([category.slug])}
                className={cn(
                  "text-slate-700 flex items-center justify-between font-medium text-sm hover:bg-slate-50 hover:text-emerald-600 px-2 py-2 border-b border-gray-200 last:border-b-0",
                  pathname === buildPath([category.slug]) && "text-emerald-600"
                )}
                onClick={handleMenuItemClick}
              >
                {category.name}
                {category.children?.length > 0 && (
                  <ChevronRight className="h-4 ml-4 w-4" />
                )}
              </Link>

              {/* Second level dropdown */}
              {category.children?.length > 0 && (
                <div
                  className={cn(
                    "absolute left-full top-0 min-w-[180px] bg-white shadow-md border border-gray-200 z-50 transition-all duration-200",
                    activeCategory === category.id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  )}
                >
                  {category.children.map((subCategory) => (
                    <div
                      key={subCategory.id}
                      className="relative group/sub-sub"
                      onMouseEnter={() => setActiveSubCategory(subCategory.id)}
                      onMouseLeave={() => setActiveSubCategory(null)}
                    >
                      <Link
                        prefetch={false}
                        href={buildPath([category.slug, subCategory.slug])}
                        className={cn(
                          "text-slate-700 flex items-center justify-between text-xs hover:bg-slate-50 hover:text-emerald-600 font-medium px-2 py-2 border-b border-gray-200 last:border-b-0",
                          pathname ===
                            buildPath([category.slug, subCategory.slug]) &&
                            "text-emerald-600"
                        )}
                        onClick={handleMenuItemClick}
                      >
                        {subCategory.name}
                        {subCategory.children?.length > 0 && (
                          <ChevronRight className="h-4 ml-4 w-4" />
                        )}
                      </Link>

                      {/* Third level dropdown */}
                      {subCategory.children?.length > 0 && (
                        <div
                          className={cn(
                            "absolute left-full top-0 min-w-[180px] bg-white shadow-md border border-gray-200 z-50 transition-all duration-200",
                            activeSubCategory === subCategory.id
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          )}
                        >
                          {subCategory.children.map((subSubCategory) => (
                            <Link
                              prefetch={false}
                              key={subSubCategory.id}
                              href={buildPath([
                                category.slug,
                                subCategory.slug,
                                subSubCategory.slug,
                              ])}
                              className={cn(
                                "text-slate-700 block text-xs hover:bg-slate-50 hover:text-emerald-600 font-medium px-2 py-2 border-b border-gray-200 last:border-b-0",
                                pathname ===
                                  buildPath([
                                    category.slug,
                                    subCategory.slug,
                                    subSubCategory.slug,
                                  ]) && "text-emerald-600"
                              )}
                              onClick={handleMenuItemClick}
                            >
                              {subSubCategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
