import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { PageJsonLd } from "@/components/shared/PageJsonLd";

const title = "Contact - Codezela Technologies";
const description = "Get in touch with Codezela Technologies today. Let's discuss your web development, mobile app, brand design, or digital marketing needs and grow your business together with innovative digital solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title, description, images: ["/seo/og-codezela.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/seo/og-codezela.png"] },
};

export default function ContactRoute() {
  return (
    <>
      <ContactPage />
      <PageJsonLd path="/contact" title={title} description={description} pageType="ContactPage" />
    </>
  );
}
