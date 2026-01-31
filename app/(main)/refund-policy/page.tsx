import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Learn about Cyber Syntax's refund and return policy for products and services.",
};

export default function RefundPolicyPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    "143/2, South Kazipara, Mirpur-12, Dhaka-1216";
  const availability =
    process.env.NEXT_PUBLIC_AVAILABILITY || "Sun - Thurs: 9:00 AM - 6:00 PM";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Refund & Return Policy
            </h1>
            <p className="text-gray-500">Last updated: January 31, 2026</p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">15-Day Returns</h3>
              <p className="text-sm text-gray-600">
                Return within 15 days of delivery
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Easy Process</h3>
              <p className="text-sm text-gray-600">
                Simple return request online
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">7-10 Days Refund</h3>
              <p className="text-sm text-gray-600">
                Refund processed after inspection
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Return Policy Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Cyber Syntax, we want you to be completely satisfied with
                your purchase. If you are not satisfied with your order, you may
                return it within 15 days of delivery for a full refund or
                exchange, subject to the conditions outlined in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Eligibility for Returns
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be eligible for a return, the following conditions must be
                met:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Return request initiated within 15 days of delivery
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Product is in original condition with no new damage
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    All original accessories, chargers, and cables included
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Original packaging is intact and undamaged
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Proof of purchase (order confirmation or receipt)
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Non-Returnable Items
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The following items cannot be returned:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Products with physical damage caused after delivery
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Devices with water or liquid damage
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Products with unauthorized modifications or repairs
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Items missing original accessories or packaging
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Clearance or final sale items (marked as non-returnable)
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. How to Request a Return
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Follow these steps to initiate a return:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Contact Customer Support
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Call us or email us with your order ID and reason for
                      return
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Receive Return Authorization
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We will review your request and provide return
                      instructions
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Pack & Ship the Product
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Securely pack the item with all accessories and ship to
                      our address
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <span className="text-teal-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Inspection & Refund
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We inspect the item and process your refund within 7-10
                      business days
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Refund Methods
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Refunds will be processed using the original payment method:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>bKash/Nagad/Rocket:</strong> Refund to original mobile
                  wallet within 3-5 business days
                </li>
                <li>
                  <strong>Bank Transfer:</strong> Refund to original bank
                  account within 7-10 business days
                </li>
                <li>
                  <strong>Cash on Delivery:</strong> Refund via bKash or bank
                  transfer (your choice)
                </li>
                <li>
                  <strong>Store Credit:</strong> Available immediately for
                  future purchases
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Shipping Costs
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      Defective or Wrong Items
                    </p>
                    <p className="text-gray-600 text-sm">
                      We cover all return shipping costs if the item is
                      defective or we sent the wrong product
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      Change of Mind Returns
                    </p>
                    <p className="text-gray-600 text-sm">
                      Customer is responsible for return shipping costs. A
                      restocking fee of ৳200 may apply
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Exchanges
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you wish to exchange your item for a different product,
                please initiate a return and place a new order for the desired
                item. This ensures faster processing and guarantees product
                availability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Damaged During Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If your item arrives damaged, please contact us within 24 hours
                of delivery with photos of the damage. We will arrange for a
                replacement or full refund at no additional cost to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Warranty Claims
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For issues covered under our 12-month warranty (manufacturing
                defects, hardware failures), please refer to our warranty terms.
                Warranty claims are handled separately from the return policy
                and may be eligible for repair, replacement, or refund based on
                the specific issue.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For any questions about returns or refunds, please contact our
                customer support team:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> {email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {phone}
                </p>
                <p className="text-gray-700">
                  <strong>Hours:</strong> {availability}
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
