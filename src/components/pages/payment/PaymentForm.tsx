"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { TurnstileWidget } from "@/components/shared/TurnstileWidget";

type CreatePaymentResponse = {
  ok?: boolean;
  checkoutUrl?: string;
  message?: string;
};

export function PaymentForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [amount, setAmount] = useState("");
  const [invoiceReference, setInvoiceReference] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const startedAt = useRef(0);
  const submissionId = useRef<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!turnstileToken) {
      setMessage("Complete the security check before continuing.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          invoiceReference,
          turnstileToken,
          submissionId: submissionId.current ?? (submissionId.current = crypto.randomUUID()),
          startedAt: startedAt.current,
          botField: "",
        }),
      });
      const result = (await response.json()) as CreatePaymentResponse;

      if (!response.ok || !result.ok || !result.checkoutUrl) {
        setMessage(result.message || "The payment could not be started. Please retry in a moment.");
        setTurnstileToken("");
        submissionId.current = null;
        startedAt.current = Date.now();
        setResetSignal((current) => current + 1);
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch {
      setMessage("We could not reach the secure payment service. Check your connection and retry.");
      setTurnstileToken("");
      submissionId.current = null;
      startedAt.current = Date.now();
      setResetSignal((current) => current + 1);
    } finally {
      setSubmitting(false);
    }
  }

  return (
      <form
        onSubmit={submitPayment}
        aria-label="Invoice payment"
        className="rounded-[30px] border border-codezela-purple/15 bg-white p-6 shadow-[0_24px_70px_rgba(80,8,136,0.12)] min-[600px]:p-10"
      >
        <div>
          <label htmlFor="invoice-reference" className="font-display text-[15px] font-semibold text-[#332f34]">
            Invoice reference
          </label>
          <input
            id="invoice-reference"
            name="invoiceReference"
            autoComplete="off"
            required
            minLength={3}
            maxLength={64}
            value={invoiceReference}
            onChange={(event) => setInvoiceReference(event.target.value)}
            placeholder="For example, CZ-INV-1024"
            className="mt-2 h-[56px] w-full rounded-[12px] border border-[#d9cedf] bg-white px-4 text-[17px] uppercase text-[#252126] outline-none transition focus:border-codezela-purple focus:ring-4 focus:ring-codezela-purple/10"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="payable-amount" className="font-display text-[15px] font-semibold text-[#332f34]">
            Exact amount payable
          </label>
          <div className="mt-2 flex h-[64px] overflow-hidden rounded-[12px] border border-[#d9cedf] bg-white transition focus-within:border-codezela-purple focus-within:ring-4 focus-within:ring-codezela-purple/10">
            <span className="grid min-w-[78px] place-items-center border-r border-[#e5dce9] bg-codezela-offwhite font-display text-[16px] font-semibold text-codezela-purple">LKR</span>
            <input
              id="payable-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              required
              maxLength={11}
              pattern="\d{1,8}(\.\d{1,2})?"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="min-w-0 flex-1 px-4 font-display text-[28px] font-semibold text-[#252126] outline-none"
            />
          </div>
        </div>

        <div className="mt-7 min-h-[72px]">
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            action="payment_submit"
            resetSignal={resetSignal}
            onTokenChange={setTurnstileToken}
            onError={setSecurityMessage}
          />
          {securityMessage ? <p className="mt-2 text-[13px] leading-5 text-red-700">{securityMessage}</p> : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-codezela-purple px-6 font-display text-[17px] font-semibold text-white shadow-[0_12px_30px_rgba(113,11,192,0.2)] transition hover:-translate-y-0.5 hover:bg-codezela-title disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
        >
          {submitting ? "Opening checkout..." : "Continue to payment"}
          {!submitting ? <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} aria-hidden="true" /> : null}
        </button>

        <p aria-live="polite" role="status" className={`mt-4 text-center text-[14px] leading-5 text-red-700 ${message ? "block" : "hidden"}`}>
          {message}
        </p>
      </form>
  );
}
