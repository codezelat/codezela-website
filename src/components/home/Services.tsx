import Image from "next/image";

import { services } from "@/data/home";
import { Carousel } from "@/components/shared/Carousel";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const carouselControlStyles = [
  "mt-[40px] justify-end md:mt-[47px]",
  "[&_.carousel-control:first-child]:border-[#d300ff]",
  "[&_.carousel-control:first-child]:text-[#d300ff]",
  "[&_.carousel-control:last-child]:border-[#d300ff]",
  "[&_.carousel-control:last-child]:bg-[#d300ff]",
  "[&_.carousel-control:last-child]:text-white",
].join(" ");

export function Services() {
  return (
    <section
      id="services"
      className="h-[775px] bg-codezela-offwhite pt-[70px] pb-[50px] md:h-auto md:min-h-[827px] md:pt-[108px] md:pb-[90px]"
      aria-labelledby="services-heading"
    >
      <div className="site-shell">
        <div id="services-heading">
          <SectionHeading
            title="Our Services"
            description="Empower your brand’s digital journey with innovative design, compelling branding, seamless e-commerce, and strategic marketing solutions."
          />
        </div>

        <MotionReveal className="mt-[35px] md:mt-[45px]" delay={0.06}>
          <Carousel
            ariaLabel="Codezela software development services"
            className="[&_.overflow-hidden>div]:gap-[10px]"
            controlsClassName={carouselControlStyles}
            delay={5000}
          >
            {services.map((service, index) => {
              const titleId = `service-title-${index}`;

              return (
                <article
                  key={service.title}
                  className="interactive-card h-[383px] min-w-0 shrink-0 grow-0 basis-full rounded-[8px] border border-[#f0dff2] bg-[#fffdff] px-[30px] pt-[40px] text-center md:h-[377px] md:basis-[calc((100%_-_10px)/2)] md:px-[40px] md:pt-[75px] xl:basis-[calc((100%_-_20px)/3)]"
                  aria-labelledby={titleId}
                >
                  <Image
                    className="mx-auto size-[40px] object-contain"
                    src={service.icon}
                    alt=""
                    width={40}
                    height={40}
                    sizes="40px"
                  />
                  <h3
                    id={titleId}
                    className="mt-[20px] flex min-h-[96px] items-center justify-center text-balance font-display text-[24px] leading-[24px] font-bold text-codezela-card-copy md:min-h-[48px]"
                  >
                    {service.title}
                  </h3>
                  <div className="mt-[22px] h-px w-full bg-[#dedede]" aria-hidden="true" />
                  <p className="mx-auto mt-[28px] max-w-[350px] text-[16px] leading-[20.8px] text-codezela-card-copy">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </Carousel>
        </MotionReveal>
      </div>
    </section>
  );
}
