import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MotionReveal } from "@/components/shared/MotionReveal";

const portfolioProjects = [
  {
    href: "/portfolio/evergreen-lighting",
    image: "/images/portfolio/evergreen-e1733334384902-768x448.png.webp",
    title: "Evergreen Lighting Malaysia Website",
    description:
      "Evergreen Lighting Malaysia needed a responsive website to showcase their wide range of lighting products, including indoor, outdoor, stage, and customized lights, with a user-friendly inquiry system for customers.",
    industry: "Industrial",
  },
  {
    href: "/portfolio/ceylon-eco",
    image: "/images/portfolio/CeylonEcoSpices-e1733333457314-768x443.png.webp",
    title: "Ceylon Eco Spices Website",
    description:
      "The website showcases a wide range of premium spices, featuring a detailed product catalog, a secure bulk-ordering system, and a responsive design for a seamless browsing experience across devices",
    industry: "E-commerce",
  },
  {
    href: "/portfolio/smart-network-earning",
    image: "/images/portfolio/Smart-Network-Earning-min-768x446.png.webp",
    title: "Smart Network Earning Solutions Website",
    description:
      "Users can seamlessly apply for jobs and purchase application credits through a clean, responsive platform. A customized dashboard offers efficient management of applications and applicants, enhancing the overall experience.",
    industry: "Job Listing",
  },
  {
    href: "/portfolio/saumika-senanayake",
    image: "/images/portfolio/Saumika-Senanayake-min-768x450.png.webp",
    title: "Saumika Senanayake Learning Management System",
    description:
      "Focused on enhancing the learning experience, the platform offers easy student registration, secure video access, and a dashboard to manage courses, lessons, and media—all designed with simplicity and responsiveness in mind.",
    industry: "Education",
  },
  {
    href: "/portfolio/photolamp-ecommerce",
    image: "/images/portfolio/plp-mockup-1024x682.png-768x512.webp",
    title: "Photolamp eCommerce Website",
    description:
      "Designed for selling personalized lamps and gift items, this Shopify store features custom image uploading, product design integration, and a clean, responsive interface tailored for an engaging user experience.",
    industry: "E-commerce",
  },
  {
    href: "/portfolio/smarit-academy",
    image: "/images/portfolio/sita-mockup-1024x682.png-768x512.webp",
    title: "Smart IT Academy Learning Management Website",
    description:
      "Smart IT Academy’s platform integrates a comprehensive learning management system with eCommerce capabilities, secure course access, automated certificates, and a responsive design to enhance the user experience for all ages.",
    industry: "Education",
  },
  {
    href: "/portfolio/tharusha-san",
    image: "/images/portfolio/Tharusha-San-min-768x446.png.webp",
    title: "Tharusha San Portfolio Website",
    description:
      "Tharusha San’s portfolio website features a creative UI, showcasing his brand identity designs. It offers a responsive, clean layout and a customized dashboard for easy portfolio management and enhanced user experience.",
    industry: "Portfolio",
  },
  {
    href: "/portfolio/tech-shorts",
    image: "/images/portfolio/tshorts-mockup-1024x682.png-768x512.webp",
    title: "Tech Shorts News Blog Development",
    description:
      "TechShorts’ blog features article approval and management capabilities, with a responsive, interactive UI. The platform is designed for search engine friendliness, enhancing the overall user experience and content accessibility.",
    industry: "Blogging",
  },
  {
    href: "/portfolio/viduvin-holdings",
    image: "/images/portfolio/viduvin-mockup-1024x682.png-768x512.webp",
    title: "Viduvin Holdings Website Development",
    description:
      "Viduvin Holdings’ website is designed to enhance brand awareness, featuring a responsive, clean layout that improves user experience and effectively shares updates across online platforms.",
    industry: "Corporate",
  },
  {
    href: "/portfolio/sitc-campus",
    image: "/images/portfolio/SITC-Campus-min-768x448.png.webp",
    title: "SITC Campus Website Development",
    description:
      "SITC Campus’ website enhances brand visibility with a professional, responsive design, allowing the organization to effectively manage and showcase their courses and diplomas.",
    industry: "Education",
  },
  {
    href: "/portfolio/xpara-gen",
    image: "/images/portfolio/xparagen-mockup-1024x682.png-768x512.webp",
    title: "XParaGen Website Development",
    description:
      "XParaGen’s website showcases their NFT agency portfolio with a modern, interactive interface. It includes portfolio management, SEO and speed optimizations, and features designed to enhance brand visibility and client engagement.",
    industry: "Corporate",
  },
  {
    href: "/portfolio/pixel-design-portfolio",
    image: "/images/portfolio/Pixel-Design-Portfolio-e1733867459982-768x445.png",
    title: "Pixel Design Portfolio",
    description:
      "Pixel Design Co.’s portfolio website features a minimal, responsive design with easy management, allowing updates without technical knowledge, while ensuring low cost and high performance.",
    industry: "Portfolio",
  },
  {
    href: "/portfolio/donate-srilanka",
    image: "/images/portfolio/donatesl-mockup-1024x682.png-768x512.webp",
    title: "Donate SriLanka Fundraiser Website Development",
    description:
      "Donate Sri Lanka’s website facilitates cryptocurrency donations to support the Sri Lankan Medical Department. With a simple, informative UI/UX, the platform ensures an easy, trustworthy donation process for global contributors.",
    industry: "Charity",
  },
  {
    href: "/portfolio/nirmalab-me",
    image: "/images/portfolio/nirmalab-mockup-1024x682.png-768x512.webp",
    title: "Nirmalab.me Portfolio Development",
    description:
      "Nirmala Bandara’s portfolio website features a minimal, responsive design with easy management, allowing for efficient updates without technical knowledge, while maintaining low cost and optimal performance.",
    industry: "Portfolio",
  },
  {
    href: "/portfolio/national-youth-film-festival-website",
    image: "/images/portfolio/National-Youth-Film-2-768x456.png.webp",
    title: "National Youth Film Festival Website",
    description:
      "NYFFSL’s website showcases their unique goals, promotes their short film competition, and accepts submissions via a multi-level form. It features a responsive, professional design and enables easy publication of press releases and event galleries.",
    industry: "Event",
  },
] as const;

