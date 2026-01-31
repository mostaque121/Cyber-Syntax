"use server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

interface GetProductsBypathOptions {
  page?: number;
  limit?: number;
  path?: string;
  price?: "low" | "high";
}

export async function getProductsByPath({
  page = 1,
  limit = 10,
  path,
  price,
}: GetProductsBypathOptions) {
  const where = path
    ? {
        category: {
          fullPath: { startsWith: path },
        },
      }
    : undefined;

  let orderBy: { price: "asc" | "desc" } | { createdAt: "asc" | "desc" };

  if (price) {
    // user wants price sorting
    orderBy = {
      price: price === "high" ? "desc" : "asc",
    };
  } else {
    // default sort
    orderBy = { createdAt: "desc" };
  }

  const category = path
    ? await prisma.category.findUnique({
        where: { fullPath: path },
      })
    : null;

  const total = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    include: {
      images: true,
    },
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    category: category,
    data: products,
    pagination: {
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getProductBySlug({ slug }: { slug: string }) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        select: {
          id: true,
          url: true,
          isFeatured: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          fullPath: true,
          parent: {
            select: {
              id: true,
              fullPath: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
  return product;
}

export const getFeaturedProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: {
        isAvailable: true,
        isFeatured: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        discountPercentage: true,
        isFeatured: true,
        isHotDeal: true,
        images: {
          select: {
            id: true,
            url: true,
            isFeatured: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            level: true,
            fullPath: true,
            slug: true,
          },
        },
      },
      take: 4,
    });
  },
  ["featured-products"], // Cache key
  {
    tags: ["featured-products"], // Cache tags for revalidation
  },
);

export const getAllProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: {
        isAvailable: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        discountPercentage: true,
        isFeatured: true,
        isHotDeal: true,
        images: {
          select: {
            id: true,
            url: true,
            isFeatured: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            level: true,
            fullPath: true,
            slug: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["all-products"], // Cache key
  {
    tags: ["all-products"], // Cache tags for revalidation
  },
);
