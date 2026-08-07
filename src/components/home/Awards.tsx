import Image from "next/image";

import { awards } from "@/data/home";

import { Carousel } from "../shared/Carousel";
import { SectionHeading } from "../shared/SectionHeading";
import { VideoTestimonials } from "./VideoTestimonials";

const subtitle =
  "Highlighting trust, excellence, and recognition through client testimonials and industry certifications.";

export function Awards() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="min-h-[2527px] bg-white pt-[70px] pb-[167px] md:min-h-[1161px] md:py-[96px]"
    >
      <div className="site-shell relative">
        <div id="testimonials-heading">
          <SectionHeading title="What Our Clients Say" description={subtitle} />
        </div>

        <Carousel
          ariaLabel="Codezela Technologies industry awards"
          className="mx-auto mt-[47px] max-w-[150px] md:absolute md:right-[32px] md:top-[87px] md:mt-0 md:w-[150px]"
          controlsClassName="!hidden"
          delay={4500}
        >
          {awards.map(([name, fileName]) => (
            <div key={fileName} className="flex shrink-0 basis-full justify-center">
              <a
                href="https://techbehemoths.com/company/codezela-technologies"
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} on TechBehemoths`}
                className="rounded-[10px] transition-transform duration-300 hover:scale-[1.04]"
              >
                <Image
                  src={`/images/${fileName}`}
                  alt={name}
                  width={150}
                  height={150}
                  className="h-[150px] w-[150px] rounded-[5px] object-contain"
                />
              </a>
            </div>
          ))}
        </Carousel>

        <VideoTestimonials />
      </div>
    </section>
  );
}
