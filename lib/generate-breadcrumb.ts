interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: Category[];
  fullPath: string;
}

export function generateBreadcrumb(
  pathStr: string,
  categories: Category[]
): Category[] {
  const segments = pathStr.split("/").filter(Boolean);
  const breadcrumb: Category[] = [];

  let currentLevel = categories;

  for (const slug of segments) {
    const category = currentLevel.find((cat) => cat.slug === slug);
    if (!category) break; // stop if segment not found
    breadcrumb.push(category);
    currentLevel = category.children;
  }

  return breadcrumb;
}
