import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, Download, ExternalLink, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { getGenieTransaction, transactionMatchesSession, type GenieTransaction } from "@/lib/payments/genie";
import { PAYMENT_SESSION_COOKIE, readPaymentSessionToken, type PaymentSession } from "@/lib/payments/session";

export const metadata: Metadata = {
  title: "Payment Status - Codezela Technologies",
  description: "Verify the status of a Codezela invoice payment.",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
  referrer: "strict-origin-when-cross-origin",
};

type Result =
  | { kind: "missing" }
  | { kind: "unavailable"; session: PaymentSession }
  | { kind: "mismatch" }
  | { kind: "transaction"; session: PaymentSession; transaction: GenieTransaction };

async function paymentResult(): Promise<Result> {
  const cookieStore = await cookies();
  const session = readPaymentSessionToken(cookieStore.get(PAYMENT_SESSION_COOKIE)?.value);
  if (!session) return { kind: "missing" };

  try {
    const transaction = await getGenieTransaction(session.transactionId);
    if (!transactionMatchesSession(transaction, session)) return { kind: "mismatch" };
    return { kind: "transaction", session, transaction };
  } catch {
    return { kind: "unavailable", session };
  }
}

export default async function PaymentResultPage() {
  const result = await paymentResult();

  return (
    <>
      <a className="skip-link" href="#payment-result">Skip to payment status</a>
      <Header />
      <main id="payment-result" className="bg-[linear-gradient(180deg,#fff_0%,#fff8ff_100%)]">
        <section className="site-shell flex min-h-[620px] items-center justify-center pb-[110px] pt-[70px] min-[1025px]:pb-[150px] min-[1025px]:pt-[90px]">
          <ResultCard result={result} />
        </section>
      </main>
      <Footer />
    </>
  );
}

function ResultCard({ result }: { result: Result }) {
  if (result.kind === "missing") {
    return (
      <StatusShell icon={<AlertCircle size={34} aria-hidden="true" />} tone="neutral" title="No payment session found">
        <p>This private status page needs the same browser session that started the payment.</p>
        <Link href="/payment" className="payment-result-button mt-7">
          <ArrowLeft size={19} aria-hidden="true" /> Return to payment page
        </Link>
      </StatusShell>
    );
  }

  if (result.kind === "mismatch") {
    return (
      <StatusShell icon={<AlertCircle size={34} aria-hidden="true" />} tone="danger" title="We could not verify this payment">
        <p>The transaction details did not match the invoice session, so no payment confirmation or receipt has been issued. Contact info@codezela.com for help.</p>
      </StatusShell>
    );
  }

  if (result.kind === "unavailable") {
    return (
      <StatusShell icon={<RefreshCw size={32} aria-hidden="true" />} tone="neutral" title="Payment status is not available yet">
        <p>We could not reach Genie to verify the final status. This does not mean the payment failed. Wait a moment and check again.</p>
        <div className="mt-7 flex flex-col gap-3 min-[520px]:flex-row">
          <a href="/payment/result" className="payment-result-button"><RefreshCw size={18} aria-hidden="true" /> Check again</a>
          <a href={result.session.checkoutUrl} target="_blank" rel="noreferrer" className="payment-result-button payment-result-button--secondary">
            Open Genie <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </StatusShell>
    );
  }

  const { transaction, session } = result;
  const amount = `LKR ${(transaction.amount / 100).toFixed(2)}`;

  if (transaction.state === "CONFIRMED") {
    return (
      <StatusShell icon={<CheckCircle2 size={36} aria-hidden="true" />} tone="success" title="Payment confirmed">
        <p>Payment received. Your receipt is ready to download.</p>
        <TransactionSummary amount={amount} invoice={session.invoiceReference} transactionId={transaction.id} />
        <a href="/api/payments/receipt" className="payment-result-button mt-7">
          <Download size={19} aria-hidden="true" /> Download PDF receipt
        </a>
      </StatusShell>
    );
  }

  if (transaction.state === "INITIATED" || transaction.state === "QR_CODE_GENERATED") {
    return (
      <StatusShell icon={<Clock3 size={34} aria-hidden="true" />} tone="neutral" title="Payment is still pending">
        <p>Your payment is awaiting confirmation. Check again in a moment.</p>
        <TransactionSummary amount={amount} invoice={session.invoiceReference} transactionId={transaction.id} />
        <div className="mt-7 flex flex-col gap-3 min-[520px]:flex-row">
          <a href="/payment/result" className="payment-result-button"><RefreshCw size={18} aria-hidden="true" /> Check again</a>
          <a href={session.checkoutUrl} target="_blank" rel="noreferrer" className="payment-result-button payment-result-button--secondary">
            Continue on Genie <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </StatusShell>
    );
  }

  const copy = transaction.state === "AUTHORIZED"
    ? "The payment is authorized but not confirmed as paid. Contact Codezela before taking further action."
    : transaction.state === "REFUNDED" || transaction.state === "REFUND_REQUESTED" || transaction.state === "VOIDED"
      ? "This transaction is no longer a completed payment. Contact Codezela if you need clarification."
      : "Genie did not confirm this payment. Check the invoice details before starting a new payment.";

  return (
    <StatusShell icon={<AlertCircle size={34} aria-hidden="true" />} tone="danger" title="Payment not confirmed">
      <p>{copy}</p>
      <TransactionSummary amount={amount} invoice={session.invoiceReference} transactionId={transaction.id} />
      <Link href="/payment" className="payment-result-button mt-7"><ArrowLeft size={19} aria-hidden="true" /> Return to payment page</Link>
    </StatusShell>
  );
}

function StatusShell({
  icon,
  tone,
  title,
  children,
}: {
  icon: ReactNode;
  tone: "success" | "danger" | "neutral";
  title: string;
  children: ReactNode;
}) {
  const toneClasses = tone === "success" ? "bg-emerald-50 text-emerald-700" : tone === "danger" ? "bg-red-50 text-red-700" : "bg-codezela-offwhite text-codezela-purple";
  return (
    <div className="w-full max-w-[720px] rounded-[30px] border border-codezela-purple/15 bg-white p-7 text-center shadow-[0_24px_70px_rgba(80,8,136,0.11)] min-[600px]:p-12">
      <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${toneClasses}`}>{icon}</span>
      <h1 className="mt-6 font-display text-[34px] font-semibold leading-tight text-codezela-title min-[600px]:text-[44px]">{title}</h1>
      <div className="mx-auto mt-4 max-w-[560px] text-[16px] leading-7 text-codezela-copy">{children}</div>
    </div>
  );
}

function TransactionSummary({ amount, invoice, transactionId }: { amount: string; invoice: string; transactionId: string }) {
  return (
    <dl className="mt-7 overflow-hidden rounded-[16px] border border-codezela-purple/12 bg-[#fffaff] text-left">
      {[["Amount", amount], ["Invoice", invoice], ["Transaction", transactionId]].map(([label, value], index) => (
        <div key={label} className={`grid gap-1 px-5 py-4 min-[520px]:grid-cols-[130px_1fr] ${index ? "border-t border-codezela-purple/10" : ""}`}>
          <dt className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-[#766f78]">{label}</dt>
          <dd className="break-all font-display text-[15px] font-semibold text-[#302b31] min-[520px]:text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
