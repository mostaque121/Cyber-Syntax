import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },

  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function NavFooter() {
  const pathName = usePathname();
  return (
    <div className="container border-[#262626] border-t-[1.5px] pt-2 mt-2 mx-auto flex  items-center justify-center px-4">
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathName === item.href &&
                "text-primary underline underline-offset-4"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium hover:text-primary transition-colors",
                    pathName.startsWith(item.href) &&
                      "text-primary underline underline-offset-4"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
