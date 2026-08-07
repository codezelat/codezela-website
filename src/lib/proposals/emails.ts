import type { ProposalSubmission } from "@/lib/proposals/schema";

export type ProposalRequestContext = {
  submittedAt: Date;
  submittedAtColombo: string;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  operatingSystem: string;
  userAgent: string;
  language: string;
  sourcePage: string;
};

const socials = [
  ["Website", "https://codezela.com/"],
  ["LinkedIn", "https://www.linkedin.com/company/codezela-technologies/"],
  ["Facebook", "https://www.facebook.com/CodezelaTechnologies"],
  ["Instagram", "https://www.instagram.com/codezela.t/"],
  ["TikTok", "https://www.tiktok.com/@codezela_t"],
  ["X", "https://twitter.com/CodezelaT"],
  ["YouTube", "https://www.youtube.com/@codezelatechnologies"],
] as const;

function proposalWhatsAppUrl(submissionId: string) {
  const message = `Hi Codezela, I just submitted a proposal request. My reference is ${submissionId}. I'd like to add a few details.`;
  return `https://wa.me/codezela.t?text=${encodeURIComponent(message)}`;
}

function escapeHtml(value: string | number | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value: string | undefined) {
  return value?.trim() || "Not provided";
}

function displayList(values: string[]) {
  return values.length ? values.join(", ") : "Not specified";
}

