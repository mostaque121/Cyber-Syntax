import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Cyber Syntax collects, uses, and protects your personal information. Your privacy matters to us.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last updated: January 31, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Cyber Syntax and Engineering Ltd, we are committed to
                protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, use our services (including CCTV
                installation, IT support, software development, and networking
                solutions), or purchase our tech products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, company name, and service location address
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password, and
                  account preferences
                </li>
                <li>
                  <strong>Payment Information:</strong> Payment method details
                  (processed securely through our payment providers)
                </li>
                <li>
                  <strong>Service Information:</strong> Details about your
                  service requirements, site surveys, and installation
                  preferences
                </li>
                <li>
                  <strong>Communication Data:</strong> Messages, feedback,
                  support tickets, and inquiries you send to us
                </li>
                <li>
                  <strong>Order History:</strong> Products purchased, services
                  availed, order dates, and transaction details
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Information Collected Automatically
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Device Information:</strong> Browser type, operating
                  system, device type, and unique device identifiers
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent on
                  pages, links clicked, and browsing patterns
                </li>
                <li>
                  <strong>Location Data:</strong> General geographic location
                  based on IP address
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your
                  device to enhance your experience
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Process and fulfill your orders and service requests</li>
                <li>
                  Schedule and complete CCTV installations, IT support visits,
                  and other on-site services
                </li>
                <li>
                  Send order confirmations, service updates, and delivery
                  notifications
                </li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our website, products, and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Detect and prevent fraud or unauthorized activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Payment processors,
                  shipping companies, and technical partners who assist in our
                  operations
                </li>
                <li>
                  <strong>Installation Teams:</strong> Our technicians who
                  require address and contact information for on-site services
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to
                  protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We do not sell, rent, or trade your personal information to
                third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes
                SSL encryption, secure servers, and regular security audits.
                However, no method of transmission over the Internet is 100%
                secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Keep you logged in to your account</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Personalize your browsing experience</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                You can control cookie preferences through your browser
                settings. Disabling cookies may affect some website
                functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this policy, unless a longer
                retention period is required by law. When data is no longer
                needed, we securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children. If we become aware that we have collected data from a
                child, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the &quot;Last updated&quot; date. We
                encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us:
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
