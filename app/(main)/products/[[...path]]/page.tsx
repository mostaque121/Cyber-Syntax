import { getAllProducts } from "../../actions/product-actions";
import { ProductList } from "../components/product-list";

// 1. GENERATE STATIC PATHS
// This tells Next.js to pre-build a page for every category found in your DB
export async function generateStaticParams() {
  const products = await getAllProducts();

  // Extract unique category paths (e.g., "men", "men/shoes")
  const uniquePaths = new Set(
    products.map((p) => p.category?.fullPath).filter(Boolean)
  );

  // Return array format required by Next.js: [{ path: [] }, { path: ['men'] }]
  return [
    { path: [] }, // The root page (/)
    ...Array.from(uniquePaths).map((p) => ({ path: p!.split("/") })),
  ];
}

interface ProductPageProps {
  params: Promise<{ path?: string[] }>;
}

// 2. THE SERVER COMPONENT
export default async function ProductPage({ params }: ProductPageProps) {
  // Await params (Next.js 15 requirement)
  const pathData = await params;
  const fullPath = pathData.path?.join("/");

  // Fetch the Master List (Cached via unstable_cache)
  const allProducts = await getAllProducts();

  // 3. FILTER BY CATEGORY (Server-Side)
  // We filter ONLY by path here. Sorting/Price filtering happens on the client.
  let displayedProducts = allProducts;

  if (fullPath) {
    displayedProducts = allProducts.filter((p) =>
      p.category?.fullPath?.startsWith(fullPath)
    );
  }

  // Optional: Determine a title for the page
  const pageTitle = fullPath
    ? fullPath.split("/").pop() // e.g., "shoes"
    : "All Products";

  return (
    <ProductList initialProducts={displayedProducts} categoryName={pageTitle} />
  );
}
