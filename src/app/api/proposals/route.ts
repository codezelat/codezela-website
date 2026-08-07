import { NextResponse } from "next/server";
import { Resend } from "resend";
import { UAParser } from "ua-parser-js";

import {
  createInternalProposalEmail,
  createSubmitterConfirmationEmail,
  type ProposalRequestContext,
} from "@/lib/proposals/emails";
import { proposalSubmissionSchema } from "@/lib/proposals/schema";

export const runtime = "nodejs";

const INTERNAL_RECIPIENTS = ["info@codezela.com", "sayuru@codezela.com"];
const REPLY_ADDRESS = "Codezela Technologies <info@codezela.com>";
const MAX_BODY_BYTES = 30_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "proposal_submit";
const TURNSTILE_TIMEOUT_MS = 8_000;

type RateBucket = { count: number; resetsAt: number };

type TurnstileResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type TurnstileValidation =
  | { valid: true }
  | { valid: false; reason: "configuration" | "rejected" | "unavailable" };

declare global {
  var codezelaProposalRateBuckets: Map<string, RateBucket> | undefined;
}

const rateBuckets = globalThis.codezelaProposalRateBuckets ?? new Map<string, RateBucket>();
globalThis.codezelaProposalRateBuckets = rateBuckets;

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

function decodeLocationPart(value: string) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function requestContext(request: Request, submittedAt: Date): ProposalRequestContext {
  const headers = request.headers;
  const userAgent = safeHeader(headers, "user-agent", 1_000) || "Unknown";
  const parsed = UAParser(userAgent);
  const deviceName = [parsed.device.vendor, parsed.device.model].filter(Boolean).join(" ");
  const device = deviceName || parsed.device.type || "Desktop or laptop";
  const browser = [parsed.browser.name, parsed.browser.version].filter(Boolean).join(" ") || "Unknown";
  const operatingSystem = [parsed.os.name, parsed.os.version].filter(Boolean).join(" ") || "Unknown";
  const city = decodeLocationPart(safeHeader(headers, "x-vercel-ip-city", 120));
  const region = decodeLocationPart(safeHeader(headers, "x-vercel-ip-country-region", 120));
  const country = safeHeader(headers, "x-vercel-ip-country", 20) || safeHeader(headers, "cf-ipcountry", 20);
  const location = [city, region, country].filter(Boolean).join(", ") || "Not provided by hosting platform";

  return {
    submittedAt,
    submittedAtColombo: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Colombo",
    }).format(submittedAt),
    ipAddress: extractIpAddress(headers),
    location,
    device,
    browser,
    operatingSystem,
    userAgent,
    language: safeHeader(headers, "accept-language", 160) || "Unknown",
    sourcePage: safeHeader(headers, "referer", 500) || "Direct request",
  };
}

function sameSiteRequest(request: Request) {
  const fetchSite = safeHeader(request.headers, "sec-fetch-site", 30);
  return !fetchSite || fetchSite === "same-origin" || fetchSite === "same-site" || fetchSite === "none";
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

async function validateTurnstile(
  request: Request,
  token: string,
  remoteIp: string,
  idempotencyKey: string,
): Promise<TurnstileValidation> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { valid: false, reason: "configuration" };

  const expectedHostnames = expectedTurnstileHostnames(request);
  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: idempotencyKey,
  });
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
        return { valid: false, reason: "unavailable" };
      }

      const result = (await response.json()) as TurnstileResponse;
      const internalError = result["error-codes"]?.includes("internal-error");
      if (!result.success && internalError && attempt === 0) continue;
      if (!result.success) return { valid: false, reason: "rejected" };
      if (result.action !== TURNSTILE_ACTION) return { valid: false, reason: "rejected" };
      if (!result.hostname || !expectedHostnames.has(result.hostname.toLowerCase())) {
        return { valid: false, reason: "rejected" };
      }

      return { valid: true };
    } catch {
      if (attempt === 1) return { valid: false, reason: "unavailable" };
    } finally {
      clearTimeout(timeout);
    }
  }

  return { valid: false, reason: "unavailable" };
}

export async function POST(request: Request) {
  if (!sameSiteRequest(request)) {
    return NextResponse.json({ ok: false, message: "This request could not be verified." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "The proposal is too large to submit." }, { status: 413 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The proposal request is not valid JSON." }, { status: 400 });
  }

  const parsed = proposalSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please review the highlighted proposal details and try again." },
      { status: 422 },
    );
  }

  const submission = parsed.data;
  if (submission.botField) {
    return NextResponse.json({ ok: true, reference: submission.submissionId });
  }

  const submissionAge = Date.now() - submission.startedAt;
  if (submissionAge < 800) {
    return NextResponse.json({ ok: false, message: "Please wait a moment before submitting again." }, { status: 429 });
  }
  if (submissionAge > 24 * 60 * 60 * 1000) {
    return NextResponse.json(
      { ok: false, message: "This proposal session expired. Please reopen the form and submit again." },
      { status: 422 },
    );
  }

  const submittedAt = new Date(submission.startedAt);
  const context = requestContext(request, submittedAt);
  if (isRateLimited(context.ipAddress)) {
    return NextResponse.json(
      { ok: false, message: "Too many proposal requests were sent from this connection. Please try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const turnstile = await validateTurnstile(
    request,
    submission.turnstileToken,
    context.ipAddress,
    submission.submissionId,
  );
  if (!turnstile.valid) {
    const configurationFailure = turnstile.reason === "configuration";
    const unavailable = turnstile.reason === "unavailable";
    return NextResponse.json(
      {
        ok: false,
        message: configurationFailure
          ? "Security verification is temporarily unavailable. Please contact info@codezela.com."
          : unavailable
            ? "Security verification could not be reached. Please check your connection and retry."
            : "Security verification expired or was not accepted. It has been refreshed; please try again.",
      },
      { status: configurationFailure || unavailable ? 503 : 403 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROPOSAL_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json(
      { ok: false, message: "Email delivery is temporarily unavailable. Please contact info@codezela.com." },
      { status: 503 },
    );
  }

  const internalEmail = createInternalProposalEmail(submission, context);
  const confirmationEmail = createSubmitterConfirmationEmail(submission);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.batch.send(
      [
        {
          from,
          to: INTERNAL_RECIPIENTS,
          replyTo: submission.email,
          subject: internalEmail.subject,
          html: internalEmail.html,
          text: internalEmail.text,
          tags: [
            { name: "category", value: "proposal-notification" },
            { name: "source", value: "codezela-website" },
          ],
        },
        {
          from,
          to: submission.email,
          replyTo: REPLY_ADDRESS,
          subject: confirmationEmail.subject,
          html: confirmationEmail.html,
          text: confirmationEmail.text,
          tags: [
            { name: "category", value: "proposal-confirmation" },
            { name: "source", value: "codezela-website" },
          ],
        },
      ],
      { idempotencyKey: `proposal-${submission.submissionId}`, batchValidation: "strict" },
    );

    if (error || !data?.data || data.data.length !== 2) {
      return NextResponse.json(
        { ok: false, message: "We could not send the proposal right now. Please retry in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, reference: submission.submissionId });
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not send the proposal right now. Please retry in a moment." },
      { status: 502 },
    );
  }
}
