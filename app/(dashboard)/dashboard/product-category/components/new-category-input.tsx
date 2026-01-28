// NewCategoryInput.tsx

import { SlugInput } from "@/components/custom-ui/slug-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, X } from "lucide-react";

interface NewCategoryInputProps {
  placeholder: string;
  parentId: string | null;
  categoryName: string;
  setCategoryName: (name: string) => void;
  categorySlug: string;
  setCategorySlug: (name: string) => void;
  addCategory: (parentId: string | null) => Promise<void>;
  isCreating: boolean;
  cancelAdding: () => void;
  level?: number;
  isRoot: boolean;
}

export function NewCategoryInput({
  placeholder,
  parentId,
  categoryName,
  setCategoryName,
  addCategory,
  isCreating,
  cancelAdding,
  level = 0,
  isRoot,
  categorySlug,
  setCategorySlug,
}: NewCategoryInputProps) {
  const addAction = () => {
    if (categoryName.trim()) {
      addCategory(parentId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addAction();
    if (e.key === "Escape") cancelAdding();
  };

  const marginLeft = isRoot ? 0 : `${(level + 1) * 24 - 10}px`; // Adjusting margin for indentation

  return (
    <div
      className={`flex items-center gap-2 py-2 px-3 ${
        isRoot ? "border-2 border-dashed border-border rounded-lg" : "ml-6" // Using padding for child input
      }`}
      style={{ marginLeft: marginLeft }}
    >
      <div className="h-4 w-4 rounded-full bg-primary/20 border-2 border-primary/40" />
      <Input
        placeholder={placeholder}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="h-8 text-sm flex-1"
        onKeyDown={handleKeyDown}
        disabled={isCreating}
        autoFocus
      />
      <SlugInput
        className="flex-1"
        initialValue={categorySlug}
        onGenerate={setCategorySlug}
      />
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={addAction}
        disabled={isCreating || !categoryName.trim()}
      >
        {isCreating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4 text-green-600" />
        )}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={cancelAdding}
        disabled={isCreating}
      >
        <X className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
