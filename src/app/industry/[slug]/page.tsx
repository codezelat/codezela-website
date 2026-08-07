import { IndustryDetailPage, type IndustryDetail } from "@/components/pages/IndustryDetailPage";
import { getIndustryFaqs } from "@/data/faqs";
import industryDetailsJson from "@/data/industry-details.json";
import { buildFaqPageSchema } from "@/lib/faq-schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const industryDetails = industryDetailsJson as IndustryDetail[];

type IndustryRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industryDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: IndustryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = industryDetails.find((item) => item.slug === slug);
  if (!detail) return {};

  const path = `/industry/${detail.slug}`;
  const description = detail.ogDescription || detail.summary;

  return {
    title: detail.seoTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "en_GB",
      url: path,
      siteName: "Codezela Technologies",
      title: detail.ogTitle || detail.seoTitle,
      description,
      modifiedTime: `${detail.modified}+05:30`,
      images: [{ url: detail.icon, alt: detail.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@CodezelaT",
      creator: "@codezelaT",
      title: detail.ogTitle || detail.seoTitle,
      description,
      images: [detail.icon],
    },
  };
}

export default async function IndustryRoute({ params }: IndustryRouteProps) {
  const { slug } = await params;
  const detail = industryDetails.find((item) => item.slug === slug);
  if (!detail) notFound();

  const url = `https://codezela.com/industry/${detail.slug}`;
  const description = detail.ogDescription || detail.summary;
  const faqs = getIndustryFaqs(detail.slug, detail.title);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: detail.seoTitle,
        description,
        dateModified: `${detail.modified}+05:30`,
        isPartOf: { "@id": "https://codezela.com/#website" },
        about: { "@id": "https://codezela.com/#organization" },
        inLanguage: "en-GB",
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: detail.title,
        description,
        dateModified: `${detail.modified}+05:30`,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": "https://codezela.com/#organization" },
        publisher: { "@id": "https://codezela.com/#organization" },
        image: `https://codezela.com${detail.icon}`,
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://codezela.com/" },
          { "@type": "ListItem", position: 2, name: "Industries", item: "https://codezela.com/industries" },
          { "@type": "ListItem", position: 3, name: detail.title, item: url },
        ],
      },
      buildFaqPageSchema(url, faqs),
    ],
  };

  return (
    <>
      <IndustryDetailPage detail={detail} faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
