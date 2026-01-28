"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllCategories = unstable_cache(
  async () => {
    return prisma.category.findMany({
      where: {
        parentId: null, // Get root categories
      },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true, // Support up to 4 levels deep
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  },
  ["categories"], // Cache key
  {
    tags: ["categories"], // Cache tags for revalidation
  }
);
