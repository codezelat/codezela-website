"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

const videoId = "dQw4w9WgXcQ";
const videoTitle = "Rick Astley - Never Gonna Give You Up (Official Video)";
const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

export function NotFoundVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full">
      <div className="group relative aspect-video w-full overflow-hidden rounded-[22px] border border-[#eaddec] bg-[#21002f] shadow-[0_24px_70px_rgba(72,20,91,0.16)] min-[768px]:rounded-[30px]">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src="/images/404/never-gonna-give-you-up.webp"
              alt=""
              fill
              sizes="(max-width: 960px) calc(100vw - 40px), 880px"
              quality={75}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,0,43,0.08)_0%,rgba(30,0,43,0.18)_54%,rgba(30,0,43,0.72)_100%)]"
            />

            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${videoTitle}`}
              className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/70 bg-white/95 text-codezela-purple shadow-[0_14px_38px_rgba(30,0,43,0.28)] transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-x-1/2 hover:-translate-y-[54%] hover:scale-105 hover:bg-codezela-purple hover:text-white hover:shadow-[0_18px_44px_rgba(30,0,43,0.36)] active:scale-95 motion-reduce:transition-none min-[768px]:h-[84px] min-[768px]:w-[84px]"
            >
              <Play aria-hidden="true" className="ml-1 h-8 w-8 min-[768px]:h-9 min-[768px]:w-9" fill="currentColor" strokeWidth={1.8} />
            </button>

            <p className="absolute bottom-4 left-4 right-4 m-0 text-left font-display text-[15px] font-medium leading-5 text-white min-[768px]:bottom-6 min-[768px]:left-7 min-[768px]:text-[18px]">
              Press play for a little emotional support.
            </p>
          </>
        )}
      </div>

      <a
        href={youtubeUrl}
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-4 inline-flex min-h-11 items-center gap-2 px-3 font-display text-[14px] font-medium text-codezela-purple transition-colors hover:text-codezela-pink-ink"
      >
        Watch on YouTube
        <ExternalLink aria-hidden="true" className="h-4 w-4" />
      </a>
    </div>
  );
}
