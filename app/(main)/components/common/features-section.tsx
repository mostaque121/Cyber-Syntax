import {
  ArrowLeftRight,
  Award,
  CheckCircle,
  Leaf,
  Maximize2,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: CheckCircle,
      title: "WARRANTY",
      description: "12-months warranty",
    },
    {
      icon: ArrowLeftRight,
      title: "REPLACEMENT",
      description: "15-Days Replacement",
    },
    {
      icon: Award,
      title: "CERTIFIED",
      description: "Verified product listing",
    },
    {
      icon: Zap,
      title: "TRACK",
      description: "Track your order",
    },
    {
      icon: Maximize2,
      title: "RANGE",
      description: "Vast Range of Device",
    },
    {
      icon: Leaf,
      title: "GREENER",
      description: "For a Greener Future",
    },
  ];

  return (
    <section className="container w-full py-16 px-4 md:px-8 mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="border border-primary bg-white rounded-[5px] px-2.5 py-5 text-center"
            >
              <div className="flex justify-center mb-1">
                <Icon className="w-10 h-10 text-gray-800" strokeWidth={1.2} />
              </div>
              <h3 className="text-primary  leading-[1.2] font-medium text-[15px] mb-1 ">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-[14px]">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
