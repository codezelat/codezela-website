import { ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { NotFoundVideo } from "@/components/pages/not-found/NotFoundVideo";

export const metadata: Metadata = {
  title: "Page Not Found | Codezela Technologies",
  description: "The page you requested could not be found. Return to Codezela Technologies or explore our latest work.",
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <section
          aria-labelledby="not-found-title"
          className="relative overflow-hidden bg-white pb-[96px] pt-[58px] min-[1025px]:pb-[132px] min-[1025px]:pt-[62px]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-130px] top-[90px] h-[300px] w-[300px] rounded-full bg-[#f9e9fc] blur-[2px] min-[1025px]:left-[-90px] min-[1025px]:h-[410px] min-[1025px]:w-[410px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-150px] top-[390px] h-[330px] w-[330px] rounded-full bg-[#f8effc] blur-[2px] min-[1025px]:right-[-95px] min-[1025px]:top-[430px] min-[1025px]:h-[460px] min-[1025px]:w-[460px]"
          />

          <div className="site-shell relative flex flex-col items-center text-center">
            <div className="not-found-reveal">
              <h1
                id="not-found-title"
                className="m-0 bg-[linear-gradient(115deg,#500888_8%,#8d3ccd_52%,#d300ff_96%)] bg-clip-text font-display text-[112px] font-semibold leading-[0.88] tracking-[-0.065em] text-transparent min-[600px]:text-[150px] min-[1025px]:text-[190px]"
              >
                404
              </h1>
              <p className="mx-auto mt-[28px] max-w-[680px] text-[18px] leading-[1.5] text-codezela-copy min-[768px]:mt-[34px] min-[768px]:text-[20px]">
                This page gave up on you. We never will. It may have moved, changed its name, or taken an unexpected dance break.
              </p>
            </div>

            <div className="not-found-reveal not-found-reveal--delay mt-[42px] w-full max-w-[880px] min-[768px]:mt-[52px]">
              <NotFoundVideo />
            </div>

            <nav
              aria-label="Helpful links"
              className="not-found-reveal not-found-reveal--delay-2 mt-[34px] flex w-full max-w-[520px] flex-col items-stretch justify-center gap-3 min-[520px]:flex-row min-[520px]:items-center"
            >
              <Link
                href="/"
                scroll={false}
                className="pill-button hero-action hero-action--primary relative min-h-[52px] gap-2.5 px-7 text-[17px]"
              >
                <Home aria-hidden="true" className="hero-action__icon h-5 w-5" strokeWidth={2.4} />
                Take Me Home
              </Link>
              <Link
                href="/portfolio"
                scroll={false}
                className="pill-button hero-action hero-action--secondary relative min-h-[52px] gap-2.5 px-7 text-[17px]"
              >
                View Our Work
                <ArrowRight aria-hidden="true" className="hero-action__icon h-5 w-5" strokeWidth={2.4} />
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
