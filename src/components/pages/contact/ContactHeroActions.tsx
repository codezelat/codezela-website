"use client";

import ProposalDialog from "@/components/home/ProposalDialog";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { CalendarDays, MessageSquareText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ContactHeroActions() {
  const [proposalOpen, setProposalOpen] = useState(false);

  return (
    <>
      <MotionReveal
        className="relative mx-auto mt-10 h-[390px] w-full max-w-[650px] min-[1025px]:mt-0 min-[1025px]:translate-y-[115px]"
        delay={0.08}
      >
        <Image
          src="/images/contact/contact-page-hero-rightside-bg.png.webp"
          alt=""
          fill
          unoptimized
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1024px) calc(100vw - 40px), 650px"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-80"
        />
        <a
          href="https://calendly.com/codezela/consult"
          target="_blank"
          rel="noreferrer"
          className="pill-button absolute left-0 top-[58px] h-[54px] w-[332px] max-w-[92%] gap-3 bg-[#8840c8] text-[17px]"
        >
          <CalendarDays size={20} aria-hidden="true" /> Schedule a Call
        </a>
        <button
          type="button"
          onClick={() => setProposalOpen(true)}
          className="pill-button absolute bottom-[58px] right-0 h-[54px] w-[365px] max-w-[92%] cursor-pointer gap-3 bg-[#8840c8] text-[17px]"
        >
          <MessageSquareText size={20} aria-hidden="true" /> Request a Proposal
        </button>
      </MotionReveal>

      <ProposalDialog open={proposalOpen} onClose={() => setProposalOpen(false)} />
    </>
  );
}
