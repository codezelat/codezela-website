import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { portfolioItems } from "@/data/home";

import { SectionHeading } from "../shared/SectionHeading";

const subtitle =
  "Showcasing a proven track record of delivering exceptional digital solutions tailored to diverse business needs.";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="h-[3315px] overflow-hidden bg-white pt-[70px] pb-[70px] md:h-auto md:min-h-[2490px] md:overflow-visible md:pb-[92px] md:pt-[46px]"
    >
      <div className="site-shell">
        <div id="portfolio-heading">
          <SectionHeading title="Our Portfolio" description={subtitle} />
        </div>

        <div className="mx-auto mt-[47px] max-w-[1216px] space-y-[30px] md:mt-[45px] md:space-y-[30px]">
          {portfolioItems.map((project, index) => {
            const imageOnLeft = index % 2 === 1;

            return (
              <article
                key={project.title}
                className={`grid ${index < 2 ? "h-[668px]" : index === 2 ? "h-[703px]" : "h-[773px]"} overflow-hidden rounded-[16px] bg-[#fff7ff] md:h-auto md:min-h-[650px] lg:!h-[491px] lg:!min-h-[491px] lg:grid-cols-2 lg:rounded-[18px] ${
                  index % 2 === 0 ? "lg:bg-[#fff7ff]" : "lg:bg-white"
                }`}
              >
                <div
                  className={`order-2 flex min-h-0 flex-col items-start p-[10px] lg:min-h-[405px] lg:px-[38px] lg:py-[30px] ${
                    imageOnLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="order-1 flex h-[40px] w-full items-center justify-center rounded-full bg-[#fcebff] px-4 font-display text-[20px] font-medium leading-5 text-codezela-pink lg:h-auto lg:w-fit lg:justify-start lg:bg-[#fde9ff] lg:py-[9px] lg:text-[16px] lg:font-semibold lg:leading-none">
                    {project.type}
                  </p>
                  <h3 className="order-3 mt-[20px] max-w-[490px] font-display text-[32px] font-bold leading-[35.2px] text-[#161616] lg:order-2 lg:mt-[18px] lg:text-[31px] lg:font-semibold lg:leading-[1.08]">
                    <a className="transition-colors hover:text-codezela-title" href={project.href}>
                      {project.title}
                    </a>
                  </h3>
                  <p className="order-4 mt-[20px] max-w-[500px] text-[16px] leading-[22.4px] text-codezela-copy lg:order-3 lg:mt-[18px] lg:text-[17px] lg:leading-[1.32]">
                    {project.description}
                  </p>
                  <p className="order-2 mt-[20px] text-[18px] font-medium leading-[18px] text-[#949494]/50 lg:order-4 lg:mt-auto lg:pt-8 lg:text-[16px] lg:leading-normal lg:text-[#d0cbd2]">
                    {project.category}
                  </p>
                </div>

                <a
                  href={project.href}
                  aria-label={`View ${project.title}`}
                  className={`group order-1 flex h-[320px] items-center justify-center bg-[#fff7ff] p-[10px] lg:h-auto lg:min-h-[405px] lg:p-[18px] ${
                    imageOnLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-white px-4 py-8">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      width={768}
                      height={450}
                      sizes="(max-width: 1023px) calc(100vw - 72px), 50vw"
                      className="h-auto max-h-[330px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </span>
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-[60px] text-center">
          <a
            href="https://codezela.com/portfolio/"
            className="pill-button h-[44px] !min-h-[44px] gap-2 !bg-[#8d3ccd] !font-footer px-6 hover:!bg-codezela-purple"
          >
            View All Projects
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
