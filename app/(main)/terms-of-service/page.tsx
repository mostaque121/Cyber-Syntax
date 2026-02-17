import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read our terms of service to understand the rules and regulations for using Cyber Syntax services and website.",
  alternates: {
    canonical: "/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    "143/2, South Kazipara, Mirpur-12, Dhaka-1216";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500">Last updated: January 31, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the Cyber Syntax website and services,
                you accept and agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Description of Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cyber Syntax provides IT solutions including CCTV installation,
                IT support, software development, networking solutions, and
                quality tech products. All services are performed by qualified
                technicians and products come with warranty coverage as
                specified.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate
                and complete information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your contact information is up to date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Product Information & Pricing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide accurate product descriptions and pricing.
                However:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  Prices are subject to change without notice until order
                  confirmation
                </li>
                <li>
                  Product images are for illustration purposes and may vary
                  slightly
                </li>
                <li>
                  We reserve the right to correct any errors in pricing or
                  descriptions
                </li>
                <li>
                  Stock availability is not guaranteed until order is confirmed
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Orders & Payments
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By placing an order, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide valid payment information</li>
                <li>
                  Pay all charges at the prices in effect at time of order
                </li>
                <li>Pay any applicable taxes and shipping fees</li>
                <li>
                  Accept that we may cancel orders for reasons including pricing
                  errors, product unavailability, or suspected fraud
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Shipping & Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Delivery times are estimates only and not guaranteed. We are not
                responsible for delays caused by shipping carriers, customs, or
                circumstances beyond our control. Risk of loss transfers to you
                upon delivery to the carrier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Returns & Refunds
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer a 15-day return policy for most products. To be
                eligible:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  Product must be in original condition with all accessories
                </li>
                <li>Original packaging must be intact</li>
                <li>
                  Return request must be initiated within 15 days of delivery
                </li>
                <li>
                  Refunds will be processed within 7-10 business days after
                  inspection
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Warranty
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All certified devices come with a 12-month warranty covering
                manufacturing defects and hardware failures. Warranty does not
                cover physical damage, water damage, unauthorized modifications,
                or normal wear and tear.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, Cyber Syntax shall not
                be liable for any indirect, incidental, special, consequential,
                or punitive damages arising from your use of our services or
                products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of our services after changes constitutes acceptance of the
                modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> {email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {phone}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {address}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
