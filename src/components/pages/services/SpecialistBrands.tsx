import { Globe2, Search } from "lucide-react";
import { BrandLinkCard } from "@/components/shared/BrandLinkCard";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const brands = [
  {
    name: "SEO Sri Lanka",
    label: "Search visibility",
    description:
      "Our specialist SEO brand for businesses in Sri Lanka, with services focused on technical SEO, useful content and local search visibility.",
    href: "https://seo-srilanka.lk/",
    domain: "seo-srilanka.lk",
    Icon: Search,
  },
  {
    name: "Web Design Sri Lanka",
    label: "Website design & development",
    description:
      "Our specialist web design brand for Sri Lankan businesses, focused on responsive websites, online stores and straightforward website support.",
    href: "https://webdesign-srilanka.lk/",
    domain: "webdesign-srilanka.lk",
    Icon: Globe2,
  },
] as const;

export function SpecialistBrands() {
  return (
    <section
      aria-labelledby="specialist-brands-heading"
      className="bg-[#fff9ff] py-16 min-[1025px]:py-24"
    >
      <div className="site-shell">
        <SectionHeading
          titleId="specialist-brands-heading"
          title="Our Specialist Brands"
          description="Dedicated Codezela brands for businesses looking for focused SEO and web design services in Sri Lanka."
        />
        <MotionReveal className="mt-10 grid gap-6 min-[700px]:grid-cols-2 min-[1025px]:mt-14">
          {brands.map(({ Icon, ...brand }) => (
            <BrandLinkCard key={brand.href} {...brand}>
              <span className="grid h-[68px] w-[68px] place-items-center rounded-[20px] bg-codezela-purple/5 text-codezela-purple">
                <Icon aria-hidden="true" size={30} strokeWidth={1.5} />
              </span>
            </BrandLinkCard>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
