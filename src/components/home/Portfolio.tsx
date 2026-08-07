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
      className="h-[3315px] overflow-hidden bg-white pt-[70px] pb-[70px] md:h-auto md:min-h-[2490px] md:overflow-visible md:py-[92px]"
    >
      <div className="site-shell">
        <div id="portfolio-heading">
          <SectionHeading title="Our Portfolio" description={subtitle} />
        </div>

        <div className="mt-[47px] space-y-[30px] md:mt-[66px] md:space-y-10">
          {portfolioItems.map((project, index) => {
            const imageOnLeft = index % 2 === 1;

            return (
              <article
                key={project.title}
                className={`grid ${index < 2 ? "h-[668px]" : index === 2 ? "h-[703px]" : "h-[773px]"} overflow-hidden rounded-[16px] md:h-auto md:min-h-[650px] lg:min-h-[405px] lg:grid-cols-2 lg:rounded-[18px] ${
                  index % 2 === 0 ? "bg-[#fff7ff]" : "bg-white"
                }`}
              >
                <div
                  className={`order-2 flex min-h-[312px] flex-col items-start px-5 pb-7 pt-7 lg:min-h-[405px] lg:px-[38px] lg:py-[30px] ${
                    imageOnLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="rounded-full bg-[#fde9ff] px-4 py-[9px] font-display text-[15px] font-semibold leading-none text-codezela-pink md:text-[16px]">
                    {project.type}
                  </p>
                  <h3 className="mt-[18px] max-w-[490px] font-display text-[27px] font-semibold leading-[1.08] text-[#161616] md:text-[31px]">
                    <a className="transition-colors hover:text-codezela-title" href={project.href}>
                      {project.title}
                    </a>
                  </h3>
                  <p className="mt-[18px] max-w-[500px] text-[16px] leading-[1.32] text-codezela-copy md:text-[17px]">
                    {project.description}
                  </p>
                  <p className="mt-auto pt-8 text-[15px] font-medium text-[#d0cbd2] md:text-[16px]">
                    {project.category}
                  </p>
                </div>

                <a
                  href={project.href}
                  aria-label={`View ${project.title}`}
                  className={`group order-1 flex min-h-[310px] items-center justify-center bg-[#fff7ff] p-4 lg:min-h-[405px] lg:p-[18px] ${
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

        <div className="mt-[60px] text-center md:mt-[70px]">
          <a
            href="https://codezela.com/portfolio/"
            className="pill-button h-[44px] !min-h-[44px] gap-2 !bg-[#8d3ccd] px-6 hover:!bg-codezela-purple"
          >
            View All Projects
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
