import { Card } from "@/components/ui/card";
import { Calendar, Mail, MessageSquare, Phone } from "lucide-react";

export function HowToGetService() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";

  const steps = [
    {
      icon: Phone,
      step: "Step 1",
      title: "Contact Us",
      description:
        "Call us, send an email, or fill out the contact form on our website. Tell us what service you need.",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      icon: MessageSquare,
      step: "Step 2",
      title: "Discuss Requirements",
      description:
        "Our team will discuss your needs, assess the scope of work, and provide a detailed quote.",
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      icon: Calendar,
      step: "Step 3",
      title: "Schedule Service",
      description:
        "Choose a convenient time for us to visit your location or start the work remotely.",
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      icon: Mail,
      step: "Step 4",
      title: "Service Delivery",
      description:
        "Our technicians will complete the work professionally and provide ongoing support as needed.",
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  return (
    <section className="mb-5">
      <h2 className="text-[18px] uppercase pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
        How to get our services
      </h2>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Step Number Badge */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10 mb-6 bg-linear-to-br ${item.gradient} ring-4 ring-white`}
                >
                  {index + 1}
                </div>

                {/* Card */}
                <Card
                  className={`w-full flex-1 p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${item.border} ${item.bg} bg-opacity-30 hover:bg-opacity-50`}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 relative overflow-hidden bg-linear-to-br from-primary/10 to-emerald-500/10 border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center group transition-all duration-300 hover:shadow-lg">
        {/* Decorative Background Icon */}

        <Phone className="absolute -right-8 -bottom-8 w-48 h-48 text-primary/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />
        <Phone className="absolute -left-2 -top-16 w-48 h-48 text-primary/5 rotate-12 group-hover:scale-110 transition-transform duration-500" />

        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need Emergency Support?
          </h3>
          <p className="text-gray-700 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
            For urgent technical issues, call us directly for immediate
            assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 group/btn"
            >
              <Phone className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
              {phone}
            </a>
            <span className="text-gray-400 font-medium hidden sm:block">
              or
            </span>
            <a
              href={`mailto:${email.trim()}`}
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300 group/btn"
            >
              <Mail className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
