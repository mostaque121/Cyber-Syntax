import { CtaSection } from "./components/cta-section";
import { FaqSection } from "./components/faq-section";
import { HeroSection } from "./components/hero-section";
import { MissionVision } from "./components/mission-vision";
import { ServicesOverview } from "./components/services-overview";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - White */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <HeroSection />
        </div>
      </div>

      {/* Mission Vision - Gray */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <MissionVision />
        </div>
      </div>

      {/* Services Overview - White */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <ServicesOverview />
        </div>
      </div>

      {/* FAQ Section - Gray */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <FaqSection />
        </div>
      </div>

      {/* CTA Section - Primary Gradient */}
      <div className="bg-linear-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <CtaSection />
        </div>
      </div>
    </main>
  );
}
