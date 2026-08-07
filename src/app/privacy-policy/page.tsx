import { LegalPage } from "@/components/pages/LegalPage";
import legalPagesJson from "@/data/legal-pages.json";
import { PageJsonLd } from "@/components/shared/PageJsonLd";
import type { Metadata } from "next";

const page = legalPagesJson["privacy-policy"];
const title = "Privacy Policy - Codezela Technologies";
const description =
  "Read how Codezela Technologies collects, uses, and protects information when you use our website and digital services.";
const analyticsDisclosure =
  '<h2>Analytics, advertising and cookie choices</h2><p>With your permission, we use Google Analytics 4 and Google Ads to understand how visitors use the website, measure campaign performance, and improve our services. These services may process page URLs, referrers, browser and device information, approximate location, campaign identifiers, and website interactions. Our proposal tracking event does not include the name, email address, phone number, company, project description, or other form values you submit.</p><p>Optional Google measurement tags do not load until you accept optional cookies. Your choice is stored in a first-party preference cookie for up to 180 days. You can review or withdraw that choice at any time through “Cookie Preferences” in the footer. When optional cookies are rejected, Google consent is set to denied and known first-party Google Analytics and advertising cookies are removed where the browser permits.</p><p>Google processes information under its own policies. Learn more in <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Google’s Terms of Service</a>.</p>';

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
      <LegalPage title={page.title} html={page.html} supplementalHtml={analyticsDisclosure} />
      <PageJsonLd path="/privacy-policy" title={title} description={description} />
    </>
  );
}
