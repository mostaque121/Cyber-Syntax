"use server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getBannersSlider() {
  return prisma.bannerSlider.findMany({
    where: {
      isActive: true,
    },
  });
}
export const getAllCategories = unstable_cache(
  async () => {
    return prisma.bannerSlider.findMany({
      where: {
        isActive: true,
      },
    });
  },
  ["banner-sliders"], // Cache key
  {
    tags: ["banner-sliders"], // Cache tags for revalidation
  }
);
