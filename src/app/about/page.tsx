import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

const title = "About - Codezela Technologies";
const description =
  "Codezela Technologies, a leading digital agency specializing in web development, app development, SEO, digital marketing, etc. Learn about our passion, expertise, and how we help businesses grow through creativity and innovation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "/about",
    siteName: "Codezela Technologies",
    title,
    description,
    publishedTime: "2024-08-13T17:46:11+05:30",
    modifiedTime: "2026-08-08T00:00:00+05:30",
    images: [
      {
        url: "/images/meeting-2-768x534.jpg.webp",
        width: 768,
        height: 534,
        alt: "About Codezela Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CodezelaT",
    creator: "@codezelaT",
    title,
    description,
    images: ["/images/meeting-2-768x534.jpg.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://codezela.com/about#webpage",
  url: "https://codezela.com/about",
  name: title,
  description,
  datePublished: "2024-08-13T17:46:11+05:30",
  dateModified: "2026-08-08T00:00:00+05:30",
  isPartOf: { "@id": "https://codezela.com/#website" },
  about: { "@id": "https://codezela.com/#organization" },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://codezela.com/images/meeting-2-768x534.jpg.webp",
    width: 768,
    height: 534,
  },
  inLanguage: "en-GB",
};

export default function AboutRoute() {
  return (
    <>
      <AboutPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
