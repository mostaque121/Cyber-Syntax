"use server";
import { prisma } from "@/lib/prisma";

import { Prisma } from "@/prisma/generated/prisma";
import slugify from "slugify";

import { updateTag } from "next/cache";
import {
  CCTVPackageFormData,
  cctvPackageSchema,
} from "../validations/cctv-package.validation";

export async function createCctvPackage(input: CCTVPackageFormData) {
  const parsed = cctvPackageSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues,
    };
  }

  const { inputSlug, ...data } = parsed.data;
  const slug = inputSlug ?? slugify(data.title, { lower: true });
  const existing = await prisma.cCTVPackage.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    return {
      success: false,
      error: { slug: ["A package with this slug already exists."] },
    };
  }
  try {
    const cctvPackage = await prisma.cCTVPackage.create({
      data: {
        title: data.title,
        slug: slug,
        price: data.price,
        discountPercentage: data.discountPercentage,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        isAvailable: data.isAvailable,

        images: {
          create: data.images.map((img) => ({
            imageId: img.imageId,
            url: img.url,
            isFeatured: img.isFeatured,
          })),
        },
      },
    });

    updateTag("all-cctv-packages");
    return {
      success: true,
      data: cctvPackage,
    };
  } catch (err) {
    console.error("Create Package error:", err);

    return {
      success: false,
      error: { _form: ["Failed to create package. Try again later."] },
    };
  }
}

export async function updateCctvPackage(id: string, data: CCTVPackageFormData) {
  try {
    const parsed = cctvPackageSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues,
      };
    }
    const existingImages = data.images.filter((img) => img.id);
    const newImages = data.images.filter((img) => !img.id);

    const slug = data.inputSlug ?? slugify(data.title, { lower: true });

    // Delete images that are removed
    await prisma.cCTVImage.deleteMany({
      where: {
        cctvId: id,
        id: {
          notIn: existingImages
            .map((img) => img.id)
            .filter(Boolean) as string[],
        },
      },
    });

    // Update existing images' isFeatured
    await Promise.all(
      existingImages.map((img) =>
        prisma.cCTVImage.update({
          where: { id: img.id! },
          data: { isFeatured: img.isFeatured },
        })
      )
    );

    // Add new images
    if (newImages.length > 0) {
      await prisma.cCTVImage.createMany({
        data: newImages.map((img) => ({
          imageId: img.imageId,
          url: img.url,
          isFeatured: img.isFeatured,
          cctvId: id,
        })),
      });
    }

    await prisma.cCTVPackage.update({
      where: { id },
      data: {
        title: data.title,
        slug: slug,

        price: data.price,
        discountPercentage: data.discountPercentage,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        isAvailable: data.isAvailable,
      },
    });

    updateTag("all-cctv-packages");
    return { success: true };
  } catch (error) {
    console.error("Error updating package:", error);
    return {
      success: false,
      error: { _form: ["Failed to create package. Try again later."] },
    };
  }
}

export async function deleteCctvpackage(id: string) {
  try {
    await prisma.cCTVPackage.delete({
      where: { id },
    });

    updateTag("all-cctv-packages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting package:", error);
    return { success: false, error: "Failed to delete package" };
  }
}

interface GetCctvPackagesOptions {
  page?: number;
  limit?: number;
  search?: string;
  isAvailable?: "all" | "true" | "false";
}
export async function getCctvPackages({
  page = 1,
  limit = 10,
  search = "",
  isAvailable = "all",
}: GetCctvPackagesOptions) {
  try {
    const skip = (page - 1) * limit;

    // eslint-disable-next-line prefer-const
    let where: Prisma.CCTVPackageWhereInput = {};

    // --- Search filter ---
    if (search) {
      where.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    // --- Hot Deals Filter (string-based) ---
    if (isAvailable !== "all") {
      where.isAvailable = isAvailable === "true" ? true : false;
    }

    // --- DB Queries ---
    const [cctvPackages, total] = await Promise.all([
      prisma.cCTVPackage.findMany({
        where,
        include: {
          images: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),

      prisma.cCTVPackage.count({ where }),
    ]);

    return {
      success: true,
      data: cctvPackages,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching packages:", error);

    return {
      success: false,
      data: [],
      error: "Failed to fetch packages",
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
}
