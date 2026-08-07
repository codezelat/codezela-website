import { ArrowRight, Send } from "lucide-react";
import Image from "next/image";

const services = [
  "Web Design & Development",
  "Branding & Content Designing",
  "E-commerce Solutions",
  "Digital Marketing",
  "SEO & Content Writing",
  "Cybersecurity Solutions",
  "Computer Vision Solutions",
  "IT Consulting and Strategy",
  "Data Analytics and Business Intelligence",
  "And more...",
] as const;

const companyLinks = [
  ["Home", "https://codezela.com/"],
  ["Services", "https://codezela.com/services/"],
  ["Portfolio", "https://codezela.com/portfolio/"],
  ["Industries", "https://codezela.com/industries/"],
  ["Career Accelerator", "https://cca.it.com/"],
  ["About", "https://codezela.com/about/"],
] as const;

const industryLinks = [
  ["Healthcare", "https://codezela.com/industry/health-and-wellness/"],
  ["Finance & Banking", "https://codezela.com/industry/financial-technology-fintech/"],
  ["Ecommerce and Retail", "https://codezela.com/industry/ecommerce-and-retail/"],
  ["Technology & IT Serviceas", "https://codezela.com/industry/technology-and-software-development/"],
  ["And more...", "https://codezela.com/industries/"],
] as const;

const socialLinks = [
  ["LinkedIn", "in", "https://www.linkedin.com/company/codezela-technologies/"],
  ["Facebook", "f", "https://www.facebook.com/CodezelaTechnologies"],
  ["Instagram", "◎", "https://www.instagram.com/codezela.t/"],
  ["TikTok", "♪", "https://www.tiktok.com/@codezela_t"],
  ["X", "X", "https://twitter.com/CodezelaT"],
  ["Threads", "@", "https://www.threads.net/@codezela.t"],
  ["YouTube", "▶", "https://www.youtube.com/@codezelatechnologies"],
] as const;