const benefits = [
  "Delivering impactful digital solutions",
  "Innovating across diverse industries",
  "Empowering brands with technology",
] as const;

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://codezela.com/portfolio#webpage",
  url: "https://codezela.com/portfolio",
  name: "Portfolio - Codezela Technologies",
  description:
    "Browse our portfolio at Codezela Technologies to see our successful projects in web design, app development, brand identity, and digital marketing. Discover how we deliver innovative solutions to empower businesses.",
  isPartOf: { "@id": "https://codezela.com/#website" },
  about: { "@id": "https://codezela.com/#organization" },
  inLanguage: "en-GB",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: portfolioProjects.length,
    itemListElement: portfolioProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: new URL(project.href, "https://codezela.com").href,
      name: project.title,
    })),
  },
};

function BenefitPill({ label }: { label: string }) {
  return (
    <div className="flex min-h-[76px] w-full items-center gap-3 rounded-[17px] bg-[#873dcc] px-[14px] py-4 text-white shadow-[0_16px_38px_rgba(113,11,192,0.14)] min-[1025px]:min-h-[76px] min-[1025px]:rounded-[16px]">
      <span className="grid size-[24px] shrink-0 place-items-center rounded-full bg-white text-[#873dcc]">
        <Check aria-hidden="true" size={17} strokeWidth={3.5} />
      </span>
      <span className="font-sans text-[17px] font-normal leading-[1.35] min-[370px]:whitespace-nowrap min-[1025px]:text-[18px]">
        {label}
      </span>
    </div>
  );
}

