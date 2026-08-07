import { SectionHeading } from "@/components/shared/SectionHeading";

const differentiators = [
  { metric: "2X", label: "Faster Delivery" },
  { metric: "100%", label: "Customer Satisfaction" },
  { metric: "24/7", label: "Service Availability" },
] as const;

export function WhySpecial() {
  return (
    <section
      className="min-h-[1007px] bg-codezela-purple pt-[78px] pb-[80px] md:min-h-[583px] md:pt-[107px] md:pb-[95px]"
      aria-labelledby="why-special-heading"
    >
      <div className="site-shell">
        <div id="why-special-heading">
          <SectionHeading
            inverse
            title="Why We Are Special"
            description="At Codezela Technologies, our distinctiveness lies in our relentless pursuit of innovation, unwavering commitment to client-centric excellence"
          />
        </div>

        <div className="mt-[55px] grid gap-[20px] md:mt-[80px] md:grid-cols-3">
          {differentiators.map(({ metric, label }) => (
            <article
              key={metric}
              className="flex h-[182px] flex-col items-center justify-center rounded-[8px] bg-white px-[20px] text-center"
            >
              <p className="font-display text-[60px] leading-[60px] font-bold text-codezela-purple">
                {metric}
              </p>
              <h3 className="mt-[8px] font-display text-[18px] leading-[25px] font-semibold text-codezela-purple">
                {label}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
