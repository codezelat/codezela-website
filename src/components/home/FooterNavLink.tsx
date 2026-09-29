"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isCurrent = pathname === href;
  const className = `transition-colors hover:text-codezela-pink-on-dark${isCurrent ? " text-codezela-pink-on-dark" : ""}`;

  if (href.startsWith("https://")) {
    return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
  }

  return (
    <Link href={href} scroll={false} prefetch={false} aria-current={isCurrent ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
