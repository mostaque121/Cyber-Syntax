"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCategory } from "@/contexts/category-provider";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
  fullPath: string;
}

interface CategoryItemProps {
  item: Category;
  level: number;
}

const CategoryItem = ({ item, level }: CategoryItemProps) => {
  const path = usePathname();
  const [expanded, setExpanded] = useState(
    path.startsWith(`/products/${item.fullPath}`),
  );
  const hasChildren = item.children.length > 0;
  const indentPx = level === 0 ? 12 : level === 1 ? 24 : 36;
  console.log("Rendering CategoryItem:", item.slug, "Expanded:", expanded);
  return (
    <div>
      <div className="flex items-center gap-0 group">
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className={`p-1 hover:bg-background cursor-pointer rounded transition-colors shrink-0 ${
              expanded && "bg-primary hover:bg-primary/80"
            } `}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expanded ? "rotate-180 " : ""
              }`}
            />
          </button>
        ) : (
          <div className="w-6 shrink-0" />
        )}

        <Link
          href={`/products/${item.fullPath}`}
          className="flex-1 px-3 py-1.5 rounded text-left transition-colors text-sm font-medium text-foreground hover:bg-background"
          style={{ paddingLeft: `${indentPx}px` }}
        >
          {item.name}
        </Link>
      </div>

      {hasChildren && expanded && (
        <div className="pl-2">
          {item.children.map((child) => (
            <CategoryItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <nav className="space-y-1">
      {categories.map((category) => (
        <CategoryItem key={category.id} item={category} level={0} />
      ))}
    </nav>
  );
};

export default function ProductCategorySection() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategory();

  return (
    <div className="flex gap-4">
      {/* Desktop Sidebar */}
      <aside className="hidden  md:block w-56 shrink-0">
        <div className="category-card">
          <Link href="/products">
            <h2 className="font-bold hover:text-primary transition-colors duration-200 text-base mb-3 text-foreground">
              Products
            </h2>
          </Link>

          <CategoryList categories={categories} />
        </div>
      </aside>

      {/* Mobile Drawer Trigger */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-between ">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(true)}
            className="rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Categories</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
              <CategoryList categories={categories} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
