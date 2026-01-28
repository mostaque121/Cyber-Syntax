"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategory } from "@/contexts/category-provider";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
}

/**
 * Recursively builds the full path for a category
 * Example: /products/electronics/phones/android
 */
const buildCategoryPath = (category: Category, parents: Category[] = []) => {
  const segments = [...parents.map((p) => p.slug), category.slug];
  return `/products/${segments.join("/")}`;
};

export default function CategoryMobileMenu() {
  const { categories } = useCategory();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const renderCategory = (
    category: Category,
    parents: Category[] = [],
    level = 0
  ) => {
    const fullPath = buildCategoryPath(category, parents);
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="w-full">
        {hasChildren ? (
          <Collapsible
            open={openMenus[category.id]}
            onOpenChange={() => toggleMenu(category.id)}
            className="w-full"
          >
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center justify-between px-2 py-2 text-slate-700",
                level > 0 && "pl-6 text-sm"
              )}
            >
              <Link
                href={fullPath}
                prefetch={false}
                className={cn(
                  "grow text-left hover:text-emerald-600",
                  pathname === fullPath && "text-emerald-600"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick();
                }}
              >
                {category.name}
              </Link>
              <ChevronDown
                className={cn(
                  "h-6 w-6 p-1 bg-gray-100 rounded-sm ml-2 cursor-pointer transition-transform",
                  openMenus[category.id] && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-4 space-y-1">
              {category.children.map((child: Category) =>
                renderCategory(child, [...parents, category], level + 1)
              )}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Link
            href={fullPath}
            prefetch={false}
            className={cn(
              "block px-2 py-2 hover:text-emerald-600",
              level > 0 && "pl-6 text-sm",
              pathname === fullPath && "text-emerald-600"
            )}
            onClick={handleItemClick}
          >
            {category.name}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 font-medium text-slate-700">
          Categories
          <ChevronDown
            className={cn(
              "h-6 w-6 bg-gray-200 cursor-pointer rounded-sm p-1 ml-2 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-2 pt-2 space-y-1">
          {categories.map((category) => renderCategory(category))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
