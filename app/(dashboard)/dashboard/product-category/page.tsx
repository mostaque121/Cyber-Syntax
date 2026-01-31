export const dynamic = "force-dynamic";
import { getAllCategories } from "@/app/actions/category-actions";
import { checkAccess } from "@/lib/check-access";
import { redirect } from "next/navigation";
import { CategoryManager } from "./components/category-manager";

export default async function CategoriesPage() {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);

  if (!access.ok) {
    redirect("/login?error=unauthorized");
  }

  const category = await getAllCategories();

  if (!category) {
    return <p className="text-red-600 p-4">Failed to load categories</p>;
  }

  return <CategoryManager categories={category} />;
}
