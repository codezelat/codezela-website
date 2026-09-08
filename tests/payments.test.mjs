import { afterEach, beforeEach, expect, mock, test } from "bun:test";
import { PDFDocument } from "pdf-lib";
import { createHash } from "node:crypto";

mock.module("server-only", () => ({}));
let receiptToken;
mock.module("next/headers", () => ({ cookies: async () => ({ get: () => receiptToken ? { value: receiptToken } : undefined }) }));
const { amountToMinorUnits } = await import("../src/lib/payments/schema.ts");
const { createPaymentSessionToken, readPaymentSessionToken } = await import("../src/lib/payments/session.ts");
const { createGenieTransaction, getGenieTransaction, transactionMatchesSession } = await import("../src/lib/payments/genie.ts");
const { createPaymentReceiptPdf } = await import("../src/lib/payments/receipt.ts");
const { POST } = await import("../src/app/api/payments/create/route.ts");
const { GET: receiptRequest } = await import("../src/app/api/payments/receipt/route.ts");
const { POST: paymentWebhook } = await import("../src/app/api/payments/webhook/route.ts");

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
let calls;
beforeEach(() => {
  process.env.PAYMENT_SESSION_SECRET = "test-session-secret-that-is-at-least-32-characters";
  process.env.GENIE_APP_KEY = "test-only-provider-key";
  process.env.GENIE_APPLICATION_ID = "test-only-application";
  process.env.RESEND_API_KEY = "re_test_only";
  process.env.PROPOSAL_FROM_EMAIL = "Codezela Technologies <notifications@email.codezela.com>";
  process.env.GENIE_API_BASE_URL = "https://api.geniebiz.lk";
  process.env.TURNSTILE_SECRET_KEY = "test-only-turnstile-key";
  calls = [];
  receiptToken = undefined;
  globalThis.fetch = mock(async (...args) => {
    calls.push(args);
    throw new Error("Unexpected provider call in test");
  });
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of ["PAYMENT_SESSION_SECRET", "GENIE_APP_KEY", "GENIE_APPLICATION_ID", "GENIE_API_BASE_URL", "TURNSTILE_SECRET_KEY", "NODE_ENV", "RESEND_API_KEY", "PROPOSAL_FROM_EMAIL"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

const session = () => ({
  transactionId: "0123456789abcdef01234567",
  localId: "CZ-test-transaction",
  invoiceReference: "CZ-INV-1024",
  amount: 125050,
  checkoutUrl: "https://transaction.geniebiz.lk/test",
  issuedAt: Date.now(),
  expiresAt: Date.now() + 60_000,
});
const submission = () => ({
  invoiceReference: "CZ-INV-1024", amount: "1250.50", turnstileToken: "test-token-long-enough-for-validation",
  submissionId: crypto.randomUUID(), startedAt: Date.now() - 5000, botField: "",
});
const request = (body = submission(), headers = {}) => new Request("https://codezela.com/api/payments/create", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://codezela.com", ...headers },
  body: JSON.stringify(body),
});

test("amount parsing preserves cents and rejects ambiguous or out-of-range amounts", () => {
  for (const [input, expected] of [["1", 100], ["1.01", 101], ["1250.50", 125050], ["99999999.99", 9999999999]]) {
    expect(amountToMinorUnits(input)).toBe(expected);
  }
  for (const input of ["0", "0.99", "-100", "1e3", "1.001", "1.2.3", "100000000", "1,250.50", "", " 10 "]) {
    expect(amountToMinorUnits(input)).toBeNull();
  }
});

test("payment sessions reject tampering, expiry and missing signing configuration", () => {
  const data = session();
  const token = createPaymentSessionToken(data);
  expect(readPaymentSessionToken(token)).toEqual(data);
  const [payload, signature] = token.split(".");
  const altered = { ...JSON.parse(Buffer.from(payload, "base64url")), amount: 100 };
  expect(readPaymentSessionToken(`${Buffer.from(JSON.stringify(altered)).toString("base64url")}.${signature}`)).toBeNull();
  expect(readPaymentSessionToken(createPaymentSessionToken({ ...data, expiresAt: Date.now() - 1 }))).toBeNull();
  delete process.env.PAYMENT_SESSION_SECRET;
  expect(createPaymentSessionToken(data)).toBeNull();
  expect(readPaymentSessionToken(token)).toBeNull();
});

test("API rejects cross-site, oversized chunked and malformed requests before provider access", async () => {
  expect((await POST(request(submission(), { Origin: "https://example.org" }))).status).toBe(403);
  expect((await POST(request(submission(), { "Content-Type": "text/plain" }))).status).toBe(415);
  expect((await POST(request({ padding: "x".repeat(8001) }))).status).toBe(413);
  expect((await POST(request({ ...submission(), amount: "-100" }))).status).toBe(422);
  delete process.env.PAYMENT_SESSION_SECRET;
  expect((await POST(request())).status).toBe(503);
  expect(calls).toHaveLength(0);
});

test("rejected Turnstile never creates a Genie checkout", async () => {
  globalThis.fetch = mock(async (url) => {
    calls.push(url);
    return Response.json({ success: false, "error-codes": ["timeout-or-duplicate"] });
  });
  expect((await POST(request())).status).toBe(403);
  expect(calls).toEqual(["https://challenges.cloudflare.com/turnstile/v0/siteverify"]);
});

test("Cloudflare dummy responses cannot bypass production verification", async () => {
  process.env.NODE_ENV = "production";
  process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
  globalThis.fetch = mock(async (url) => {
    calls.push(url);
    return Response.json({ success: true, hostname: "example.com", metadata: { result_with_testing_key: true } });
  });
  expect((await POST(request())).status).toBe(403);
  expect(calls).toHaveLength(1);
});

test("checkout uses exact cents and creates a signed private cookie only after provider matching", async () => {
  let providerBody;
  globalThis.fetch = mock(async (url, init) => {
    calls.push(url);
    if (String(url).includes("siteverify")) return Response.json({ success: true, action: "payment_submit", hostname: "codezela.com" });
    providerBody = JSON.parse(init.body);
    return Response.json({ ...providerBody, id: session().transactionId, state: "INITIATED", url: session().checkoutUrl, shortUrl: null, provider: null, updatedAt: null });
  });
  const response = await POST(request());
  expect(response.status).toBe(200);
  expect(providerBody.amount).toBe(125050);
  expect(providerBody.currency).toBe("LKR");
  expect(providerBody.redirectUrl).toBe("https://codezela.com/payment/result");
  const cookie = response.headers.get("set-cookie");
  expect(cookie).toContain("HttpOnly");
  expect(cookie).toContain("Secure");
  expect(cookie.toLowerCase()).toContain("samesite=lax");
  const token = cookie.split(";")[0].split("=").slice(1).join("=");
  expect(readPaymentSessionToken(token).amount).toBe(125050);
  expect(response.headers.get("cache-control")).toContain("no-store");
  expect(response.headers.get("x-robots-tag")).toContain("noindex");
});

test("provider integration rejects checkout redirects outside Genie and mismatched verification", async () => {
  const data = session();
  const transaction = { ...data, id: data.transactionId, state: "CONFIRMED", currency: "LKR", customerReference: data.invoiceReference, url: "https://example.org/pay" };
  globalThis.fetch = mock(async () => Response.json(transaction));
  await expect(createGenieTransaction({ amount: data.amount, invoiceReference: data.invoiceReference, localId: data.localId, returnUrl: "https://codezela.com/payment/result" })).rejects.toThrow();
  const result = await getGenieTransaction(data.transactionId);
  expect(transactionMatchesSession(result, data)).toBe(true);
  for (const altered of [{ amount: 100 }, { currency: "USD" }, { id: "wrong-id" }, { localId: "wrong-local" }, { customerReference: "wrong-invoice" }]) {
    expect(transactionMatchesSession({ ...result, ...altered }, data)).toBe(false);
  }
});

test("receipt stays a valid single-page PDF for maximum-length references", async () => {
  const data = { ...session(), invoiceReference: "I".repeat(64), transactionId: "T".repeat(100) };
  const bytes = await createPaymentReceiptPdf({ id: data.transactionId, amount: data.amount, currency: "LKR", state: "CONFIRMED", updatedAt: null, providerDisplayName: "Provider".repeat(15) }, data);
  const document = await PDFDocument.load(bytes);
  expect(document.getPageCount()).toBe(1);
  expect(document.getTitle()).toBe(`Payment receipt ${data.invoiceReference}`);
});

test("receipt endpoint requires a matching freshly confirmed provider transaction", async () => {
  expect((await receiptRequest()).status).toBe(401);
  const data = session();
  receiptToken = createPaymentSessionToken(data);
  let transaction = { id: data.transactionId, amount: data.amount, localId: data.localId, customerReference: data.invoiceReference, currency: "LKR", state: "INITIATED" };
  globalThis.fetch = mock(async () => Response.json(transaction));
  for (const state of ["INITIATED", "QR_CODE_GENERATED", "AUTHORIZED", "FAILED", "CANCELLED", "REFUNDED", "VOIDED"]) {
    transaction.state = state;
    expect((await receiptRequest()).status).toBe(409);
  }
  transaction.state = "CONFIRMED";
  transaction.amount = 100;
  expect((await receiptRequest()).status).toBe(409);
  transaction.amount = data.amount;
  const receipt = await receiptRequest();
  expect(receipt.status).toBe(200);
  expect(receipt.headers.get("content-type")).toBe("application/pdf");
  expect(receipt.headers.get("cache-control")).toContain("no-store");
  expect((await PDFDocument.load(await receipt.arrayBuffer())).getPageCount()).toBe(1);
  globalThis.fetch = mock(async () => { throw new Error("Provider unavailable"); });
  const unavailable = await receiptRequest();
  expect(unavailable.status).toBe(502);
  expect(await unavailable.text()).not.toContain("Provider unavailable");
});

test("signed payment webhook confirms with Genie and sends the exact internal recipients", async () => {
  const data = { ...session(), localId: `CZ-${crypto.randomUUID()}` };
  const transaction = { id: data.transactionId, amount: data.amount, currency: "LKR", state: "CONFIRMED", localId: data.localId, customerReference: data.invoiceReference, originatorApp: process.env.GENIE_APPLICATION_ID };
  const event = { ...transaction, transactionId: transaction.id, eventType: "NOTIFY_TRANSACTION_CHANGE", updatedKeys: ["state"] };
  const nonce = crypto.randomUUID();
  const timestamp = String(Date.now());
  const signature = createHash("sha256").update(`${nonce}${timestamp}${process.env.GENIE_APP_KEY}`).digest("hex");
  const webhookRequest = (body = event, signatureValue = signature) => new Request("https://codezela.com/api/payments/webhook", {
    method: "POST", headers: { "Content-Type": "application/json", "X-Signature-Nonce": nonce, "X-Signature-Timestamp": timestamp, "X-Signature": signatureValue }, body: JSON.stringify(body),
  });
  expect((await paymentWebhook(webhookRequest(event, "0".repeat(64)))).status).toBe(401);
  expect(calls).toHaveLength(0);
  const emails = [];
  globalThis.fetch = mock(async (url, init) => {
    if (String(url).startsWith("https://api.resend.com/")) {
      emails.push({ body: JSON.parse(init.body), headers: new Headers(init.headers) });
      return Response.json({ id: "test-email-id" });
    }
    return Response.json(transaction);
  });
  expect((await paymentWebhook(webhookRequest({ ...event, state: "FAILED" }))).status).toBe(200);
  expect(emails).toHaveLength(0);
  expect((await paymentWebhook(webhookRequest({ ...event, amount: 100 }))).status).toBe(409);
  expect(emails).toHaveLength(0);
  expect((await paymentWebhook(webhookRequest())).status).toBe(200);
  expect((await paymentWebhook(webhookRequest())).status).toBe(200);
  expect(emails[0].body.to).toEqual(["info@codezela.com"]);
  expect(emails[0].body.cc).toEqual(["sayuru@codezela.com"]);
  expect(emails[0].body.reply_to).toBe("info@codezela.com");
  expect(emails[0].body.subject).toContain("LKR 1250.50");
  expect(emails[0].headers.get("idempotency-key")).toBe(`payment-confirmed/${data.transactionId}`);
  expect(emails[1].headers.get("idempotency-key")).toBe(emails[0].headers.get("idempotency-key"));
  expect(emails[1].body).toEqual(emails[0].body);
});
