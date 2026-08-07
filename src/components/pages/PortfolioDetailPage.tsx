import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { DetailMetricsBand } from "@/components/shared/DetailMetricsBand";
import { FaqSection } from "@/components/shared/FaqSection";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getPortfolioMetrics } from "@/data/detail-metrics";
import type { FaqItem } from "@/data/faqs";
import { ArrowRight, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export type PortfolioDetail = {
  slug: string;
  title: string;
  modified: string;
  category: string;
  heroImage: string;
  heroWidth: number;
  heroHeight: number;
  projectHtml: string;
  clientQuote?: string;
  projectOutcome?: string;
  clientName: string;
  clientRole: string;
  solutionHtml: string;
  developerQuote: string;
  developerName: string;
  developerRole: string;
  showcaseImage: string;
  showcaseWidth: number;
  showcaseHeight: number;
  seoTitle: string;
  ogTitle: string;
  ogDescription: string;
};

type QuoteCardVariant = "client-testimonial" | "project-outcome" | "delivery-perspective";

function QuoteCard({
  text,
  name,
  role,
  variant,
}: {
  text: string;
  name: string;
  role: string;
  variant: QuoteCardVariant;
}) {
  const label = {
    "client-testimonial": "Client testimonial",
    "project-outcome": "Project outcome",
    "delivery-perspective": "Delivery perspective",
  }[variant];
  const displayedRole = variant === "project-outcome" ? `${role} · Project partner` : role;

  return (
    <div className="flex min-h-[214px] w-full max-w-[400px] flex-col justify-between rounded-[15px] border border-[#e9e0eb] bg-white px-[34px] py-[34px] shadow-[0_12px_30px_rgba(72,20,91,0.035)] min-[1025px]:px-[38px]">
      <div>
        <p className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-[#9a43cb]">{label}</p>
        <p className="mt-3 text-[17px] leading-[1.35] text-[#666166]">{text}</p>
      </div>
      <div className="mt-[24px] flex items-center gap-[20px] border-t border-[#e5e1e5] pt-[26px]">
        <span className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full bg-[#c8c8c8] text-white">
          <UserRound aria-hidden="true" className="h-[34px] w-[34px]" fill="currentColor" />
        </span>
        <span>
          <strong className="block font-display text-[17px] font-semibold leading-5 text-[#454145]">{name}</strong>
          <span className="mt-1 block text-[16px] italic leading-5 text-[#777277]">{displayedRole}</span>
        </span>
      </div>
    </div>
  );
}

function PortfolioCta({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shares = [
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, FaLinkedinIn],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, FaFacebookF],
    ["X", `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, FaXTwitter],
    ["WhatsApp", "https://wa.me/codezela.t", FaWhatsapp],
  ] as const;

  return (
    <section className="bg-[#fff9ff] py-[84px] min-[1025px]:py-[96px]">
      <MotionReveal className="site-shell text-center">
        <h2 className="mx-auto max-w-[860px] font-display text-[38px] font-semibold leading-[1.15] text-codezela-title min-[1025px]:text-[44px]">
          We know you are interested in our work. Let’s collaborate.
        </h2>
        <div className="mt-[36px] flex flex-col items-center justify-center gap-4 min-[640px]:flex-row">
          <Link href="/portfolio" scroll={false} className="pill-button min-h-[50px] px-7">
            View More Projects <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="https://calendly.com/codezela/consult"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[50px] items-center rounded-full border border-codezela-pink-strong bg-white px-7 font-display text-[17px] font-semibold text-codezela-purple transition-all hover:-translate-y-0.5 hover:bg-codezela-offwhite"
          >
            Schedule a Consultation
          </a>
        </div>
        <div className="mt-[38px] flex items-center justify-center gap-4">
          <span className="font-display text-[16px] font-semibold text-[#5b555b]">Share:</span>
          {shares.map(([label, href, Icon]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Share ${title} on ${label}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e4d7e7] bg-white text-codezela-purple transition-all hover:-translate-y-0.5 hover:border-codezela-purple hover:bg-codezela-purple hover:text-white"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}

export function PortfolioDetailPage({ detail, faqs }: { detail: PortfolioDetail; faqs: readonly FaqItem[] }) {
  const pageUrl = `https://codezela.com/portfolio/${detail.slug}`;
  const metrics = getPortfolioMetrics(detail.slug);
  const hasClientTestimonial = Boolean(detail.clientQuote?.trim());
  const clientFeatureText = hasClientTestimonial
    ? (detail.clientQuote ?? "")
    : detail.projectOutcome ?? "Codezela delivered the documented project scope and solution for this partner.";

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" className="overflow-x-clip bg-white">
        <section className="min-h-[760px] pb-[64px] pt-[80px] min-[1025px]:min-h-[759px] min-[1025px]:pb-[70px] min-[1025px]:pt-[206px]">
          <div className="site-shell grid items-center gap-14 min-[1025px]:grid-cols-[0.92fr_1.08fr]">
            <MotionReveal className="relative min-[1025px]:top-[58px]">
              <h1 className="max-w-[590px] font-display text-[42px] font-medium leading-[1.08] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px]">
                {detail.title}
              </h1>
              <span className="mt-[27px] inline-flex min-h-[34px] items-center rounded-full bg-[#fbe8ff] px-[17px] text-[14px] font-medium text-[#a629cc]">
                {detail.category}
              </span>
            </MotionReveal>
            <MotionReveal className="relative mx-auto w-full max-w-[520px] min-[1025px]:left-[-16px] min-[1025px]:top-[167px]" delay={0.08}>
              <div aria-hidden="true" className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,#f8ebfb_0_42%,#fcf4fd_43%_62%,transparent_63%)] min-[1025px]:h-[430px] min-[1025px]:w-[430px]" />
              <Image
                src={detail.heroImage}
                alt={`${detail.title} project preview`}
                width={detail.heroWidth}
                height={detail.heroHeight}
                priority
                sizes="(max-width: 1024px) calc(100vw - 40px), 620px"
                className="relative z-10 h-auto w-full object-contain"
              />
            </MotionReveal>
          </div>
        </section>

        <section className="pb-[108px] pt-[96px] min-[1025px]:pb-[126px] min-[1025px]:pt-[112px]">
          <div className="site-shell">
            <SectionHeading
              title="Project"
              description="A brief overview of the client’s requirements, project scope, and verified feedback or delivery outcome."
            />
            <div className="mt-[68px] grid items-start gap-12 min-[1025px]:grid-cols-[1.2fr_0.8fr] min-[1025px]:gap-[74px]">
              <MotionReveal>
                <div
                  className="portfolio-copy text-[17px] leading-[1.48] text-[#4f4b4f] [&_li]:mb-[5px] [&_p]:mb-[17px] [&_ul]:mb-[18px] [&_ul]:list-disc [&_ul]:pl-[38px] min-[1025px]:text-[18px]"
                  dangerouslySetInnerHTML={{ __html: detail.projectHtml }}
                />
              </MotionReveal>
              <MotionReveal delay={0.07}>
                <QuoteCard
                  text={clientFeatureText}
                  name={detail.clientName}
                  role={detail.clientRole}
                  variant={hasClientTestimonial ? "client-testimonial" : "project-outcome"}
                />
              </MotionReveal>
            </div>
          </div>
        </section>

        <DetailMetricsBand metrics={metrics} ariaLabel="Project scope highlights" />

        <section className="bg-[#fffaff] pb-[118px] pt-[100px] min-[1025px]:pb-[132px] min-[1025px]:pt-[108px]">
          <div className="site-shell">
            <SectionHeading
              title="Solution"
              description="A summary of the tailored solution delivered to meet the client’s needs and address their feedback effectively."
            />
            <div className="mt-[72px] grid items-start gap-12 min-[1025px]:grid-cols-[0.8fr_1.2fr] min-[1025px]:gap-[120px]">
              <MotionReveal>
                <QuoteCard
                  text={detail.developerQuote}
                  name={detail.developerName}
                  role={detail.developerRole}
                  variant="delivery-perspective"
                />
              </MotionReveal>
              <MotionReveal delay={0.07}>
                <div
                  className="portfolio-copy text-[17px] leading-[1.48] text-[#4f4b4f] [&_li]:mb-[5px] [&_p]:mb-[17px] [&_ul]:mb-[18px] [&_ul]:list-disc [&_ul]:pl-[38px] min-[1025px]:text-[18px]"
                  dangerouslySetInnerHTML={{ __html: detail.solutionHtml }}
                />
              </MotionReveal>
            </div>
          </div>
        </section>

        <section className="pb-[80px] pt-[92px]">
          <MotionReveal className="site-shell">
            <div className="overflow-hidden rounded-[12px] border border-[#161616] bg-white p-[14px] shadow-[0_22px_65px_rgba(27,12,34,0.13)] min-[1025px]:p-[52px]">
              <Image
                src={detail.showcaseImage}
                alt={`Website showcase for ${detail.title}`}
                width={detail.showcaseWidth}
                height={detail.showcaseHeight}
                quality={85}
                sizes="(max-width: 1024px) calc(100vw - 68px), 1176px"
                className="h-auto w-full rounded-[8px] object-contain"
              />
            </div>
          </MotionReveal>
        </section>

        <FaqSection
          id="faq"
          className="min-[1025px]:!pb-[120px] min-[1025px]:!pt-[108px]"
          description={`Project-specific answers about ${detail.title}, including the original requirements, delivered capabilities, and practical planning lessons.`}
          faqs={faqs}
        />
        <PortfolioCta url={pageUrl} title={detail.title} />
      </main>
      <Footer />
    </>
  );
}
