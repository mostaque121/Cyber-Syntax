"use client";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/app/(dashboard)/actions/category-actions";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// Interfaces (Moved from original component)
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
}

interface LoadingStates {
  creating: boolean;
  updating: string | null;
  deleting: string | null;
}

interface CategoryManagerProps {
  categories: Category[];
}

// ----------------------------------------------------
// Import the new modular components
import { CategoryItem } from "./category-item";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { NewCategoryInput } from "./new-category-input";

// ----------------------------------------------------

export function CategoryManager({ categories }: CategoryManagerProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingSlug, setEditingSlug] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  // Parent ID for the *next* category to be added
  const [addingToParent, setAddingToParent] = useState<string | null>(null);
  const [openRootAdd, setOpenRootAdd] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    creating: false,
    updating: null,
    deleting: null,
  });

  const toggleExpanded = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  }, []);

  // --- CRUD Action Handlers ---

  const handleStartEditing = useCallback((category: Category) => {
    setEditingCategory(category.id);
    setEditingName(category.name);
    setEditingSlug(category.slug);
  }, []);

  const handleSaveEdit = async () => {
    if (!editingCategory || !editingName.trim()) return;

    setLoadingStates((prev) => ({ ...prev, updating: editingCategory }));

    try {
      await updateCategory({
        id: editingCategory,
        name: editingName.trim(),
        slug: editingSlug.trim(),
      });
      setEditingCategory(null);
      setEditingName("");
      setEditingSlug("");
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");
    } finally {
      setLoadingStates((prev) => ({ ...prev, updating: null }));
    }
  };

  const handleCancelEdit = useCallback(() => {
    setEditingCategory(null);
    setEditingName("");
    setEditingSlug("");
  }, []);

  const handleConfirmDelete = useCallback(
    (categoryId: string, categoryName: string) => {
      setCategoryToDelete({ id: categoryId, name: categoryName });
      setDeleteConfirmOpen(true);
    },
    [],
  );

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    setLoadingStates((prev) => ({ ...prev, deleting: categoryToDelete.id }));

    try {
      await deleteCategory(categoryToDelete.id);
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, deleting: null }));
    }
  };

  const handleAddCategory = async (parentId: string | null) => {
    if (!newCategoryName.trim()) return;

    setLoadingStates((prev) => ({ ...prev, creating: true }));

    try {
      await createCategory({
        name: newCategoryName.trim(),
        parentId: parentId,
        slug: newCategorySlug.trim(),
      });
      setNewCategoryName("");
      setNewCategorySlug("");
      setAddingToParent(null); // Clear adding mode
      if (parentId) {
        setExpandedCategories((prev) => new Set([...prev, parentId]));
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, creating: false }));
    }
  };

  const handleStartAddingChild = useCallback((parentId: string) => {
    setNewCategoryName(""); // Clear previous new category name
    setAddingToParent(parentId);
  }, []);

  const handleCancelAdding = useCallback(() => {
    setAddingToParent(null);
    setNewCategoryName("");
    setNewCategorySlug("");
  }, []);
  const handleCancelAddingToRoot = useCallback(() => {
    setAddingToParent(null);
    setOpenRootAdd(false);
    setNewCategoryName("");
    setNewCategorySlug("");
  }, []);

  // --- Rendering Logic ---

  const renderCategory = (category: Category, level = 0) => (
    <CategoryItem
      key={category.id}
      category={category}
      level={level}
      isExpanded={expandedCategories.has(category.id)}
      isEditing={editingCategory === category.id}
      isAddingChild={addingToParent === category.id}
      loadingStates={loadingStates}
      // Handlers
      toggleExpanded={toggleExpanded}
      startEditing={handleStartEditing}
      saveEdit={handleSaveEdit}
      cancelEdit={handleCancelEdit}
      confirmDelete={handleConfirmDelete}
      startAddingChild={handleStartAddingChild}
      // New Category Input Props
      newCategoryName={newCategoryName}
      setNewCategoryName={setNewCategoryName}
      setNewCategorySlug={setNewCategorySlug}
      newCategorySlug={newCategorySlug}
      addCategory={handleAddCategory}
      cancelAdding={handleCancelAdding}
      // Recursively render children
      renderCategory={renderCategory}
      editingName={editingName}
      setEditingName={setEditingName}
      editingSlug={editingSlug}
      setEditingSlug={setEditingSlug}
    />
  );

  return (
    <>
      <div className="px-4 md:px-8 py-8 container mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="font-bold text-2xl ">Product Categories</h1>
          <Button
            onClick={() => {
              setAddingToParent(null); // Explicitly set to root add mode
              setNewCategoryName("");
              setNewCategorySlug("");
              setOpenRootAdd(true);
            }}
            className="bg-primary hover:bg-primary/90"
            disabled={loadingStates.creating}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Root Category
          </Button>
        </div>

        <div className="space-y-1">
          {/* Input for adding a ROOT category (when addingToParent is null) */}
          {addingToParent === null && openRootAdd && (
            <NewCategoryInput
              placeholder="Enter root category name"
              parentId={null}
              categoryName={newCategoryName}
              setCategoryName={setNewCategoryName}
              categorySlug={newCategorySlug}
              setCategorySlug={setNewCategorySlug}
              addCategory={handleAddCategory}
              isCreating={loadingStates.creating}
              cancelAdding={handleCancelAddingToRoot}
              isRoot={true}
            />
          )}

          {categories.map((category) => renderCategory(category))}

          {categories.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No categories yet</p>
              <p className="text-sm">Add your first category to get started</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        categoryToDelete={categoryToDelete}
        handleDelete={handleDelete}
        isDeleting={loadingStates.deleting === categoryToDelete?.id}
      />
    </>
  );
}
