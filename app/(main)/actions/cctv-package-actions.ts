"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllCctvPackages = unstable_cache(
  async () => {
    return prisma.cCTVPackage.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["all-cctv-packages"], // Cache key
  {
    tags: ["all-cctv-packages"], // Cache tags for revalidation
  },
);

export async function getCctvPackageBySlug({ slug }: { slug: string }) {
  const product = await prisma.cCTVPackage.findUnique({
    where: { slug },
    include: {
      images: {
        select: {
          id: true,
          url: true,
          isFeatured: true,
        },
      },
    },
  });
  return product;
}
