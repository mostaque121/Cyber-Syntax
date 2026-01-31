export const dynamic = "force-dynamic";
import { checkAccess } from "@/lib/check-access";
import {
  Box,
  Contact,
  Image,
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const quickLinks = [
  {
    title: "Products",
    description: "Manage your product listings",
    href: "/dashboard/products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Categories",
    description: "Organize product categories",
    href: "/dashboard/product-category",
    icon: LayoutGrid,
    color: "bg-purple-500",
  },
  {
    title: "Orders",
    description: "View and manage orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    title: "Users",
    description: "Manage user accounts",
    href: "/dashboard/users",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    title: "Banner Slider",
    description: "Update homepage banners",
    href: "/dashboard/banner-slider",
    icon: Image,
    color: "bg-pink-500",
  },
  {
    title: "CCTV Packages",
    description: "Manage CCTV packages",
    href: "/dashboard/cctv-package",
    icon: Box,
    color: "bg-cyan-500",
  },
  {
    title: "Contact Submissions",
    description: "View customer inquiries",
    href: "/dashboard/contact-submissions",
    icon: Contact,
    color: "bg-amber-500",
  },
];

export default async function DashboardPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="p-6 md:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your store, products, orders, and more from here.
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${link.color} w-11 h-11 rounded-lg flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-linear-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
        <p className="text-teal-50 text-sm mb-4">
          If you have any questions or need assistance managing your store,
          contact our support team.
        </p>
        <Link
          href="/contact"
          className="inline-block px-4 py-2 bg-white text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
