import type { Metadata } from "next";
import BannerSliderServer from "./components/common/banner-slider-server";
import { FeaturedProducts } from "./components/common/featured-product";
import FeaturesSection from "./components/common/features-section";
import { HomeContactSection } from "./components/common/home-contact-section";
import { HomeFaqSection } from "./components/common/home-faq-section";
import { OurServices } from "./components/common/our-services";
import WhyChooseSection from "./components/common/why-choose-section";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

// JSON-LD Structured Data for Homepage
const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Cyber Syntax",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
      description:
        "Cyber Syntax is a leading IT solutions company in Bangladesh offering CCTV installation, networking solutions, software development, and IT support services.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "143/2, South Kazipara, Mirpur-12",
        addressLocality: "Dhaka",
        postalCode: "1216",
        addressCountry: "BD",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+880-1898-887711",
          contactType: "customer service",
          availableLanguage: ["English", "Bengali"],
        },
      ],
    },
    // LocalBusiness Schema
    {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: "Cyber Syntax",
      image: `${baseUrl}/og-image.png`,
      url: baseUrl,
      telephone: "+880-1898-887711",
      email: "support@cybersyntax.com.bd",
      address: {
        "@type": "PostalAddress",
        streetAddress: "143/2, South Kazipara, Mirpur-12",
        addressLocality: "Dhaka",
        postalCode: "1216",
        addressCountry: "BD",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "৳৳",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
    },
    // WebSite Schema with SearchAction
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Cyber Syntax",
      description:
        "IT Solutions & Tech Products in Bangladesh - CCTV, Networking, Software Development",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },
    // Service Schema - CCTV Installation
    {
      "@type": "Service",
      "@id": `${baseUrl}/services/cctv-solution/#service`,
      name: "CCTV Installation Services",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      serviceType: "Security Camera Installation",
      description:
        "Professional CCTV camera installation services for homes, offices, and businesses in Bangladesh.",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      url: `${baseUrl}/services/cctv-solution`,
    },
    // Service Schema - IT Support
    {
      "@type": "Service",
      "@id": `${baseUrl}/services/it-support/#service`,
      name: "IT Support Services",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      serviceType: "IT Support",
      description:
        "24/7 professional IT support services including computer repair, server maintenance, and technical troubleshooting.",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      url: `${baseUrl}/services/it-support`,
    },
    // Service Schema - Networking
    {
      "@type": "Service",
      "@id": `${baseUrl}/services/networking-solution/#service`,
      name: "Networking Solutions",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      serviceType: "Network Installation",
      description:
        "Professional networking solutions including LAN/WAN setup, WiFi installation, and network infrastructure services.",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      url: `${baseUrl}/services/networking-solution`,
    },
    // Service Schema - Software Development
    {
      "@type": "Service",
      "@id": `${baseUrl}/services/software-development/#service`,
      name: "Software Development Services",
      provider: {
        "@id": `${baseUrl}/#organization`,
      },
      serviceType: "Software Development",
      description:
        "Custom software development, web applications, mobile apps, and e-commerce solutions for businesses.",
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      url: `${baseUrl}/services/software-development`,
    },
  ],
};

export const metadata: Metadata = {
  title: " Tech Solutions & Services",
  description:
    "Professional IT support, CCTV installation, networking solutions, and software services in Bangladesh. Quality tech products and reliable service from CyberSyntax.",
  keywords: [
    "Cyber Syntax",
    "IT solutions Bangladesh",
    "CCTV installation Dhaka",
    "CCTV camera Bangladesh",
    "security camera installation",
    "IT support Bangladesh",
    "IT support services Dhaka",
    "software development Bangladesh",
    "custom software development",
    "web development Bangladesh",
    "networking solutions",
    "network setup Bangladesh",
    "tech products Bangladesh",
    "computer accessories Dhaka",
    "IT company Bangladesh",
    "IT services Dhaka",
    "surveillance system Bangladesh",
    "home security camera",
    "office CCTV installation",
    "network infrastructure",
    "IT consulting Bangladesh",
    "computer repair Dhaka",
    "laptop repair Bangladesh",
    "server setup Bangladesh",
    "cloud solutions Bangladesh",
    "CCTV camera price BD",
    "best IT company Bangladesh",
    "technology services Dhaka",
    "business IT solutions",
    "cyber security Bangladesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cyber Syntax - Best IT Solutions & Security Services in Bangladesh",
    description:
      "Top-quality CCTV installation, networking solutions, IT support, and software development services in Dhaka, Bangladesh. Your trusted technology partner.",
    url: baseUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cyber Syntax - IT Solutions & Tech Products in Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Cyber Syntax - Best IT Solutions & Security Services",
    description:
      "CCTV installation, networking, IT support & software development in Bangladesh.",
    images: ["/og-image.png"],
  },
};

export default async function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <div>
        <BannerSliderServer />
        <OurServices />
        <FeaturedProducts />
        <FeaturesSection />
        <WhyChooseSection />
        <HomeFaqSection />
        <HomeContactSection />
      </div>
    </>
  );
}
