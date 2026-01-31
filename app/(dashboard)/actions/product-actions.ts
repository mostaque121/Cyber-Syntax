"use server";
import { prisma } from "@/lib/prisma";

import { checkAccess } from "@/lib/check-access";
import { Prisma } from "@/prisma/generated/prisma";
import { revalidatePath, updateTag } from "next/cache";
import slugify from "slugify";
import {
  ProductFormData,
  productSchema,
} from "../validations/product.validation";

export async function createProduct(input: ProductFormData) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  // Step 1 — Validate input
  const parsed = productSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues,
    };
  }

  const { inputSlug, ...data } = parsed.data;

  // Step 2 — Auto-generate slug if missing
  const slug = inputSlug ?? slugify(data.title, { lower: true });

  // Step 3 — Check duplicate slug (Prisma unique check)
  const existing = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    return {
      success: false,
      error: { slug: ["A product with this slug already exists."] },
    };
  }

  // Step 4 — Create product
  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: slug,
        brand: data.brand,
        productType: data.productType,

        price: data.price,
        discountPercentage: data.discountPercentage,
        warranty: data.warranty,

        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        additionalData: data.additionalData,

        isHotDeal: data.isHotDeal,
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,

        categoryId: data.categoryId,

        images: {
          create: data.images.map((img) => ({
            imageId: img.imageId,
            url: img.url,
            isFeatured: img.isFeatured,
          })),
        },
      },
    });
    updateTag("featured-products");
    updateTag("all-products");
    return {
      success: true,
      data: product,
    };
  } catch (err) {
    console.error("Create product error:", err);

    return {
      success: false,
      error: { _form: ["Failed to create product. Try again later."] },
    };
  }
}

export async function updateProduct(id: string, data: ProductFormData) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    // Step 1 — Validate input
    const parsed = productSchema.safeParse(data);

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
    await prisma.productImage.deleteMany({
      where: {
        productId: id,
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
        prisma.productImage.update({
          where: { id: img.id! },
          data: { isFeatured: img.isFeatured },
        }),
      ),
    );

    // Add new images
    if (newImages.length > 0) {
      await prisma.productImage.createMany({
        data: newImages.map((img) => ({
          imageId: img.imageId,
          url: img.url,
          isFeatured: img.isFeatured,
          productId: id,
        })),
      });
    }

    // Update product data
    await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        slug: slug,
        brand: data.brand,
        productType: data.productType,

        price: data.price,
        discountPercentage: data.discountPercentage,
        warranty: data.warranty,

        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        additionalData: data.additionalData,

        isHotDeal: data.isHotDeal,
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,

        categoryId: data.categoryId,
      },
    });

    updateTag("featured-products");
    updateTag("all-products");
    revalidatePath(`/product/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: { _form: ["Failed to create product. Try again later."] },
    };
  }
}

export async function deleteProduct(id: string) {
  const access = await checkAccess(["ADMIN", "MODERATOR"]);
  if (!access.ok) {
    return { error: access.error };
  }
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    updateTag("featured-products");
    updateTag("all-products");
    revalidatePath(`/product/${deletedProduct.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

interface GetProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  filter?: "all" | "hot" | "featured" | "available";
}
export async function getProducts({
  page = 1,
  limit = 10,
  search = "",
  filter = "all",
}: GetProductsOptions) {
  try {
    const skip = (page - 1) * limit;

    // eslint-disable-next-line prefer-const
    let where: Prisma.ProductWhereInput = {};

    // --- Search filter ---
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ];
    }

    // --- Hot Deals Filter (string-based) ---
    if (filter !== "all") {
      if (filter === "hot") where.isHotDeal = true;
      if (filter === "featured") where.isFeatured = true;
      if (filter === "available") where.isAvailable = true;
    }

    // --- DB Queries ---
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: true,
          category: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),

      prisma.product.count({ where }),
    ]);

    return {
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      success: false,
      data: [],
      error: "Failed to fetch products",
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
}
