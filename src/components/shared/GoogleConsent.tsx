"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_NAME, COOKIE_PREFERENCES_EVENT } from "@/lib/consent";

export const GOOGLE_ANALYTICS_ID = "G-NYCH8NBNH1";
export const GOOGLE_ADS_ID = "AW-941011769";

const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): ConsentChoice | null {
  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${COOKIE_CONSENT_NAME}=`))
    ?.split("=")[1];

  return value === "accepted" || value === "rejected" ? value : null;
}

function persistConsent(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${choice}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

function updateGoogleConsent(choice: ConsentChoice) {
  const value = choice === "accepted" ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

function clearGoogleCookies() {
  const googleCookiePrefixes = ["_ga", "_gid", "_gat", "_gcl", "_gac"];
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => googleCookiePrefixes.some((prefix) => name.startsWith(prefix)));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
    if (window.location.hostname.endsWith("codezela.com")) {
      document.cookie = `${name}=; Path=/; Domain=.codezela.com; Max-Age=0; SameSite=Lax; Secure`;
    }
  }
}

function GoogleMeasurement() {
  return (
    <>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      <Script id="codezela-google-ads" strategy="afterInteractive">
        {`window.gtag && window.gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}

export function GoogleConsentManager() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);

    const frame = window.requestAnimationFrame(() => {
      const savedChoice = readConsent();
      if (savedChoice) {
        updateGoogleConsent(savedChoice);
        setChoice(savedChoice);
      }
      setReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    persistConsent(nextChoice);
    updateGoogleConsent(nextChoice);
    if (nextChoice === "rejected") clearGoogleCookies();
    setChoice(nextChoice);
    setPreferencesOpen(false);
  };

  const showPreferences = ready && (choice === null || preferencesOpen);

  return (
    <>
      {choice === "accepted" && <GoogleMeasurement />}

      {showPreferences && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-preferences-title"
          aria-describedby="cookie-preferences-description"
          className="fixed right-3 bottom-3 left-3 z-[100] mx-auto max-w-[920px] rounded-[18px] border border-[#eadcf0] bg-white/95 px-4 py-3.5 shadow-[0_18px_55px_rgba(45,0,70,0.2)] backdrop-blur-xl md:bottom-5"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7eafb] text-codezela-purple sm:grid" aria-hidden="true">
              <Cookie size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="cookie-preferences-title" className="sr-only">Your privacy choices</h2>
              <p id="cookie-preferences-description" className="text-[13px] leading-[19px] text-[#625c64] md:text-[14px] md:leading-5">
                With permission, Google Analytics and Ads help us measure visits and improve campaigns. Read our{" "}
                <Link href="/privacy-policy" scroll={false} className="font-semibold text-codezela-purple underline decoration-codezela-purple/30 underline-offset-2 hover:decoration-codezela-purple">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => saveChoice("rejected")}
                className="min-h-10 flex-1 cursor-pointer whitespace-nowrap rounded-full border border-[#c9b7d0] bg-white px-4 font-display text-[12px] font-semibold text-codezela-title transition-[background-color,border-color,transform] hover:border-codezela-purple hover:bg-[#fbf6fc] active:scale-[0.98] sm:flex-none"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => saveChoice("accepted")}
                className="min-h-10 flex-1 cursor-pointer whitespace-nowrap rounded-full border border-codezela-purple bg-codezela-purple px-4 font-display text-[12px] font-semibold text-white shadow-[0_6px_16px_rgba(113,11,192,0.16)] transition-[background-color,transform,box-shadow] hover:bg-[#5f099f] hover:shadow-[0_8px_20px_rgba(113,11,192,0.22)] active:scale-[0.98] sm:flex-none"
              >
                Accept optional
              </button>
              {choice !== null && (
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(false)}
                  aria-label="Close cookie preferences"
                  className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-[#6d6370] transition-colors hover:bg-[#f8effb] hover:text-codezela-purple"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
