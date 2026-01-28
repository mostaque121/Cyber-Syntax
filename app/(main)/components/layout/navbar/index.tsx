"use client";

import { useState } from "react";
import NavFooter from "./navbar-footer";
import { NavbarHeader } from "./navbar-header";
import SearchModal from "./search-modal";

export default function NextHandNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 py-3 text-white">
        <NavbarHeader setIsSearchOpen={setIsSearchOpen} />
        <NavFooter />
      </div>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
