import { ContactSectionForNetworking } from "./components/contact-section";
import { NetworkingSolutionHero } from "./components/hero";
import { NetworkingServices } from "./components/networking-service";
import { WhyChooseForNetworking } from "./components/why-choose";

export default function NetworkingSolutionPage() {
  return (
    <div>
      <NetworkingSolutionHero />
      <NetworkingServices />
      <WhyChooseForNetworking />
      <ContactSectionForNetworking />
    </div>
  );
}
