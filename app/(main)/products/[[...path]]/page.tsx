import type { Metadata } from "next";
import { getAllProducts } from "../../actions/product-actions";
import { ProductList } from "../components/product-list";
import { ProductsCTASection } from "../components/products-cta-section";
import { ProductsTrustSection } from "../components/products-trust-section";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

// 1. GENERATE STATIC PATHS
// This tells Next.js to pre-build a page for every category found in your DB
export async function generateStaticParams() {
  const products = await getAllProducts();

  // Extract unique category paths (e.g., "men", "men/shoes")
  const uniquePaths = new Set(
    products.map((p) => p.category?.fullPath).filter(Boolean),
  );

  // Return array format required by Next.js: [{ path: [] }, { path: ['men'] }]
  return [
    { path: [] }, // The root page (/)
    ...Array.from(uniquePaths).map((p) => ({ path: p!.split("/") })),
  ];
}

// GENERATE METADATA DYNAMICALLY
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const pathData = await params;
  const fullPath = pathData.path?.join("/");

  // Format category name for display
  const categoryName = fullPath
    ? fullPath
        .split("/")
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  const title = categoryName
    ? `${categoryName} - Tech Products & Accessories`
    : "All Products - Tech Products & Accessories in Bangladesh";

  const description = categoryName
    ? `Shop ${categoryName} at Cyber Syntax. Best prices on quality tech products, CCTV cameras, networking equipment, and computer accessories in Dhaka, Bangladesh.`
    : "Browse our complete collection of tech products, CCTV cameras, networking equipment, and computer accessories. Best prices in Dhaka, Bangladesh with fast delivery.";

  const canonicalPath = fullPath ? `/products/${fullPath}` : "/products";

  return {
    title,
    description,
    keywords: [
      "tech products Bangladesh",
      "buy electronics Dhaka",
      "CCTV camera price BD",
      "networking equipment Bangladesh",
      "computer accessories Dhaka",
      "tech shop Bangladesh",
      "online electronics store",
      "IT products Bangladesh",
      "security camera buy",
      "router price Bangladesh",
      "computer parts Dhaka",
      "tech gadgets BD",
      ...(categoryName
        ? [`${categoryName} Bangladesh`, `buy ${categoryName}`]
        : []),
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: categoryName
        ? `${categoryName} - Cyber Syntax Bangladesh`
        : "All Products - Cyber Syntax Bangladesh",
      description,
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: categoryName
            ? `${categoryName} - Cyber Syntax Products`
            : "Cyber Syntax Tech Products Bangladesh",
        },
      ],
    },
    twitter: {
      title: categoryName
        ? `${categoryName} - Cyber Syntax`
        : "Tech Products - Cyber Syntax",
      description,
      images: ["/og-image.png"],
    },
  };
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
      p.category?.fullPath?.startsWith(fullPath),
    );
  }

  // Optional: Determine a title for the page
  const pageTitle = fullPath
    ? fullPath.split("/").pop() // e.g., "shoes"
    : "All Products";

  // Format category name for display
  const categoryName = fullPath
    ? fullPath
        .split("/")
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem" as const,
      position: 2,
      name: "Products",
      item: `${baseUrl}/products`,
    },
  ];

  // Add category breadcrumbs if applicable
  if (fullPath) {
    const pathParts = fullPath.split("/");
    pathParts.forEach((part, index) => {
      const partName = part
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      const partPath = pathParts.slice(0, index + 1).join("/");
      breadcrumbItems.push({
        "@type": "ListItem" as const,
        position: index + 3,
        name: partName,
        item: `${baseUrl}/products/${partPath}`,
      });
    });
  }

  // Create product list items for schema (limit to first 10 for schema)
  const productListItems = displayedProducts
    .slice(0, 10)
    .map((product, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@type": "Product" as const,
        name: product.title,
        url: `${baseUrl}/product/${product.slug}`,
        image: product.images?.[0]?.url || "/og-image.png",
        offers: {
          "@type": "Offer" as const,
          price: product.discountPercentage
            ? Math.round(product.price * (1 - product.discountPercentage / 100))
            : product.price,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
        },
      },
    }));

  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: categoryName
          ? `${categoryName} - Tech Products`
          : "All Products - Tech Products & Accessories",
        description: categoryName
          ? `Shop ${categoryName} at Cyber Syntax. Best prices on quality tech products in Bangladesh.`
          : "Browse our complete collection of tech products, CCTV cameras, and computer accessories.",
        url: fullPath
          ? `${baseUrl}/products/${fullPath}`
          : `${baseUrl}/products`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: displayedProducts.length,
          itemListElement: productListItems,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ],
  };

  return (
    <div className="container mx-auto md:px-8 py-6 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      <ProductList
        initialProducts={displayedProducts}
        categoryName={pageTitle}
      />
      <ProductsTrustSection />

      <ProductsCTASection />
    </div>
  );
}
