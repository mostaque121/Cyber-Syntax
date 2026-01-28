import { getAllCctvPackages } from "../../actions/cctv-package-actions";
import { CctvPackages } from "./components/cctv-packages";
import { CctvSolutionHero } from "./components/hero";
import { WhyChooseOurCctvService } from "./components/why-choose-us";

export default async function CctvSolutionPage() {
  const cctvPackages = await getAllCctvPackages();
  return (
    <div>
      <CctvSolutionHero />
      <CctvPackages cctvPackages={cctvPackages} />
      <WhyChooseOurCctvService />
    </div>
  );
}
