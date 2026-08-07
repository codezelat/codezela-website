import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codezela Technologies",
    short_name: "Codezela",
    description:
      "Software development, mobile applications, AI solutions, digital design, and marketing for growing businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#710bc0",
    icons: [
      { src: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/seo/og-codezela.png", sizes: "2000x2000", type: "image/png" },
    ],
  };
}
