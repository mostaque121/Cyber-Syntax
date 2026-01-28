"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronDown, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

export function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetHeader className="hidden">
        <SheetTitle>a</SheetTitle>
        <SheetDescription>a</SheetDescription>
      </SheetHeader>
      <SheetContent
        side="left"
        className="w-80 bg-gray-900 border-gray-700 p-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Categories
                </h3>
                <button className="flex items-center space-x-2 w-full text-left py-2 px-3 rounded hover:bg-gray-800 text-white">
                  <span>📋</span>
                  <span>All Items</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </button>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="block w-full text-left py-2 px-3 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Account
                </h3>
                <button className="block w-full text-left py-2 px-3 rounded hover:bg-gray-800 text-gray-300 hover:text-white">
                  Help
                </button>
                <button className="block w-full text-left py-2 px-3 rounded hover:bg-gray-800 text-gray-300 hover:text-white">
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
