import "server-only";

import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import type { GenieTransaction } from "@/lib/payments/genie";
import type { PaymentSession } from "@/lib/payments/session";

const purple = rgb(0.31, 0.03, 0.53);
const pink = rgb(0.69, 0, 0.83);
const ink = rgb(0.1, 0.1, 0.1);
const muted = rgb(0.4, 0.4, 0.4);
const line = rgb(0.88, 0.84, 0.9);

function safeText(value: string | null | undefined, fallback: string) {
  const clean = value?.replace(/[^\x20-\x7E]/g, "").trim();
  return clean ? clean.slice(0, 120) : fallback;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Confirmed by Genie Business";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Confirmed by Genie Business";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Colombo",
  }).format(date);
}

function wrapText(value: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  let current = "";
  for (const character of value) {
    if (current && font.widthOfTextAtSize(current + character, size) > maxWidth) {
      lines.push(current);
      current = "";
    }
    current += character;
  }
  if (current) lines.push(current);
  return lines;
}

export async function createPaymentReceiptPdf(transaction: GenieTransaction, session: PaymentSession) {
  const document = await PDFDocument.create();
  document.setTitle(`Payment receipt ${session.invoiceReference}`);
  document.setAuthor("Codezela Technologies");
  document.setCreator("Codezela Technologies");
  document.setSubject("Confirmed Genie Business payment receipt");

  const page = document.addPage([595.28, 841.89]);
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const width = page.getWidth();
  const left = 54;
  const right = width - 54;

  page.drawRectangle({ x: 0, y: 760, width, height: 82, color: purple });
  page.drawRectangle({ x: 0, y: 754, width, height: 6, color: pink });
  page.drawText("CODEZELA", { x: left, y: 794, size: 22, font: bold, color: rgb(1, 1, 1) });
  page.drawText("TECHNOLOGIES", { x: left, y: 779, size: 8, font: regular, color: rgb(0.92, 0.86, 0.95) });
  page.drawText("PAYMENT RECEIPT", { x: right - 151, y: 786, size: 15, font: bold, color: rgb(1, 1, 1) });

  page.drawText("Payment confirmed", { x: left, y: 704, size: 27, font: bold, color: purple });
  page.drawText("Genie Business reports this transaction as CONFIRMED.", {
    x: left,
    y: 679,
    size: 10.5,
    font: regular,
    color: muted,
  });

  page.drawRectangle({ x: left, y: 593, width: right - left, height: 62, color: rgb(0.98, 0.96, 0.99) });
  page.drawText("AMOUNT PAID", { x: left + 18, y: 631, size: 9, font: bold, color: muted });
  page.drawText(`LKR ${(transaction.amount / 100).toFixed(2)}`, {
    x: left + 18,
    y: 605,
    size: 22,
    font: bold,
    color: purple,
  });

  const rows = [
    ["Invoice reference", session.invoiceReference],
    ["Genie transaction", transaction.id],
    ["Payment provider", safeText(transaction.providerDisplayName || transaction.provider, "Genie Business")],
    ["Last updated (Sri Lanka)", formatDate(transaction.updatedAt)],
    ["Currency", "LKR"],
  ] as const;

  let y = 547;
  for (const [label, value] of rows) {
    page.drawText(label, { x: left, y, size: 10, font: regular, color: muted });
    const displayValue = safeText(value, "Not provided");
    const lines = wrapText(displayValue, bold, 10.5, right - left - 180);
    lines.forEach((text, index) => {
      page.drawText(text, {
        x: right - bold.widthOfTextAtSize(text, 10.5),
        y: y - index * 13,
        size: 10.5,
        font: bold,
        color: ink,
      });
    });
    const rowHeight = Math.max(48, lines.length * 13 + 24);
    page.drawLine({ start: { x: left, y: y - rowHeight + 20 }, end: { x: right, y: y - rowHeight + 20 }, thickness: 0.75, color: line });
    y -= rowHeight;
  }

  const issuerY = Math.min(273, y - 10);
  page.drawText("Issued by", { x: left, y: issuerY, size: 9, font: bold, color: muted });
  page.drawText("Codezela Technologies", { x: left, y: issuerY - 22, size: 13, font: bold, color: ink });
  page.drawText("info@codezela.com  |  codezela.com", { x: left, y: issuerY - 41, size: 9.5, font: regular, color: muted });

  page.drawText("Keep this receipt with the original Codezela invoice.", {
    x: left,
    y: 137,
    size: 9.5,
    font: regular,
    color: muted,
  });
  page.drawText("This payment receipt is not a tax invoice.", {
    x: left,
    y: 120,
    size: 9.5,
    font: regular,
    color: muted,
  });
  wrapText(`Receipt reference: CZR-${transaction.id.toUpperCase()}`, regular, 8.5, right - left).forEach((text, index) => {
    page.drawText(text, {
      x: left,
      y: 74 - index * 12,
      size: 8.5,
      font: regular,
      color: muted,
    });
  });

  return document.save();
}
