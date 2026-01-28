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
    },
    {
      icon: ThumbsUp,
      title: "Quality Service",
      description: "High standards in every project we deliver",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance when you need it",
    },
    {
      icon: Shield,
      title: "Reliable Solutions",
      description: "Tested and proven technology implementations",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Fast turnaround and timely service delivery",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Quality services at affordable rates",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Why Choose Our Services?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We&apos;re committed to delivering exceptional service and customer
          satisfaction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <Card
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-[5px] hover:border-primary hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600">{reason.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
