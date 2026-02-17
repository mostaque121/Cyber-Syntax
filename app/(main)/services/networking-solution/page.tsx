import type { Metadata } from "next";
import { ContactSectionForNetworking } from "./components/contact-section";
import { NetworkingSolutionHero } from "./components/hero";
import { NetworkingServices } from "./components/networking-service";
import { WhyChooseForNetworking } from "./components/why-choose";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

export const metadata: Metadata = {
  title: "Networking Solutions - Professional Network Setup in Bangladesh",
  description:
    "Expert networking solutions in Dhaka, Bangladesh. We provide LAN/WAN setup, network infrastructure, WiFi installation, server configuration, and network security services for businesses.",
  keywords: [
    "networking solutions Bangladesh",
    "network setup Dhaka",
    "LAN installation Bangladesh",
    "WAN setup services",
    "WiFi installation Dhaka",
    "office networking",
    "network infrastructure",
    "server configuration Bangladesh",
    "network security services",
    "structured cabling Dhaka",
    "network maintenance",
    "business networking solutions",
    "wireless network setup",
    "router configuration",
    "network troubleshooting",
    "corporate networking Bangladesh",
    "data center networking",
    "VPN setup Bangladesh",
    "firewall installation",
    "network consulting Dhaka",
  ],
  alternates: {
    canonical: "/services/networking-solution",
  },
  openGraph: {
    title: "Professional Networking Solutions - Cyber Syntax Bangladesh",
    description:
      "LAN/WAN setup, WiFi installation, network security & server configuration services for businesses in Dhaka, Bangladesh.",
    url: `${baseUrl}/services/networking-solution`,
    images: [
      {
        url: "/networking-og.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax Networking Solutions Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Professional Networking Solutions - Cyber Syntax",
    description:
      "Expert network setup & infrastructure services for businesses in Bangladesh.",
    images: ["/networking-og.png"],
  },
};

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

const networkingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Networking Solutions",
      description:
        "Expert networking solutions in Dhaka, Bangladesh. LAN/WAN setup, network infrastructure, WiFi installation, server configuration, and network security services for businesses.",
      url: `${baseUrl}/services/networking-solution`,
      serviceType: "Network Installation & Configuration",
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
        name: "Networking Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "LAN/WAN Setup",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "WiFi Installation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Server Configuration",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Network Security",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Structured Cabling",
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
          name: "Networking Solution",
          item: `${baseUrl}/services/networking-solution`,
        },
      ],
    },
  ],
};

export default function NetworkingSolutionPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(networkingSchema) }}
      />
      <NetworkingSolutionHero />
      <NetworkingServices />
      <WhyChooseForNetworking />
      <ContactSectionForNetworking />
    </div>
  );
}
