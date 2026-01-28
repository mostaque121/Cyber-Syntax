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
    },
    {
      icon: Camera,
      title: "CCTV Solutions",
      description: "Security camera installation for homes and offices",
      href: "/services/cctv-solution",
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Custom web and mobile application development",
      href: "/services/software-development",
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "Network setup, configuration, and maintenance",
      href: "/services/networking-solution",
    },
    {
      icon: ShoppingBag,
      title: "Tech Products",
      description: "Laptops, PCs, hardware components, and accessories",
      href: "/products",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Ongoing support and maintenance services",
      href: "/contact",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Offer</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete IT solutions and quality tech products under one roof
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link key={index} href={service.href}>
              <Card className="bg-white border border-gray-200 p-6 rounded-[5px] hover:border-primary hover:shadow-md transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">
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
