import type { Metadata } from "next";
import { ContactSectionForSoftwareDevelopment } from "./components/contact-section";
import { SoftwareDevelopmentHero } from "./components/hero";
import { SoftwareDevelopmentServices } from "./components/software-development-service";
import { WhyChooseForSoftwareDevelopment } from "./components/why-chose";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

export const metadata: Metadata = {
  title: "Software Development Services - Custom Solutions in Bangladesh",
  description:
    "Professional software development services in Dhaka, Bangladesh. We build custom web applications, mobile apps, e-commerce solutions, and enterprise software tailored to your business needs.",
  keywords: [
    "software development Bangladesh",
    "custom software development Dhaka",
    "web development Bangladesh",
    "mobile app development",
    "e-commerce development",
    "web application Bangladesh",
    "software company Dhaka",
    "React development Bangladesh",
    "Next.js development",
    "Node.js development",
    "enterprise software",
    "custom web application",
    "business software solutions",
    "software developers Bangladesh",
    "full stack development",
    "frontend development Dhaka",
    "backend development",
    "API development Bangladesh",
    "SaaS development",
    "CMS development",
  ],
  alternates: {
    canonical: "/services/software-development",
  },
  openGraph: {
    title: "Custom Software Development Services - Cyber Syntax Bangladesh",
    description:
      "Web apps, mobile apps, e-commerce & enterprise software development. Expert developers in Dhaka, Bangladesh.",
    url: `${baseUrl}/services/software-development`,
    images: [
      {
        url: "/software-og.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax Software Development Services Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Custom Software Development - Cyber Syntax",
    description:
      "Professional web & mobile app development services in Bangladesh.",
    images: ["/software-og.png"],
  },
};

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

const softwareDevSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Software Development Services",
      description:
        "Professional software development services in Dhaka, Bangladesh. Custom web applications, mobile apps, e-commerce solutions, and enterprise software tailored to your business needs.",
      url: `${baseUrl}/services/software-development`,
      serviceType: "Software Development",
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
        name: "Software Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Web Application Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Software Solutions",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "API Development & Integration",
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
          name: "Software Development",
          item: `${baseUrl}/services/software-development`,
        },
      ],
    },
  ],
};

export default function SoftwareDevelopmentPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareDevSchema) }}
      />
      <SoftwareDevelopmentHero />
      <SoftwareDevelopmentServices />
      <WhyChooseForSoftwareDevelopment />
      <ContactSectionForSoftwareDevelopment />
    </div>
  );
}