function detailRow(label: string, value: string, options?: { link?: string; multiline?: boolean }) {
  const renderedValue = options?.link
    ? `<a href="${escapeHtml(options.link)}" style="color:#710bc0;text-decoration:underline;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `
    <tr>
      <td style="width:34%;padding:12px 14px;border-bottom:1px solid #eee4f0;color:#736b76;font-size:13px;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eee4f0;color:#29242b;font-size:14px;line-height:1.55;vertical-align:top;${options?.multiline ? "white-space:pre-wrap;" : ""}">${renderedValue}</td>
    </tr>`;
}

function emailShell({ preview, eyebrow, title, introduction, content, footerNote }: {
  preview: string;
  eyebrow: string;
  title: string;
  introduction: string;
  content: string;
  footerNote: string;
}) {
  const socialLinks = socials
    .map(([label, url]) => `<a href="${url}" style="display:inline-block;margin:0 10px 8px 0;color:#710bc0;font-size:12px;font-weight:700;text-decoration:none;">${label}</a>`)
    .join("");

  return `<!doctype html>
  <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;background:#f5f3f6;font-family:Arial,Helvetica,sans-serif;color:#29242b;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f6;">
        <tr><td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;overflow:hidden;border:1px solid #ded8e1;border-radius:16px;background:#ffffff;">
            <tr><td style="padding:28px 34px;border-top:4px solid #710bc0;border-bottom:1px solid #eee9ef;background:#ffffff;">
              <div style="color:#710bc0;font-size:24px;font-weight:800;letter-spacing:-.4px;">CodeZela</div>
              <div style="margin-top:18px;color:#7d7280;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(eyebrow)}</div>
              <h1 style="margin:8px 0 0;color:#352f37;font-size:29px;line-height:1.2;">${escapeHtml(title)}</h1>
            </td></tr>
            <tr><td style="padding:30px 34px 10px;">
              <p style="margin:0;color:#5f5861;font-size:15px;line-height:1.65;">${escapeHtml(introduction)}</p>
            </td></tr>
            <tr><td style="padding:20px 34px 30px;">${content}</td></tr>
            <tr><td style="padding:24px 34px;border-top:1px solid #eee4f0;background:#faf9fb;">
              <div style="margin-bottom:10px;">${socialLinks}</div>
              <p style="margin:0;color:#756d78;font-size:12px;line-height:1.6;">${escapeHtml(footerNote)}</p>
              <p style="margin:8px 0 0;color:#756d78;font-size:12px;">Codezela Technologies · info@codezela.com</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>`;
}

export function createInternalProposalEmail(submission: ProposalSubmission, context: ProposalRequestContext) {
  const projectRows = [
    detailRow("Name", submission.fullName),
    detailRow("Email", submission.email, { link: `mailto:${submission.email}` }),
    detailRow("Phone", display(submission.phone), submission.phone ? { link: `tel:${submission.phone.replace(/[^+\d]/g, "")}` } : undefined),
    detailRow("Company", submission.company),
    detailRow("Industry", submission.industry),
    detailRow("Website", display(submission.website), submission.website ? { link: submission.website } : undefined),
    detailRow("Services", displayList(submission.services)),
    detailRow("Goals", displayList(submission.goals)),
    detailRow("Budget", submission.budget),
    detailRow("Timeline", submission.timeline),
    detailRow("Project description", display(submission.description), { multiline: true }),
  ].join("");

  const technicalRows = [
    detailRow("Reference", submission.submissionId),
    detailRow("Submitted", `${context.submittedAtColombo} (Asia/Colombo)`),
    detailRow("IP address", context.ipAddress),
    detailRow("Approx. location", context.location),
    detailRow("Device", context.device),
    detailRow("Browser", context.browser),
    detailRow("Operating system", context.operatingSystem),
    detailRow("Language", context.language),
    detailRow("Browser timezone", display(submission.clientContext?.timezone)),
    detailRow("Viewport / screen", `${display(submission.clientContext?.viewport)} / ${display(submission.clientContext?.screen)}`),
    detailRow("Colour scheme", display(submission.clientContext?.colorScheme)),
    detailRow("Touch points", String(submission.clientContext?.touchPoints ?? "Not provided")),
    detailRow("Connection", display(submission.clientContext?.connection)),
    detailRow("Source page", context.sourcePage, context.sourcePage.startsWith("http") ? { link: context.sourcePage } : undefined),
    detailRow("User agent", context.userAgent, { multiline: true }),
  ].join("");

  const content = `
    <div style="margin-bottom:24px;padding:17px 18px;border:1px solid #e3dce6;border-radius:10px;background:#faf8fb;">
      <div style="color:#710bc0;font-size:13px;font-weight:800;">Reply directly to this email</div>
      <div style="margin-top:5px;color:#5f5861;font-size:13px;line-height:1.5;">The Reply-To address is ${escapeHtml(submission.email)}, so your response goes straight to ${escapeHtml(submission.fullName)}.</div>
    </div>
    <h2 style="margin:0 0 12px;color:#500888;font-size:20px;">Proposal details</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="overflow:hidden;border:1px solid #eee4f0;border-radius:14px;">${projectRows}</table>
    <h2 style="margin:28px 0 12px;color:#500888;font-size:20px;">Request context</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="overflow:hidden;border:1px solid #eee4f0;border-radius:14px;">${technicalRows}</table>`;

  return {
    subject: `New proposal request · ${submission.company} · ${submission.fullName}`,
    html: emailShell({
      preview: `New proposal request from ${submission.fullName} at ${submission.company}.`,
      eyebrow: "New website enquiry",
      title: "A new proposal request is ready",
      introduction: `${submission.fullName} submitted a proposal request through the Codezela website. The complete project brief and request context are below.`,
      content,
      footerNote: "This internal notification includes technical request context for security and support. Do not forward it outside Codezela unless necessary.",
    }),
    text: [
      "NEW CODEZELA PROPOSAL REQUEST",
      `Reference: ${submission.submissionId}`,
      `Submitted: ${context.submittedAtColombo} (Asia/Colombo)`,
      "",
      `Name: ${submission.fullName}`,
      `Email: ${submission.email}`,
      `Phone: ${display(submission.phone)}`,
      `Company: ${submission.company}`,
      `Industry: ${submission.industry}`,
      `Website: ${display(submission.website)}`,
      `Services: ${displayList(submission.services)}`,
      `Goals: ${displayList(submission.goals)}`,
      `Budget: ${submission.budget}`,
      `Timeline: ${submission.timeline}`,
      `Description: ${display(submission.description)}`,
      "",
      `IP: ${context.ipAddress}`,
      `Location: ${context.location}`,
      `Device: ${context.device}`,
      `Browser: ${context.browser}`,
      `OS: ${context.operatingSystem}`,
      `Language: ${context.language}`,
      `Source: ${context.sourcePage}`,
      `User agent: ${context.userAgent}`,
    ].join("\n"),
  };
}

export function createSubmitterConfirmationEmail(submission: ProposalSubmission) {
  const summaryRows = [
    detailRow("Company", submission.company),
    detailRow("Industry", submission.industry),
    detailRow("Services", displayList(submission.services)),
    detailRow("Project goals", displayList(submission.goals)),
    detailRow("Budget", submission.budget),
    detailRow("Timeline", submission.timeline),
  ].join("");

  const content = `
    <div style="padding:18px;border:1px solid #e3dce6;border-radius:10px;background:#faf8fb;">
      <div style="color:#710bc0;font-size:13px;font-weight:800;">Submission reference</div>
      <div style="margin-top:6px;color:#29242b;font-family:monospace;font-size:14px;">${escapeHtml(submission.submissionId)}</div>
    </div>
    <h2 style="margin:28px 0 12px;color:#500888;font-size:20px;">What we received</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="overflow:hidden;border:1px solid #eee4f0;border-radius:14px;">${summaryRows}</table>
    <div style="margin-top:26px;padding:20px;border:1px solid #ded8e1;border-radius:10px;background:#ffffff;color:#352f37;">
      <div style="color:#500888;font-size:18px;font-weight:800;">What happens next?</div>
      <p style="margin:8px 0 0;color:#5f5861;font-size:14px;line-height:1.6;">Our team will review your requirements and reply within 24 hours. You can reply to this email or contact us on WhatsApp if you would like to add anything.</p>
      <a href="${proposalWhatsAppUrl(submission.submissionId)}" target="_blank" rel="noreferrer" style="display:inline-block;margin-top:16px;padding:11px 18px;border-radius:999px;background:#710bc0;color:#ffffff;font-size:13px;font-weight:800;text-decoration:none;">Continue on WhatsApp</a>
    </div>`;

  return {
    subject: `We received your proposal request · Codezela Technologies`,
    html: emailShell({
      preview: `Thanks, ${submission.fullName}. Your Codezela proposal request has been received.`,
      eyebrow: "Request received",
      title: `Thank you, ${submission.fullName}`,
      introduction: "Your proposal request arrived safely. We have shared it with the Codezela team, and a specialist will review the details before getting back to you.",
      content,
      footerNote: "You are receiving this transactional email because this address was used to submit a proposal request on codezela.com.",
    }),
    text: [
      `Thank you, ${submission.fullName}.`,
      "Your proposal request arrived safely and the Codezela team will review it.",
      `Reference: ${submission.submissionId}`,
      "",
      `Company: ${submission.company}`,
      `Industry: ${submission.industry}`,
      `Services: ${displayList(submission.services)}`,
      `Goals: ${displayList(submission.goals)}`,
      `Budget: ${submission.budget}`,
      `Timeline: ${submission.timeline}`,
      "",
      "We will reply within 24 hours.",
      `WhatsApp: ${proposalWhatsAppUrl(submission.submissionId)}`,
      "Email: info@codezela.com",
    ].join("\n"),
  };
}
