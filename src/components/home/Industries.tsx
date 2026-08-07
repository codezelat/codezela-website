import Image from "next/image";

import { industries } from "@/data/home";
import { Carousel } from "@/components/shared/Carousel";
import { SectionHeading } from "@/components/shared/SectionHeading";

const carouselControlStyles = [
  "mt-[42px] justify-end md:mt-[55px]",
  "[&_.carousel-control:first-child]:border-[#d300ff]",
  "[&_.carousel-control:first-child]:text-[#d300ff]",
  "[&_.carousel-control:last-child]:border-[#d300ff]",
  "[&_.carousel-control:last-child]:bg-[#d300ff]",
  "[&_.carousel-control:last-child]:text-white",
].join(" ");

export function Industries() {
  return (
    <section
      id="industries"
      className="h-[899px] bg-white pt-[78px] pb-[59px] md:h-auto md:min-h-[824px] md:pt-[108px] md:pb-[55px]"
      aria-labelledby="industries-heading"
    >
      <div className="site-shell">
        <div id="industries-heading">
          <SectionHeading
            title="Our Industry Expertise"
            description="Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in healthcare, finance, e-commerce, education, and beyond."
          />
        </div>

        <Carousel
          ariaLabel="Industries served by Codezela Technologies"
          className="mt-[54px] px-[10px] [&_.overflow-hidden>div]:gap-[30px]"
          controlsClassName={carouselControlStyles}
          delay={5400}
        >
          {industries.map((item, index) => {
            const titleId = `industry-title-${index}`;

            return (
              <article
                key={item.title}
                className="flex h-[407px] min-w-0 shrink-0 grow-0 basis-full flex-col items-center rounded-[8px] border border-[#f0dff2] bg-[#fffdff] px-[10px] pt-[58px] text-center md:h-[392px] md:basis-[calc((100%_-_30px)/2)] md:pt-[52px] xl:basis-[calc((100%_-_60px)/3)]"
                aria-labelledby={titleId}
              >
                <Image
                  className="size-[40px] object-contain"
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  sizes="40px"
                />
                <h3
                  id={titleId}
                  className="mt-[17px] flex min-h-[44px] items-center justify-center text-balance font-display text-[18px] leading-[22px] font-semibold text-codezela-card-copy"
                >
                  {item.title}
                </h3>
                <p className="mt-[11px] flex min-h-[105px] max-w-[360px] items-center justify-center text-[16px] leading-[20.8px] text-codezela-card-copy">
                  {item.description}
                </p>
                <div className="mt-[16px] h-px w-full bg-[#dedede]" aria-hidden="true" />
                <a
                  className="mt-[25px] inline-flex h-[50px] w-[154px] items-center justify-center rounded-full border border-[#eadfed] bg-[#fbe6ff] text-[16px] leading-none font-medium text-[#8d3ccd] transition-colors duration-200 hover:border-codezela-purple hover:bg-codezela-purple hover:text-white"
                  href={item.href}
                  aria-label={`Learn more about ${item.title} solutions`}
                >
                  Learn More
                </a>
              </article>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
