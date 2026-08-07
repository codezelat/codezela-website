import { COOKIE_CONSENT_NAME } from "@/lib/consent";

export function trackGoogleEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;

  const consentAccepted = document.cookie
    .split("; ")
    .some((item) => item === `${COOKIE_CONSENT_NAME}=accepted`);

  if (!consentAccepted) return;
  window.gtag?.("event", eventName, parameters);
}
