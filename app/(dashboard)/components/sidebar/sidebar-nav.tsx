"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  Cctv,
  ChartColumnStacked,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Banner Slider",
    icon: ArrowLeftRight,
    href: "/dashboard/banner-slider",
  },
  {
    title: "Products",
    icon: ChartColumnStacked,
    href: "/dashboard/products",
  },

  {
    title: "Product Category",
    icon: Mail,
    href: "/dashboard/product-category",
  },
  {
    title: "CCTV Package",
    icon: Cctv,
    href: "/dashboard/cctv-package",
  },
  {
    title: "Orders",
    icon: Store,
    href: "/dashboard/orders",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Contact Submissions",
    icon: MessageSquare,
    href: "/dashboard/contact-submissions",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