const serviceHref = "https://codezela.com/services/";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden rounded-[44px] bg-[#2d0046] text-white md:rounded-[56px]">
      <section aria-labelledby="connect-heading" className="grid min-h-[354px] md:grid-cols-2">
        <div className="flex min-h-[330px] flex-col justify-center bg-codezela-purple px-5 py-14 md:min-h-[354px] md:px-[80px]">
          <h2 id="connect-heading" className="font-display text-[40px] font-bold leading-none md:text-[48px]">
            Let’s Connect
          </h2>
          <p className="mt-[22px] max-w-[555px] font-footer text-[17px] font-medium leading-[1.32] md:text-[18px]">
            Share Your Vision. We&apos;re Here to Listen and Transform Ideas into Digital Realities
          </p>
          <a
            href="https://codezela.com/contact/"
            className="mt-[34px] inline-flex min-h-[43px] w-fit items-center gap-2 rounded-full bg-white px-5 font-footer text-[16px] font-semibold text-codezela-purple transition-transform hover:-translate-y-0.5 md:text-[17px]"
          >
            Start the Conversation
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>

        <div className="flex min-h-[354px] flex-col items-center justify-center bg-[#fff8ff] px-5 py-12 text-center">
          <p className="font-footer text-[17px] font-semibold text-[#969096] md:text-[19px]">Email Us</p>
          <a
            href="mailto:info@codezela.com"
            className="mt-1 font-display text-[25px] font-semibold text-codezela-title transition-colors hover:text-codezela-pink md:text-[34px]"
          >
            info@codezela.com
          </a>
          <p className="mt-[26px] font-footer text-[17px] font-semibold text-[#969096] md:text-[19px]">Call Us</p>
          <a
            href="tel:+94114858899"
            className="mt-1 font-footer text-[19px] font-bold text-codezela-title transition-colors hover:text-codezela-pink md:text-[20px]"
          >
            +94 11 485 8899
          </a>
          <a
            href="http://calendly.com/codezela/consult"
            target="_blank"
            rel="noreferrer"
            className="mt-[31px] inline-flex min-h-[43px] items-center gap-2 rounded-full border border-codezela-pink px-5 font-footer text-[16px] font-semibold text-codezela-purple transition-colors hover:bg-codezela-pink hover:text-white"
          >
            Schedule a Call
            <ArrowRight size={19} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="min-h-[814px] bg-[#2d0046] px-5 pb-[58px] pt-[76px] font-footer md:px-[80px]">
        <div className="grid gap-14 md:grid-cols-[1.75fr_0.72fr_0.95fr] md:gap-16">
          <nav aria-label="Services">
            <h2 className="text-[20px] font-bold">Services</h2>
            <ul className="mt-[36px] grid gap-x-14 gap-y-[22px] text-[17px] text-[#eee5f1] md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:text-[18px]">
              {services.map((service) => (
                <li key={service}>
                  <a className="transition-colors hover:text-codezela-pink" href={serviceHref}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-[20px] font-bold">Company</h2>
            <ul className="mt-[36px] space-y-[22px] text-[17px] text-[#eee5f1] md:text-[18px]">
              {companyLinks.map(([label, href], index) => (
                <li key={label}>
                  <a
                    className={`transition-colors hover:text-codezela-pink ${index === 0 ? "text-codezela-pink" : ""}`}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="text-[20px] font-bold">Industries</h2>
            <ul className="mt-[36px] space-y-[22px] text-[17px] text-[#eee5f1] md:text-[18px]">
              {industryLinks.map(([label, href]) => (
                <li key={label}>
                  <a className="transition-colors hover:text-codezela-pink" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[94px] flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <a href="https://wa.me/codezela" target="_blank" rel="noreferrer" className="group inline-block w-fit">
            <span className="block text-[14px]">Have a great idea?</span>
            <span className="mt-1 flex items-center gap-3 font-display text-[36px] font-medium leading-none md:text-[38px]">
              Let’s Chat
              <Send className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={32} fill="currentColor" aria-hidden="true" />
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-8 md:justify-end md:gap-10">
            <Image
              src="/images/TB-trusted-on-transparent-dark-bg.svg"
              alt="Trusted on TechBehemoths"
              width={182}
              height={65}
              unoptimized
              className="h-auto w-[168px]"
            />
            <Image
              src="/images/image-1.png.webp"
              alt="Trustpilot five star rating"
              width={572}
              height={253}
              className="h-auto w-[126px] object-contain"
            />
            <Image
              src="/images/image-2.png.webp"
              alt="Google 5.0 rating"
              width={604}
              height={253}
              className="h-auto w-[145px] object-contain"
            />
          </div>
        </div>

        <div className="mt-[50px] border-t border-white/50 pt-[50px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-[18px]">
                {socialLinks.map(([label, glyph, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-[30px] min-w-[28px] items-center justify-center text-[25px] font-bold leading-none text-white transition-colors hover:text-codezela-pink"
                  >
                    <span aria-hidden="true">{glyph}</span>
                  </a>
                ))}
              </div>
              <p className="mt-[34px] text-[14px] text-[#eee5f1] md:text-[15px]">
                Copyright &copy; 2020 &ndash; {currentYear} | Codezela Technologies
              </p>
            </div>

            <div className="md:text-right">
              <a href="https://codezela.com/" className="inline-flex items-center gap-3">
                <Image src="/images/Untitled-150x150.png" alt="" width={58} height={58} className="h-[50px] w-[50px] object-contain" />
                <span className="font-display text-[34px] font-semibold">Codezela</span>
              </a>
              <div className="mt-[26px] flex flex-wrap gap-x-[72px] gap-y-4 text-[14px] text-[#eee5f1] md:justify-end md:text-[15px]">
                <a className="hover:text-codezela-pink" href="https://codezela.com/privacy-policy/">
                  Privacy Policy
                </a>
                <a className="hover:text-codezela-pink" href="https://codezela.com/terms-and-conditions/">
                  Terms &amp; Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
