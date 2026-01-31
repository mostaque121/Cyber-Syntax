import { Card } from "@/components/ui/card";
import { Camera, Code, Monitor, ShoppingBag, Wifi, Wrench } from "lucide-react";
import Link from "next/link";

export function ServicesOverview() {
  const services = [
    {
      icon: Monitor,
      title: "IT Support",
      description:
        "Technical support for hardware, software, and infrastructure",
      href: "/services/it-support",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: Camera,
      title: "CCTV Solutions",
      description: "Security camera installation for homes and offices",
      href: "/services/cctv-solution",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Custom web and mobile application development",
      href: "/services/software-development",
      gradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "Network setup, configuration, and maintenance",
      href: "/services/networking-solution",
      gradient: "from-orange-50 to-amber-50",
    },
    {
      icon: ShoppingBag,
      title: "Tech Products",
      description: "Laptops, PCs, hardware components, and accessories",
      href: "/products",
      gradient: "from-pink-50 to-rose-50",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Ongoing support and maintenance services",
      href: "/contact",
      gradient: "from-indigo-50 to-violet-50",
    },
  ];

  return (
    <section className="mb-20">
      <div className="flex border-b pb-4 mb-4 border-[#dee2e6] gap-4 flex-wrap justify-between items-center">
        <h2 className="text-[18px] uppercase  px-1  md:text-[32px]  font-bold text-black">
          What we offer
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link key={index} href={service.href}>
              <Card
                className={`group relative h-full bg-linear-to-br ${service.gradient} border-2 border-primary/20 hover:border-primary/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2`}
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <Icon className="relative w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
