"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { SidebarNav } from "./sidebar-nav";
export function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              asChild
              tooltip={"Home"}
            >
              <div>
                <SidebarTrigger className="-ml-1" />
                <Link href={"/"}>
                  <span className="text-base font-semibold">NextHand</span>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
