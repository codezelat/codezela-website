import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { MotionReveal } from "@/components/shared/MotionReveal";
import Image from "next/image";

type LegalPageProps = {
  title: string;
  html: string;
  supplementalHtml?: string;
};

export function LegalPage({ title, html, supplementalHtml = "" }: LegalPageProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="overflow-x-clip bg-white">
        <section className="pb-[54px] pt-[64px] min-[1025px]:pb-[66px] min-[1025px]:pt-[78px]">
          <div className="site-shell grid items-center gap-10 min-[1025px]:min-h-[380px] min-[1025px]:grid-cols-[0.95fr_1.05fr]">
            <MotionReveal>
              <h1 className="max-w-[470px] whitespace-pre-line font-display text-[44px] font-medium leading-[1.08] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px]">
                {title === "Privacy Policy" ? "Privacy\nPolicy" : "Terms and\nConditions"}
              </h1>
            </MotionReveal>
            <MotionReveal className="relative hidden h-[340px] min-[1025px]:block" delay={0.08}>
              <Image
                src="/images/portfolio/portfolio-hero-right-bg.png.webp"
                alt=""
                fill
                priority
                sizes="560px"
                className="object-contain opacity-70"
              />
            </MotionReveal>
          </div>
        </section>

        <MotionReveal className="site-shell pb-[120px] pt-[36px] min-[1025px]:pb-[150px] min-[1025px]:pt-[54px]">
          <article
            className="legal-copy text-[17px] leading-[1.45] text-[#161616] [&_h2]:mb-[13px] [&_h2]:mt-[26px] [&_h2]:font-display [&_h2]:text-[31px] [&_h2]:font-medium [&_h2]:leading-[1.2] [&_h3]:mb-[13px] [&_h3]:mt-[28px] [&_h3]:font-display [&_h3]:text-[29px] [&_h3]:font-medium [&_h3]:leading-[1.2] [&_li]:mb-[6px] [&_p]:mb-[15px] [&_ul]:mb-[18px] [&_ul]:list-disc [&_ul]:pl-[28px] min-[1025px]:text-[18px]"
            dangerouslySetInnerHTML={{ __html: `${html}${supplementalHtml}` }}
          />
        </MotionReveal>
      </main>
      <Footer />
    </>
  );
}
