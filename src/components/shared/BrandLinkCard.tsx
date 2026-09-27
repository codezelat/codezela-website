import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type BrandLinkCardProps = {
  href: string;
  label: string;
  name: string;
  description: string;
  domain: string;
  children: ReactNode;
};

export function BrandLinkCard({
  href,
  label,
  name,
  description,
  domain,
  children,
}: BrandLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-[24px] border border-codezela-purple/15 bg-white p-6 transition-colors duration-200 hover:border-codezela-purple/40 hover:bg-[#fdfaff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-codezela-purple motion-reduce:transition-none min-[700px]:p-9"
    >
      <div className="flex min-h-[76px] items-center justify-between gap-5">
        {children}
        <ArrowUpRight
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-codezela-purple transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
      <p className="mt-7 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-codezela-purple">
        {label}
      </p>
      <h3 className="mt-2 font-display text-[25px] font-semibold leading-tight text-codezela-title min-[700px]:text-[28px]">
        {name}
      </h3>
      <p className="mb-7 mt-4 text-[16px] leading-relaxed text-codezela-copy">
        {description}
      </p>
      <span className="mt-auto border-t border-codezela-purple/10 pt-5 font-display text-[14px] font-medium text-codezela-purple">
        {domain}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </a>
  );
}
