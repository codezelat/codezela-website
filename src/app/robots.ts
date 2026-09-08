import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/payments"],
    },
    sitemap: "https://codezela.com/sitemap.xml",
    host: "https://codezela.com",
  };
}
