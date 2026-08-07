import { MotionReveal } from "@/components/shared/MotionReveal";
import type { DetailMetric } from "@/data/detail-metrics";

export function DetailMetricsBand({
  metrics,
  ariaLabel = "Delivery highlights",
}: {
  metrics: readonly [DetailMetric, DetailMetric];
  ariaLabel?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-[#6815bd] via-[#a71fdb] to-[#cf27ef] text-white" aria-label={ariaLabel}>
      <div className="site-shell grid min-h-[180px] items-center gap-8 py-9 min-[700px]:grid-cols-2 min-[700px]:py-0">
        {metrics.map((metric, index) => (
          <MotionReveal
            key={`${metric.value}-${metric.label}`}
            className="flex items-center justify-center gap-5 min-[1025px]:gap-7"
            delay={index * 0.06}
          >
            <strong className="min-w-[82px] shrink-0 whitespace-nowrap text-right font-display text-[clamp(2.25rem,11vw,3.375rem)] leading-none">
              {metric.value}
            </strong>
            <span className="max-w-[260px] text-[18px] font-semibold leading-[1.35] min-[1025px]:text-[20px]">
              {metric.label}
            </span>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
