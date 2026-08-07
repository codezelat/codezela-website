"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const desktopNavigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Industries", "/industries"],
  ["About", "/about"],
] as const;

const mobileNavigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["About", "/about"],
  ["Portfolio", "/portfolio"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/industries" && pathname.startsWith("/industry/")) return true;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="relative z-50 h-[100px] bg-white pt-[20px] min-[1025px]:h-[148px] min-[1025px]:pt-[48px]">
      <div className="site-shell flex h-[70px] items-center justify-between rounded-full bg-white px-[20px] shadow-[0_2px_12px_rgba(69,0,83,0.13)] min-[1025px]:h-[90px] min-[1025px]:pl-[30px] min-[1025px]:pr-[40px]">
        <Link
          href="/"
          prefetch={false}
          aria-label="Codezela Technologies home"
          className="relative block h-[50px] w-[142px] shrink-0 min-[1025px]:w-[154px]"
        >
          <Image
            src="/images/Frame-12.png"
            alt="Codezela Technologies"
            fill
            sizes="(max-width: 899px) 142px, 154px"
            className="object-contain"
          />
        </Link>

        <div className="hidden items-center gap-[87px] min-[1025px]:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-[40px]">
              {desktopNavigation.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    prefetch={false}
                    aria-current={isCurrent(href) ? "page" : undefined}
                    className={`desktop-nav-link text-[18px] font-medium leading-5 ${
                      isCurrent(href) ? "text-codezela-pink-ink" : "text-[#161616]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact"
            prefetch={false}
            className="pill-button group relative h-[50px] w-[140px] overflow-hidden"
          >
            <span className="absolute transition-transform duration-300 group-hover:-translate-y-[42px]">Let’s talk</span>
            <span className="absolute translate-y-[42px] transition-transform duration-300 group-hover:translate-y-0">Click Me</span>
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-transparent text-codezela-purple transition-colors hover:bg-codezela-offwhite min-[1025px]:hidden"
        >
          {menuOpen ? <X aria-hidden="true" size={25} /> : <Menu aria-hidden="true" size={27} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`absolute inset-x-0 top-[94px] rounded-b-[30px] bg-white shadow-[0_20px_34px_rgba(80,8,136,0.12)] transition-all duration-300 min-[1025px]:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-auto w-full">
          {mobileNavigation.map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                prefetch={false}
                aria-current={isCurrent(href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`mobile-nav-link flex h-[44px] items-center justify-center font-display text-[18px] font-medium leading-6 ${
                  isCurrent(href) ? "bg-codezela-offwhite text-codezela-pink-ink" : "text-codezela-purple"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
