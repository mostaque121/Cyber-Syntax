import {
  Code2,
  Layers,
  Palette,
  PlugZap,
  RefreshCw,
  Smartphone,
} from "lucide-react";

export function SoftwareDevelopmentServices() {
  const services = [
    {
      icon: Code2,
      title: "Custom Software Development",
      description:
        "Tailor-made applications built to match your exact business operations, workflows, and goals.",
    },
    {
      icon: Smartphone,
      title: "Web & Mobile App Development",
      description:
        "High-performance Android, iOS, and web applications with seamless UI and optimized speed.",
    },
    {
      icon: Layers,
      title: "Enterprise Solutions",
      description:
        "Automation, workflow optimization, collaboration systems, and large-scale enterprise tools.",
    },
    {
      icon: PlugZap,
      title: "Software Integration",
      description:
        "Smooth integration with your existing systems, databases, and third-party platforms.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Human-centered design that enhances user satisfaction and creates intuitive experiences.",
    },
    {
      icon: RefreshCw,
      title: "Maintenance & Support",
      description:
        "Continuous updates, security enhancements, and performance monitoring for long-term reliability.",
    },
  ];

  return (
    <section id="services" className="w-full bg-background">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <h2 className="text-[18px] pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
          Our Software Development Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
