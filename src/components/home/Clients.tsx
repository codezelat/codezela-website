import Image from "next/image";

import { clients } from "@/data/home";

import { Carousel } from "../shared/Carousel";
import { SectionHeading } from "../shared/SectionHeading";

const subtitle =
  "Partnering with businesses worldwide to build lasting relationships and drive their digital success.";

export function Clients() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="min-h-[521px] bg-codezela-offwhite py-[72px] md:min-h-[560px] md:py-[105px]"
    >
      <div className="site-shell">
        <div id="clients-heading">
          <SectionHeading title="Our Clients" description={subtitle} />
        </div>

        <Carousel
          ariaLabel="Codezela client logos"
          className="mt-[55px] md:mt-[58px]"
          controlsClassName="mt-[34px] justify-end"
          delay={4200}
        >
          {clients.map(([name, fileName]) => (
            <div
              key={`${name}-${fileName}`}
              className="min-w-0 shrink-0 basis-full px-[8px] sm:basis-1/2 md:basis-1/4 md:px-[12px]"
            >
              <div className="flex h-[116px] items-center justify-center rounded-[10px] bg-white px-7 py-5 shadow-[0_7px_20px_rgba(72,20,91,0.045)]">
                <Image
                  src={`/images/${fileName}`}
                  alt={`${name} logo`}
                  width={260}
                  height={110}
                  sizes="(max-width: 639px) 260px, (max-width: 767px) 45vw, 22vw"
                  className="h-[76px] w-full object-contain"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
