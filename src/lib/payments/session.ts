import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const PAYMENT_SESSION_COOKIE = "codezela_payment_session";
export const PAYMENT_SESSION_MAX_AGE = 7 * 24 * 60 * 60;

const paymentSessionSchema = z.object({
  transactionId: z.string().min(8).max(100),
  localId: z.string().min(8).max(100),
  invoiceReference: z.string().min(3).max(64),
  amount: z.number().int().positive(),
  checkoutUrl: z.string().url(),
  issuedAt: z.number().int().positive(),
  expiresAt: z.number().int().positive(),
});

export type PaymentSession = z.infer<typeof paymentSessionSchema>;

function sessionSecret() {
  const secret = process.env.PAYMENT_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function paymentSessionIsConfigured() {
  return sessionSecret() !== null;
}

function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createPaymentSessionToken(session: PaymentSession) {
  const secret = sessionSecret();
  if (!secret) return null;

  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
}

export function readPaymentSessionToken(token: string | undefined) {
  const secret = sessionSecret();
  if (!secret || !token) return null;

  const separator = token.lastIndexOf(".");
  if (separator < 1) return null;

  const payload = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  const expectedSignature = signature(payload, secret);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);

  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  try {
    const parsed = paymentSessionSchema.safeParse(JSON.parse(Buffer.from(payload, "base64url").toString("utf8")));
    if (!parsed.success || parsed.data.expiresAt < Date.now()) return null;
    return parsed.data;
  } catch {
    return null;
  }
}
