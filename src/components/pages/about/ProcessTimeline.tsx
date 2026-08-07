"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { processSteps } from "./data";

const processTitleLines = [
  ["Inception", "Meeting"],
  ["Strategize for", "Success"],
  ["Bringing Ideas", "to Life"],
  ["Refining Perfection"],
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    animationFrameRef.current = null;

    const timeline = timelineRef.current;
    if (!timeline) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0.5);
      return;
    }

    const rect = timeline.getBoundingClientRect();
    const startY = window.innerHeight * 0.82;
    const endY = window.innerHeight * 0.24;
    const travelDistance = Math.max(1, rect.height + startY - endY);
    const nextProgress = clamp((startY - rect.top) / travelDistance);

    setProgress((currentProgress) =>
      Math.abs(currentProgress - nextProgress) < 0.001 ? currentProgress : nextProgress,
    );
  }, []);

  const requestProgressUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    animationFrameRef.current = window.requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    reducedMotionQuery.addEventListener("change", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      reducedMotionQuery.removeEventListener("change", requestProgressUpdate);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [requestProgressUpdate]);

  const markerStyle = {
    "--process-marker-inline": `${1.1 + progress * 97.8}%`,
    "--process-marker-block": `${3 + progress * 94}%`,
  } as CSSProperties;

  return (
    <div ref={timelineRef} className="relative" style={markerStyle}>
      <span
        aria-hidden="true"
        className="absolute bottom-[3%] left-6 top-[3%] w-px bg-[#4f126e] min-[1025px]:bottom-auto min-[1025px]:left-[0.8%] min-[1025px]:right-[0.8%] min-[1025px]:top-[142px] min-[1025px]:h-px min-[1025px]:w-auto"
      />
      <span
        data-process-marker
        aria-hidden="true"
        className="absolute left-6 top-[var(--process-marker-block)] z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[9px] border-[#fce7ff] bg-[#d153ef] shadow-[0_0_0_2px_#f6dafa] min-[1025px]:left-[var(--process-marker-inline)] min-[1025px]:top-[142px]"
      />

      <ol className="relative grid gap-8 min-[1025px]:grid-cols-4 min-[1025px]:gap-9">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            data-process-step
            className="min-h-[168px] pl-16 min-[1025px]:min-h-0 min-[1025px]:pl-0 min-[1025px]:text-center"
          >
            <p className="mb-2 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8d3ccd] min-[1025px]:sr-only">
              Step {index + 1}
            </p>
            <h3 className="font-display text-[25px] font-medium leading-[1.16] text-[#454545] min-[1025px]:flex min-[1025px]:min-h-[86px] min-[1025px]:items-center min-[1025px]:justify-center min-[1025px]:text-[29px] min-[1025px]:font-normal min-[1025px]:leading-[1.12]">
              <span>
                {processTitleLines[index].map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </h3>
            <p className="mt-3 text-[16px] leading-[1.5] text-[#7a7a7a] min-[1025px]:mx-auto min-[1025px]:mt-[110px] min-[1025px]:max-w-[285px] min-[1025px]:text-[17px] min-[1025px]:leading-[1.4] min-[1025px]:text-[#8a8a8a]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
