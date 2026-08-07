"use client";

import { animate } from "motion/mini";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  distance = 22,
}: MotionRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.style.opacity = "0";
    element.style.transform = `translate3d(0, ${distance}px, 0)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        animate(
          element,
          {
            opacity: [0, 1],
            transform: [`translate3d(0, ${distance}px, 0)`, "translate3d(0, 0, 0)"],
          },
          {
            delay,
            duration: 0.62,
            ease: revealEase,
          },
        );
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, distance]);

  return (
    <div ref={elementRef} className={className} data-motion-reveal="true">
      {children}
    </div>
  );
}

