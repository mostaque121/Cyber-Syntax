"use client";

import { createContext, useContext, type ReactNode } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
  fullPath: string;
}

// Define the context type
export interface CategoryContextType {
  categories: Category[];
}

// Create the context with a default empty value
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

// Provider component
export function CategoryProvider({
  children,
  initialCategory,
}: {
  children: ReactNode;
  initialCategory: Category[];
}) {
  // The value we'll provide to consumers
  const value: CategoryContextType = {
    categories: initialCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

// Custom hook for client components to use the context
export function useCategory() {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
}
