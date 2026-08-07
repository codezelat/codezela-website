import type { Metadata } from "next";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { PortfolioPage } from "@/components/pages/PortfolioPage";

const title = "Portfolio - Codezela Technologies";
const description =
  "Browse our portfolio at Codezela Technologies to see our successful projects in web design, app development, brand identity, and digital marketing. Discover how we deliver innovative solutions to empower businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/portfolio",
    siteName: "Codezela Technologies",
    title,
    description,
    images: [
      {
        url: "/seo/og-codezela.png",
        width: 2000,
        height: 2000,
        alt: "Codezela Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CodezelaT",
    creator: "@CodezelaT",
    title,
    description,
    images: ["/seo/og-codezela.png"],
  },
};

export default function PortfolioRoute() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
}
