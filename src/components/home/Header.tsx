"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const desktopNavigation = [
  ["Home", "https://codezela.com/"],
  ["Services", "https://codezela.com/services/"],
  ["Portfolio", "https://codezela.com/portfolio/"],
  ["Industries", "https://codezela.com/industries/"],
  ["About", "https://codezela.com/about/"],
] as const;

const mobileNavigation = [
  ["Home", "https://codezela.com/"],
  ["Services", "https://codezela.com/services/"],
  ["Industries", "https://codezela.com/industries/"],
  ["About", "https://codezela.com/about/"],
  ["Portfolio", "https://codezela.com/portfolio/"],
  ["Contact", "https://codezela.com/contact/"],
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
      <div className="site-shell flex h-[70px] items-center justify-between rounded-full bg-white px-[20px] shadow-[0_2px_12px_rgba(69,0,83,0.13)] min-[1025px]:h-[90px] min-[1025px]:pl-[40px] min-[1025px]:pr-[40px]">
        <a
          href="https://codezela.com/"
          aria-label="Codezela Technologies home"
          className="relative block h-[50px] w-[142px] shrink-0 min-[1025px]:w-[154px]"
        >
          <Image
            src="/images/Frame-12.png"
            alt="Codezela Technologies"
            fill
            sizes="(max-width: 899px) 142px, 154px"
            className="object-contain"
            preload
          />
        </a>

        <div className="hidden items-center gap-[30px] min-[1025px]:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-[30px]">
              {desktopNavigation.map(([label, href], index) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-current={index === 0 ? "page" : undefined}
                    className={`text-[18px] font-medium leading-5 transition-colors hover:text-codezela-pink ${
                      index === 0 ? "text-codezela-pink" : "text-[#161616]"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="https://codezela.com/contact/"
            className="pill-button h-[50px] w-[140px]"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-[#ead9ef] bg-white text-codezela-purple transition-colors hover:bg-codezela-offwhite min-[1025px]:hidden"
        >
          {menuOpen ? <X aria-hidden="true" size={25} /> : <Menu aria-hidden="true" size={27} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full border-t border-[#f0e6f3] bg-white px-5 pb-7 pt-3 shadow-[0_18px_35px_rgba(80,8,136,0.12)] min-[1025px]:hidden"
      >
        <ul className="mx-auto max-w-[350px]">
          {mobileNavigation.map(([label, href], index) => (
            <li key={label} className="border-b border-[#f1e9f3] last:border-b-0">
              <a
                href={href}
                aria-current={index === 0 ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block py-[13px] text-[17px] font-medium leading-6 ${
                  index === 0 ? "text-codezela-pink" : "text-[#161616]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
