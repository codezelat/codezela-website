import type { MetadataRoute } from "next";
import industryDetails from "@/data/industry-details.json";
import portfolioDetails from "@/data/portfolio-details.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-08");

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: "https://codezela.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://codezela.com/services", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://codezela.com/portfolio", lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://codezela.com/industries", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://codezela.com/about", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codezela.com/contact", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://codezela.com/privacy-policy", lastModified: new Date("2025-01-03"), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://codezela.com/terms-and-conditions", lastModified: new Date("2025-01-03"), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...coreRoutes,
    ...industryDetails.map((industry) => ({
      url: `https://codezela.com/industry/${industry.slug}`,
      lastModified: new Date(industry.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...portfolioDetails.map((portfolio) => ({
      url: `https://codezela.com/portfolio/${portfolio.slug}`,
      lastModified: new Date(portfolio.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
