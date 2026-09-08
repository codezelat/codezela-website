import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { getGenieTransaction } from "@/lib/payments/genie";
import { sendPaymentNotification } from "@/lib/payments/notification";

export const runtime = "nodejs";
export const maxDuration = 30;

const transactionEventSchema = z.object({
  transactionId: z.string().regex(/^[A-Za-z0-9-]{8,100}$/),
  state: z.string(),
  amount: z.number().int().nonnegative(),
  currency: z.string(),
  localId: z.string().nullish(),
  customerReference: z.string().nullish(),
  updatedKeys: z.array(z.string()).optional(),
});
// Genie sends transaction-level notifications in an event envelope. Retain
// compatibility with its legacy flat payload, while verifying both through the API.
const eventSchema = z.union([
  z.object({ eventType: z.literal("NOTIFY_TRANSACTION_CHANGE"), data: transactionEventSchema })
    .transform((event) => event.data),
  transactionEventSchema.extend({ eventType: z.literal("NOTIFY_TRANSACTION_CHANGE") }),
]);
const privateHeaders = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" };
const respond = (status: number) => Response.json({ received: status === 200 }, { status, headers: privateHeaders });

function validSignature(headers: Headers, apiKey: string) {
  const nonce = headers.get("x-signature-nonce") || "";
  const timestamp = headers.get("x-signature-timestamp") || "";
  const signature = headers.get("x-signature") || "";
  if (!nonce || nonce.length > 200 || !timestamp || timestamp.length > 100 || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHash("sha256").update(`${nonce}${timestamp}${apiKey}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

export async function POST(request: Request) {
  const apiKey = process.env.GENIE_APP_KEY;
  const applicationId = process.env.GENIE_APPLICATION_ID;
  if (!apiKey || !applicationId) {
    console.error("Payment webhook configuration missing");
    return respond(503);
  }
  if (!validSignature(request.headers, apiKey)) {
    console.warn("Payment webhook signature rejected");
    return respond(401);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return respond(415);
  if (Number(request.headers.get("content-length") || 0) > 32_000) return respond(413);

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond(400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32_000) { await reader.cancel(); return respond(413); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return respond(400); }

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    console.warn("Payment webhook payload rejected");
    return respond(400);
  }
  const event = parsed.data;
  if (event.state !== "CONFIRMED") return respond(200);

  try {
    const transaction = await getGenieTransaction(event.transactionId);
    const appId = typeof transaction.originatorApp === "string"
      ? transaction.originatorApp
      : transaction.originatorApp?.id || transaction.originatorApp?._id;
    if (appId !== applicationId || !/^CZ-[a-f0-9-]{36}$/i.test(transaction.localId || "")) return respond(409);
    if (transaction.state !== "CONFIRMED") return respond(200);
    if (
      transaction.currency !== "LKR" || transaction.currency !== event.currency ||
      transaction.id !== event.transactionId || transaction.amount !== event.amount ||
      (event.localId != null && transaction.localId !== event.localId) ||
      !transaction.customerReference ||
      (event.customerReference != null && transaction.customerReference !== event.customerReference)
    ) return respond(409);

    await sendPaymentNotification(transaction);
    return respond(200);
  } catch {
    console.error("Payment webhook could not complete verification or email delivery");
    return respond(503);
  }
}
