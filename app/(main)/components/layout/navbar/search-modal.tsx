"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCardType } from "../../card/product-card";

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// -------------------
// Type Definitions
// -------------------
type SearchItem = {
  title: string;
  url: string;
  image?: string;
};

type Section = {
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  items: SearchItem[];
};

// -------------------
// Static Sections (Pages & Services)
// -------------------
const pageItems: SearchItem[] = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about-us" },
  { title: "Contact", url: "/contact" },
  { title: "Products", url: "/products" },
  { title: "Services", url: "/services" },
  { title: "Privacy Policy", url: "/privacy-policy" },
  { title: "Terms of Service", url: "/terms-of-service" },
  { title: "Cookie Policy", url: "/cookie-policy" },
  { title: "Refund Policy", url: "/refund-policy" },
];

const serviceItems: SearchItem[] = [
  { title: "CCTV Camera Installation", url: "/services/cctv-solution" },
  { title: "IT Support & Maintenance", url: "/services/it-support" },
  { title: "Software Development", url: "/services/software-development" },
  { title: "Networking Solutions", url: "/services/networking-solutions" },
];

// -------------------
// SearchModal Component
// -------------------
export default function SearchModal({
  open,
  onOpenChange,
  products,
}: SearchModalProps & { products?: ProductCardType[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Build search results with Pages, Products, and Services
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // Filter pages
    const filteredPages = query
      ? pageItems.filter((item) => item.title.toLowerCase().includes(query))
      : pageItems.slice(0, 5);

    // Filter services
    const filteredServices = query
      ? serviceItems.filter((item) => item.title.toLowerCase().includes(query))
      : serviceItems;

    // Filter products
    const productItems: SearchItem[] = (products || []).map((p) => {
      const featuredImage =
        p.images.find((img) => img.isFeatured) || p.images[0];
      return {
        title: p.title,
        url: `/product/${p.slug}`,
        image: featuredImage?.url,
      };
    });

    const filteredProducts = query
      ? productItems
          .filter((item) => item.title.toLowerCase().includes(query))
          .slice(0, 6)
      : productItems.slice(0, 4);

    const sections: Section[] = [];

    if (filteredPages.length > 0) {
      sections.push({
        category: "Pages",
        icon: FileText,
        items: filteredPages,
      });
    }

    if (filteredProducts.length > 0) {
      sections.push({
        category: "Products",
        items: filteredProducts,
      });
    }

    if (filteredServices.length > 0) {
      sections.push({
        category: "Services",
        icon: Wrench,
        items: filteredServices,
      });
    }

    return sections;
  }, [searchQuery, products]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  // Reset search input when modal closes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!open) {
      timeout = setTimeout(() => setSearchQuery(""), 300);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <DialogTitle className="hidden">Search Modal</DialogTitle>
        <DialogDescription className="hidden">Search Modal</DialogDescription>

        <Command className="rounded-lg border py-2! shadow-md">
          <CommandInput
            placeholder="Search pages, products, services..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12 py-5"
          />
          <CommandList className="md:h-[300px] h-screen overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>

            {searchResults.map((category) => {
              const Icon = category.icon;
              return (
                <CommandGroup
                  key={category.category}
                  heading={category.category}
                >
                  {category.items.map((item) => (
                    <Link prefetch={false} href={item.url} key={item.title}>
                      <CommandItem
                        value={item.title}
                        onSelect={() => onOpenChange(false)}
                        className="flex cursor-pointer items-center gap-2 py-2"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded object-cover"
                          />
                        ) : (
                          Icon && <Icon className="h-4 w-4 text-emerald-500" />
                        )}
                        <span>{item.title}</span>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>

          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                Press <kbd className="rounded border bg-muted px-1">↑</kbd>{" "}
                <kbd className="rounded border bg-muted px-1">↓</kbd> to
                navigate
              </div>
              <div>
                Press <kbd className="rounded border bg-muted px-1">Enter</kbd>{" "}
                to select
              </div>
              <div>
                Press <kbd className="rounded border bg-muted px-1">Esc</kbd> to
                close
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
