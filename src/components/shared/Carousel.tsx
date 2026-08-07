"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type CarouselProps = {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
  controlsClassName?: string;
  delay?: number;
};

export function Carousel({ children, ariaLabel, className = "", controlsClassName = "", delay = 5000 }: CarouselProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoplay = useMemo(
    () => Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true }),
    [delay],
  );
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, reducedMotion ? [] : [autoplay]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className={className} role="region" aria-label={ariaLabel}>
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex">{children}</div>
      </div>
      <div className={`carousel-controls ${controlsClassName}`}>
        <button className="carousel-control" type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <button className="carousel-control" type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next slide">
          <ArrowRight size={21} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
