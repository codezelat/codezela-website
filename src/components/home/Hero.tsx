"use client";

import Image from "next/image";
import { CalendarDays, CirclePlus } from "lucide-react";
import { useState } from "react";
import ProposalDialog from "./ProposalDialog";

export function Hero() {
  const [proposalOpen, setProposalOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="home-hero-title"
        className="relative h-[703px] overflow-hidden bg-white md:h-[600px]"
      >
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[88px] -translate-x-1/2 select-none whitespace-nowrap font-display text-[82px] font-bold leading-none text-[#fff5ff] md:top-[120px] md:text-[300px]">
          codezela
        </span>

        <div className="site-shell relative h-full">
          <Image
            src="/images/Group-202-768x768.png"
            alt=""
            width={350}
            height={350}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[48px] h-[220px] w-[220px] -translate-x-1/2 select-none object-contain md:top-[145px] md:h-[350px] md:w-[350px]"
            preload
          />
          <Image
            src="/images/Untitled-1.png.webp"
            width={184}
            height={184}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-[65px] h-[184px] w-[184px] -translate-x-1/2 object-contain md:top-[228px]"
          />

          <Image
            src="/images/Group-323.png.webp"
            width={98}
            height={18}
            alt=""
            aria-hidden="true"
            className="absolute left-[28.125%] top-[175px] hidden h-[18px] w-[98px] object-contain md:block"
          />

          <Image
            src="/images/Group-328.png.webp"
            width={98}
            height={18}
            alt=""
            aria-hidden="true"
            className="absolute left-[65.625%] top-[451px] hidden h-[18px] w-[98px] object-contain md:block"
          />

          <a
            href="https://cal.com/codezela/"
            className="pill-button absolute left-0 top-[269px] h-[66px] w-full px-[15px] text-center text-[16px] md:left-[10px] md:top-[170px] md:h-[50px] md:w-[329px] md:px-6 md:text-[18px]"
          >
            <CalendarDays size={19} strokeWidth={2.5} aria-hidden="true" className="mr-2 shrink-0" />
            Schedule a Free Consultation
          </a>

          <button
            type="button"
            onClick={() => setProposalOpen(true)}
            className="pill-button absolute left-0 top-[355px] h-[70px] w-full cursor-pointer !bg-white px-[15px] text-[18px] !text-codezela-pink hover:!bg-codezela-offwhite md:left-auto md:right-[70px] md:top-[433px] md:h-[52px] md:w-[243px] md:px-6"
          >
            <CirclePlus size={19} strokeWidth={2.5} aria-hidden="true" className="mr-2 shrink-0" />
            Request a Proposal
          </button>

          <div className="absolute left-0 top-[455px] w-full md:top-[395px] md:w-[55%] lg:w-[640px]">
            <h1
              id="home-hero-title"
              className="m-0 font-display text-[30px] font-semibold leading-[36px] text-[#161616] md:text-[32px] md:leading-[44px]"
            >
              Let’s Build Professional &amp; High Converting Software
            </h1>
            <p className="mb-0 mt-[20px] text-[16px] leading-[22.4px] text-codezela-copy md:mt-[20px] md:text-[18px] md:leading-[23.4px]">
              We are an agency that help businesses to grow online with our expertise and creativity in software, design, development, AI and marketing.
            </p>
          </div>
        </div>
      </section>

      <ProposalDialog open={proposalOpen} onClose={() => setProposalOpen(false)} />
    </>
  );
}

export default Hero;
