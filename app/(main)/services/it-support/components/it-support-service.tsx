import {
  Cpu,
  HardDrive,
  Laptop2,
  MonitorCheck,
  ShieldAlert,
  Wifi,
} from "lucide-react";

export function ITSupportServices() {
  const services = [
    {
      icon: Laptop2,
      title: "Hardware Repair & Upgrades",
      description:
        "Expert repair for laptops, desktops, and peripherals. Screen replacements, battery swaps, and RAM/SSD upgrades.",
    },
    {
      icon: MonitorCheck,
      title: "Software Troubleshooting",
      description:
        "Resolving OS errors, driver conflicts, and software crashes on Windows, macOS, and Linux systems.",
    },
    {
      icon: ShieldAlert,
      title: "Virus & Malware Removal",
      description:
        "Deep system cleaning to remove viruses, spyware, and ransomware while securing your data against future threats.",
    },
    {
      icon: Wifi,
      title: "Network Setup & Support",
      description:
        "Router configuration, Wi-Fi optimization, LAN setup, and troubleshooting internet connectivity issues.",
    },
    {
      icon: HardDrive,
      title: "Data Recovery & Backup",
      description:
        "Recovering lost files from damaged drives and setting up automated backup solutions to protect your important data.",
    },
    {
      icon: Cpu,
      title: "System Maintenance",
      description:
        "Regular preventative maintenance, dust cleaning, thermal paste replacement, and performance tuning.",
    },
  ];

  return (
    <section id="it-support" className="w-full bg-background">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <h2 className="text-[18px] pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
          IT Support & Repair Services
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
