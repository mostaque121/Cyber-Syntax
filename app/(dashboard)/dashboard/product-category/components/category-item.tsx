// CategoryItem.tsx

import { SlugInput } from "@/components/custom-ui/slug-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Edit2,
  Folder,
  FolderOpen,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { JSX } from "react";
import { Category } from "./category-manager";
import { NewCategoryInput } from "./new-category-input";

// Extend the Category interface for better type safety in the item
interface CategoryItemProps {
  category: Category;
  level: number;
  isExpanded: boolean;
  isEditing: boolean;
  isAddingChild: boolean;
  loadingStates: {
    creating: boolean;
    updating: string | null;
    deleting: string | null;
  };
  // Handlers from Parent
  toggleExpanded: (categoryId: string) => void;
  startEditing: (category: Category) => void;
  saveEdit: () => Promise<void>;
  cancelEdit: () => void;
  confirmDelete: (categoryId: string, categoryName: string) => void;
  startAddingChild: (parentId: string) => void;
  // New Category Input Props
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;

  newCategorySlug: string;
  setNewCategorySlug: (name: string) => void;
  addCategory: (parentId: string | null) => Promise<void>;
  cancelAdding: () => void;
  // Editing Props
  editingName: string;
  setEditingName: (name: string) => void;

  editingSlug: string;
  setEditingSlug: (name: string) => void;
  // For recursive rendering
  renderCategory: (category: Category, level: number) => JSX.Element;
}

export function CategoryItem({
  category,
  level,
  isExpanded,
  isEditing,
  isAddingChild,
  loadingStates,
  toggleExpanded,
  startEditing,
  saveEdit,
  cancelEdit,
  confirmDelete,
  startAddingChild,
  newCategoryName,
  setNewCategoryName,
  addCategory,
  cancelAdding,
  renderCategory,
  editingName,
  setEditingName,
  editingSlug,
  setEditingSlug,
  newCategorySlug,
  setNewCategorySlug,
}: CategoryItemProps) {
  const hasChildren = category.children.length > 0;
  const isUpdating = loadingStates.updating === category.id;
  const isDeleting = loadingStates.deleting === category.id;

  return (
    <div className="w-full">
      {/* Category Row */}
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group ${
          isDeleting ? "opacity-60" : ""
        }`}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Toggle Button / Indent Placeholder */}
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-accent/20"
            onClick={() => toggleExpanded(category.id)}
            disabled={isDeleting}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" /> // Space for indent
        )}

        {/* Icon */}
        <div className="flex items-center gap-2 text-muted-foreground">
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4" />
            ) : (
              <Folder className="h-4 w-4" />
            )
          ) : (
            <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary/40" />
          )}
        </div>

        {/* Category Name / Edit Input */}
        <div className="flex-1 flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="h-8 text-sm"
                disabled={isUpdating}
                autoFocus
              />
              <SlugInput
                initialValue={editingSlug}
                onGenerate={setEditingSlug}
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={saveEdit}
                disabled={isUpdating || !editingName.trim()}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={cancelEdit}
                disabled={isUpdating}
              >
                <X className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ) : (
            <>
              <span className="font-medium text-foreground">
                {category.name}
              </span>
              {hasChildren && (
                <Badge variant="secondary" className="text-xs">
                  {category.children.length}
                </Badge>
              )}
              {isDeleting && (
                <Loader2 className="h-4 w-4 animate-spin text-destructive" />
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && !isDeleting && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Only allow up to 3 levels (level 0, 1, 2) */}
            {level < 2 && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-accent/20"
                onClick={() => startAddingChild(category.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-accent/20"
              onClick={() => startEditing(category)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-destructive/20"
              onClick={() => confirmDelete(category.id, category.name)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>

      {/* Input for adding a CHILD category */}
      {isAddingChild && (
        <NewCategoryInput
          placeholder={`Enter subcategory name for ${category.name}`}
          parentId={category.id}
          categoryName={newCategoryName}
          setCategoryName={setNewCategoryName}
          categorySlug={newCategorySlug}
          setCategorySlug={setNewCategorySlug}
          addCategory={addCategory}
          isCreating={loadingStates.creating}
          cancelAdding={cancelAdding}
          level={level + 1} // Pass level to calculate margin
          isRoot={false}
        />
      )}

      {/* Recursively render children */}
      {hasChildren && isExpanded && (
        <div>
          {category.children.map((child) => renderCategory(child, level + 1))}
        </div>
      )}
    </div>
  );
}
