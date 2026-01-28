import { ContactSectionForITSupport } from "./components/contact-section";
import { ItSupportHero } from "./components/hero";
import { ITSupportServices } from "./components/it-support-service";
import { WhyChooseForITSupport } from "./components/why-chose";

export default function ItSupportPage() {
  return (
    <div>
      <ItSupportHero />
      <ITSupportServices />
      <WhyChooseForITSupport />
      <ContactSectionForITSupport />
    </div>
  );
}
