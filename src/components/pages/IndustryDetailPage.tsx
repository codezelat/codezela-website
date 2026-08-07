import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Carousel } from "@/components/shared/Carousel";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { industries } from "@/data/home";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type IndustryDetail = {
  slug: string;
  title: string;
  modified: string;
  icon: string;
  introHeading: string;
  summary: string;
  description: string;
  seoTitle: string;
  ogTitle: string;
  ogDescription: string;
};

const segmentOrder = [
  "architecture-and-design",
  "advertising-and-marketing",
  "event-planning-and-management",
  "petroleum-and-natural-resources",
  "printing-and-publishing",
  "telehealth-and-telemedicine",
] as const;

const orderedSegments = [
  ...segmentOrder.flatMap((slug) =>
    industries.filter((item) => item.href === `/industry/${slug}`),
  ),
  ...industries.filter(
    (item) => !segmentOrder.some((slug) => item.href === `/industry/${slug}`),
  ),
];

const faqs = [
  {
    question: "What industries does Codezela Technologies specialise in?",
    answer:
      "Codezela Technologies specialises in a wide range of industries, including retail and e-commerce, healthcare, education, finance, real estate, hospitality, logistics, and more. Our solutions are tailored to meet the unique needs and challenges of each industry.",
  },
  {
    question: "How do you ensure your solutions align with specific industry requirements?",
    answer:
      "We conduct in-depth research and collaborate closely with our clients to understand their industry standards, target audience, and business goals. Our team then crafts bespoke solutions that not only meet but exceed these requirements, ensuring compliance, scalability, and innovation.",
  },
  {
    question: "Can Codezela Technologies cater to niche or emerging industries?",
    answer:
      "Absolutely! We excel in providing digital solutions for niche and emerging industries. Whether you’re a start-up in a new market or a unique business model, our adaptable and innovative approach ensures your needs are met with precision.",
  },
  {
    question: "Do you provide ongoing support and updates for your solutions across industries?",
    answer:
      "Yes, we offer comprehensive post-project support, including maintenance, updates, and optimisation services. Our goal is to ensure your business remains competitive and keeps up with evolving industry trends and technological advancements.",
  },
] as const;

const carouselControls = [
  "mt-[42px] justify-end min-[1025px]:mt-[55px]",
  "[&_.carousel-control:first-child]:border-codezela-pink",
  "[&_.carousel-control:first-child]:text-codezela-pink",
  "[&_.carousel-control:last-child]:border-codezela-pink",
  "[&_.carousel-control:last-child]:bg-codezela-pink",
  "[&_.carousel-control:last-child]:text-white",
].join(" ");

function IndustrySegments() {
  return (
    <section className="bg-[#fffaff] pb-[92px] pt-[96px] min-[1025px]:pb-[106px] min-[1025px]:pt-[94px]">
      <div className="site-shell">
        <SectionHeading
          title="Industry Segments"
          description="Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in healthcare, finance, e-commerce, education, and beyond."
        />

        <MotionReveal className="mt-[54px] px-[10px] min-[1025px]:mt-[48px]" delay={0.05}>
          <Carousel
            ariaLabel="Explore Codezela industry solutions"
            className="[&_.overflow-hidden>div]:gap-[30px]"
            controlsClassName={carouselControls}
            delay={5600}
          >
            {orderedSegments.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="interactive-card flex h-[407px] min-w-0 shrink-0 grow-0 basis-full flex-col items-center rounded-[8px] border border-[#f0dff2] bg-[#fff] px-[10px] pt-[58px] text-center md:basis-[calc((100%_-_30px)/2)] xl:h-[378px] xl:basis-[calc((100%_-_60px)/3)] xl:pt-[47px]"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={42}
                  height={42}
                  sizes="42px"
                  className="h-[42px] w-[42px] object-contain"
                />
                <h3 className="mt-[17px] flex min-h-[44px] items-center justify-center text-balance font-display text-[18px] font-semibold leading-[22px] text-codezela-card-copy">
                  {item.title}
                </h3>
                <p className="mt-[11px] flex min-h-[105px] max-w-[360px] items-center justify-center text-[16px] leading-[20.8px] text-codezela-card-copy">
                  {item.description}
                </p>
                <div className="mt-[16px] h-px w-full bg-[#dedede]" aria-hidden="true" />
                <Link
                  href={item.href ?? "/industries"}
                  className="mt-[25px] inline-flex h-[50px] w-[154px] items-center justify-center rounded-full border border-[#eadfed] bg-[#fbe6ff] text-[16px] font-medium leading-none text-[#8d3ccd] transition-all duration-200 hover:-translate-y-0.5 hover:border-codezela-purple hover:bg-codezela-purple hover:text-white"
                >
                  Learn More<span className="sr-only"> about {item.title}</span>
                </Link>
              </article>
            ))}
          </Carousel>
        </MotionReveal>
      </div>
    </section>
  );
}

