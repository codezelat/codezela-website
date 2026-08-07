import { LegalPage } from "@/components/pages/LegalPage";
import legalPagesJson from "@/data/legal-pages.json";
import { PageJsonLd } from "@/components/shared/PageJsonLd";
import type { Metadata } from "next";

const page = legalPagesJson["privacy-policy"];
const title = "Privacy Policy - Codezela Technologies";
const description =
  "Read how Codezela Technologies collects, uses, and protects information when you use our website and digital services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { type: "website", url: "/privacy-policy", title, description, images: ["/seo/og-codezela.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/seo/og-codezela.png"] },
};

export default function PrivacyPolicyRoute() {
  return (
    <>
      <LegalPage title={page.title} html={page.html} />
      <PageJsonLd path="/privacy-policy" title={title} description={description} />
    </>
  );
}

