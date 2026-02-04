"use server";
import { checkAccess } from "@/lib/check-access";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/prisma/generated/prisma";
import { updateTag } from "next/cache";
import {
  BannerSliderInput,
  bannerSliderSchema,
} from "../validations/banner.validation";

// Create BannerSlider
export async function createBannerSlider(data: BannerSliderInput) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  const parsedData = bannerSliderSchema.parse(data);

  const banner = await prisma.bannerSlider.create({
    data: {
      image: parsedData.image,
      imageSmall: parsedData.imageSmall,
      link: parsedData.link ?? null,
      isActive: parsedData.isActive,
    },
  });

  updateTag("banner-sliders");
  return banner;
}

// Update BannerSlider
export async function updateBannerSlider(id: string, data: BannerSliderInput) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  const parsedData = bannerSliderSchema.parse(data);

  const banner = await prisma.bannerSlider.update({
    where: { id },
    data: {
      image: parsedData.image,
      imageSmall: parsedData.imageSmall,
      link: parsedData.link ?? null,
      isActive: parsedData.isActive,
    },
  });
  updateTag("banner-sliders");
  return banner;
}

// Delete BannerSlider
export async function deleteBannerSlider(id: string) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  const banner = await prisma.bannerSlider.delete({
    where: { id },
  });
  updateTag("banner-sliders");
  return banner;
}

export async function getBannerSliders({
  isActive = "all",
}: {
  isActive: "true" | "false" | "all";
}) {
  const where: Prisma.BannerSliderWhereInput = {};
  if (isActive !== "all") {
    where.isActive = isActive === "true" ? true : false;
  }

  // --- DB Queries ---
  return await prisma.bannerSlider.findMany({
    where,
  });
}
