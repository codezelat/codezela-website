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
          className="fixed right-4 bottom-4 left-4 z-[100] mx-auto max-w-[760px] rounded-[22px] border border-[#eadcf0] bg-white/95 p-5 shadow-[0_20px_65px_rgba(45,0,70,0.22)] backdrop-blur-xl md:bottom-6 md:p-6"
        >
          {choice !== null && (
            <button
              type="button"
              onClick={() => setPreferencesOpen(false)}
              aria-label="Close cookie preferences"
              className="absolute top-3 right-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[#6d6370] transition-colors hover:bg-[#f8effb] hover:text-codezela-purple"
            >
              <X size={19} aria-hidden="true" />
            </button>
          )}

          <div className="flex items-start gap-3.5 pr-8">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7eafb] text-codezela-purple" aria-hidden="true">
              <Cookie size={20} />
            </span>
            <div>
              <h2 id="cookie-preferences-title" className="font-display text-[18px] font-semibold text-codezela-title md:text-[20px]">
                Your privacy choices
              </h2>
              <p id="cookie-preferences-description" className="mt-1.5 max-w-[610px] text-[14px] leading-5 text-[#625c64] md:text-[15px] md:leading-[22px]">
                We use essential storage to remember your choice. With permission, Google Analytics and Google Ads help us understand visits and improve campaigns. Read our{" "}
                <Link href="/privacy-policy" scroll={false} className="font-semibold text-codezela-purple underline decoration-codezela-purple/30 underline-offset-2 hover:decoration-codezela-purple">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => saveChoice("rejected")}
              className="min-h-11 cursor-pointer rounded-full border border-[#c9b7d0] bg-white px-5 font-display text-[14px] font-semibold text-codezela-title transition-[background-color,border-color,transform] hover:border-codezela-purple hover:bg-[#fbf6fc] active:scale-[0.98]"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => saveChoice("accepted")}
              className="min-h-11 cursor-pointer rounded-full border border-codezela-purple bg-codezela-purple px-5 font-display text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(113,11,192,0.18)] transition-[background-color,transform,box-shadow] hover:bg-[#5f099f] hover:shadow-[0_10px_24px_rgba(113,11,192,0.25)] active:scale-[0.98]"
            >
              Accept optional
            </button>
          </div>
        </section>
      )}
    </>
  );
}
