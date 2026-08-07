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

type RateBucket = { count: number; resetsAt: number };

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
