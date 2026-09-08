import "server-only";

import { Resend } from "resend";
import type { GenieTransaction } from "@/lib/payments/genie";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function paymentNotificationContent(transaction: GenieTransaction) {
  const amount = `LKR ${(transaction.amount / 100).toFixed(2)}`;
  const invoice = transaction.customerReference || "Not provided";
  const rows = [
    ["Invoice reference", invoice],
    ["Amount paid", amount],
    ["Status", "Confirmed by Genie Business"],
    ["Transaction ID", transaction.id],
    ["Payment reference", transaction.localId || "Not provided"],
  ];
  return {
    subject: `Payment received: ${invoice} | ${amount}`,
    text: `Codezela Technologies\nPayment received\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMatch this payment to the issued invoice in your accounts.\nView in Genie Business: https://dashboard.geniebiz.lk/`,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#f5f5f7;color:#252126;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:auto;background:#ffffff;border:1px solid #e8e4eb;border-radius:12px"><tr><td style="padding:32px"><p style="margin:0 0 28px;font-size:16px;font-weight:700;color:#500888">Codezela Technologies</p><h1 style="margin:0 0 12px;font-size:26px;line-height:1.2">Payment received</h1><p style="margin:0 0 28px;color:#625b65;font-size:15px;line-height:1.6">Genie Business has confirmed the following invoice payment.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows.map(([label, value]) => `<tr><td style="padding:13px 0;border-bottom:1px solid #ece8ef;color:#625b65;font-size:14px;vertical-align:top;width:38%">${escapeHtml(label)}</td><td style="padding:13px 0 13px 12px;border-bottom:1px solid #ece8ef;font-size:14px;font-weight:600;word-break:break-word">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="margin:24px 0;font-size:14px;line-height:1.6;color:#625b65">Match this payment to the issued invoice in your accounts.</p><a href="https://dashboard.geniebiz.lk/" target="_blank" rel="noreferrer" style="display:inline-block;background:#500888;color:#ffffff;padding:14px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Open Genie Business</a><p style="margin:28px 0 0;font-size:12px;color:#817985;line-height:1.5">Codezela Technologies payment notification</p></td></tr></table></td></tr></table></body></html>`,
  };
}

export async function sendPaymentNotification(transaction: GenieTransaction) {
  if (transaction.state !== "CONFIRMED" || transaction.currency !== "LKR") throw new Error("Payment is not confirmed");
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROPOSAL_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Payment email configuration missing");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: ["info@codezela.com"],
    cc: ["sayuru@codezela.com"],
    replyTo: "info@codezela.com",
    ...paymentNotificationContent(transaction),
    tags: [{ name: "category", value: "payment_confirmed" }, { name: "transaction", value: transaction.id }],
  }, { idempotencyKey: `payment-confirmed/${transaction.id}` });
  if (result.error || !result.data?.id) {
    console.error("Payment email provider rejected delivery", { code: result.error?.name ?? "missing_email_id" });
    throw new Error("Payment notification delivery failed");
  }
  console.info("Payment email accepted", { transactionId: transaction.id, emailId: result.data.id });
}
