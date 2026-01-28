import { getAllCategories } from "@/app/actions/category-actions";
import { CategoryManager } from "./components/category-manager";

export default async function CategoriesPage() {
  const category = await getAllCategories();

  if (!category) {
    return <p className="text-red-600 p-4">Failed to load categories</p>;
  }

  return <CategoryManager categories={category} />;
}
