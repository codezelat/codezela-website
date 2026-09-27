import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLinkCard } from "@/components/shared/BrandLinkCard";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CompanyGroup() {
  return (
    <section
      aria-labelledby="company-group-heading"
      className="bg-[#fff9ff] py-16 min-[1025px]:py-24"
    >
      <div className="site-shell">
        <SectionHeading
          titleId="company-group-heading"
          title="Part of a Connected Group"
          description="Our parent company and UK headquarters connect Codezela’s work in Sri Lanka with our wider international business."
        />
        <MotionReveal className="mt-10 grid gap-6 min-[700px]:grid-cols-2 min-[1025px]:mt-14">
          <BrandLinkCard
            href="https://lbccompanies.co.uk/"
            label="Our parent company"
            name="LBC Group of Companies"
            description="Codezela is part of LBC Group of Companies, the group behind London Business Consultancy. Explore the group and its family of businesses."
            domain="lbccompanies.co.uk"
          >
            <Image
              src="/images/about/lbc-logo-blue.svg"
              alt="London Business Consultancy"
              width={76}
              height={76}
              className="h-[76px] w-[76px] object-contain"
            />
          </BrandLinkCard>
          <BrandLinkCard
            href="https://codezela.co.uk/"
            label="Our UK headquarters"
            name="Codezela Technologies UK"
            description="Based in London, our UK headquarters brings together Codezela’s work in products, applied AI and digital platforms. Discover our wider technology capabilities."
            domain="codezela.co.uk"
          >
            <div className="relative h-[64px] w-[190px] max-w-full">
              <Image
                src="/images/Frame-12.png"
                alt="Codezela Technologies"
                fill
                sizes="190px"
                className="object-contain object-left"
              />
            </div>
          </BrandLinkCard>
        </MotionReveal>
        <div className="mt-8 text-center">
          <Link
            href="/network"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-codezela-purple underline underline-offset-4 hover:text-codezela-title focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-codezela-purple"
          >
            Explore our companies, products and education network
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
