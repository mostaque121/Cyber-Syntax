import type { Metadata } from "next";
import { HowToGetService } from "./components/how-to-get-service";
import { ServicesHero } from "./components/services-hero";
import { ServicesList } from "./components/services-list";
import { WhyChooseUs } from "./components/why-choose-us";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

export const metadata: Metadata = {
  title: "IT Services - CCTV, Networking, Software Development & IT Support",
  description:
    "Explore Cyber Syntax's professional IT services in Bangladesh. We offer CCTV installation, networking solutions, software development, and IT support services for businesses and homes in Dhaka.",
  keywords: [
    "IT services Bangladesh",
    "CCTV installation service Dhaka",
    "networking services Bangladesh",
    "software development services",
    "IT support services Dhaka",
    "professional CCTV installation",
    "network setup service",
    "custom software development",
    "web development services",
    "IT consulting Bangladesh",
    "security camera installation",
    "office networking Dhaka",
    "home CCTV installation",
    "server setup services",
    "IT infrastructure services",
    "managed IT services Bangladesh",
    "business IT solutions",
    "technology services Dhaka",
    "computer repair services",
    "network maintenance Bangladesh",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Professional IT Services in Bangladesh - Cyber Syntax",
    description:
      "CCTV installation, networking solutions, software development & IT support services. Trusted by businesses across Dhaka, Bangladesh.",
    url: `${baseUrl}/services`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax IT Services - CCTV, Networking, Software Development",
      },
    ],
  },
  twitter: {
    title: "Professional IT Services in Bangladesh - Cyber Syntax",
    description:
      "CCTV, networking, software development & IT support services in Dhaka, Bangladesh.",
    images: ["/og-image.png"],
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "IT Services by Cyber Syntax",
      description:
        "Professional IT services including CCTV installation, networking solutions, software development, and IT support in Bangladesh.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "CCTV Installation Services",
            description:
              "Professional CCTV installation services for homes and businesses. HD cameras, IP cameras, DVR/NVR systems with expert installation.",
            url: `${baseUrl}/services/cctv-solution`,
            provider: {
              "@type": "Organization",
              name: "Cyber Syntax",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            name: "Networking Solutions",
            description:
              "Expert networking solutions including LAN/WAN setup, network infrastructure, WiFi installation, and server configuration.",
            url: `${baseUrl}/services/networking-solution`,
            provider: {
              "@type": "Organization",
              name: "Cyber Syntax",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            name: "Software Development",
            description:
              "Custom software development including web applications, mobile apps, e-commerce solutions, and enterprise software.",
            url: `${baseUrl}/services/software-development`,
            provider: {
              "@type": "Organization",
              name: "Cyber Syntax",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Service",
            name: "IT Support Services",
            description:
              "24/7 IT support, computer repair, server maintenance, troubleshooting, and managed IT services.",
            url: `${baseUrl}/services/it-support`,
            provider: {
              "@type": "Organization",
              name: "Cyber Syntax",
            },
          },
        },
      ],
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
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Hero Section - White */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ServicesHero />
        </div>
      </div>

      {/* Services List - Gray */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ServicesList />
        </div>
      </div>

      {/* Why Choose Us - White */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <WhyChooseUs />
        </div>
      </div>

      {/* How to Get Service - Gray */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <HowToGetService />
        </div>
      </div>
    </main>
  );
}
