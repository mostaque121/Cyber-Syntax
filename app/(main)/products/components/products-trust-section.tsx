import { Award, BadgeCheck, RefreshCw, Shield, Truck } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment methods",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
    description: "Every device thoroughly tested",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "15-day hassle-free returns",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide fast shipping",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export function ProductsTrustSection() {
  return (
    <section className="mt-12 mb-4">
      {/* Trust Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {trustFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:shadow-md transition-shadow"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-full mb-3`}
              >
                <Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-400">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">SSL Secured</span>
        </div>
        <div className="w-px h-4 bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-5 h-5" />
          <span className="text-sm font-medium">Verified Seller</span>
        </div>
        <div className="w-px h-4 bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span className="text-sm font-medium">Certified Quality</span>
        </div>
      </div>
    </section>
  );
}
