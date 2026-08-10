import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Keep responsive optimization while limiting the number of variants that
    // can be generated for the site's real mobile and desktop breakpoints.
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/seo/**", search: "" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/ca",
        destination: "https://cca.it.com/",
        permanent: true,
      },
      ...[
        "/sitemap_index.xml",
        "/page-sitemap.xml",
        "/industrie-sitemap.xml",
        "/portfolio-sitemap.xml",
        "/service1-sitemap.xml",
        "/local-sitemap.xml",
      ].map((source) => ({
        source,
        destination: "/sitemap.xml",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
