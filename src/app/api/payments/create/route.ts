import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { createGenieTransaction } from "@/lib/payments/genie";
import { amountToMinorUnits, paymentSubmissionSchema } from "@/lib/payments/schema";
import {
  createPaymentSessionToken,
  PAYMENT_SESSION_COOKIE,
  PAYMENT_SESSION_MAX_AGE,
  paymentSessionIsConfigured,
} from "@/lib/payments/session";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "payment_submit";
const TURNSTILE_TIMEOUT_MS = 8_000;
const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

type RateBucket = { count: number; resetsAt: number };

type TurnstileResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
  metadata?: { result_with_testing_key?: boolean };
};

declare global {
  var codezelaPaymentRateBuckets: Map<string, RateBucket> | undefined;
}

const rateBuckets = globalThis.codezelaPaymentRateBuckets ?? new Map<string, RateBucket>();
globalThis.codezelaPaymentRateBuckets = rateBuckets;

function paymentResponse(body: object, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...RESPONSE_HEADERS, ...init?.headers },
  });
}

function safeHeader(headers: Headers, name: string, maximum = 500) {
  return (headers.get(name) ?? "").trim().slice(0, maximum);
}

function extractIpAddress(headers: Headers) {
  const candidate =
    safeHeader(headers, "cf-connecting-ip", 80) ||
    safeHeader(headers, "x-real-ip", 80) ||
    safeHeader(headers, "x-forwarded-for", 240).split(",")[0]?.trim() ||
    "Unknown";

  return /^[0-9a-f:.]+$/i.test(candidate) ? candidate : "Unknown";
}

