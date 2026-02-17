import type { Metadata } from "next";
import { ContactSectionForITSupport } from "./components/contact-section";
import { ItSupportHero } from "./components/hero";
import { ITSupportServices } from "./components/it-support-service";
import { WhyChooseForITSupport } from "./components/why-chose";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

export const metadata: Metadata = {
  title: "IT Support Services - Professional Tech Support in Bangladesh",
  description:
    "Get reliable IT support services from Cyber Syntax in Dhaka, Bangladesh. 24/7 technical support, computer repair, server maintenance, troubleshooting, and managed IT services for businesses.",
  keywords: [
    "IT support Bangladesh",
    "IT support services Dhaka",
    "computer repair Bangladesh",
    "technical support Dhaka",
    "managed IT services",
    "24/7 IT support",
    "server maintenance Bangladesh",
    "IT troubleshooting",
    "laptop repair Dhaka",
    "business IT support",
    "IT helpdesk Bangladesh",
    "remote IT support",
    "onsite IT support Dhaka",
    "computer maintenance services",
    "IT infrastructure support",
  ],
  alternates: {
    canonical: "/services/it-support",
  },
  openGraph: {
    title: "Professional IT Support Services in Bangladesh - Cyber Syntax",
    description:
      "24/7 IT support, computer repair, server maintenance & managed IT services for businesses in Dhaka, Bangladesh.",
    url: `${baseUrl}/services/it-support`,
    images: [
      {
        url: "/it-og.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax IT Support Services Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Professional IT Support Services - Cyber Syntax",
    description:
      "24/7 IT support, computer repair & managed IT services in Bangladesh.",
    images: ["/it-og.png"],
  },
};

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

const itSupportSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "IT Support Services",
      description:
        "Professional IT support services including 24/7 technical support, computer repair, server maintenance, troubleshooting, and managed IT services for businesses in Bangladesh.",
      url: `${baseUrl}/services/it-support`,
      serviceType: "IT Support",
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
        name: "IT Support Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "24/7 Technical Support",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Computer Repair & Maintenance",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Server Maintenance",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Managed IT Services",
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
          name: "IT Support",
          item: `${baseUrl}/services/it-support`,
        },
      ],
    },
  ],
};

export default function ItSupportPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itSupportSchema) }}
      />
      <ItSupportHero />
      <ITSupportServices />
      <WhyChooseForITSupport />
      <ContactSectionForITSupport />
    </div>
  );
}
