"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onSearch?: (value: string) => void;
  className?: string; // added className prop for custom styling
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onSearch,
  className,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative w-full ", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      {/* Input */}
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10"
      />
      {/* Clear Button - only show if there's a value */}
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
