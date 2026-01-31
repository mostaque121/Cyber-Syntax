import { Card } from "@/components/ui/card";
import { Eye, Lightbulb, Target } from "lucide-react";

export function MissionVision() {
  const items = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To deliver reliable and innovative technology solutions that empower businesses and individuals to achieve their goals efficiently.",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the go-to technology partner for businesses seeking quality IT services, security solutions, and tech products.",
      gradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: Lightbulb,
      title: "Our Values",
      description:
        "Quality, integrity, and customer satisfaction drive everything we do. We believe in transparent pricing and honest service.",
      gradient: "from-amber-50 to-yellow-50",
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className={`group relative bg-linear-to-br ${item.gradient} border-2 border-primary/20 hover:border-primary/40 p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2`}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with Glow */}
                <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  {/* Icon Glow Effect */}
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Icon className="relative w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
