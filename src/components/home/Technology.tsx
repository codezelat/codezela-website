import Image from "next/image";

import { technologyLogos } from "@/data/home";

import { SectionHeading } from "../shared/SectionHeading";

const subtitle =
  "Empowering businesses with innovative, scalable, and user-centric technology solutions that drive growth and success.";

export function Technology() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="h-[1576px] overflow-hidden bg-codezela-offwhite py-[84px] md:h-auto md:min-h-[1002px] md:overflow-visible md:py-[105px]"
    >
      <div className="site-shell">
        <div id="technology-heading">
          <SectionHeading title="Our Tech Expertise" description={subtitle} />
        </div>

        <ul className="mx-auto mt-[66px] grid max-w-[960px] grid-cols-2 gap-[18px] md:mt-[64px] md:grid-cols-4">
          {technologyLogos.map(([name, fileName]) => (
            <li
              key={name}
              className="flex h-[136px] items-center justify-center overflow-hidden rounded-[8px] bg-white px-6 py-7 shadow-[0_7px_18px_rgba(72,20,91,0.07)] md:h-[141px]"
            >
              <Image
                src={`/images/${fileName}`}
                alt={`${name} technology logo`}
                width={190}
                height={88}
                sizes="(max-width: 767px) 130px, 190px"
                className="h-[76px] w-full max-w-[170px] object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
