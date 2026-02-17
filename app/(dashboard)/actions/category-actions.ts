"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import slugify from "slugify";

export interface CreateCategoryData {
  name: string;
  parentId?: string | null;
  slug?: string;
}

export interface UpdateCategoryData {
  id: string;
  name: string;
  slug?: string;
}

// Helper: generate full path recursively
async function generateFullPath(
  slug: string,
  parentId?: string | null,
): Promise<string> {
  if (!parentId) return slug;

  const parent = await prisma.category.findUnique({ where: { id: parentId } });
  if (!parent) return slug;

  return `${parent.fullPath}/${slug}`;
}

// Helper: calculate level based on parent
async function calculateLevel(parentId?: string | null): Promise<number> {
  if (!parentId) return 1;
  const parent = await prisma.category.findUnique({ where: { id: parentId } });
  return parent ? parent.level + 1 : 1;
}

// Create a new category
export async function createCategory(data: CreateCategoryData) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    const slug = data.slug ?? slugify(data.name, { lower: true });
    const fullPath = await generateFullPath(slug, data.parentId);
    const level = await calculateLevel(data.parentId);

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        parentId: data.parentId,
        fullPath,
        level,
      },
      include: { children: true, parent: true },
    });

    updateTag("categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

// Update a category
export async function updateCategory(data: UpdateCategoryData) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    const slug = data.slug ?? slugify(data.name, { lower: true });

    // Fetch parentId to recalculate fullPath and level
    const category = await prisma.category.findUnique({
      where: { id: data.id },
    });
    if (!category) return { success: false, error: "Category not found" };

    const fullPath = await generateFullPath(slug, category.parentId);
    const level = await calculateLevel(category.parentId);

    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug,
        fullPath,
        level,
      },
      include: { children: true, parent: true },
    });

    // Update fullPath and level for all children recursively
    await updateChildrenPaths(
      updatedCategory.id,
      updatedCategory.fullPath,
      updatedCategory.level,
    );

    updateTag("categories");
    return { success: true, data: updatedCategory };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

// Recursive function to update children paths and levels
async function updateChildrenPaths(
  parentId: string,
  parentFullPath: string,
  parentLevel: number,
) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  const children = await prisma.category.findMany({ where: { parentId } });
  for (const child of children) {
    const newFullPath = `${parentFullPath}/${child.slug}`;
    const newLevel = parentLevel + 1;
    await prisma.category.update({
      where: { id: child.id },
      data: { fullPath: newFullPath, level: newLevel },
    });
    await updateChildrenPaths(child.id, newFullPath, newLevel);
  }
}

// Delete a category (recursive)
export async function deleteCategory(id: string) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    // Recursively delete children
    await deleteCategoryRecursive(id);

    updateTag("categories");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

async function deleteCategoryRecursive(categoryId: string) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
  });
  for (const child of children) {
    await deleteCategoryRecursive(child.id);
  }
  await prisma.category.delete({ where: { id: categoryId } });
}

// Get a single category with its children
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { children: true, parent: true, products: true },
    });

    if (!category) return { success: false, error: "Category not found" };
    return { success: true, data: category };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

// Move a category to a different parent
export async function moveCategoryToParent(
  categoryId: string,
  newParentId: string | null,
) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    // Fetch the category to get its slug
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory)
      return { success: false, error: "Category not found" };

    const fullPath = await generateFullPath(existingCategory.slug, newParentId);
    const level = await calculateLevel(newParentId);

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { parentId: newParentId, fullPath, level },
      include: { children: true, parent: true },
    });

    await updateChildrenPaths(category.id, category.fullPath, category.level);

    return { success: true, data: category };
  } catch (error) {
    console.error("Error moving category:", error);
    return { success: false, error: "Failed to move category" };
  }
}

// Get all categories as a nested tree
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
