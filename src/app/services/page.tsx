import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { PageJsonLd } from "@/components/shared/PageJsonLd";
import type { Metadata } from "next";

const title = "Services - Codezela Technologies";
const description =
  "Explore Codezela Technologies' range of services, including web designing, brand identity design, SEO, eCommerce solutions, and social media marketing. A Colombo-based software company, we empower your business with innovative digital solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/services",
    siteName: "Codezela Technologies",
    title,
    description,
    images: [
      {
        url: "/seo/og-codezela.png",
        width: 2000,
        height: 2000,
        alt: "Codezela Technologies services",
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

export default function ServicesRoute() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <PageJsonLd path="/services" title={title} description={description} />
      <Header />
      <ServicesPage />
      <Footer />
    </>
  );
}
