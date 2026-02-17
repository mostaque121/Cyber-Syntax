import {
  getAllCctvPackages,
  getCctvPackageBySlug,
} from "@/app/(main)/actions/cctv-package-actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "react-quill-new/dist/quill.snow.css";
import { CctvPackageBreadcrumb } from "./components/cctvpackage-bredcrumb";
import { CctvPackageDetails } from "./components/cctvpackage-details";
import { CctvPackageImages } from "./components/cctvpackage-images";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

// Generate static params for all CCTV packages
export async function generateStaticParams() {
  const packages = await getAllCctvPackages();

  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

// Generate dynamic metadata for each CCTV package
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cctvPackage = await getCctvPackageBySlug({ slug });

  if (!cctvPackage) {
    return {
      title: "CCTV Package Not Found",
      description: "The requested CCTV package could not be found.",
    };
  }

  const featuredImage =
    cctvPackage.images.find((img) => img.isFeatured)?.url ||
    cctvPackage.images[0]?.url;

  const discountedPrice =
    cctvPackage.discountPercentage > 0
      ? cctvPackage.price -
        (cctvPackage.price * cctvPackage.discountPercentage) / 100
      : cctvPackage.price;

  const priceText =
    cctvPackage.discountPercentage > 0
      ? `৳${discountedPrice.toLocaleString()} (${cctvPackage.discountPercentage}% off)`
      : `৳${cctvPackage.price.toLocaleString()}`;

  const description =
    cctvPackage.shortDescription ||
    `Get ${cctvPackage.title} at ${priceText}. Professional CCTV installation package with expert setup and warranty in Bangladesh.`;

  return {
    title: `${cctvPackage.title} - CCTV Package`,
    description: description.slice(0, 160),
    keywords: [
      cctvPackage.title,
      "CCTV package Bangladesh",
      "CCTV installation package",
      "security camera package Dhaka",
      `${cctvPackage.title} price`,
      "CCTV camera package BD",
      "surveillance package",
      "home CCTV package",
      "office CCTV package",
      "Cyber Syntax CCTV",
    ],
    alternates: {
      canonical: `/services/cctv-solution/${slug}`,
    },
    openGraph: {
      title: `${cctvPackage.title} | Cyber Syntax`,
      description: description.slice(0, 200),
      url: `${baseUrl}/services/cctv-solution/${slug}`,
      type: "website",
      images: featuredImage
        ? [
            {
              url: featuredImage,
              width: 800,
              height: 800,
              alt: cctvPackage.title,
            },
          ]
        : [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: cctvPackage.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cctvPackage.title} - ${priceText}`,
      description: description.slice(0, 150),
      images: featuredImage ? [featuredImage] : ["/og-image.png"],
    },
  };
}

export default async function CctvPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cctvPackage = await getCctvPackageBySlug({ slug });
  if (!cctvPackage) {
    notFound();
  }

  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

  const discountedPrice =
    cctvPackage.discountPercentage > 0
      ? Math.round(
          cctvPackage.price -
            (cctvPackage.price * cctvPackage.discountPercentage) / 100,
        )
      : cctvPackage.price;

  const cctvPackageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: cctvPackage.title,
        description:
          cctvPackage.shortDescription || `${cctvPackage.title} CCTV Package`,
        image: cctvPackage.images.map((img) => img.url),
        url: `${baseUrl}/services/cctv-solution/${slug}`,
        sku: cctvPackage.id,
        category: "CCTV Installation Package",
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/services/cctv-solution/${slug}`,
          price: discountedPrice,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Cyber Syntax",
            url: baseUrl,
            telephone: phone,
            email: email,
          },
        },
      },
      {
        "@type": "Service",
        serviceType: "CCTV Installation",
        name: cctvPackage.title,
        description:
          cctvPackage.shortDescription ||
          "Professional CCTV installation package with expert setup",
        provider: {
          "@type": "Organization",
          name: "Cyber Syntax",
          url: baseUrl,
        },
        areaServed: {
          "@type": "Country",
          name: "Bangladesh",
        },
        offers: {
          "@type": "Offer",
          price: discountedPrice,
          priceCurrency: "BDT",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${baseUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "CCTV Solution",
            item: `${baseUrl}/services/cctv-solution`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: cctvPackage.title,
            item: `${baseUrl}/services/cctv-solution/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="container px-4 md:px-8 mx-auto py-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cctvPackageSchema) }}
      />
      <CctvPackageBreadcrumb title={cctvPackage.title} />
      <div className="flex flex-col md:flex-row gap-8">
        <CctvPackageImages images={cctvPackage.images} />
        <CctvPackageDetails
          title={cctvPackage.title}
          shortDescription={cctvPackage.shortDescription}
          price={cctvPackage.price}
          discountPercentage={cctvPackage.discountPercentage}
        />
      </div>
      <div
        className="py-16! ql-editor"
        dangerouslySetInnerHTML={{ __html: cctvPackage.longDescription }}
      />
    </div>
  );
}
