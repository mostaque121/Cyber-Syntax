import { Card } from "@/components/ui/card";
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react";

export function HowToGetService() {
  const steps = [
    {
      icon: Phone,
      step: "Step 1",
      title: "Contact Us",
      description:
        "Call us, send an email, or fill out the contact form on our website. Tell us what service you need.",
    },
    {
      icon: MessageSquare,
      step: "Step 2",
      title: "Discuss Requirements",
      description:
        "Our team will discuss your needs, assess the scope of work, and provide a detailed quote.",
    },
    {
      icon: Calendar,
      step: "Step 3",
      title: "Schedule Service",
      description:
        "Choose a convenient time for us to visit your location or start the work remotely.",
    },
    {
      icon: Mail,
      step: "Step 4",
      title: "Service Delivery",
      description:
        "Our technicians will complete the work professionally and provide ongoing support as needed.",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          How to Get Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Simple and straightforward process to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="bg-white border border-primary p-6 rounded-[5px] text-center relative"
            >
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {index + 1}
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-primary mb-2">
                {item.step}
              </p>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 bg-primary/5 border border-primary rounded-[5px] p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Need Emergency Support?
        </h3>
        <p className="text-gray-600 mb-6">
          For urgent technical issues, call us directly for immediate assistance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:+15551234567"
            className="flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" />
            +1 (555) 123-4567
          </a>
          <span className="text-gray-400 hidden sm:block">|</span>
          <a
            href="mailto:support@cybersyntax.com"
            className="flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Mail className="w-5 h-5" />
            support@cybersyntax.com
          </a>
        </div>
      </div>
    </section>
  );
}