function PortfolioHero() {
  return (
    <section
      aria-labelledby="portfolio-page-title"
      className="relative h-[1085px] overflow-hidden bg-white min-[1025px]:h-[1155px]"
    >
      <div className="site-shell relative h-full">
        <MotionReveal className="absolute left-0 top-[202px] z-10 w-full min-[1025px]:top-[360px] min-[1025px]:w-[590px]" distance={18}>
          <h1
            id="portfolio-page-title"
            className="m-0 font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px] min-[1025px]:leading-[1.04]"
          >
            Our expertise drives projects towards success and builds conversions
          </h1>
        </MotionReveal>

        <div className="absolute left-1/2 top-[515px] h-[580px] w-[580px] -translate-x-1/2 min-[1025px]:left-auto min-[1025px]:right-[-38px] min-[1025px]:top-[358px] min-[1025px]:h-[650px] min-[1025px]:w-[650px] min-[1025px]:translate-x-0">
          <Image
            src="/images/portfolio/portfolio-hero-right-bg.png.webp"
            alt=""
            fill
            preload
            sizes="(max-width: 1024px) 580px, 650px"
            className="object-contain"
          />
        </div>

        <MotionReveal
          className="absolute left-0 top-[520px] z-10 w-full min-[1025px]:left-auto min-[1025px]:right-[251px] min-[1025px]:top-[400px] min-[1025px]:w-[370px]"
          delay={0.08}
          distance={14}
        >
          <BenefitPill label={benefits[0]} />
        </MotionReveal>
        <MotionReveal
          className="absolute left-0 top-[777px] z-10 w-full min-[1025px]:left-auto min-[1025px]:right-0 min-[1025px]:top-[610px] min-[1025px]:w-[371px]"
          delay={0.14}
          distance={14}
        >
          <BenefitPill label={benefits[1]} />
        </MotionReveal>
        <MotionReveal
          className="absolute left-0 top-[942px] z-10 w-full min-[1025px]:left-auto min-[1025px]:right-0 min-[1025px]:top-[770px] min-[1025px]:w-[371px]"
          delay={0.2}
          distance={14}
        >
          <BenefitPill label={benefits[2]} />
        </MotionReveal>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
}) {
  const imageOnLeft = index % 2 === 1;

  return (
    <MotionReveal delay={Math.min(index * 0.025, 0.1)} distance={22}>
      <Link
        href={project.href}
        scroll={false}
        className="group grid overflow-hidden rounded-[22px] border border-[#faeffc] bg-[#fff8ff] shadow-[0_12px_35px_rgba(80,8,136,0)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#f1d8f6] hover:shadow-[0_18px_45px_rgba(80,8,136,0.09)] focus-visible:-translate-y-1 focus-visible:border-[#d891e5] focus-visible:shadow-[0_18px_45px_rgba(80,8,136,0.09)] min-[1025px]:min-h-[490px] min-[1025px]:grid-cols-2 min-[1025px]:rounded-[26px]"
      >
        <div
          className={`order-1 min-h-[270px] p-[10px] min-[1025px]:min-h-[490px] min-[1025px]:p-[18px] ${
            imageOnLeft ? "min-[1025px]:order-1" : "min-[1025px]:order-2"
          }`}
        >
          <div className="relative flex h-full min-h-[250px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-white px-4 py-7 min-[1025px]:min-h-[454px] min-[1025px]:rounded-[24px] min-[1025px]:px-8 min-[1025px]:py-9">
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              width={768}
              height={512}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) calc(100vw - 120px), 590px"
              className="h-auto max-h-[360px] w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
            />
          </div>
        </div>

        <article
          className={`order-2 flex min-h-[340px] flex-col items-start px-5 pb-7 pt-4 min-[1025px]:min-h-[490px] min-[1025px]:px-[22px] min-[1025px]:py-[28px] ${
            imageOnLeft ? "min-[1025px]:order-2" : "min-[1025px]:order-1"
          }`}
        >
          <p className="inline-flex min-h-[38px] items-center rounded-full bg-[#fde9ff] px-5 py-2 font-display text-[18px] font-semibold leading-[1.1] text-codezela-pink-ink">
            Web Development
          </p>
          <h2 className="mt-[20px] max-w-[480px] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.015em] text-[#161616] transition-colors duration-300 group-hover:text-codezela-title group-focus-visible:text-codezela-title min-[1025px]:text-[34px]">
            {project.title}
          </h2>
          <p className="mt-[20px] max-w-[555px] text-[17px] leading-[1.4] text-codezela-copy min-[1025px]:text-[18px] min-[1025px]:leading-[1.35]">
            {project.description}
          </p>
          <p className="mt-8 text-[16px] font-medium leading-6 text-[#8d858e] min-[1025px]:mt-auto min-[1025px]:pt-8 min-[1025px]:text-[17px]">
            {project.industry}
          </p>
        </article>
      </Link>
    </MotionReveal>
  );
}

export function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <section aria-label="Codezela portfolio projects" className="bg-white pb-[100px] min-[1025px]:pb-[118px]">
        <div className="site-shell space-y-[42px] min-[1025px]:space-y-[60px]">
          {portfolioProjects.map((project, index) => (
            <ProjectRow key={project.href} project={project} index={index} />
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
