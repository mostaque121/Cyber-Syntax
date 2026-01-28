import { ContactForm } from "./components/contact-form";
import { ContactInfo } from "./components/contact-info";

export default function ContactPage() {
  return (
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
              <h3 className="text-gray-900 font-semibold mb-2">Satisfaction</h3>
              <p className="text-gray-600 text-sm">
                We&apos;re committed to your complete satisfaction and success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
