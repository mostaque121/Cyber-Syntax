import { Card } from "@/components/ui/card";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { JSX } from "react";

export function ContactInfo() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const whatsapp =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    "143/2, South Kazipara, Mirpur-12, Dhaka-1216";
  const availability =
    process.env.NEXT_PUBLIC_AVAILABILITY || "Sun - Thurs: 9:00 AM - 6:00 PM";

  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: email,
      href: `mailto:${email.trim()}`,
    },
    {
      icon: MapPin,
      title: "Address",
      value: address,
      href: `https://maps.google.com/maps?q=${encodeURIComponent(address)}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${whatsapp.replace(/[\s-]/g, "")}`,
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: availability,
      noLink: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">
          We&apos;re here to help and answer any question you might have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          const Component = (
            detail.noLink ? "div" : "a"
          ) as keyof JSX.IntrinsicElements;

          return (
            <Card
              key={index}
              className="bg-white border border-primary hover:shadow-lg transition-all p-6 group cursor-pointer rounded-[5px]"
              {...(detail.href && { as: Component })}
            >
              <Component
                href={detail.href}
                target={detail.href?.startsWith("http") ? "_blank" : undefined}
                rel={
                  detail.href?.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-decoration-none block h-full"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {detail.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {detail.value}
                    </p>
                  </div>
                </div>
              </Component>
            </Card>
          );
        })}
      </div>

      <Card className="bg-white border border-primary p-8 rounded-[5px]">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Why Contact Us?
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start space-x-3">
            <span className="text-primary font-bold">✓</span>
            <span>Quick response to your queries within 24 hours</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-primary font-bold">✓</span>
            <span>Expert support team to assist with your purchases</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-primary font-bold">✓</span>
            <span>Multiple channels for your convenience</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-primary font-bold">✓</span>
            <span>Transparent communication about your products</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
