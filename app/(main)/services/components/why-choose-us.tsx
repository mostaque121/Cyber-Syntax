import { Card } from "@/components/ui/card";
import {
  Award,
  Clock,
  DollarSign,
  Headphones,
  Shield,
  ThumbsUp,
} from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: "Professional Team",
      description: "Certified and experienced technicians",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: ThumbsUp,
      title: "Quality Service",
      description: "High standards in every project we deliver",
      gradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance when you need it",
      gradient: "from-amber-50 to-yellow-50",
    },
    {
      icon: Shield,
      title: "Reliable Solutions",
      description: "Tested and proven technology implementations",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast turnaround and timely service delivery",
      gradient: "from-green-50 to-lime-50",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Quality services at affordable rates",
      gradient: "from-orange-50 to-red-50",
    },
  ];

  return (
    <section className="mb-5">
      <h2 className="text-[18px] uppercase pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
        Why choose us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Card
              key={index}
              className={`group relative bg-linear-to-br ${reason.gradient} border-2 border-primary/20 hover:border-primary/40 p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2`}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10 text-center flex flex-col items-center">
                {/* Icon with Glow */}
                <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Icon className="relative w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {reason.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
