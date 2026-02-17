import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next/types";
import { DashboardSidebar } from "./components/sidebar/dashboard-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Cyber Syntax Admin",
  },
  description:
    "Cyber Syntax Admin Dashboard - Manage products, orders, customers, and settings.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="md:hidden flex items-center h-16 z-50 sticky top-0 left-0 py-2 px-2 border-b bg-background text-foreground ">
            <SidebarTrigger />

            <h2 className="text-lg font-semibold ml-3">Admin</h2>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
