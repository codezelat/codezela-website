"use client";

import { useEffect, useRef, useState } from "react";

const statItems = [
  { value: 843, label: "Clients Worldwide" },
  { value: 2389, label: "Projects Completed" },
  { value: 13, label: "Years of Experience" },
] as const;

const finalValues = statItems.map((item) => item.value);

export function AboutStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const [values, setValues] = useState<number[]>(finalValues);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 1250;

        const draw = (time: number) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValues(statItems.map((item) => Math.round(item.value * eased)));

          if (progress < 1) frameRef.current = requestAnimationFrame(draw);
        };

        frameRef.current = requestAnimationFrame(draw);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid overflow-hidden rounded-tl-[48px] rounded-br-[48px] bg-[linear-gradient(90deg,#710bc0_0%,#d300ff_100%)] text-center text-white min-[1025px]:h-[194px] min-[1025px]:grid-cols-3"
    >
      {statItems.map((item, index) => (
        <div
          key={item.label}
          className="flex min-h-[150px] flex-col items-center justify-center px-5 py-8 min-[1025px]:min-h-0 min-[1025px]:py-4"
        >
          <strong className="font-display text-[42px] font-semibold leading-none min-[1025px]:text-[46px]">
            {values[index]}+
          </strong>
          <span className="mt-4 font-display text-[18px] font-medium leading-6 min-[1025px]:text-[20px]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
