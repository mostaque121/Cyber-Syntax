"use client";
import { SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, Phone } from "lucide-react";
import ProductCategoryMenu from "./product-category";

export function CategoryNavigation() {
  return (
    <>
      {/* Desktop Category Navigation */}
      <div className=" px-6 py-3 bg-gray-800">
        <div className="flex items-center justify-between space-x-8 ">
          {/* All Items with Toggle */}
          <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
            <SheetTrigger asChild>
              <AlignJustify />
            </SheetTrigger>
            <span>All Items</span>
          </button>

          <div className="flex items-center justify-center gap-6">
            <ProductCategoryMenu />
            <button className="text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
              Hot Deal
            </button>
            <button className="text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
              Shop
            </button>
            <button className="text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
              Help
            </button>
            <button className="text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
              About
            </button>
            <button className="text-gray-300 hover:text-white text-sm whitespace-nowrap py-1 transition-colors">
              Contact
            </button>
          </div>

          <div>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm">
              <Phone />
              01707430908
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
