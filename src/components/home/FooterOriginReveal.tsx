"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function FooterOriginReveal() {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={triggerRef} aria-hidden="true" className="block h-px" />
      <div aria-hidden="true" className="h-[149px]" />

      {isVisible ? (
        <div
          role="img"
          aria-label="Made with love in Sri Lanka"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 flex h-[150px] animate-[fade-in_150ms_ease-out] items-center justify-center overflow-hidden bg-white px-5 pb-[env(safe-area-inset-bottom)] sm:px-8"
        >
          <div className="flex w-full max-w-[430px] items-center justify-center gap-[14px] sm:gap-5">
            <Image
              src="/images/codezela-sri-lanka-skyline.webp"
              alt=""
              width={768}
              height={204}
              className="h-auto w-[min(58vw,282px)] shrink object-contain"
            />
            <Image
              src="/images/made-with-love-in-sri-lanka.webp"
              alt=""
              width={441}
              height={176}
              className="h-auto w-[90px] shrink-0 object-contain sm:w-[110px]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
