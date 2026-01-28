import { ServiceContactForm } from "../../components/contact-form";

export function ContactSectionForNetworking() {
  return (
    <section id="contact" className="w-full bg-slate-50 py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you&apos;re a small business or a large enterprise,
              we&apos;re here to empower your organization with fast, secure,
              and scalable networking solutions.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Why Contact Us?
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Free networking
                    consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Custom solution
                    proposals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span> Implementation
                    roadmap
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border space-y-5 px-4 py-8 rounded-2xl md:px-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Contact Form
            </h3>
            <ServiceContactForm serviceType="IT_SUPPORT" />
          </div>
        </div>
      </div>
    </section>
  );
}
