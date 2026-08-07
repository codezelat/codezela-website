import { ArrowRight, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const services = [
  "Web Design & Development",
  "Branding",
  "E-commerce Solutions",
  "Digital Marketing",
  "SEO & Content Writing",
  "Cybersecurity Solutions",
  "Computer Vision Solutions",
  "IT Consulting and Strategy",
  "Data Analytics and Business Intelligence",
  "And more...",
] as const;

const serviceGroups = [services.slice(0, 5), services.slice(5)] as const;

const companyLinks = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Industries", "/industries"],
  ["Career Accelerator", "https://cca.it.com/"],
  ["About", "/about"],
] as const;

const industryLinks = [
  ["Healthcare", "/industry/health-and-wellness"],
  ["Finance & Banking", "/industry/financial-technology-fintech"],
  ["E-commerce and Retail", "/industry/ecommerce-and-retail"],
  ["Technology & IT Services", "/industry/technology-and-software-development"],
  ["And more...", "/industries"],
] as const;

const socialLinks = [
  ["LinkedIn", FaLinkedinIn, "https://www.linkedin.com/company/codezela-technologies/"],
  ["Facebook", FaFacebookF, "https://www.facebook.com/CodezelaTechnologies/"],
  ["Instagram", FaInstagram, "https://www.instagram.com/codezela.t/"],
  ["TikTok", FaTiktok, "https://www.tiktok.com/@codezela_t"],
  ["X", FaXTwitter, "https://twitter.com/CodezelaT"],
  ["Threads", FaThreads, "https://www.threads.net/@codezela.t"],
  ["YouTube", FaYoutube, "https://www.youtube.com/@codezelatechnologies"],
] as const;

