import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AboutStats } from "./about/AboutStats";
import { Locations } from "./about/Locations";
import { ProcessTimeline } from "./about/ProcessTimeline";
import { coreValues, leaders, sectionDescription } from "./about/data";

const heroBubbles = [
  {
    label: "Design",
    className:
      "left-[6%] top-[8%] min-[1025px]:left-[2%] min-[1025px]:top-[6%]",
  },
  {
    label: "Engineer",
    className:
      "right-[-1%] top-[37%] min-[1025px]:right-[2%] min-[1025px]:top-[38%]",
  },
  {
    label: "Data",
    className:
      "bottom-[6%] left-[10%] min-[1025px]:bottom-[3%] min-[1025px]:left-[5%]",
  },
] as const;

function Hero() {
  return (
    <section className="overflow-hidden pb-[64px] pt-[260px] min-[1025px]:min-h-[1070px] min-[1025px]:pb-[88px] min-[1025px]:pt-[350px]">
      <div className="site-shell grid items-start gap-[38px] min-[1025px]:grid-cols-[0.9fr_1.1fr] min-[1025px]:gap-[48px]">
        <MotionReveal distance={18}>
          <h1 className="max-w-[590px] font-display text-[40px] font-medium leading-[1.08] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px] min-[1025px]:leading-[1.04]">
            Our values are what ensure project success and client satisfaction
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.1} distance={26}>
          <div className="relative mx-auto aspect-square w-full max-w-[660px]">
            <Image
              src="/images/about/about-hero-bg-1024x1024.png.webp"
              alt=""
              fill
              preload
              sizes="(max-width: 1024px) calc(100vw - 40px), 660px"
              className="object-contain"
            />
            {heroBubbles.map((bubble) => (
              <div
                key={bubble.label}
                className={`absolute flex h-[102px] w-[102px] flex-col items-center justify-center rounded-full bg-[#843dcb] text-white shadow-[0_16px_36px_rgba(113,11,192,0.16)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_42px_rgba(113,11,192,0.25)] min-[1025px]:h-[150px] min-[1025px]:w-[150px] ${bubble.className}`}
              >
                <span className="grid h-[23px] w-[23px] place-items-center rounded-full bg-white min-[1025px]:h-[24px] min-[1025px]:w-[24px]">
                  <Check aria-hidden="true" className="h-[17px] w-[17px] text-[#843dcb]" strokeWidth={4} />
                </span>
                <span className="mt-1.5 text-[16px] leading-5 min-[1025px]:text-[18px]">
                  {bubble.label}
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="pb-[120px] pt-[105px] min-[1025px]:pb-[90px] min-[1025px]:pt-[78px]">
      <div className="site-shell">
        <SectionHeading title="Who We Are" description={sectionDescription} />

        <div className="mt-[76px] grid items-center gap-[52px] min-[1025px]:grid-cols-[1.15fr_0.85fr] min-[1025px]:gap-[72px]">
          <MotionReveal>
            <div className="space-y-[18px] text-[17px] leading-[1.35] text-[#636363] min-[1025px]:text-[16px] min-[1025px]:leading-[1.3]">
              <p>
                Codezela Technologies, located in Western, Sri Lanka, is a leading computer software
                company with a diverse global client base. Specializing in web design, development,
                graphic design, and digital marketing, our highly qualified team, certified by
                international companies, delivers tailored solutions.
              </p>
              <p>
                At Codezela Technologies, we are driven by a passion for innovation and excellence. Our
                team thrives on creating solutions that empower businesses to succeed in today’s
                competitive digital world. With expertise across industries like healthcare, finance,
                e-commerce, and education, we understand the unique challenges of each sector and craft
                strategies to overcome them. Our commitment to quality ensures every project is handled
                with precision, creativity, and professionalism. By blending cutting-edge technology with
                a deep understanding of your goals, we transform ideas into impactful solutions. At
                Codezela Technologies, we don’t just build software; we build partnerships that drive
                success.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="relative mx-auto h-[330px] w-full max-w-[530px]">
              <div className="absolute left-0 top-0 h-[84%] w-[70%] overflow-hidden rounded-[15px] bg-[#f5eef7] shadow-[0_16px_38px_rgba(72,20,91,0.10)]">
                <Image
                  src="/images/meeting-2-768x534.jpg.webp"
                  alt="Codezela team members collaborating in a meeting"
                  fill
                  sizes="(max-width: 1024px) 68vw, 370px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-[66%] w-[58%] overflow-hidden rounded-[15px] border-[4px] border-white bg-[#f5eef7] shadow-[0_18px_42px_rgba(72,20,91,0.12)]">
                <Image
                  src="/images/meeting-1-768x459.jpg.webp"
                  alt="Codezela leadership meeting with the development team"
                  fill
                  sizes="(max-width: 1024px) 58vw, 310px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="bg-[#5f17b3] text-white">
      <div className="grid min-[1025px]:min-h-[400px] min-[1025px]:grid-cols-2">
        <MotionReveal className="flex min-h-[360px] items-center justify-center px-8 py-16 min-[1025px]:min-h-0 min-[1025px]:px-[100px]">
          <div className="max-w-[560px] text-center">
            <h2 className="font-display text-[40px] font-semibold leading-[1.1] min-[1025px]:text-[44px]">
              Our Vision
            </h2>
            <p className="mt-[28px] text-[18px] font-medium leading-[1.55] min-[1025px]:text-[19px]">
              To be a globally recognized leader in innovation digital solutions, seamlessly bridging
              businesses with cutting-edge technology while empowering growth across industries.
            </p>
          </div>
        </MotionReveal>
        <MotionReveal className="flex min-h-[390px] items-center justify-center border-t border-white/15 px-8 py-16 min-[1025px]:min-h-0 min-[1025px]:border-l min-[1025px]:border-t-0 min-[1025px]:px-[100px]" delay={0.08}>
          <div className="max-w-[590px] text-center">
            <h2 className="font-display text-[40px] font-semibold leading-[1.1] min-[1025px]:text-[44px]">
              Our Mission
            </h2>
            <p className="mt-[28px] text-[18px] font-medium leading-[1.55] min-[1025px]:text-[19px]">
              Our mission is to empower businesses by providing innovative, cutting-edge IT solutions
              that drive growth, efficiency, and digital transformation. We are committed to exceeding
              expectations through unparalleled service, creativity, and excellence, fostering long-term
              partnerships with our clients worldwide.
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="pb-[126px] pt-[112px] min-[1025px]:min-h-[670px] min-[1025px]:pb-[30px] min-[1025px]:pt-[110px]">
      <div className="site-shell">
        <SectionHeading title="Bringing Your Idea To Life Is Easy" description={sectionDescription} />

        <MotionReveal className="mt-[74px] min-[1025px]:mt-[82px]">
          <ProcessTimeline />
        </MotionReveal>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="pb-[125px] pt-[105px] min-[1025px]:min-h-[760px] min-[1025px]:pb-0">
      <div className="site-shell">
        <SectionHeading title="Our Core Values" description={sectionDescription} />
        <div className="mt-[78px] grid items-center gap-[64px] min-[1025px]:grid-cols-[1.05fr_1fr] min-[1025px]:gap-[64px]">
          <MotionReveal>
            <div className="relative mx-auto h-[390px] w-full max-w-[590px] min-[1025px]:h-[420px]">
              <div className="absolute bottom-0 left-0 h-[84%] w-[72%] overflow-hidden rounded-[15px] bg-[#f4eff6] shadow-[0_16px_40px_rgba(72,20,91,0.09)]">
                <Image
                  src="/images/about/handshake-close-up-executives-768x512.jpg.webp"
                  alt="Business leaders shaking hands"
                  fill
                  sizes="(max-width: 1024px) 70vw, 430px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                />
              </div>
              <div className="absolute bottom-[8%] right-0 h-[70%] w-[55%] overflow-hidden rounded-[15px] border-[4px] border-white bg-[#f4eff6] shadow-[0_18px_42px_rgba(72,20,91,0.12)]">
                <Image
                  src="/images/about/Rectangle-76-768x649.png.webp"
                  alt="Team planning ideas around a whiteboard"
                  fill
                  sizes="(max-width: 1024px) 55vw, 330px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.035]"
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <ol className="space-y-[28px]">
              {coreValues.map((value) => (
                <li key={value.title}>
                  <h3 className="font-display text-[28px] font-normal leading-[1.15] text-codezela-title min-[1025px]:text-[30px]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[17px] leading-[1.35] text-[#636363] min-[1025px]:text-[18px]">
                    {value.description}
                  </p>
                </li>
              ))}
            </ol>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="pb-[130px] pt-[100px] min-[1025px]:min-h-[800px] min-[1025px]:pt-[72px]">
      <div className="site-shell">
        <SectionHeading title="Passionate and Young Energy Drives Success" description={sectionDescription} />
        <MotionReveal className="mt-[72px]">
          <ul className="grid gap-[54px] min-[700px]:grid-cols-3 min-[700px]:gap-10">
            {leaders.map((leader) => (
              <li key={leader.name} className="group text-center">
                <div className="relative mx-auto h-[240px] w-[240px] overflow-hidden rounded-[10px] bg-[#f5eef7] shadow-[0_14px_30px_rgba(72,20,91,0.08)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_42px_rgba(72,20,91,0.15)] min-[1025px]:h-[185px] min-[1025px]:w-[185px]">
                  <Image
                    src={leader.image}
                    alt={`${leader.name}, ${leader.title} of Codezela Technologies`}
                    fill
                    sizes="(max-width: 699px) 240px, 185px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <h3 className="mt-[20px] font-display text-[18px] font-semibold leading-6 text-[#161616]">
                  {leader.name}
                </h3>
                <p className="mt-[14px] text-[17px] leading-6 text-[#636363]">{leader.title}</p>
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}

function ContactCallout() {
  return (
    <section className="flex min-h-[480px] items-center bg-[#fff9ff] py-[92px] min-[1025px]:min-h-[405px] min-[1025px]:py-[60px]">
      <MotionReveal className="site-shell text-center">
        <h2 className="font-display text-[40px] font-semibold leading-[1.1] text-codezela-title">
          Contact Us
        </h2>
        <p className="mx-auto mt-[24px] max-w-[850px] text-[18px] leading-[1.4] text-[#636363]">
          {sectionDescription}
        </p>
        <Link
          href="/contact"
          scroll={false}
          className="group mt-[50px] inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#843dcb] px-7 font-display text-[17px] font-semibold text-white shadow-[0_12px_28px_rgba(113,11,192,0.18)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-codezela-purple hover:shadow-[0_18px_36px_rgba(113,11,192,0.26)]"
        >
          Learn More About What We Do
          <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </Link>
      </MotionReveal>
    </section>
  );
}

function LocationsSection() {
  return (
    <section className="pb-[126px] pt-[105px] min-[1025px]:min-h-[1240px] min-[1025px]:pb-[150px] min-[1025px]:pt-[82px]">
      <div className="site-shell">
        <SectionHeading title="Our Locations" description={sectionDescription} />
        <MotionReveal>
          <Locations />
        </MotionReveal>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <AboutStats />
        <WhoWeAre />
        <VisionMission />
        <Process />
        <CoreValues />
        <Leadership />
        <ContactCallout />
        <LocationsSection />
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;
