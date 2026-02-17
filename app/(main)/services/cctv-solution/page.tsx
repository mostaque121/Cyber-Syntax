import type { Metadata } from "next";
import { getAllCctvPackages } from "../../actions/cctv-package-actions";
import { CctvPackages } from "./components/cctv-packages";
import { CctvSolutionHero } from "./components/hero";
import { WhyChooseOurCctvService } from "./components/why-choose-us";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

export const metadata: Metadata = {
  title: "CCTV Installation Services - Security Camera Solutions in Bangladesh",
  description:
    "Professional CCTV installation services in Dhaka, Bangladesh. Get HD security cameras, IP cameras, DVR/NVR systems for homes, offices, and businesses. Affordable packages with expert installation.",
  keywords: [
    "CCTV installation Bangladesh",
    "CCTV camera Dhaka",
    "security camera installation",
    "CCTV camera price BD",
    "IP camera Bangladesh",
    "HD CCTV camera",
    "home security camera",
    "office CCTV installation",
    "DVR system Bangladesh",
    "NVR system Dhaka",
    "surveillance camera",
    "CCTV packages Bangladesh",
    "best CCTV company Dhaka",
    "security system installation",
    "CCTV camera service",
    "wireless CCTV camera",
    "outdoor security camera",
    "indoor CCTV camera",
    "CCTV maintenance Bangladesh",
    "24/7 surveillance system",
  ],
  alternates: {
    canonical: "/services/cctv-solution",
  },
  openGraph: {
    title: "Professional CCTV Installation Services - Cyber Syntax Bangladesh",
    description:
      "HD security cameras, IP cameras & complete surveillance solutions for homes and businesses in Dhaka. Affordable packages with expert installation.",
    url: `${baseUrl}/services/cctv-solution`,
    images: [
      {
        url: "/cctv-og.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax CCTV Installation Services Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Professional CCTV Installation - Cyber Syntax",
    description:
      "Security camera installation services for homes & businesses in Bangladesh.",
    images: ["/cctv-og.png"],
  },
};

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

const cctvSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "CCTV Installation Services",
      description:
        "Professional CCTV installation services in Dhaka, Bangladesh. HD security cameras, IP cameras, DVR/NVR systems for homes, offices, and businesses with expert installation.",
      url: `${baseUrl}/services/cctv-solution`,
      serviceType: "CCTV Installation",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      provider: {
        "@type": "Organization",
        name: "Cyber Syntax",
        url: baseUrl,
        telephone: phone,
        email: email,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CCTV Packages",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HD CCTV Camera Installation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "IP Camera Setup",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "DVR/NVR System Installation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CCTV Maintenance & Support",
            },
          },
        ],
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
      ],
    },
  ],
};

export default async function CctvSolutionPage() {
  const cctvPackages = await getAllCctvPackages();
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cctvSchema) }}
      />
      <CctvSolutionHero />
      <CctvPackages cctvPackages={cctvPackages} />
      <WhyChooseOurCctvService />
    </div>
  );
}
