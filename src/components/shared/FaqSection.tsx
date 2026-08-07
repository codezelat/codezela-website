"use client";

import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { FaqItem } from "@/data/faqs";
import { Minus, Plus } from "lucide-react";
import { useSyncExternalStore } from "react";

const desktopFaqQuery = "(min-width: 1025px)";

function subscribeToDesktopFaqLayout(onChange: () => void) {
  const mediaQuery = window.matchMedia(desktopFaqQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getDesktopFaqLayout() {
  return window.matchMedia(desktopFaqQuery).matches;
}

function getServerFaqLayout() {
  return false;
}

function FaqCard({ faq, index }: { faq: FaqItem; index: number }) {
  return (
    <MotionReveal delay={Math.min(index * 0.035, 0.14)}>
      <details open className="group border border-[#eadfec] bg-white text-[#454545]">
        <summary className="flex min-h-[86px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-[18px] font-semibold leading-[1.45] marker:hidden [&::-webkit-details-marker]:hidden min-[1025px]:px-5">
          <span>{faq.question}</span>
          <Minus aria-hidden="true" className="hidden h-5 w-5 shrink-0 group-open:block" />
          <Plus aria-hidden="true" className="block h-5 w-5 shrink-0 group-open:hidden" />
        </summary>

        <p className="border-t border-[#eadfec] px-5 pb-[26px] pt-[17px] text-[17px] leading-[1.4] text-[#767176]">
          {faq.answer}
        </p>
      </details>
    </MotionReveal>
  );
}

type FaqSectionProps = {
  id: string;
  title?: string;
  description: string;
  faqs: readonly FaqItem[];
  className?: string;
};

export function FaqSection({
  id,
  title = "Frequently Asked Questions",
  description,
  faqs,
  className = "",
}: FaqSectionProps) {
  const useDesktopColumns = useSyncExternalStore(
    subscribeToDesktopFaqLayout,
    getDesktopFaqLayout,
    getServerFaqLayout,
  );
  const columns = useDesktopColumns
    ? [
        faqs.filter((_, index) => index % 2 === 0),
        faqs.filter((_, index) => index % 2 === 1),
      ]
    : [faqs];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`pb-[112px] pt-[106px] min-[1025px]:pb-[124px] min-[1025px]:pt-[104px] ${className}`}
    >
      <div className="site-shell">
        <SectionHeading title={title} description={description} titleId={`${id}-title`} />

        <div className={`mt-[64px] ${useDesktopColumns ? "grid grid-cols-2 gap-x-4" : "grid"}`}>
          {columns.map((columnFaqs, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-[26px]">
              {columnFaqs.map((faq) => {
                const faqIndex = faqs.indexOf(faq);
                return <FaqCard key={faq.question} faq={faq} index={faqIndex} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
