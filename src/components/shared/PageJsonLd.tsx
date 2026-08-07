import type { FaqItem } from "@/data/faqs";
import { buildFaqPageSchema } from "@/lib/faq-schema";

type PageJsonLdProps = {
  path: string;
  title: string;
  description: string;
  pageType?: "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";
  faqs?: readonly FaqItem[];
  breadcrumbName?: string;
};

export function PageJsonLd({
  path,
  title,
  description,
  pageType = "WebPage",
  faqs = [],
  breadcrumbName,
}: PageJsonLdProps) {
  const url = `https://codezela.com${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": "https://codezela.com/#website" },
        about: { "@id": "https://codezela.com/#organization" },
        inLanguage: "en-GB",
        dateModified: "2026-08-08T00:00:00+05:30",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://codezela.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbName ?? title.replace(" - Codezela Technologies", "").replace(" | Codezela", ""),
            item: url,
          },
        ],
      },
      ...(faqs.length > 0 ? [buildFaqPageSchema(url, faqs)] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
