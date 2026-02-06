import BannerSliderServer from "./components/common/banner-slider-server";
import { FeaturedProducts } from "./components/common/featured-product";
import FeaturesSection from "./components/common/features-section";
import { HomeContactSection } from "./components/common/home-contact-section";
import { HomeFaqSection } from "./components/common/home-faq-section";
import { OurServices } from "./components/common/our-services";
import WhyChooseSection from "./components/common/why-choose-section";

export default async function HomePage() {
  return (
    <div>
      <BannerSliderServer />
      <OurServices />
      <FeaturedProducts />
      <FeaturesSection />
      <WhyChooseSection />
      <HomeFaqSection />
      <HomeContactSection />
    </div>
  );
}
