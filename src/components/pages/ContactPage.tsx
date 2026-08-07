import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { ContactHeroActions } from "@/components/pages/contact/ContactHeroActions";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { Mail, MapPin, Phone, UsersRound } from "lucide-react";
import { preload } from "react-dom";
import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const supportLines = [
  { label: "General Inquiries", value: "(+94) 11 485 8899", href: "tel:+94114858899" },
  { label: "WhatsApp", value: "codezela.t", href: "https://wa.me/codezela.t" },
  { label: "Sales Agent", value: "+94 74 067 8898", href: "tel:+94740678898" },
] as const;

const locations = [
  { label: "Headquarters", lines: ["71-75 Shelton Street,", "Covent Garden,", "London,", "WC2H 9JQ,", "United Kingdom"] },
  { label: "GCC Branch", lines: ["Office 704, Level 7,", "Al Majaz 2,", "Faya Business Park", "Tower, Sharjah,", "UAE"] },
  { label: "Head Office", lines: ["Level 12,", "Parkland Building,", "33, Park St,", "Colombo 00200", "Sri Lanka"] },
  { label: "Regional Branch", lines: ["345/35,", "RIT Alles Mawatha,", "Colombo 00800", "Sri Lanka"] },
] as const;

const socials = [
  ["LinkedIn", FaLinkedinIn, "https://www.linkedin.com/company/codezela-technologies/"],
  ["Facebook", FaFacebookF, "https://www.facebook.com/CodezelaTechnologies"],
  ["Instagram", FaInstagram, "https://www.instagram.com/codezela.t/"],
  ["TikTok", FaTiktok, "https://www.tiktok.com/@codezela_t"],
  ["X", FaXTwitter, "https://twitter.com/CodezelaT"],
  ["Threads", FaThreads, "https://www.threads.net/@codezela.t"],
  ["YouTube", FaYoutube, "https://www.youtube.com/@codezelatechnologies"],
  ["Behance", FaBehance, "https://www.behance.net/CodezelaTechnologies"],
  ["WhatsApp", FaWhatsapp, "https://wa.me/codezela.t"],
] as const;

export function ContactPage() {
  preload("/images/contact/contact-page-hero-rightside-bg.png.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <section aria-labelledby="contact-hero-title" className="overflow-hidden bg-white">
          <div className="site-shell grid min-h-[752px] items-center gap-12 pb-12 pt-[80px] min-[1025px]:grid-cols-[1fr_1.08fr] min-[1025px]:pb-0 min-[1025px]:pt-[110px]">
            <MotionReveal className="min-[1025px]:translate-y-[10px]">
              <h1 id="contact-hero-title" className="max-w-[520px] font-display text-[40px] font-medium leading-[1.05] text-codezela-title min-[1025px]:text-[52px]">
                Getting in touch with our departments has never been easier
              </h1>
            </MotionReveal>
            <ContactHeroActions />
          </div>
        </section>

        <section aria-labelledby="contact-title" className="pb-[100px] pt-[72px]">
          <div className="site-shell">
            <MotionReveal>
              <h2 id="contact-title" className="section-heading">Contact Us</h2>
              <p className="section-description max-w-[820px]">Empower your brand’s digital journey with innovative design, compelling branding, seamless e-commerce, and strategic marketing solutions.</p>
            </MotionReveal>

            <ContactHeading icon={Phone} title="Support Lines" />
            <div className="grid border-y border-codezela-purple/30 min-[800px]:grid-cols-3">
              {supportLines.map((line, index) => (
                <MotionReveal key={line.label} className={`flex min-h-[164px] flex-col items-center justify-center px-5 text-center ${index ? "border-t border-codezela-purple/25 min-[800px]:border-l min-[800px]:border-t-0" : ""}`} delay={index * 0.06}>
                  <p className="font-display text-[17px] text-[#8a858c]">{line.label}</p>
                  <a href={line.href} target={line.href.startsWith("http") ? "_blank" : undefined} rel={line.href.startsWith("http") ? "noreferrer" : undefined} className="mt-2 inline-flex min-h-11 items-center font-display text-[22px] font-semibold text-[#4a474b] transition-colors hover:text-codezela-purple min-[1025px]:text-[34px]">
                    {line.value}
                  </a>
                </MotionReveal>
              ))}
            </div>

            <ContactHeading icon={Mail} title="General Inquiries" />
            <MotionReveal className="border-y border-codezela-purple/30 py-[36px] text-center">
              <a href="mailto:info@codezela.com" className="inline-flex min-h-11 items-center font-display text-[30px] font-medium text-[#4a474b] transition-colors hover:text-codezela-purple min-[1025px]:text-[40px]">info@codezela.com</a>
            </MotionReveal>

            <ContactHeading icon={MapPin} title="Our Locations" />
            <div className="grid border-y border-codezela-purple/30 min-[800px]:grid-cols-2 min-[1150px]:grid-cols-4">
              {locations.map((location, index) => (
                <MotionReveal key={location.label} className={`min-h-[282px] px-6 py-7 ${index ? "border-t border-codezela-purple/25 min-[800px]:border-l min-[800px]:border-t-0" : ""}`} delay={index * 0.055}>
                  <h3 className="font-display text-[17px] font-medium text-[#777178]">{location.label}</h3>
                  <address className="mt-4 not-italic font-display text-[19px] font-semibold leading-[1.32] text-[#49464a] min-[1025px]:text-[21px]">
                    {location.lines.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                </MotionReveal>
              ))}
            </div>

            <ContactHeading icon={UsersRound} title="Our Socials" />
            <MotionReveal className="border-y border-codezela-purple/30 py-7">
              <div className="flex flex-wrap items-center justify-center gap-6 min-[1025px]:gap-9">
                {socials.map(([label, Icon, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full text-[29px] text-codezela-purple transition-all duration-200 hover:-translate-y-1 hover:bg-codezela-offwhite hover:text-codezela-pink-ink">
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactHeading({ icon: Icon, title }: { icon: typeof Phone; title: string }) {
  return (
    <MotionReveal className="mt-[84px] flex items-center justify-center gap-4 pb-7">
      <Icon className="h-8 w-8 fill-codezela-purple text-codezela-purple" aria-hidden="true" />
      <h2 className="font-display text-[27px] font-medium text-codezela-purple">{title}</h2>
    </MotionReveal>
  );
}
