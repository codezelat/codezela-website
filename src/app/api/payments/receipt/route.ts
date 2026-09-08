import { cookies } from "next/headers";

import { createPaymentReceiptPdf } from "@/lib/payments/receipt";
import { getGenieTransaction, transactionMatchesSession } from "@/lib/payments/genie";
import { PAYMENT_SESSION_COOKIE, readPaymentSessionToken } from "@/lib/payments/session";

export const runtime = "nodejs";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function errorResponse(message: string, status: number) {
  return Response.json({ ok: false, message }, { status, headers: PRIVATE_HEADERS });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = readPaymentSessionToken(cookieStore.get(PAYMENT_SESSION_COOKIE)?.value);
  if (!session) return errorResponse("This receipt session is missing or expired.", 401);

  try {
    const transaction = await getGenieTransaction(session.transactionId);
    if (!transactionMatchesSession(transaction, session)) {
      return errorResponse("The receipt details could not be verified.", 409);
    }
    if (transaction.state !== "CONFIRMED") {
      return errorResponse("A receipt is available only after Genie confirms the payment.", 409);
    }

    const pdf = await createPaymentReceiptPdf(transaction, session);
    const safeInvoice = session.invoiceReference.replace(/[^A-Z0-9_-]+/g, "-").slice(0, 64);
    return new Response(Buffer.from(pdf), {
      status: 200,
      headers: {
        ...PRIVATE_HEADERS,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Codezela-Receipt-${safeInvoice}.pdf"`,
        "Content-Length": String(pdf.length),
      },
    });
  } catch {
    return errorResponse("The verified receipt could not be generated right now. Please retry in a moment.", 502);
  }
}
