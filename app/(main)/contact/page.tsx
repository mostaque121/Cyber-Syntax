import type { Metadata } from "next";
import { ContactForm } from "./components/contact-form";
import { ContactInfo } from "./components/contact-info";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cybersyntax.com.bd";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880-1898-887711";
const email = process.env.NEXT_PUBLIC_EMAIL || "support@cybersyntax.com.bd";

// JSON-LD Structured Data for Contact Page
const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // ContactPage Schema
    {
      "@type": "ContactPage",
      "@id": `${baseUrl}/contact/#contactpage`,
      url: `${baseUrl}/contact`,
      name: "Contact Cyber Syntax",
      description:
        "Contact Cyber Syntax for CCTV installation, networking solutions, IT support, and software development services in Dhaka, Bangladesh.",
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
      "@id": `${baseUrl}/contact/#breadcrumb`,
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
          name: "Contact Us",
          item: `${baseUrl}/contact`,
        },
      ],
    },
    // ContactPoint Schema
    {
      "@type": "ContactPoint",
      "@id": `${baseUrl}/contact/#contactpoint`,
      telephone: phone,
      email: email,
      contactType: "customer service",
      availableLanguage: ["English", "Bengali"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Contact Us - Get IT Support & Services in Bangladesh",
  description:
    "Contact Cyber Syntax for CCTV installation, networking solutions, IT support, and software development services in Dhaka, Bangladesh. 24/7 support available. Quick response guaranteed.",
  keywords: [
    "contact Cyber Syntax",
    "IT support contact Dhaka",
    "CCTV installation inquiry",
    "get IT services Bangladesh",
    "contact tech company Bangladesh",
    "IT support phone number",
    "software development inquiry",
    "networking services contact",
    "24/7 IT support Bangladesh",
    "IT company contact Dhaka",
    "technology services inquiry",
    "CCTV quote Bangladesh",
    "IT consultation Bangladesh",
    "contact IT experts",
    "tech support Dhaka",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Cyber Syntax - IT Support & Services Bangladesh",
    description:
      "Reach out to us for professional CCTV installation, networking, IT support & software development. 24/7 support with quick response time.",
    url: `${baseUrl}/contact`,
    images: [
      {
        url: "/contact-og.png",
        width: 1200,
        height: 630,
        alt: "Contact Cyber Syntax - IT Solutions Bangladesh",
      },
    ],
  },
  twitter: {
    title: "Contact Cyber Syntax - IT Support & Services",
    description:
      "Get in touch for CCTV, networking, IT support & software development services in Bangladesh.",
    images: ["/contact-og.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <main className="min-h-screen bg-background">
        {/* Contact Information Section - White */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <ContactInfo />
          </div>
        </div>

        {/* Contact Form Section - Gray */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <ContactForm />
          </div>
        </div>

        {/* Additional Information Section - White */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-primary rounded-[5px] p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <h3 className="text-gray-900 font-semibold mb-2">
                  Round the Clock
                </h3>
                <p className="text-gray-600 text-sm">
                  Our support team is available round the clock to assist you.
                </p>
              </div>

              <div className="bg-white border border-primary rounded-[5px] p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl font-bold text-primary mb-2">
                  &lt;1hr
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">
                  Quick Response
                </h3>
                <p className="text-gray-600 text-sm">
                  Get responses to your queries within less than 1 hour on
                  average.
                </p>
              </div>

              <div className="bg-white border border-primary rounded-[5px] p-6 text-center hover:shadow-lg transition-all">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <h3 className="text-gray-900 font-semibold mb-2">
                  Satisfaction
                </h3>
                <p className="text-gray-600 text-sm">
                  We&apos;re committed to your complete satisfaction and
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
