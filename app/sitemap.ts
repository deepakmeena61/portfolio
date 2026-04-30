import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://deepakmeena.vercel.app";
  const lastModified = new Date("2026-04-30T00:00:00.000Z");

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