function isRateLimited(ipAddress: string) {
  if (ipAddress === "Unknown") return false;

  const now = Date.now();
  const existing = rateBuckets.get(ipAddress);
  if (!existing || existing.resetsAt <= now) {
    rateBuckets.set(ipAddress, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  if (rateBuckets.size > 1_000) {
    for (const [key, bucket] of rateBuckets) {
      if (bucket.resetsAt <= now) rateBuckets.delete(key);
    }
  }

  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function requestIsSameOrigin(request: Request) {
  const fetchSite = safeHeader(request.headers, "sec-fetch-site", 30);
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return false;

  const origin = safeHeader(request.headers, "origin", 300);
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function expectedTurnstileHostnames(request: Request) {
  const forwardedHost = safeHeader(request.headers, "x-forwarded-host", 255).split(",")[0]?.trim();
  const hostHeader = safeHeader(request.headers, "host", 255).split(",")[0]?.trim();
  const hostname = (forwardedHost || hostHeader || new URL(request.url).hostname)
    .replace(/^\[/, "")
    .replace(/\](?::\d+)?$/, "")
    .replace(/:\d+$/, "")
    .toLowerCase();
  const allowed = new Set([hostname]);

  if (hostname === "codezela.com") allowed.add("www.codezela.com");
  if (hostname === "www.codezela.com") allowed.add("codezela.com");
  return allowed;
}

async function validateTurnstile(request: Request, token: string, remoteIp: string, idempotencyKey: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "configuration" as const;

  const body = new URLSearchParams({ secret, response: token, idempotency_key: idempotencyKey });
  if (remoteIp !== "Unknown") body.set("remoteip", remoteIp);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS);

    try {
      const response = await fetch(TURNSTILE_VERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        if (attempt === 0 && response.status >= 500) continue;
        return "unavailable" as const;
      }

      const result = (await response.json()) as TurnstileResponse;
      if (!result.success && result["error-codes"]?.includes("internal-error") && attempt === 0) continue;
      // Cloudflare's published dummy pair omits the widget action and uses a synthetic hostname.
      const isLocalTest =
        process.env.NODE_ENV === "development" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname) &&
        secret === "1x0000000000000000000000000000000AA" &&
        result.metadata?.result_with_testing_key === true;
      if (result.success && isLocalTest) return "valid" as const;
      if (!result.success || result.action !== TURNSTILE_ACTION) return "rejected" as const;
      if (!result.hostname || !expectedTurnstileHostnames(request).has(result.hostname.toLowerCase())) {
        return "rejected" as const;
      }

      return "valid" as const;
    } catch {
      if (attempt === 1) return "unavailable" as const;
    } finally {
      clearTimeout(timeout);
    }
  }

  return "unavailable" as const;
}

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return paymentResponse({ ok: false, message: "This payment request could not be verified." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return paymentResponse({ ok: false, message: "The payment request is not valid." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return paymentResponse({ ok: false, message: "The payment request is too large." }, { status: 413 });
  }

  let rawBody: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_BODY_BYTES) {
        await reader.cancel();
        return paymentResponse({ ok: false, message: "The payment request is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    rawBody = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return paymentResponse({ ok: false, message: "The payment request is not valid." }, { status: 400 });
  }

  const parsed = paymentSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return paymentResponse(
      { ok: false, message: "Check the invoice reference and exact payable amount, then try again." },
      { status: 422 },
    );
  }

  const submission = parsed.data;
  if (submission.botField) return paymentResponse({ ok: true, checkoutUrl: "/payment" });

  if (!paymentSessionIsConfigured()) {
    return paymentResponse(
      { ok: false, message: "Payment session security is temporarily unavailable. Please contact info@codezela.com." },
      { status: 503 },
    );
  }

  const submissionAge = Date.now() - submission.startedAt;
  if (submissionAge < 800) {
    return paymentResponse({ ok: false, message: "Please wait a moment before continuing." }, { status: 429 });
  }
  if (submissionAge > 24 * 60 * 60 * 1000) {
    return paymentResponse(
      { ok: false, message: "This payment form expired. Refresh the page and enter the details again." },
      { status: 422 },
    );
  }

  const ipAddress = extractIpAddress(request.headers);
  if (isRateLimited(ipAddress)) {
    return paymentResponse(
      { ok: false, message: "Too many payment attempts were started from this connection. Try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const turnstile = await validateTurnstile(request, submission.turnstileToken, ipAddress, submission.submissionId);
  if (turnstile !== "valid") {
    return paymentResponse(
      {
        ok: false,
        message:
          turnstile === "configuration"
            ? "Security verification is temporarily unavailable. Please contact info@codezela.com."
            : turnstile === "unavailable"
              ? "Security verification could not be reached. Check your connection and retry."
              : "Security verification expired or was not accepted. It has been refreshed, so please try again.",
      },
      { status: turnstile === "rejected" ? 403 : 503 },
    );
  }

  const amount = amountToMinorUnits(submission.amount);
  if (amount === null) {
    return paymentResponse({ ok: false, message: "Enter a valid payable amount between LKR 1.00 and LKR 99,999,999.99." }, { status: 422 });
  }

  const localId = `CZ-${randomUUID()}`;
  // The live Genie application is registered to this HTTPS domain.
  const returnUrl = "https://codezela.com/payment/result";

  try {
    const { transaction, checkoutUrl } = await createGenieTransaction({
      amount,
      invoiceReference: submission.invoiceReference,
      localId,
      returnUrl,
    });

    if (
      transaction.amount !== amount ||
      transaction.currency !== "LKR" ||
      transaction.localId !== localId ||
      transaction.customerReference !== submission.invoiceReference
    ) {
      return paymentResponse(
        { ok: false, message: "The secure payment session could not be matched to your invoice. No payment was started." },
        { status: 502 },
      );
    }

    const now = Date.now();
    const sessionToken = createPaymentSessionToken({
      transactionId: transaction.id,
      localId,
      invoiceReference: submission.invoiceReference,
      amount,
      checkoutUrl,
      issuedAt: now,
      expiresAt: now + PAYMENT_SESSION_MAX_AGE * 1000,
    });

    if (!sessionToken) {
      return paymentResponse(
        { ok: false, message: "Payment session security is temporarily unavailable. Please contact info@codezela.com." },
        { status: 503 },
      );
    }

    const response = paymentResponse({ ok: true, checkoutUrl });
    response.cookies.set(PAYMENT_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: new URL(request.url).protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: PAYMENT_SESSION_MAX_AGE,
    });
    return response;
  } catch {
    return paymentResponse(
      { ok: false, message: "Genie could not start the payment securely right now. Please retry in a moment." },
      { status: 502 },
    );
  }
}
