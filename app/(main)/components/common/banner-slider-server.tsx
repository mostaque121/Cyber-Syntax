import SwipperSlider from "@/components/custom-ui/swiper-slider";
import { getBannersSlider } from "../../actions/banner-slider.action";

export default async function BannerSliderServer() {
  const slides = await getBannersSlider();
  return <SwipperSlider slides={slides} />;
}
