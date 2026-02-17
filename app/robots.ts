import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/login/",
          "/signup/",
          "/forgot-password/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
