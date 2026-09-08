import "server-only";

import { z } from "zod";

const transactionStateSchema = z.enum([
  "INITIATED",
  "QR_CODE_GENERATED",
  "CONFIRMED",
  "VOIDED",
  "FAILED",
  "CANCELLED",
  "REFUND_REQUESTED",
  "REFUNDED",
  "AUTHORIZED",
]);

const genieTransactionSchema = z.object({
  id: z.string().min(1).max(100),
  amount: z.number().int().nonnegative(),
  currency: z.string().length(3),
  state: transactionStateSchema,
  url: z.string().url().nullish(),
  shortUrl: z.string().url().nullish(),
  localId: z.string().nullable().optional(),
  customerReference: z.string().nullable().optional(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
  amountFormatted: z.string().nullish(),
  provider: z.string().nullable().optional(),
  providerDisplayName: z.string().nullable().optional(),
  originatorApp: z.union([z.string(), z.object({ id: z.string().optional(), _id: z.string().optional() })]).nullish(),
});

export type GenieTransaction = z.infer<typeof genieTransactionSchema>;

const ALLOWED_API_ORIGINS = new Set(["https://api.geniebiz.lk", "https://api.uat.geniebiz.lk"]);
const REQUEST_TIMEOUT_MS = 12_000;

export class GenieProviderError extends Error {
  constructor() {
    super("The payment provider request could not be completed.");
    this.name = "GenieProviderError";
  }
}

function configuration() {
  const configuredBase = (process.env.GENIE_API_BASE_URL || "https://api.geniebiz.lk").replace(/\/$/, "");
  const appKey = process.env.GENIE_APP_KEY?.trim();

  if (!ALLOWED_API_ORIGINS.has(configuredBase) || !appKey) {
    throw new GenieProviderError();
  }

  return { baseUrl: configuredBase, appKey };
}

async function requestGenie(path: string, init: RequestInit) {
  const { baseUrl, appKey } = configuration();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: appKey,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Genie request failed", { status: response.status });
      throw new GenieProviderError();
    }

    const parsed = genieTransactionSchema.safeParse(await response.json());
    if (!parsed.success) {
      console.error("Genie response validation failed", { fields: parsed.error.issues.map((issue) => issue.path.join(".")) });
      throw new GenieProviderError();
    }
    return parsed.data;
  } catch (error) {
    if (error instanceof GenieProviderError) throw error;
    throw new GenieProviderError();
  } finally {
    clearTimeout(timeout);
  }
}

export async function createGenieTransaction(input: {
  amount: number;
  invoiceReference: string;
  localId: string;
  returnUrl: string;
}) {
  const transaction = await requestGenie("/public/v2/transactions", {
    method: "POST",
    body: JSON.stringify({
      amount: input.amount,
      currency: "LKR",
      redirectUrl: input.returnUrl,
      paymentAttemptFailureUrl: `${input.returnUrl}?attempt=failed`,
      localId: input.localId,
      customerReference: input.invoiceReference,
      sendCustomerEmailReceipt: true,
      webhook: "https://codezela.com/api/payments/webhook",
    }),
  });

  const checkoutUrl = transaction.url || transaction.shortUrl;
  if (!checkoutUrl || !isAllowedCheckoutUrl(checkoutUrl)) throw new GenieProviderError();

  return { transaction, checkoutUrl };
}

export function getGenieTransaction(transactionId: string) {
  if (!/^[A-Za-z0-9-]{8,100}$/.test(transactionId)) throw new GenieProviderError();
  return requestGenie(`/public/transactions/${encodeURIComponent(transactionId)}`, { method: "GET" });
}

export function isAllowedCheckoutUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "geniebiz.lk" || url.hostname.endsWith(".geniebiz.lk"));
  } catch {
    return false;
  }
}

export function transactionMatchesSession(
  transaction: GenieTransaction,
  session: { amount: number; invoiceReference: string; localId: string; transactionId: string },
) {
  return (
    transaction.id === session.transactionId &&
    transaction.amount === session.amount &&
    transaction.currency === "LKR" &&
    transaction.localId === session.localId &&
    transaction.customerReference === session.invoiceReference
  );
}
