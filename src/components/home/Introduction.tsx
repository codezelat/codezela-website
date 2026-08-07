import Image from "next/image";

import { MotionReveal } from "@/components/shared/MotionReveal";

export function Introduction() {
  return (
    <section aria-labelledby="introduction-title" className="h-[874px] bg-white md:h-[470px]">
      <div className="site-shell grid h-full grid-cols-1 content-start pt-[70px] md:grid-cols-[56%_44%] md:items-start md:pt-[80px]">
        <MotionReveal className="md:pr-8">
          <h2
            id="introduction-title"
            className="m-0 font-display text-[34px] font-semibold leading-[37.4px] text-codezela-title md:text-[40px] md:leading-[44px]"
          >
            Empowering Global Success through Innovative Digital Solutions
          </h2>
          <p className="mb-0 mt-[31px] text-[16px] leading-[22.4px] text-codezela-copy md:mt-[30px] md:max-w-[704px] md:text-[18px] md:leading-[25.2px]">
            Codezela Technologies, headquartered in London, United Kingdom and located in Western, Sri Lanka, is a leading computer software company with a diverse global client base. Specializing in web design, development, graphic design, and digital marketing, our highly qualified team, certified by international companies, delivers tailored solutions.
          </p>
        </MotionReveal>

        <MotionReveal className="relative mt-[40px] h-[300px] w-full md:ml-[18px] md:mt-[5px] min-[1310px]:w-[526px]" delay={0.08}>
          <div className="relative h-[300px] w-full overflow-hidden rounded-[15px] lg:w-[400px]">
            <Image
              src="/images/meeting-2-768x534.jpg.webp"
              alt="Codezela team collaborating during a strategy meeting"
              fill
              sizes="(max-width: 899px) 320px, 400px"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="absolute left-[264px] top-[25px] hidden h-[250px] w-[300px] overflow-hidden rounded-[15px] border-[3px] border-white min-[1310px]:block">
            <Image
              src="/images/meeting-1-768x459.jpg.webp"
              alt="Codezela team members discussing a digital project"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

export default Introduction;
