type PageJsonLdProps = {
  path: string;
  title: string;
  description: string;
  pageType?: "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";
};

export function PageJsonLd({
  path,
  title,
  description,
  pageType = "WebPage",
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
        dateModified: "2026-08-07T00:00:00+05:30",
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
            name: title.replace(" - Codezela Technologies", ""),
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
