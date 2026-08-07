"use client";

import { COOKIE_PREFERENCES_EVENT } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
      className="cursor-pointer border-0 bg-transparent p-0 text-inherit hover:text-codezela-pink-on-dark"
    >
      Cookie Preferences
    </button>
  );
}
