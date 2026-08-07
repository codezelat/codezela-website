import { LegalPage } from "@/components/pages/LegalPage";
import legalPagesJson from "@/data/legal-pages.json";
import { PageJsonLd } from "@/components/shared/PageJsonLd";
import type { Metadata } from "next";

const page = legalPagesJson["terms-and-conditions"];
const title = "Terms And Conditions - Codezela Technologies";
const description =
  "Review the terms and conditions governing use of the Codezela Technologies website, content, and services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: { type: "website", url: "/terms-and-conditions", title, description, images: ["/seo/og-codezela.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/seo/og-codezela.png"] },
};

export default function TermsAndConditionsRoute() {
  return (
    <>
      <LegalPage title={page.title} html={page.html} />
      <PageJsonLd path="/terms-and-conditions" title={title} description={description} />
    </>
  );
}

