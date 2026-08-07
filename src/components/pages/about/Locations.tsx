"use client";

import { MapPinned } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { locations, type LocationId } from "./data";

const defaultLocationId: LocationId = "head-office";

export function Locations() {
  const [activeId, setActiveId] = useState<LocationId>(defaultLocationId);
  const activeLocation = locations.find((location) => location.id === activeId) ?? locations[2];

  return (
    <div className="mt-[66px] grid gap-10 min-[1025px]:grid-cols-[416px_minmax(0,1fr)] min-[1025px]:items-start min-[1025px]:gap-[74px]">
      <div className="grid gap-[16px]" aria-label="Office locations">
        {locations.map((location) => {
          const isActive = location.id === activeId;

          return (
            <button
              key={location.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(location.id)}
              className={`group flex min-h-[118px] cursor-pointer flex-col items-start justify-center rounded-[7px] border px-6 py-5 text-left transition-[color,background-color,border-color,box-shadow,transform] duration-300 min-[1025px]:min-h-[145px] ${
                isActive
                  ? "border-[#8d3ccd] bg-[#8d3ccd] text-white shadow-[0_14px_34px_rgba(113,11,192,0.20)]"
                  : "border-[#f0e2f2] bg-[#fffafd] text-[#454545] hover:-translate-y-1 hover:border-[#8d3ccd]/40 hover:shadow-[0_12px_28px_rgba(72,20,91,0.10)]"
              }`}
            >
              <MapPinned
                aria-hidden="true"
                className={`mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-[#354052]"}`}
                strokeWidth={1.7}
              />
              <span className="font-display text-[17px] font-semibold leading-6">
                {location.selectorLabel}
              </span>
            </button>
          );
        })}
      </div>

      <article key={activeLocation.id} aria-live="polite" className="min-w-0">
        <p className="font-display text-[20px] font-medium leading-7 text-[#454545]">
          {activeLocation.branch}
        </p>
        <h3 className="mt-2 font-display text-[36px] font-semibold leading-[1.1] text-[#454545] min-[1025px]:text-[48px]">
          {activeLocation.city}
        </h3>
        <p className="mt-5 max-w-[780px] text-[17px] leading-[1.6] text-[#454545]">
          {activeLocation.description}
        </p>
        <address className="mt-7 not-italic text-[18px] leading-[1.6] text-[#7a7a7a]">
          {activeLocation.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <div className="relative mt-[28px] aspect-[1.62/1] overflow-hidden rounded-[15px] bg-[#f5eef7] shadow-[0_16px_38px_rgba(72,20,91,0.08)] min-[1025px]:max-h-[450px]">
          <Image
            src={activeLocation.image}
            alt={activeLocation.imageAlt}
            fill
            sizes="(max-width: 1024px) calc(100vw - 40px), 780px"
            className="object-cover transition-transform duration-700 hover:scale-[1.025]"
          />
        </div>
      </article>
    </div>
  );
}
