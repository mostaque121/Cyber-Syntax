import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Code, Monitor, Wifi } from "lucide-react";
import Link from "next/link";

export function ServicesList() {
  const services = [
    {
      icon: Monitor,
      title: "IT Support Services",
      description:
        "Complete technical support for your business. From hardware troubleshooting to software installation, network configuration, and regular maintenance. We ensure your IT infrastructure runs smoothly.",
      features: [
        "Hardware & Software Support",
        "Network Configuration",
        "System Maintenance",
        "Remote & On-site Support",
        "Data Backup Solutions",
        "Troubleshooting & Repairs",
      ],
      href: "/services/it-support",
    },
    {
      icon: Camera,
      title: "CCTV Installation",
      description:
        "Professional security camera installation for homes, offices, and commercial spaces. We provide complete CCTV solutions including camera setup, DVR/NVR configuration, and remote monitoring access.",
      features: [
        "HD Security Cameras",
        "Indoor & Outdoor Installation",
        "DVR/NVR Setup",
        "Remote Mobile Access",
        "Night Vision Systems",
        "Motion Detection Alerts",
      ],
      href: "/services/cctv-solution",
    },
    {
      icon: Code,
      title: "Software Development",
      description:
        "Custom software solutions built for your specific needs. We develop web applications, mobile apps, and enterprise software using modern technologies and best practices.",
      features: [
        "Web Application Development",
        "Mobile App Development",
        "E-commerce Solutions",
        "Custom CRM/ERP Systems",
        "API Development",
        "UI/UX Design",
      ],
      href: "/services/software-development",
    },
    {
      icon: Wifi,
      title: "Networking Solutions",
      description:
        "Complete networking services for seamless connectivity. We design, install, and maintain robust network infrastructure for businesses of all sizes.",
      features: [
        "Network Design & Setup",
        "Router & Switch Configuration",
        "WiFi Installation",
        "VPN Setup",
        "Network Security",
        "Cable Management",
      ],
      href: "/services/networking-solution",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          What We Provide
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional technology services delivered by experienced technicians
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card
              key={index}
              className="bg-white border border-primary p-8 rounded-[5px] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={service.href}>
                <Button className="w-full bg-primary hover:bg-green-600 text-white font-semibold">
                  Learn More
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
