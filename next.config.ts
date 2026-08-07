import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    qualities: [60, 70, 75, 85],
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
