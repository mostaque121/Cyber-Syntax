import { CloudOff, Network, Shield, Zap } from "lucide-react";

export function NetworkingServices() {
  const services = [
    {
      icon: Network,
      title: "Network Design & Implementation",
      description:
        "Customized LAN, WAN, and wireless network setups tailored to your business requirements.",
    },
    {
      icon: Shield,
      title: "Network Security",
      description:
        "Advanced firewall, VPN, and threat solutions protecting your critical infrastructure.",
    },
    {
      icon: CloudOff,
      title: "Cloud & Remote Access Solutions",
      description:
        "Enable secure and efficient remote work with enterprise-grade connectivity.",
    },
    {
      icon: Zap,
      title: "Network Maintenance & Support",
      description:
        "24/7 monitoring and troubleshooting ensuring uninterrupted performance.",
    },
  ];

  return (
    <section id="services" className="w-full  bg-background">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <h2 className="text-[18px] pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
          Our Networking Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
