"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight, Mail, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartButton } from "../../cart-drawer/cart-button";
import { GetServiceButton } from "../../common/get-service-button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function NavFooter() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";

  return (
    <div className="container border-[#262626] border-t-[1.5px] pt-2 mt-2 mx-auto flex  items-center justify-between gap-4 px-4">
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathName === item.href &&
                "text-primary underline underline-offset-4",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden flex items-center justify-between w-full gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetHeader>
            <SheetTitle className="hidden"></SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <SheetContent side="left" className="p-0 w-[300px]">
            {/* Logo Section */}
            <div className="px-6 py-5 border-b border-gray-100">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo-icon-2.png"
                  className="object-contain"
                  width={40}
                  height={40}
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-6">
              <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Menu
              </p>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-all",
                      pathName === item.href ||
                        (item.href !== "/" && pathName.startsWith(item.href))
                        ? "bg-teal-50 text-teal-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-teal-600",
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-colors",
                        pathName === item.href ||
                          (item.href !== "/" && pathName.startsWith(item.href))
                          ? "text-teal-600"
                          : "text-gray-400",
                      )}
                    />
                  </Link>
                ))}
              </div>
            </nav>

            {/* Contact Info */}
            <div className="px-6 py-5 mt-auto border-t border-gray-100 bg-gray-50">
              <p className="mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Contact Us
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full">
                    <Phone className="w-4 h-4 text-teal-600" />
                  </div>
                  <span>{phone}</span>
                </a>
                <a
                  href={`mailto:${email.trim()}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full">
                    <Mail className="w-4 h-4 text-teal-600" />
                  </div>
                  <span>{email}</span>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:hidden">
          <GetServiceButton buttonText="Get Service" buttonVariant="default" />
          <CartButton />
        </div>
      </div>
      <div className="hidden md:flex">
        <GetServiceButton buttonText="Get Service" buttonVariant="default" />
      </div>
    </div>
  );
}
