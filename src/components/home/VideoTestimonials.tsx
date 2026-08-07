"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const videoTestimonials = [
  {
    id: "VBQsHInpVX4",
    title: "How Codezela Technologies Boosted My Personal Training Business: From Few Leads to Fully Booked!",
  },
  {
    id: "9TPNKGc1Ugo",
    title: "How Codezela Technologies Elevated Our Product with Social Media Marketing: Breaking Expectations!",
  },
  {
    id: "KmGtDiqpzwY",
    title: "How Codezela Technologies Transformed My Art Passion into a Thriving Online Business with SEO!",
  },
] as const;

export function VideoTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const [audibleVideoId, setAudibleVideoId] = useState<string | null>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const sendPlayerCommand = (id: string, command: "mute" | "unMute") => {
    playerRefs.current[id]?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "https://www.youtube.com",
    );
  };

  const toggleSound = (id: string) => {
    if (audibleVideoId === id) {
      sendPlayerCommand(id, "mute");
      setAudibleVideoId(null);
      return;
    }

    videoTestimonials.forEach(({ id: videoId }) => {
      if (videoId !== id) sendPlayerCommand(videoId, "mute");
    });
    sendPlayerCommand(id, "unMute");
    setAudibleVideoId(id);
  };

  return (
    <div
      ref={containerRef}
      className="mt-[36px] grid grid-cols-1 gap-[15px] md:mt-[60px] md:grid-cols-3 md:gap-[30px]"
      role="list"
      aria-label="Client video testimonials"
    >
      {videoTestimonials.map(({ id, title }) => {
        const loaded = loadedVideos.includes(id);
        const isAudible = audibleVideoId === id;

        return (
          <div key={id} role="listitem" className="video-testimonial interactive-card relative aspect-[9/16] overflow-hidden rounded-[8px] bg-[#160020] shadow-[0_12px_30px_rgba(45,0,70,0.09)]">
            <div className={`video-testimonial__placeholder absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_38%,#710bc0_0%,#31004d_48%,#160020_100%)] transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`} aria-hidden="true">
              <span className="video-testimonial__play grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm">
                <Play className="ml-1" fill="currentColor" size={28} />
              </span>
            </div>
            {shouldLoad && (
              <iframe
                ref={(player) => {
                  playerRefs.current[id] = player;
                }}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1${typeof window === "undefined" ? "" : `&origin=${encodeURIComponent(window.location.origin)}`}`}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => setLoadedVideos((current) => (current.includes(id) ? current : [...current, id]))}
              />
            )}
            <button
              type="button"
              onClick={() => toggleSound(id)}
              disabled={!loaded}
              aria-label={loaded ? (isAudible ? `Mute testimonial: ${title}` : `Unmute testimonial: ${title}`) : `Loading sound control for testimonial: ${title}`}
              aria-pressed={isAudible}
              className="absolute top-3 right-3 z-20 inline-flex h-10 items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3.5 text-[12px] font-semibold text-[#5b0b83] shadow-[0_6px_20px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[background-color,color,transform,box-shadow,opacity] duration-200 hover:scale-[1.03] hover:bg-[#710bc0] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 motion-reduce:transition-none"
            >
              {isAudible ? <Volume2 size={17} strokeWidth={2.3} /> : <VolumeX size={17} strokeWidth={2.3} />}
              <span>{isAudible ? "Sound on" : "Muted"}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