function IndustryFaqs() {
  return (
    <section className="pb-[112px] pt-[106px] min-[1025px]:pb-[124px] min-[1025px]:pt-[104px]">
      <div className="site-shell">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in healthcare. Let’s explore the client problem."
        />
        <div className="mt-[64px] grid items-start gap-5 min-[1025px]:grid-cols-2 min-[1025px]:gap-x-4 min-[1025px]:gap-y-[26px]">
          {faqs.map((faq, index) => (
            <MotionReveal key={faq.question} delay={index * 0.035}>
              <details
                open
                className="group border border-[#eadfec] bg-white text-[#454545]"
              >
                <summary className="flex min-h-[86px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-[18px] font-semibold leading-[1.45] marker:hidden [&::-webkit-details-marker]:hidden min-[1025px]:px-5">
                  <span>{faq.question}</span>
                  <Minus aria-hidden="true" className="hidden h-5 w-5 shrink-0 group-open:block" />
                  <Plus aria-hidden="true" className="block h-5 w-5 shrink-0 group-open:hidden" />
                </summary>
                <p className="border-t border-[#eadfec] px-5 pb-[26px] pt-[17px] text-[17px] leading-[1.4] text-[#767176]">
                  {faq.answer}
                </p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustryDetailPage({ detail }: { detail: IndustryDetail }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="overflow-x-clip bg-white">
        <section className="min-h-[760px] pb-[64px] pt-[284px] min-[1025px]:min-h-[829px] min-[1025px]:pb-[70px] min-[1025px]:pt-[206px]">
          <div className="site-shell grid items-center gap-[90px] min-[1025px]:grid-cols-[0.9fr_1.1fr] min-[1025px]:gap-14">
            <MotionReveal className="relative min-[1025px]:top-[-74px]">
              <h1 className="max-w-[270px] font-display text-[48px] font-medium leading-[1.08] tracking-[-0.02em] text-codezela-title min-[1025px]:max-w-[520px] min-[1025px]:text-[52px]">
                {detail.title}
              </h1>
              <span className="mt-[27px] inline-flex min-h-[34px] items-center rounded-full bg-[#fbe8ff] px-[17px] text-[14px] font-medium text-[#a629cc]">
                Industry
              </span>
            </MotionReveal>

            <MotionReveal className="relative mx-auto h-[360px] w-full max-w-[560px] min-[1025px]:top-[120px] min-[1025px]:h-[460px]" delay={0.08}>
              <div aria-hidden="true" className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,#f8ebfb_0_42%,#fcf4fd_43%_62%,transparent_63%)] min-[1025px]:h-[430px] min-[1025px]:w-[430px]" />
              <Image
                src={detail.icon}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 320px, 460px"
                className="relative z-10 object-contain p-[34px] min-[1025px]:p-[48px]"
              />
            </MotionReveal>
          </div>
        </section>

        <section className="pb-[96px] pt-[88px] min-[1025px]:pb-[112px] min-[1025px]:pt-[108px]">
          <MotionReveal className="site-shell text-center">
            {detail.introHeading ? (
              <h2 className="mx-auto max-w-[1240px] font-display text-[34px] font-semibold leading-[1.15] text-codezela-title min-[1025px]:text-[48px]">
                {detail.introHeading}
              </h2>
            ) : null}
            <p className={`${detail.introHeading ? "mt-[18px]" : ""} mx-auto max-w-[1050px] text-[18px] leading-[1.45] text-codezela-copy`}>
              {detail.summary}
            </p>
            {detail.description ? (
              <p className="mx-auto mt-[52px] max-w-[1280px] text-left text-[17px] leading-[1.62] text-[#4f4f4f] min-[1025px]:text-[18px]">
                {detail.description}
              </p>
            ) : null}
          </MotionReveal>
        </section>

        <section className="bg-gradient-to-r from-[#6815bd] via-[#a71fdb] to-[#cf27ef] text-white">
          <div className="site-shell grid min-h-[180px] items-center gap-8 py-9 min-[700px]:grid-cols-2 min-[700px]:py-0">
            <MotionReveal className="flex items-center justify-center gap-5 min-[1025px]:gap-7">
              <strong className="font-display text-[48px] leading-none min-[1025px]:text-[54px]">98%</strong>
              <span className="max-w-[240px] text-[18px] font-semibold leading-[1.35] min-[1025px]:text-[20px]">
                Page speed score with faster load times
              </span>
            </MotionReveal>
            <MotionReveal className="flex items-center justify-center gap-5 min-[1025px]:gap-7" delay={0.06}>
              <strong className="font-display text-[48px] leading-none min-[1025px]:text-[54px]">10x</strong>
              <span className="max-w-[240px] text-[18px] font-semibold leading-[1.35] min-[1025px]:text-[20px]">
                Visibility above competitors
              </span>
            </MotionReveal>
          </div>
        </section>

        <IndustrySegments />
        <IndustryFaqs />
      </main>
      <Footer />
    </>
  );
}
