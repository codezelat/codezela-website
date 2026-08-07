import type { Metadata } from "next";
import { IndustriesPage } from "@/components/pages/IndustriesPage";
import { PageJsonLd } from "@/components/shared/PageJsonLd";

const title = "Industries - Codezela Technologies";
const description = "Discover the diverse industries Codezela Technologies serves, including retail, healthcare, education, finance, and hospitality. We provide tailored web development, branding, and marketing solutions to meet industry-specific needs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/industries/" },
  openGraph: { url: "/industries/", title, description, images: ["/seo/og-codezela.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/seo/og-codezela.png"] },
};

export default function IndustriesRoute() {
  return (
    <>
      <IndustriesPage />
      <PageJsonLd path="/industries/" title={title} description={description} pageType="CollectionPage" />
    </>
  );
}
