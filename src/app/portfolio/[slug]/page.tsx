import { PortfolioDetailPage, type PortfolioDetail } from "@/components/pages/PortfolioDetailPage";
import portfolioDetailsJson from "@/data/portfolio-details.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const portfolioDetails = portfolioDetailsJson as PortfolioDetail[];

type PortfolioRouteProps = {
  params: Promise<{ slug: string }>;
};

function textDescription(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-zA-Z#0-9]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 158);
}

export function generateStaticParams() {
  return portfolioDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = portfolioDetails.find((item) => item.slug === slug);
  if (!detail) return {};

  const path = `/portfolio/${detail.slug}`;
  const description = detail.ogDescription || textDescription(detail.projectHtml);

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
      images: [{ url: detail.heroImage, width: detail.heroWidth, height: detail.heroHeight, alt: detail.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@CodezelaT",
      creator: "@codezelaT",
      title: detail.ogTitle || detail.seoTitle,
      description,
      images: [detail.heroImage],
    },
  };
}

export default async function PortfolioDetailRoute({ params }: PortfolioRouteProps) {
  const { slug } = await params;
  const detail = portfolioDetails.find((item) => item.slug === slug);
  if (!detail) notFound();

  const url = `https://codezela.com/portfolio/${detail.slug}`;
  const description = detail.ogDescription || textDescription(detail.projectHtml);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#creativework`,
        name: detail.title,
        description,
        url,
        image: `https://codezela.com${detail.heroImage}`,
        dateModified: `${detail.modified}+05:30`,
        creator: { "@id": "https://codezela.com/#organization" },
        inLanguage: "en-GB",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://codezela.com/" },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://codezela.com/portfolio" },
          { "@type": "ListItem", position: 3, name: detail.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <PortfolioDetailPage detail={detail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

