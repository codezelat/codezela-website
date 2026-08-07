import { z } from "zod";

const optionalText = (maximum: number) => z.string().trim().max(maximum).optional().default("");

export const proposalSubmissionSchema = z.object({
  submissionId: z.uuid(),
  startedAt: z.number().int().positive(),
  botField: optionalText(200),
  turnstileToken: z.string().trim().min(1).max(2048),
  fullName: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: optionalText(40),
  company: z.string().trim().min(2).max(160),
  industry: z.string().trim().min(2).max(140),
  website: optionalText(320).refine(
    (value) => !value || /^https?:\/\/[^\s]+$/i.test(value),
    "Website must begin with http:// or https://.",
  ),
  services: z.array(z.string().trim().min(1).max(100)).max(12),
  goals: z.array(z.string().trim().min(1).max(120)).max(15),
  budget: z.string().trim().min(1).max(60),
  timeline: z.string().trim().min(1).max(60),
  description: optionalText(5000),
  clientContext: z.object({
    timezone: optionalText(100),
    locale: optionalText(40),
    viewport: optionalText(30),
    screen: optionalText(30),
    pixelRatio: z.number().min(0.5).max(10).optional(),
    colorScheme: z.enum(["light", "dark", "unknown"]).optional(),
    touchPoints: z.number().int().min(0).max(100).optional(),
    connection: optionalText(30),
  }).optional(),
});

export type ProposalSubmission = z.infer<typeof proposalSubmissionSchema>;
