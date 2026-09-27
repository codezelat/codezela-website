import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { PageJsonLd } from "@/components/shared/PageJsonLd";
import {
  networkCompanies,
  networkEducation,
  networkProducts,
  type NetworkEntry,
} from "@/data/network";

const title = "Our Network - Codezela Technologies";
const description =
  "Explore Codezela’s products, specialist companies and education connections, from creative tools and digital services to practical technology learning.";
const linkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-codezela-purple";
const button =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-codezela-purple px-7 py-3 text-base font-medium text-white transition-colors hover:bg-codezela-title focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-codezela-purple";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/network" },
  openGraph: {
    title,
    description,
    url: "/network",
    type: "website",
    images: [
      {
        url: "/images/network/network-ribbons.webp",
        width: 1200,
        height: 900,
        alt: "Connected purple ribbons representing the Codezela network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/network/network-ribbons.webp"],
  },
};

function Destination({ entry }: { entry: NetworkEntry }) {
  return (
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-codezela-purple [overflow-wrap:anywhere]">
      {new URL(entry.href).hostname}
      <ArrowUpRight
        size={20}
        aria-hidden="true"
        className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </span>
  );
}

function Artwork({
  entry,
  large = false,
}: {
  entry: NetworkEntry;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${large ? "aspect-[16/10] w-full" : "h-28 w-40 shrink-0 max-[380px]:w-32"}`}
      style={{ backgroundColor: entry.background }}
    >
      {entry.image === "vat0" ? (
        <span
          aria-hidden="true"
          className="flex h-full items-center justify-center font-[ui-sans-serif,system-ui,sans-serif] text-[23px] font-bold tracking-[-0.025em] text-white max-[380px]:text-[20px]"
        >
          VAulTzer<span className="font-mono tabular-nums">0</span>
        </span>
      ) : entry.image === "plana" ? (
        <span
          aria-hidden="true"
          className="flex h-full flex-col items-center justify-center gap-1.5"
        >
          <Image
            src="/images/network/plana.webp"
            alt=""
            width={64}
            height={64}
            sizes="64px"
            className="h-16 w-16 object-contain"
          />
          <span className="pl-[0.35em] font-[Arial,sans-serif] text-[14px] font-semibold tracking-[0.35em] text-[#f4f7fb]">
            PLAN A
          </span>
        </span>
      ) : (
        <Image
          src={`/images/network/${entry.image}.webp`}
          alt=""
          fill
          sizes={
            large
              ? "(min-width: 1025px) 380px, (min-width: 700px) 45vw, 90vw"
              : "160px"
          }
          className={`transition-transform duration-500 motion-safe:group-hover:scale-[1.04] ${entry.image === "isbs" ? "object-cover" : `object-contain ${large ? "p-8" : "p-4"}`}`}
        />
      )}
    </div>
  );
}

export default function NetworkRoute() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="bg-white">
        <section
          aria-labelledby="network-heading"
          className="overflow-hidden pb-[64px] pt-[260px] min-[1025px]:pb-[88px] min-[1025px]:pt-[350px]"
        >
          <div className="site-shell">
            <div className="grid items-start gap-[38px] min-[1025px]:grid-cols-[0.9fr_1.1fr] min-[1025px]:gap-[48px]">
              <div className="relative z-10">
                <h1
                  id="network-heading"
                  className="max-w-[590px] font-display text-[40px] font-medium leading-[1.08] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px] min-[1025px]:leading-[1.04]"
                >
                  A connected network. A wider world of expertise.
                </h1>
              </div>
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[660px] min-[1025px]:-mt-14">
                <Image
                  src="/images/network/network-ribbons.webp"
                  alt=""
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1440px) 660px, (min-width: 1025px) 48vw, calc(100vw - 40px)"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="network-intro-heading"
          className="pb-8 pt-4 min-[1025px]:pb-12 min-[1025px]:pt-8"
        >
          <div className="site-shell">
            <h2
              id="network-intro-heading"
              className="font-display text-3xl font-semibold text-codezela-title min-[700px]:text-[42px]"
            >
              Our network
            </h2>
            <div className="mt-5 flex flex-col justify-between gap-7 min-[1025px]:flex-row min-[1025px]:items-center">
              <p className="max-w-[650px] text-[17px] leading-relaxed text-[#6c6375]">
                Explore the products, specialist companies and education
                connections that bring creativity, technology and learning into
                the Codezela network.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
                <a href="#specialist-companies" className={button}>
                  Explore the network
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <Link
                  href="/about"
                  className={`py-2 text-base font-medium text-codezela-purple underline underline-offset-4 ${linkFocus}`}
                >
                  About Codezela
                </Link>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-codezela-purple/15 pt-6 text-sm font-medium text-codezela-purple min-[1025px]:mt-12">
              <a
                href="https://lbccompanies.co.uk/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 underline underline-offset-4 ${linkFocus}`}
              >
                LBC Group of Companies
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="https://codezela.co.uk/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 underline underline-offset-4 ${linkFocus}`}
              >
                Codezela UK headquarters
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="specialist-companies"
          aria-labelledby="companies-heading"
          className="scroll-mt-32 py-14 min-[1025px]:py-20"
        >
          <div className="site-shell">
            <h2
              id="companies-heading"
              className="font-display text-3xl font-semibold text-codezela-title min-[700px]:text-[42px]"
            >
              Specialist companies
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#6c6375]">
              Different disciplines, connected through our wider network.
            </p>
            <div className="mt-8 grid gap-x-14 min-[900px]:grid-cols-2">
              {networkCompanies.map((entry) => (
                <MotionReveal key={entry.href}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group flex h-full flex-col gap-6 border-b border-codezela-purple/15 py-8 min-[500px]:flex-row min-[900px]:flex-col min-[1100px]:flex-row ${linkFocus}`}
                  >
                    <Artwork entry={entry} />
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-semibold text-codezela-title transition-colors group-hover:text-codezela-purple">
                        {entry.name}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-[#6c6375]">
                        {entry.description}
                      </p>
                      <Destination entry={entry} />
                    </div>
                  </a>
                </MotionReveal>
              ))}
            </div>
            <p className="mt-8 text-base leading-relaxed text-[#6c6375]">
              Looking for our dedicated local services? Explore{" "}
              <a
                href="https://seo-srilanka.lk/"
                target="_blank"
                rel="noreferrer"
                className={`font-medium text-codezela-purple underline underline-offset-4 ${linkFocus}`}
              >
                SEO Sri Lanka
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              and{" "}
              <a
                href="https://webdesign-srilanka.lk/"
                target="_blank"
                rel="noreferrer"
                className={`font-medium text-codezela-purple underline underline-offset-4 ${linkFocus}`}
              >
                Web Design Sri Lanka
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </section>

        <section
          aria-labelledby="products-heading"
          className="bg-[#faf7ff] py-16 min-[1025px]:py-24"
        >
          <div className="site-shell">
            <h2
              id="products-heading"
              className="font-display text-3xl font-semibold text-codezela-title min-[700px]:text-[42px]"
            >
              Our products
            </h2>
            <p className="mt-4 max-w-[720px] text-[17px] leading-relaxed text-[#6c6375]">
              Purpose-built by Codezela for creative work, clearer decisions and
              everyday productivity.
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-12 min-[700px]:grid-cols-2 min-[1025px]:grid-cols-3">
              {networkProducts.map((entry) => (
                <MotionReveal key={entry.href}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group block h-full ${linkFocus}`}
                  >
                    <Artwork entry={entry} large />
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-codezela-purple">
                      {entry.label}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-codezela-title">
                      {entry.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#6c6375]">
                      {entry.description}
                    </p>
                    <Destination entry={entry} />
                  </a>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="education-heading"
          className="py-16 min-[1025px]:py-24"
        >
          <div className="site-shell">
            <h2
              id="education-heading"
              className="font-display text-3xl font-semibold text-codezela-title min-[700px]:text-[42px]"
            >
              Learning &amp; careers
            </h2>
            <p className="mt-4 max-w-[850px] text-[17px] leading-relaxed text-[#6c6375]">
              Connecting education, practical experience and the next step in a
              technology career.
            </p>
            <div className="mt-10 grid gap-10 min-[700px]:grid-cols-3">
              {networkEducation.map((entry) => (
                <MotionReveal key={entry.href}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group block h-full ${linkFocus}`}
                  >
                    <Artwork entry={entry} large />
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-codezela-purple">
                      {entry.label}
                    </p>
                    <h3 className="mt-2 font-display text-[23px] font-semibold leading-snug text-codezela-title">
                      {entry.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#6c6375]">
                      {entry.description}
                    </p>
                    <Destination entry={entry} />
                  </a>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PageJsonLd
        path="/network"
        title={title}
        description={description}
        pageType="CollectionPage"
        breadcrumbName="Our Network"
        dateModified="2026-09-28T00:00:00+05:30"
      />
    </>
  );
}