const serviceHref = "/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden rounded-[44px] bg-[#2d0046] text-white md:rounded-[56px]">
      <section aria-labelledby="connect-heading" className="grid h-[608px] min-[1025px]:h-[354px] min-[1025px]:grid-cols-2">
        <div className="flex h-[304px] flex-col bg-codezela-purple px-[30px] pb-[26px] pt-[60px] min-[1025px]:h-[354px] min-[1025px]:justify-center min-[1025px]:px-[80px] min-[1025px]:py-14">
          <h2 id="connect-heading" className="whitespace-nowrap font-display text-[37px] font-bold leading-none min-[390px]:text-[48px]">
            Let&apos;s Connect
          </h2>
          <p className="mt-[20px] max-w-[555px] font-footer text-[18px] font-medium leading-[24px] min-[1025px]:mt-[22px] min-[1025px]:leading-[1.32]">
            Share Your Vision. We’re Here to Listen and Transform Ideas into Digital Realities
          </p>
          <Link
            href="/contact"
            scroll={false}
            className="mt-[34px] inline-flex h-[44px] w-[257px] items-center justify-center gap-2 rounded-full bg-white px-5 font-footer text-[18px] font-semibold text-codezela-purple transition-transform hover:-translate-y-0.5 min-[1025px]:min-h-[43px] min-[1025px]:w-fit min-[1025px]:text-[17px]"
          >
            Start the Conversation
            <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex h-[304px] flex-col items-center bg-[#fff8ff] px-5 pt-[60px] text-center min-[1025px]:h-[354px] min-[1025px]:justify-center min-[1025px]:py-12">
          <p className="font-footer text-[20px] font-semibold leading-5 text-[#706a70] min-[1025px]:text-[19px]">Email Us</p>
          <a
            href="mailto:info@codezela.com"
            className="mt-[5px] font-display text-[28px] font-semibold leading-[34px] text-codezela-title transition-colors hover:text-codezela-pink min-[1025px]:text-[34px]"
          >
            info@codezela.com
          </a>
          <p className="mt-[23px] font-footer text-[20px] font-semibold leading-5 text-[#706a70] min-[1025px]:mt-[26px] min-[1025px]:text-[19px]">Call Us</p>
          <a
            href="tel:+94114858899"
            className="mt-[6px] font-footer text-[20px] font-bold leading-6 text-codezela-title transition-colors hover:text-codezela-pink"
          >
            +94 11 485 8899
          </a>
          <a
            href="https://calendly.com/codezela/consult"
            target="_blank"
            rel="noreferrer"
            className="mt-[30px] inline-flex h-[42px] items-center gap-2 rounded-full border border-codezela-pink px-5 font-footer text-[16px] font-semibold text-codezela-purple transition-colors hover:bg-codezela-pink hover:text-white min-[1025px]:min-h-[43px]"
          >
            Schedule a Call
            <ArrowRight size={19} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="min-h-[814px] bg-[#2d0046] px-[30px] pb-[40px] pt-[40px] font-footer md:px-[80px] md:pb-[58px] md:pt-[76px]">
        <div className="grid gap-[40px] md:grid-cols-[1.75fr_0.72fr_0.95fr] md:gap-16">
          <nav aria-label="Services">
            <h2 className="text-[20px] font-bold leading-5">Services</h2>
            <div className="mt-[20px] grid gap-x-14 gap-y-[20px] text-[16px] leading-[22.4px] text-[#eee5f1] md:mt-[36px] md:grid-cols-2 md:text-[18px]">
              {serviceGroups.map((group, groupIndex) => (
                <ul key={groupIndex} className="space-y-[20px] md:space-y-[22px]">
                  {group.map((service) => (
                    <li key={service}>
                      <a className="transition-colors hover:text-codezela-pink-on-dark" href={serviceHref}>
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-[20px] font-bold leading-5">Company</h2>
            <ul className="mt-[20px] space-y-[20px] text-[16px] leading-[22.4px] text-[#eee5f1] md:mt-[36px] md:space-y-[22px] md:text-[18px]">
              {companyLinks.map(([label, href], index) => (
                <li key={label}>
                  <a
                    className={`transition-colors hover:text-codezela-pink-on-dark ${index === 0 ? "text-codezela-pink-on-dark" : ""}`}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h2 className="text-[20px] font-bold leading-5">Industries</h2>
            <ul className="mt-[20px] space-y-[20px] text-[16px] leading-[22.4px] text-[#eee5f1] md:mt-[36px] md:space-y-[22px] md:text-[18px]">
              {industryLinks.map(([label, href]) => (
                <li key={label}>
                  <a className="transition-colors hover:text-codezela-pink-on-dark" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[60px] flex flex-col gap-[114px] md:mt-[94px] md:flex-row md:items-end md:justify-between md:gap-12">
          <a href="https://wa.me/codezela.t" target="_blank" rel="noreferrer" className="group inline-block w-fit">
            <span className="block text-[14px] leading-[14px] md:leading-normal">Have a great idea?</span>
            <span className="mt-[8px] flex items-center gap-3 font-display text-[36px] font-medium leading-none md:mt-1 md:text-[38px]">
              Let’s Chat
              <Send className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={32} fill="currentColor" aria-hidden="true" />
            </span>
          </a>

          <div className="flex flex-col items-center gap-[13px] md:flex-row md:flex-wrap md:justify-end md:gap-10">
            <Image
              src="/images/TB-trusted-on-transparent-dark-bg.svg"
              alt="Trusted on TechBehemoths"
              width={182}
              height={65}
              unoptimized
              className="h-[50px] w-[151px] object-contain md:h-auto md:w-[168px]"
            />
            <Image
              src="/images/image-1.png.webp"
              alt="Trustpilot five star rating"
              width={572}
              height={253}
              className="h-[86px] w-full max-w-[310px] object-contain md:h-auto md:w-[126px]"
            />
            <Image
              src="/images/image-2.png.webp"
              alt="Google 5.0 rating"
              width={604}
              height={253}
              className="h-[66px] w-full max-w-[310px] object-contain md:h-auto md:w-[145px]"
            />
          </div>
        </div>

        <div className="mt-0 border-t border-white/50 pt-[90px] md:mt-[50px] md:pt-[50px]">
          <div className="flex flex-col gap-[32px] md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="order-2 md:order-1">
              <div className="flex flex-wrap items-center gap-[18px]">
                {socialLinks.map(([label, Icon, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="social-link flex h-[32px] min-w-[28px] items-center justify-center text-[25px] font-bold leading-none text-white hover:text-codezela-pink-on-dark md:h-[30px]"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
              <p className="mt-[78px] text-[14px] leading-[14px] text-[#eee5f1] md:mt-[34px] md:text-[15px] md:leading-normal">
                Copyright &copy; 2020 &ndash; {currentYear} | Codezela Technologies
              </p>
            </div>

            <div className="order-1 text-center md:order-2 md:text-right">
              <Link href="/" scroll={false} className="inline-flex items-center gap-3">
                <Image src="/images/Untitled-150x150.png" alt="" width={58} height={58} className="h-[45px] w-[45px] object-contain md:h-[50px] md:w-[50px]" />
                <span className="font-display text-[34px] font-semibold leading-[45px] md:leading-normal">Codezela</span>
              </Link>
              <div className="mt-[22px] flex flex-col items-center gap-[9px] text-[14px] leading-5 text-[#eee5f1] md:mt-[26px] md:flex-row md:flex-wrap md:justify-end md:gap-x-[72px] md:gap-y-4 md:text-[15px]">
                <Link className="hover:text-codezela-pink-on-dark" href="/privacy-policy" scroll={false}>
                  Privacy Policy
                </Link>
                <Link className="hover:text-codezela-pink-on-dark" href="/terms-and-conditions" scroll={false}>
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
