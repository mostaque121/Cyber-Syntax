"use client";

import { Badge } from "@/components/ui/badge";
import { useCategory } from "@/contexts/category-provider";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";
import { Category } from "./category-manager";

interface CategorySelectorProps {
  selectedCategoryId?: string;
  onCategorySelect: (categoryId: string) => void;
  placeholder?: string;
}

export function CategorySelector({
  selectedCategoryId,
  onCategorySelect,
}: CategorySelectorProps) {
  const { categories } = useCategory();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const isLeafCategory = (category: Category): boolean => {
    return category.children.length === 0;
  };

  const getSelectedCategoryName = (cats: Category[], id: string): string => {
    for (const cat of cats) {
      if (cat.id === id) return cat.name;
      const found = getSelectedCategoryName(cat.children, id);
      if (found) return found;
    }
    return "";
  };

  const renderCategory = (category: Category, level = 0) => {
    const hasChildren = category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategoryId === category.id;
    const isLeaf = isLeafCategory(category);

    return (
      <div key={category.id} className="w-full">
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
            isSelected
              ? "bg-primary/10 border border-primary/20"
              : "hover:bg-muted/50"
          } ${!isLeaf ? "opacity-60" : ""}`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(category.id);
            } else {
              onCategorySelect(category.id);
            }
          }}
        >
          {hasChildren ? (
            <div
              className="h-6 w-6 flex items-center justify-center p-0 hover:bg-accent/20"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(category.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ) : (
            <div className="w-6 flex justify-center">
              {isSelected && <Check className="h-4 w-4 text-primary" />}
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )
            ) : (
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  isSelected
                    ? "bg-primary border-primary"
                    : "bg-primary/20 border-primary/40"
                }`}
              />
            )}
          </div>

          <div className="flex-1 flex items-center gap-2">
            <span
              className={`font-medium ${
                isSelected ? "text-primary" : "text-foreground"
              }`}
            >
              {category.name}
            </span>
            {hasChildren && (
              <Badge variant="secondary" className="text-xs">
                {category.children.length}
              </Badge>
            )}
            {!isLeaf && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                Select subcategory
              </Badge>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {category.children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1 max-h-64  border-input rounded-md border overflow-y-auto">
      {selectedCategoryId && (
        <div className="mb-3 p-2 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">Selected:</p>
          <p className="font-medium text-primary">
            {getSelectedCategoryName(categories, selectedCategoryId)}
          </p>
        </div>
      )}

      {categories.map((category) => renderCategory(category))}

      {categories.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No categories available</p>
        </div>
      )}
    </div>
  );
}
