import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export function HomeContactSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "support@cybersyntax.com",
      href: "mailto:support@cybersyntax.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Tech Street, San Francisco, CA",
      href: "https://maps.google.com",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+1 (555) 987-6543",
      href: "https://wa.me/15559876543",
    },
  ];

  return (
    <section className="container w-full py-12 px-4 md:px-8 mx-auto">
      <div className="bg-linear-to-br from-primary/5 to-primary/10 border border-primary rounded-[5px] p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Get In Touch With Us
          </h2>
          <p className="text-sm text-gray-600">
            Have a question or need our services? We&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <Card className="bg-white border border-primary p-4 rounded-[5px] hover:shadow-lg transition-all h-full text-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {method.title}
                  </h3>
                  <p className="text-xs text-gray-600">{method.value}</p>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-primary hover:bg-green-600 text-white font-semibold px-6 py-2">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
