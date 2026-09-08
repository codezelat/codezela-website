import { z } from "zod";

const invoiceReference = z
  .string()
  .trim()
  .min(3)
  .max(64)
  .regex(/^[A-Za-z0-9][A-Za-z0-9 ._/#-]*[A-Za-z0-9]$/)
  .transform((value) => value.toUpperCase());

const amount = z
  .string()
  .trim()
  .regex(/^\d{1,8}(?:\.\d{1,2})?$/);

export const paymentSubmissionSchema = z
  .object({
    amount,
    invoiceReference,
    turnstileToken: z.string().trim().min(20).max(4_000),
    submissionId: z.string().uuid(),
    startedAt: z.number().int().positive(),
    botField: z.string().max(200).default(""),
  })
  .strict();

export type PaymentSubmission = z.infer<typeof paymentSubmissionSchema>;

export function amountToMinorUnits(value: string) {
  if (!/^\d{1,8}(?:\.\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ""] = value.split(".");
  const minorUnits = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

  if (!Number.isSafeInteger(minorUnits) || minorUnits < 100 || minorUnits > 9_999_999_999) {
    return null;
  }

  return minorUnits;
}
