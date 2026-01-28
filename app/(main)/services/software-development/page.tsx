import { ContactSectionForSoftwareDevelopment } from "./components/contact-section";
import { SoftwareDevelopmentHero } from "./components/hero";
import { SoftwareDevelopmentServices } from "./components/software-development-service";
import { WhyChooseForSoftwareDevelopment } from "./components/why-chose";

export default function SoftwareDevelopmentPage() {
  return (
    <div>
      <SoftwareDevelopmentHero />
      <SoftwareDevelopmentServices />
      <WhyChooseForSoftwareDevelopment />
      <ContactSectionForSoftwareDevelopment />
    </div>
  );
}
