import SwipperSlider from "@/components/custom-ui/swiper-slider";
import { getAllBannersSlider } from "../../actions/banner-slider.action";

export default async function BannerSliderServer() {
  const slides = await getAllBannersSlider();
  return <SwipperSlider slides={slides} />;
}
