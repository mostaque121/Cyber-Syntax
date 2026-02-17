import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

// Update this date when static content changes
const STATIC_PAGES_LAST_MODIFIED = new Date("2026-02-17");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/cctv-solution`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/it-support`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/networking-solution`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/software-development`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date("2026-02-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Fetch all products for dynamic routes
  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Fetch all CCTV packages for dynamic routes
  const cctvPackages = await prisma.cCTVPackage.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const cctvPackagePages: MetadataRoute.Sitemap = cctvPackages.map((pkg) => ({
    url: `${baseUrl}/services/cctv-solution/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...cctvPackagePages];
}
