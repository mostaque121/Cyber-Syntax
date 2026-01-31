"use client";

import SearchBox from "@/components/custom-ui/search-box";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "../../cart-drawer/cart-button";
import { ProfileSection } from "./profile-section";

interface NavbarHeaderProps {
  setIsSearchOpen: (open: boolean) => void;
}

export function NavbarHeader({ setIsSearchOpen }: NavbarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 ">
      <div className="flex flex-1 items-center space-x-4">
        <Link href="/">
          <div className="relative">
            <Image
              src="/logo.png"
              className="object-contain"
              width={150}
              height={100}
              alt="Logo"
            />
          </div>
        </Link>
      </div>

      <SearchBox onSearchClick={() => setIsSearchOpen(true)} />

      {/* Mobile Search Toggle */}

      <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
        {/* Mobile / Small screens */}
        <div className="flex md:hidden">
          <Button
            size="sm"
            className="h-9 w-9 rounded-sm bg-green-600 hover:bg-green-700 flex items-center justify-center"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </div>

        <ProfileSection />
        <div className="hidden md:flex">
          <CartButton />
        </div>
      </div>
    </div>
  );
}
