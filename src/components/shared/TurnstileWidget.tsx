"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  resetSignal: number;
  onTokenChange: (token: string) => void;
  onError: (message: string) => void;
};

type TurnstileOptions = {
  sitekey: string;
  action: string;
  appearance: "always";
  execution: "render";
  size: "flexible";
  theme: "light";
  retry: "auto";
  "retry-interval": number;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "unsupported-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({ siteKey, resetSignal, onTokenChange, onError }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onErrorRef = useRef(onError);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onErrorRef.current = onError;
  }, [onError, onTokenChange]);

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "proposal_submit",
      appearance: "always",
      execution: "render",
      size: "flexible",
      theme: "light",
      retry: "auto",
      "retry-interval": 3000,
      callback: (token) => {
        onErrorRef.current("");
        onTokenChangeRef.current(token);
      },
      "expired-callback": () => {
        onTokenChangeRef.current("");
        onErrorRef.current("Security verification expired. We’re refreshing it now.");
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      },
      "error-callback": () => {
        onTokenChangeRef.current("");
        onErrorRef.current("Security verification could not finish. Check your connection and retry.");
      },
      "unsupported-callback": () => {
        onTokenChangeRef.current("");
        onErrorRef.current("This browser cannot run the security check. Please update it or try another browser.");
      },
    });

    widgetIdRef.current = widgetId;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [scriptReady, siteKey]);

  useEffect(() => {
    if (resetSignal === 0 || !widgetIdRef.current || !window.turnstile) return;
    onTokenChangeRef.current("");
    window.turnstile.reset(widgetIdRef.current);
  }, [resetSignal]);

  if (!siteKey) {
    return (
      <p role="alert" className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] leading-5 text-red-700">
        Security verification is temporarily unavailable. Please contact info@codezela.com.
      </p>
    );
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px] w-full overflow-hidden rounded-[8px]" aria-label="Cloudflare security verification" />
    </>
  );
}
