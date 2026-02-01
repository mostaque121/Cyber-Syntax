"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { BannerSlider } from "@/prisma/generated/prisma";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwipperSlider({ slides }: { slides: BannerSlider[] }) {
  const isMobile = useIsMobile();

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      pagination={{ clickable: true }}
      navigation
      className="w-full"
    >
      {slides.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full">
            <Image
              src={isMobile && item.imageSmall ? item.imageSmall : item.image}
              alt={"banner"}
              width={1280}
              height={320}
              className="w-full h-auto"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
