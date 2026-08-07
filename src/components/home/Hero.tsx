import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { preload } from "react-dom";
import { ProposalLauncher } from "./ProposalLauncher";

export function Hero() {
  preload("/images/hero-wordmark-mobile.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 767px)",
  });
  preload("/images/hero-wordmark-desktop.webp", {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 768px)",
  });

  return (
    <section aria-labelledby="home-hero-title" className="hero-section relative h-[703px] overflow-hidden bg-white md:h-[600px]">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/hero-wordmark-desktop.webp" />
        <img
          src="/images/hero-wordmark-mobile.webp"
          alt=""
          width={480}
          height={115}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="pointer-events-none absolute left-0 top-[18%] h-auto w-full -translate-y-[18%] select-none opacity-[0.74] md:top-[37%] md:-translate-y-[37%]"
        />
      </picture>
      <div className="site-shell relative h-full">
        <div
          aria-hidden="true"
          className="hero-mark-halo pointer-events-none absolute left-1/2 top-[48px] h-[220px] w-[220px] -translate-x-1/2 select-none object-contain md:top-[170px] md:h-[300px] md:w-[300px]"
        />
        <Image
          src="/images/Untitled-1.png.webp"
          width={184}
          height={184}
          alt=""
          aria-hidden="true"
          className="hero-mark-core absolute left-1/2 top-[65px] h-[184px] w-[184px] -translate-x-1/2 object-contain md:top-[228px]"
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
          target="_blank"
          rel="noreferrer"
          className="pill-button hero-action absolute left-0 top-[269px] h-[66px] w-full gap-[10px] whitespace-nowrap !border-codezela-pink !bg-codezela-pink px-[14px] text-center font-footer text-[15px] min-[360px]:text-[16px] md:left-[10px] md:top-[163px] md:h-[50px] md:w-[329px] md:gap-3 md:px-6 md:text-[17px]"
        >
          <CalendarDays size={19} strokeWidth={2.5} aria-hidden="true" className="hero-action__icon shrink-0" />
          Schedule a Free Consultation
        </a>

        <ProposalLauncher />

        <div className="absolute left-0 top-[455px] w-full md:top-[395px] md:w-[55%] lg:w-[640px]">
          <h1
            id="home-hero-title"
            className="m-0 font-display text-[30px] font-semibold leading-[36px] text-[#161616] md:text-[32px] md:leading-[44px]"
          >
            Let’s Build Professional &amp; High Converting Software
          </h1>
          <p className="mb-0 mt-[20px] text-[16px] leading-[22.4px] text-codezela-copy md:mt-[20px] md:text-[18px] md:leading-[23.4px]">
            We are an agency that helps businesses grow online through our expertise and creativity in software, design, development, AI, and marketing.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
