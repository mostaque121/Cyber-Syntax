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
import { FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
};

type Section = {
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  items: SearchItem[];
};

// -------------------
// Search Sections
// -------------------
const sections: Section[] = [
  {
    category: "Pages",
    icon: FileText,
    items: [
      { title: "Home", url: "/" },
      { title: "About Us", url: "/about-us" },
      { title: "About Rpl", url: "/about-rpl" },
      { title: "Contact", url: "/contact" },
      { title: "FAQ", url: "/faq" },
      { title: "Reviews", url: "/reviews" },
      { title: "Write a Review", url: "/write-review" },
      { title: "Privacy Policy", url: "/privacy-policy" },
      { title: "Terms of Service", url: "/terms-of-service" },
      { title: "Cookie Policy", url: "/cookie-policy" },
      { title: "Refund Policy", url: "/refund-policy" },
    ],
  },
  // Future sections like products or qualifications can be added here
];

// -------------------
// Build Search Data
// -------------------
const buildSearchData = (data: Section[]): Section[] => data;

// -------------------
// SearchModal Component
// -------------------
export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Derived search results using useMemo to avoid setState in effect
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return buildSearchData(sections);

    const query = searchQuery.toLowerCase();

    return buildSearchData(sections)
      .map((category) => {
        const filteredItems = category.items.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

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
            placeholder="Search qualifications, industries, pages..."
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
                        {Icon && <Icon className="h-4 w-4 text-emerald-500" />}
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
