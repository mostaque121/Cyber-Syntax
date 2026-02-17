import type { Metadata } from "next";
import { CtaSection } from "./components/cta-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { MissionVision } from "./components/mission-vision";
import { ServicesOverview } from "./components/services-overview";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";

// JSON-LD Structured Data for About Page
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // AboutPage Schema
    {
      "@type": "AboutPage",
      "@id": `${baseUrl}/about-us/#aboutpage`,
      url: `${baseUrl}/about-us`,
      name: "About Cyber Syntax",
      description:
        "Learn about Cyber Syntax, a trusted IT solutions company in Bangladesh providing CCTV installation, networking, software development, and IT support services.",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      about: {
        "@id": `${baseUrl}/#organization`,
      },
    },
    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/about-us/#breadcrumb`,
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
          name: "About Us",
          item: `${baseUrl}/about-us`,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "About Us - Leading IT Company in Bangladesh",
  description:
    "Learn about Cyber Syntax, a trusted IT solutions company in Bangladesh. We provide professional CCTV installation, networking, software development, and IT support services with a commitment to excellence.",
  keywords: [
    "about Cyber Syntax",
    "IT company Bangladesh",
    "about us IT services",
    "Cyber Syntax team",
    "IT solutions provider Dhaka",
    "technology company Bangladesh",
    "IT company history",
    "trusted IT partner Bangladesh",
    "software company about",
    "CCTV company Bangladesh",
    "networking company Dhaka",
    "IT support team",
    "professional IT services",
    "Bangladesh tech company",
    "IT experts Dhaka",
  ],
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Cyber Syntax - Leading IT Company in Bangladesh",
    description:
      "Discover our mission, vision, and commitment to providing top-quality IT solutions in Bangladesh. Your trusted technology partner since day one.",
    url: `${baseUrl}/about-us`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Cyber Syntax - IT Solutions Company Bangladesh",
      },
    ],
  },
  twitter: {
    title: "About Cyber Syntax - Leading IT Company in Bangladesh",
    description:
      "Learn about our mission to deliver excellence in CCTV, networking, IT support & software development.",
    images: ["/og-image.png"],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <main className="min-h-screen bg-background">
        {/* Hero Section - White */}
        <div className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <HeroSection />
          </div>
        </div>

        {/* Mission Vision - Gray */}
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <MissionVision />
          </div>
        </div>

        {/* Services Overview - White */}
        <div className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <ServicesOverview />
          </div>
        </div>

        {/* FAQ Section - Gray */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <FaqSection />
          </div>
        </div>

        {/* CTA Section - Primary Gradient */}
        <div className="bg-linear-to-br from-primary to-primary/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <CtaSection />
          </div>
        </div>
      </main>
    </>
  );
}
