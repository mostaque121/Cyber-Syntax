import { HowToGetService } from "./components/how-to-get-service";
import { ServicesHero } from "./components/services-hero";
import { ServicesList } from "./components/services-list";
import { WhyChooseUs } from "./components/why-choose-us";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - White */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ServicesHero />
        </div>
      </div>

      {/* Services List - Gray */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ServicesList />
        </div>
      </div>

      {/* Why Choose Us - White */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <WhyChooseUs />
        </div>
      </div>

      {/* How to Get Service - Gray */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <HowToGetService />
        </div>
      </div>
    </main>
  );
}
