import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAllProducts,
  getProductBySlug,
} from "../../actions/product-actions";
import { ProductBreadcrumb } from "../components/product-bredcrumb";
import { ProductDetails } from "../components/product-details";
import { ProductImages } from "../components/product-images";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate dynamic metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug({ slug });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const featuredImage =
    product.images.find((img) => img.isFeatured)?.url || product.images[0]?.url;

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  const priceText =
    product.discountPercentage > 0
      ? `৳${discountedPrice.toLocaleString()} (${product.discountPercentage}% off)`
      : `৳${product.price.toLocaleString()}`;

  const description =
    product.shortDescription ||
    `Buy ${product.title} from Cyber Syntax at ${priceText}. ${product.brand ? `Brand: ${product.brand}.` : ""} Quality tech products with warranty in Bangladesh.`;

  const categoryName = product.category?.name || "Products";

  return {
    title: `${product.title} - ${categoryName}`,
    description: description.slice(0, 160),
    keywords: [
      product.title,
      product.brand,
      categoryName,
      `${product.title} price Bangladesh`,
      `buy ${product.title}`,
      `${product.title} Dhaka`,
      `${categoryName} Bangladesh`,
      "tech products Bangladesh",
      "buy online Bangladesh",
      "Cyber Syntax products",
    ].filter(Boolean),
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: `${product.title} | Cyber Syntax`,
      description: description.slice(0, 200),
      url: `${baseUrl}/product/${slug}`,
      type: "website",
      images: featuredImage
        ? [
            {
              url: featuredImage,
              width: 800,
              height: 800,
              alt: product.title,
            },
          ]
        : [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: product.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - ${priceText}`,
      description: description.slice(0, 150),
      images: featuredImage ? [featuredImage] : ["/og-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug({ slug });
  if (!product) {
    notFound();
  }

  const discountedPrice =
    product.discountPercentage > 0
      ? Math.round(
          product.price - (product.price * product.discountPercentage) / 100,
        )
      : product.price;

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${baseUrl}/products`,
    },
  ];

  if (product.category) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: product.category.name,
      item: `${baseUrl}/products/${product.category.fullPath}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: product.title,
      item: `${baseUrl}/product/${slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: product.title,
      item: `${baseUrl}/product/${slug}`,
    });
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        description: product.shortDescription || product.title,
        image: product.images.map((img) => img.url),
        url: `${baseUrl}/product/${slug}`,
        sku: product.id,
        ...(product.brand && {
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
        }),
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/product/${slug}`,
          price: discountedPrice,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Cyber Syntax",
            url: baseUrl,
          },
        },
        ...(product.warranty && {
          warranty: {
            "@type": "WarrantyPromise",
            durationOfWarranty: {
              "@type": "QuantitativeValue",
              value: product.warranty,
              unitText: "warranty",
            },
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ],
  };

  return (
    <div className="container px-4 md:px-8 mx-auto py-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductBreadcrumb
        productTitle={product.title}
        category={product.category}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <ProductImages images={product.images} />
        <ProductDetails
          image={
            product.images.find((img) => img.isFeatured)?.url ||
            product.images[0].url
          }
          productId={product.id}
          title={product.title}
          brand={product.brand}
          description={product.shortDescription ?? ""}
          price={product.price}
          warranty={product.warranty}
          discountPercentage={product.discountPercentage}
          productType={product.productType}
          isHotDeal={product.isHotDeal}
        />
      </div>
      {product.longDescription && (
        <div
          className="py-16! ql-editor"
          dangerouslySetInnerHTML={{ __html: product.longDescription }}
        />
      )}
    </div>
  );
}
