"use client";

import { useState } from "react";
import { ProductCardType } from "../../card/product-card";
import NavFooter from "./navbar-footer";
import { NavbarHeader } from "./navbar-header";
import SearchModal from "./search-modal";

export default function Navbar({ products }: { products?: ProductCardType[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 py-3 text-white">
        <NavbarHeader setIsSearchOpen={setIsSearchOpen} />
        <NavFooter />
      </div>

      <SearchModal
        products={products}
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
      />
    </>
  );
}
