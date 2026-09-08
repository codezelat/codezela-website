import { afterEach, beforeEach, expect, mock, test } from "bun:test";
import { POST } from "../src/app/api/proposals/route.ts";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
let calls;
beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test_only";
  process.env.PROPOSAL_FROM_EMAIL = "Codezela Technologies <notifications@email.codezela.com>";
  process.env.TURNSTILE_SECRET_KEY = "test-only-secret";
  calls = [];
  globalThis.fetch = mock(async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes("siteverify")) return Response.json({ success: true, action: "proposal_submit", hostname: "codezela.com" });
    return Response.json({ data: [{ id: "internal-test-email" }, { id: "submitter-test-email" }] });
  });
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of ["RESEND_API_KEY", "PROPOSAL_FROM_EMAIL", "TURNSTILE_SECRET_KEY", "NODE_ENV"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
const submission = () => ({
  submissionId: crypto.randomUUID(), startedAt: Date.now() - 5000,
  turnstileToken: "test-token", fullName: "Verification User", email: "submitter@example.com",
  company: "Test company", industry: "Technology", services: ["Web development"], goals: [],
  budget: "Discuss", timeline: "Flexible", description: "Test-only enquiry", botField: "",
});
const request = (body = submission(), headers = {}, url = "https://codezela.com/api/proposals") => new Request(url, {
  method: "POST", headers: { "Content-Type": "application/json", Origin: new URL(url).origin, ...headers }, body: JSON.stringify(body),
});

test("all proposal entry points send internal To/CC and a submitter confirmation after Turnstile", async () => {
  const data = submission();
  expect((await POST(request(data))).status).toBe(200);
  expect(calls[0].url).toContain("siteverify");
  const emails = JSON.parse(calls[1].init.body);
  expect(emails).toHaveLength(2);
  expect(emails[0].to).toEqual(["info@codezela.com"]);
  expect(emails[0].cc).toEqual(["sayuru@codezela.com"]);
  expect(emails[0].reply_to).toBe(data.email);
  expect(emails[1].to).toBe(data.email);
  expect(emails[1].reply_to).toContain("info@codezela.com");
  expect(new Headers(calls[1].init.headers).get("idempotency-key")).toBe(`proposal-${data.submissionId}`);
});

test("proposal rejects cross-origin, invalid, honeypot and oversized requests before providers", async () => {
  expect((await POST(request(submission(), { Origin: "https://evil.example" }))).status).toBe(403);
  expect((await POST(request(submission(), { "Content-Type": "text/plain" }))).status).toBe(415);
  expect((await POST(request({ padding: "x".repeat(30001) }))).status).toBe(413);
  expect((await POST(request({ ...submission(), email: "invalid" }))).status).toBe(422);
  expect((await POST(request({ ...submission(), botField: "spam" }))).status).toBe(200);
  expect(calls).toHaveLength(0);
});

test("proposal rejects failed, expired, wrong action and wrong hostname challenges", async () => {
  for (const challenge of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: true, action: "payment_submit", hostname: "codezela.com" },
    { success: true, action: "proposal_submit", hostname: "evil.example" },
  ]) {
    globalThis.fetch = mock(async (url) => { calls.push(String(url)); return Response.json(challenge); });
    expect((await POST(request())).status).toBe(403);
  }
  expect(calls).toHaveLength(3);
  expect(calls.every((url) => url.includes("siteverify"))).toBe(true);
});

test("local dummy pair works for proposals but cannot bypass production Turnstile", async () => {
  process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
  globalThis.fetch = mock(async (url) => String(url).includes("siteverify")
    ? Response.json({ success: true, hostname: "example.com", metadata: { result_with_testing_key: true } })
    : Response.json({ data: [{ id: "test-internal" }, { id: "test-confirmation" }] }));
  process.env.NODE_ENV = "production";
  expect((await POST(request())).status).toBe(403);
  process.env.NODE_ENV = "development";
  expect((await POST(request())).status).toBe(403);
  expect((await POST(request(submission(), {}, "http://localhost:3100/api/proposals"))).status).toBe(200);
});

test("missing config and provider failures never report a sent proposal", async () => {
  delete process.env.TURNSTILE_SECRET_KEY;
  expect((await POST(request())).status).toBe(503);
  expect(calls).toHaveLength(0);
  process.env.TURNSTILE_SECRET_KEY = "test-only-secret";
  delete process.env.RESEND_API_KEY;
  expect((await POST(request())).status).toBe(503);
  process.env.RESEND_API_KEY = "re_test_only";
  globalThis.fetch = mock(async (url) => String(url).includes("siteverify")
    ? Response.json({ success: true, action: "proposal_submit", hostname: "codezela.com" })
    : Response.json({ name: "validation_error", message: "Private provider details" }, { status: 422 }));
  const response = await POST(request());
  expect(response.status).toBe(502);
  const body = await response.json();
  expect(body.ok).toBe(false);
  expect(body.message).not.toContain("Private provider");
});
