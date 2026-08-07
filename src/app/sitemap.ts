import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-07");

  return [
    { url: "https://codezela.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://codezela.com/services/", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://codezela.com/portfolio/", lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://codezela.com/industries/", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://codezela.com/about/", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codezela.com/contact/", lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
