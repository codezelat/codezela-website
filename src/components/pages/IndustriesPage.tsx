"use client";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { industries } from "@/data/home";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { BsOpenai } from "react-icons/bs";
import {
  SiFirebase,
  SiFlutter,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiShopify,
  SiWebflow,
  SiWordpress,
} from "react-icons/si";

const technologyIcons = [
  SiNextdotjs,
  SiWordpress,
  SiPython,
  BsOpenai,
  SiLaravel,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiShopify,
  SiWebflow,
  SiFlutter,
  SiFirebase,
] as const;

const firstPageIcons = [
  "/images/bank_1669617.svg",
  "/images/online-store.svg",
  "/images/health-insurance.svg",
  "/images/online-education.svg",
  "/images/house.svg",
] as const;

const financeDescription =
  "Empower your financial institution with cutting-edge digital solutions that streamline operations, enhance customer experiences, and ensure compliance. At Codezela Technologies, we offer secure banking platforms, digital payment gateways, and advanced fraud detection systems to keep your operations efficient and protected. With our expertise, we modernise legacy systems and introduce seamless fintech innovations to meet evolving regulatory requirements. Stay ahead of industry trends with our bespoke solutions for finance management, mobile banking, and wealth management. From blockchain integration to AI-driven financial analysis, we help you navigate the complexities of modern banking with ease. Let us handle the technology, so you can focus on growing your financial services.";

const pageSize = 5;

function localIcon(index: number, source: string) {
  if (index < firstPageIcons.length) return firstPageIcons[index];
  return source;
}

export function IndustriesPage() {
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const pageCount = Math.ceil(industries.length / pageSize);
  const pageItems = useMemo(
    () => industries.slice(page * pageSize, page * pageSize + pageSize),
    [page],
  );
  const active = pageItems[activeIndex] ?? pageItems[0];
  const globalIndex = page * pageSize + activeIndex;

  const movePage = (direction: number) => {
    setPage((current) => Math.min(pageCount - 1, Math.max(0, current + direction)));
    setActiveIndex(0);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <section aria-labelledby="industries-hero-title" className="overflow-hidden bg-white">
          <div className="site-shell grid min-h-[752px] items-center gap-14 pb-16 pt-[80px] min-[1025px]:grid-cols-[0.95fr_1.05fr] min-[1025px]:pb-0 min-[1025px]:pt-[120px]">
            <MotionReveal className="relative z-10 min-[1025px]:translate-y-[34px]">
              <h1 id="industries-hero-title" className="max-w-[560px] font-display text-[40px] font-medium leading-[1.05] text-codezela-title min-[1025px]:text-[52px]">
                We utilize modern technologies to revolutionize industries
              </h1>
            </MotionReveal>

            <MotionReveal className="relative mx-auto w-full max-w-[650px] min-[1025px]:translate-y-[105px]" delay={0.08}>
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f6e8fa_0_35%,#fbf2fd_36%_55%,#fdf8fe_56%_72%,transparent_73%)] min-[1025px]:h-[440px] min-[1025px]:w-[440px]" />
              <div className="relative grid grid-cols-4 gap-3 min-[1025px]:gap-5">
                {technologyIcons.map((Icon, index) => (
                  <div key={index} className="grid aspect-[1.45] place-items-center rounded-[14px] bg-[#8840c8] text-white shadow-[0_12px_30px_rgba(113,11,192,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:bg-codezela-purple">
                    <Icon className="h-8 w-8 min-[1025px]:h-10 min-[1025px]:w-10" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        <section aria-labelledby="industry-expertise-title" className="pb-[120px] pt-[86px]">
          <div className="site-shell">
            <MotionReveal>
              <h2 id="industry-expertise-title" className="section-heading">Our Industry Expertise</h2>
              <p className="section-description max-w-[860px]">
                Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in healthcare, finance, e-commerce, education, and beyond.
              </p>
            </MotionReveal>

            <div className="mt-[70px] grid gap-12 min-[1025px]:grid-cols-[428px_1fr] min-[1025px]:gap-5">
              <div>
                <div className="space-y-[22px]" aria-label={`Industries page ${page + 1}`}>
                  {pageItems.map((item, index) => {
                    const selected = index === activeIndex;
                    const icon = localIcon(page * pageSize + index, item.icon);
                    return (
                      <MotionReveal key={item.title} delay={index * 0.045}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setActiveIndex(index)}
                          className={`group flex min-h-[164px] w-full cursor-pointer flex-col items-start justify-between rounded-[6px] border px-6 py-6 text-left transition-all duration-300 ${selected ? "border-codezela-purple bg-[#8840c8] text-white shadow-[0_16px_38px_rgba(113,11,192,0.16)]" : "border-[#eee4f0] bg-white text-[#444] hover:-translate-y-1 hover:border-codezela-pink/30 hover:shadow-[0_14px_34px_rgba(69,0,83,0.08)]"}`}
                        >
                          <span className={`grid h-[70px] w-[70px] place-items-center rounded-full ${selected ? "bg-white" : "bg-[#fffaff]"}`}>
                            <Image src={icon} alt="" width={46} height={46} className="h-[46px] w-[46px] object-contain" unoptimized />
                          </span>
                          <span className="mt-5 font-display text-[18px] font-semibold leading-6">{item.title}</span>
                        </button>
                      </MotionReveal>
                    );
                  })}
                </div>
                <div className="mt-5 flex items-center justify-center gap-4 text-[16px]">
                  <button type="button" onClick={() => movePage(-1)} disabled={page === 0} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-codezela-copy transition-colors hover:text-codezela-purple disabled:cursor-not-allowed disabled:opacity-35">
                    <ChevronLeft size={18} aria-hidden="true" /> Previous
                  </button>
                  <span className="text-sm text-codezela-copy" aria-live="polite">{page + 1} / {pageCount}</span>
                  <button type="button" onClick={() => movePage(1)} disabled={page === pageCount - 1} className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-codezela-copy transition-colors hover:text-codezela-purple disabled:cursor-not-allowed disabled:opacity-35">
                    Next <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <MotionReveal className="min-h-[520px] px-0 py-2 min-[1025px]:px-0" delay={0.08}>
                <div key={`${page}-${activeIndex}`} className="animate-[fade-in_360ms_ease-out]">
                  <p className="font-display text-[18px] font-medium text-[#3d3d3d]">{active.title}</p>
                  <h3 className="mt-3 max-w-[800px] font-display text-[34px] font-semibold leading-[1.08] text-[#454545] min-[1025px]:text-[40px]">
                    {globalIndex === 0 ? "Transforming Finance and Banking with Innovative Technology" : `Transforming ${active.title} with Innovative Technology`}
                  </h3>
                  <p className="mt-5 max-w-[810px] text-[17px] leading-[1.52] text-[#505050]">
                    {globalIndex === 0 ? financeDescription : active.description}
                  </p>
                  <a href={active.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-[16px] font-medium text-codezela-title underline decoration-1 underline-offset-4 transition-colors hover:text-codezela-pink-ink">
                    Learn more about how we can help you excel above your competitors
                    <ChevronRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
