import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Cyber Syntax uses cookies and similar technologies to enhance your browsing experience.",
};

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-gray-500">Last updated: January 31, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile phone) when you visit a website.
                They are widely used to make websites work more efficiently and
                provide information to website owners. Cookies help us
                understand how you use our website and enable us to improve your
                experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Types of Cookies We Use
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the following types of cookies on our website:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Essential Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    These cookies are necessary for the website to function
                    properly. They enable core functionality such as security,
                    network management, and account access. You cannot opt out
                    of these cookies.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    These cookies enable the website to provide enhanced
                    functionality and personalization. They may be set by us or
                    third-party providers whose services we use, such as
                    remembering your preferences and settings.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. This helps us improve our website and services.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Marketing Cookies
                  </h3>
                  <p className="text-gray-600 text-sm">
                    These cookies are used to track visitors across websites to
                    display relevant advertisements. They help us measure the
                    effectiveness of our marketing campaigns.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Cookie Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Purpose
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-600">session_id</td>
                      <td className="px-4 py-3 text-gray-600">
                        Maintains user session
                      </td>
                      <td className="px-4 py-3 text-gray-600">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">auth_token</td>
                      <td className="px-4 py-3 text-gray-600">
                        User authentication
                      </td>
                      <td className="px-4 py-3 text-gray-600">30 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">cart_items</td>
                      <td className="px-4 py-3 text-gray-600">
                        Stores shopping cart data
                      </td>
                      <td className="px-4 py-3 text-gray-600">7 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">preferences</td>
                      <td className="px-4 py-3 text-gray-600">
                        Remembers user preferences
                      </td>
                      <td className="px-4 py-3 text-gray-600">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-600">_ga</td>
                      <td className="px-4 py-3 text-gray-600">
                        Google Analytics tracking
                      </td>
                      <td className="px-4 py-3 text-gray-600">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Third-Party Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may use third-party services that set their own cookies.
                These include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> To analyze website traffic
                  and user behavior
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> To measure advertising
                  effectiveness
                </li>
                <li>
                  <strong>Payment Providers:</strong> To process secure payments
                </li>
                <li>
                  <strong>Customer Support:</strong> To provide live chat
                  functionality
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Managing Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Browser Settings:</strong> Most browsers allow you to
                  view, manage, delete, and block cookies through settings
                </li>
                <li>
                  <strong>Cookie Banner:</strong> Use our cookie consent banner
                  to manage your preferences
                </li>
                <li>
                  <strong>Opt-Out Links:</strong> Some third-party services
                  provide opt-out mechanisms
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Please note that disabling certain cookies may affect the
                functionality of our website and your user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Browser-Specific Instructions
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To manage cookies in your browser:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and Security →
                  Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Options → Privacy & Security →
                  Cookies
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Privacy → Cookies
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for legal, operational, or
                regulatory reasons. We will post the updated policy on this page
                with a new &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about our use of cookies, please
                contact us:
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
