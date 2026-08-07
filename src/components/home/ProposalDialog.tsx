"use client";

import { CheckCircle2, LoaderCircle, MessageCircleMore, X } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { TurnstileWidget } from "@/components/shared/TurnstileWidget";
import { trackGoogleEvent } from "@/lib/analytics";

type ProposalDialogProps = {
  open: boolean;
  onClose: () => void;
};

type ProposalForm = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  website: string;
  services: string[];
  goals: string[];
  budget: string;
  timeline: string;
  description: string;
};

type FieldErrors = Partial<Record<keyof ProposalForm, string>>;
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const initialForm: ProposalForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  website: "",
  services: [],
  goals: [],
  budget: "$200 - $500",
  timeline: "ASAP",
  description: "",
};

const serviceOptions = [
  "Website Design/Development",
  "SEO/SEM Services",
  "Mobile App Development",
  "Digital Marketing",
  "Branding & Graphic Design",
  "Custom Software Development",
  "Other",
] as const;

const goalOptions = [
  "Develop or Revamp a Website",
  "Develop a Custom Mobile App",
  "Increase Website Traffic",
  "Generate More Leads",
  "Improve User Experience",
  "Boost Brand Visibility",
  "Increase Online Sales",
  "Build a Strong Social Media Presence",
  "Improve Paid Advertising ROI",
  "Other",
] as const;

const industries = [
  "Finance and Banking",
  "E-commerce and Retail",
  "Healthcare and Medical",
  "Education and E-learning",
  "Real Estate and Property Management",
  "Manufacturing and Industrial",
  "Travel and Hospitality",
  "Logistics and Supply Chain",
  "Insurance and Legal",
  "Automotive and Transportation",
  "Telecommunications",
  "Media and Entertainment",
  "Energy and Utilities",
  "Non-profit and Government",
  "Agriculture and Farming",
  "Food and Beverage",
  "Construction and Engineering",
  "Fashion and Apparel",
  "Sports and Fitness",
  "Pharmaceuticals and Biotechnology",
  "Professional Services (Consulting, Legal, Accounting)",
  "Aerospace and Defence",
  "Consumer Electronics",
  "Retail and Wholesale Distribution",
  "Luxury Goods and Jewellery",
  "Arts and Creative Industries",
  "Transportation and Logistics",
  "Health and Wellness",
  "Event Planning and Management",
  "Others",
] as const;

function textFieldError(value: string, label: string) {
  return value.trim() ? undefined : `${label} is required.`;
}

export default function ProposalDialog({ open, onClose }: ProposalDialogProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProposalForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [botField, setBotField] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionReference, setSubmissionReference] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const startedAtRef = useRef(0);
  const submissionIdRef = useRef<string | null>(null);
  const closeDialogRef = useRef<() => void>(() => undefined);
  const titleId = useId();
  const descriptionId = useId();

  const closeDialog = useCallback(() => {
    if (submissionStatus === "submitting") return;
    setTurnstileToken("");
    setTurnstileError("");
    setTurnstileResetSignal(0);
    if (submissionStatus === "success") {
      setStep(1);
      setForm(initialForm);
      setErrors({});
      setBotField("");
      setSubmissionStatus("idle");
      setSubmissionMessage("");
      setSubmissionReference("");
      submissionIdRef.current = null;
    }
    onClose();
  }, [onClose, submissionStatus]);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setTurnstileError("");
  }, []);

  const handleTurnstileError = useCallback((message: string) => {
    setTurnstileError(message);
  }, []);

  useEffect(() => {
    closeDialogRef.current = closeDialog;
  }, [closeDialog]);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    startedAtRef.current = Date.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();
    }, 0);

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialogRef.current();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyboard);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    }, 0);
    return () => window.clearTimeout(focusTimer);
  }, [open, step]);

  if (!open) return null;

  const setTextField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
      setSubmissionMessage("");
    }
  };

  const toggleSelection = (field: "services" | "goals", value: string) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
      setSubmissionMessage("");
    }
  };

  const validateStep = () => {
    const nextErrors: FieldErrors = {};

    if (step === 1) {
      nextErrors.fullName = textFieldError(form.fullName, "Full name");
      nextErrors.email = textFieldError(form.email, "Email address");
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
    } else if (step === 2) {
      nextErrors.company = textFieldError(form.company, "Company name");
      nextErrors.industry = textFieldError(form.industry, "Industry");
      if (form.website && !/^https?:\/\/.+/i.test(form.website)) {
        nextErrors.website = "Include https:// at the start of the website address.";
      }
    }

    const cleanedErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => Boolean(value)),
    ) as FieldErrors;
    setErrors(cleanedErrors);
    return Object.keys(cleanedErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }

    if (!turnstileSiteKey) {
      setTurnstileError("Security verification is temporarily unavailable. Please contact info@codezela.com.");
      return;
    }

    if (!turnstileToken) {
      setTurnstileError("Please wait for the security verification to finish, then submit again.");
      return;
    }

    setSubmissionStatus("submitting");
    setSubmissionMessage("");
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;
    const navigatorWithConnection = navigator as Navigator & {
      connection?: { effectiveType?: string };
    };

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submissionId,
          startedAt: startedAtRef.current,
          botField,
          turnstileToken,
          clientContext: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
            locale: navigator.language || "",
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            screen: `${window.screen.width}x${window.screen.height}`,
            pixelRatio: window.devicePixelRatio,
            colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
            touchPoints: navigator.maxTouchPoints,
            connection: navigatorWithConnection.connection?.effectiveType || "",
          },
        }),
      });
      const result = await response.json().catch(() => null) as { message?: string; reference?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "We could not send your proposal right now. Please try again.");
      }

      setSubmissionReference(result?.reference || submissionId);
      setSubmissionStatus("success");
      trackGoogleEvent("generate_lead", {
        method: "proposal_form",
        currency: "USD",
        value: 1,
      });
    } catch (error) {
      setTurnstileToken("");
      setTurnstileResetSignal((current) => current + 1);
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "We could not send your proposal right now. Please check your connection and retry.",
      );
    }
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  const fieldClass = (hasError: boolean) =>
    `mt-2 min-h-[50px] w-full rounded-[8px] border bg-white px-4 text-[16px] text-[#161616] outline-none transition focus:border-codezela-purple focus:ring-2 focus:ring-codezela-purple/15 ${
      hasError ? "border-red-500" : "border-[#ded2e2]"
    }`;

  return (
    <div
      onMouseDown={closeFromBackdrop}
      className="fixed inset-0 z-[1000] grid items-center overflow-y-auto bg-[#180024]/65 px-5 py-6 backdrop-blur-[3px]"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative mx-auto my-auto w-full max-w-[680px] rounded-[20px] bg-white px-5 py-7 shadow-[0_30px_90px_rgba(31,0,45,0.32)] min-[640px]:px-10 min-[640px]:py-9"
      >
        <button
          type="button"
          onClick={closeDialog}
          disabled={submissionStatus === "submitting"}
          aria-label="Close proposal form"
          className="absolute right-4 top-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[#6b5b70] transition-colors hover:bg-codezela-offwhite hover:text-codezela-purple disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X aria-hidden="true" size={23} />
        </button>

        <h2 id={titleId} className="m-0 pr-12 font-display text-[30px] font-semibold leading-tight text-codezela-title min-[640px]:text-[36px]">
          Get My Proposal
        </h2>
        <p id={descriptionId} className="mb-0 mt-3 pr-8 text-[16px] leading-[22.4px] text-codezela-copy">
          We’ll get back to you within 24 hours after your request.
        </p>

        {submissionStatus === "success" ? (
          <div className="mt-8 text-center" role="status" aria-live="polite">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f5e6fa] text-codezela-purple">
              <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
            </span>
            <h3 className="mt-5 font-display text-[26px] font-semibold text-codezela-title">Your request is safely on its way</h3>
            <p className="mx-auto mt-3 max-w-[510px] text-[16px] leading-6 text-codezela-copy">
              We sent a confirmation to <strong className="font-semibold text-[#3f3941]">{form.email}</strong>. Our team will review your requirements and reply within 24 hours.
            </p>
            <div className="mx-auto mt-5 max-w-[500px] rounded-[12px] border border-[#eadfed] bg-[#fffaff] px-4 py-3 text-left">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8c7f90]">Submission reference</span>
              <code className="mt-1 block break-all text-[13px] text-codezela-purple">{submissionReference}</code>
            </div>
            <div className="mt-7 flex flex-col justify-center gap-3 min-[480px]:flex-row">
              <a
                href={`https://wa.me/codezela.t?text=${encodeURIComponent(`Hi Codezela, I just submitted a proposal request. My reference is ${submissionReference}. I’d like to add a few details.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-codezela-purple bg-white px-6 font-display text-[15px] font-semibold text-codezela-purple transition-colors hover:bg-codezela-offwhite"
              >
                <MessageCircleMore aria-hidden="true" className="h-5 w-5" /> Continue on WhatsApp
              </a>
              <button type="button" onClick={closeDialog} className="pill-button h-[50px] cursor-pointer px-8 text-[16px]">Done</button>
            </div>
          </div>
        ) : (
          <>
        <div className="mt-6" aria-label={`Proposal form progress: ${step * 25}%`}>
          <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#6b5b70]">
            <span>Step {step} of 4</span>
            <span>{step * 25}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#f2e7f5]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#710bc0,#d300ff)] transition-[width] duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-7" aria-busy={submissionStatus === "submitting"}>
          <div className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Leave this field empty
              <input name="contact_website" value={botField} onChange={(event) => setBotField(event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {step === 1 && (
            <div className="grid gap-5">
              <TextField label="Full Name" name="fullName" value={form.fullName} error={errors.fullName} onChange={setTextField} placeholder="Enter your full name" autoComplete="name" required className={fieldClass(Boolean(errors.fullName))} />
              <TextField label="Email Address" name="email" value={form.email} error={errors.email} onChange={setTextField} placeholder="Enter your email address" type="email" autoComplete="email" required className={fieldClass(Boolean(errors.email))} />
              <TextField label="Phone Number" name="phone" value={form.phone} error={errors.phone} onChange={setTextField} placeholder="Include your phone number for faster communication" type="tel" autoComplete="tel" className={fieldClass(Boolean(errors.phone))} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5">
              <TextField label="Company Name" name="company" value={form.company} error={errors.company} onChange={setTextField} placeholder="Your company or organisation's name" autoComplete="organization" required className={fieldClass(Boolean(errors.company))} />
              <label className="block text-[15px] font-medium text-[#352f37]">
                Industry <span className="text-codezela-pink" aria-hidden="true">*</span>
                <select name="industry" value={form.industry} onChange={setTextField} required aria-invalid={Boolean(errors.industry)} aria-describedby={errors.industry ? "industry-error" : undefined} className={fieldClass(Boolean(errors.industry))}>
                  <option value="">Select your industry</option>
                  {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
                </select>
                {errors.industry && <ErrorMessage id="industry-error">{errors.industry}</ErrorMessage>}
              </label>
              <TextField label="Company Website" name="website" value={form.website} error={errors.website} onChange={setTextField} placeholder="Link to your current website, if applicable" type="url" autoComplete="url" className={fieldClass(Boolean(errors.website))} />
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6">
              <CheckboxGroup legend="Services Interested In (Multiple selections allowed)" required={false} options={serviceOptions} selected={form.services} onToggle={(value) => toggleSelection("services", value)} error={errors.services} name="services" />
              <CheckboxGroup legend="Project Goals (Multiple selections allowed)" required={false} options={goalOptions} selected={form.goals} onToggle={(value) => toggleSelection("goals", value)} error={errors.goals} name="goals" />
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-5">
              <label className="block text-[15px] font-medium text-[#352f37]">
                Estimated Budget
                <select name="budget" value={form.budget} onChange={setTextField} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined} className={fieldClass(Boolean(errors.budget))}>
                  <option>$200 - $500</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
                {errors.budget && <ErrorMessage id="budget-error">{errors.budget}</ErrorMessage>}
              </label>
              <label className="block text-[15px] font-medium text-[#352f37]">
                Project Timeline
                <select name="timeline" value={form.timeline} onChange={setTextField} aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "timeline-error" : undefined} className={fieldClass(Boolean(errors.timeline))}>
                  <option>ASAP</option>
                  <option>1-3 Months</option>
                  <option>3-6 Months</option>
                  <option>6+ Months</option>
                </select>
                {errors.timeline && <ErrorMessage id="timeline-error">{errors.timeline}</ErrorMessage>}
              </label>
              <label className="block text-[15px] font-medium text-[#352f37]">
                Describe Your Project
                <textarea name="description" value={form.description} onChange={setTextField} rows={5} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} placeholder="Briefly describe your project, challenges, or any specific requirements" className={`${fieldClass(Boolean(errors.description))} resize-y py-3`} />
                {errors.description && <ErrorMessage id="description-error">{errors.description}</ErrorMessage>}
              </label>
              <p className="text-[12px] leading-[1.55] text-[#756d78]">
                By submitting, you agree that Codezela may email the details you provide and basic request/device information to its team to process and protect your enquiry. See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold text-codezela-purple underline underline-offset-2">Privacy Policy</a>.
              </p>
              <div>
                <TurnstileWidget
                  siteKey={turnstileSiteKey}
                  resetSignal={turnstileResetSignal}
                  onTokenChange={handleTurnstileToken}
                  onError={handleTurnstileError}
                />
                {turnstileError && (
                  <p role="status" className="mt-2 text-[13px] leading-5 text-red-700">
                    {turnstileError}
                  </p>
                )}
              </div>
            </div>
          )}

          {submissionStatus === "error" && (
            <div role="alert" className="mt-5 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] leading-5 text-red-700">
              {submissionMessage} Your details are still here, so you can retry without re-entering them.
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 min-[480px]:flex-row min-[480px]:justify-end">
            {step > 1 && (
              <button type="button" disabled={submissionStatus === "submitting"} onClick={() => { setStep((current) => current - 1); setErrors({}); setSubmissionStatus("idle"); setSubmissionMessage(""); setTurnstileToken(""); setTurnstileError(""); setTurnstileResetSignal(0); }} className="h-[50px] cursor-pointer rounded-full border border-codezela-purple bg-white px-7 font-display text-[16px] font-semibold text-codezela-purple transition-colors hover:bg-codezela-offwhite disabled:cursor-not-allowed disabled:opacity-50">
                Previous
              </button>
            )}
            <button type="submit" disabled={submissionStatus === "submitting"} className="pill-button h-[50px] cursor-pointer gap-2 px-8 text-[16px] disabled:cursor-not-allowed disabled:opacity-65">
              {submissionStatus === "submitting" ? (
                <><LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" /> Sending securely…</>
              ) : step === 4 ? "Request a Proposal" : "Next"}
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: keyof ProposalForm;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  className: string;
};

function TextField({ label, name, value, error, onChange, placeholder, type = "text", autoComplete, required, className }: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <label className="block text-[15px] font-medium text-[#352f37]">
      {label} {required && <span className="text-codezela-pink" aria-hidden="true">*</span>}
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={className} />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </label>
  );
}

type CheckboxGroupProps = {
  legend: string;
  required: boolean;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
  name: "services" | "goals";
};

function CheckboxGroup({ legend, required, options, selected, onToggle, error, name }: CheckboxGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="m-0 border-0 p-0">
      <legend className="text-[15px] font-medium text-[#352f37]">
        {legend} {required && <span className="text-codezela-pink" aria-hidden="true">*</span>}
      </legend>
      <div className="mt-3 grid gap-3 min-[560px]:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[8px] border border-[#e5d9e8] px-4 py-2.5 text-[15px] text-[#454545] transition-colors has-checked:border-codezela-purple has-checked:bg-codezela-offwhite">
            <input type="checkbox" name={name} value={option} checked={selected.includes(option)} onChange={() => onToggle(option)} className="h-[18px] w-[18px] accent-codezela-purple" />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </fieldset>
  );
}

function ErrorMessage({ id, children }: { id: string; children: string }) {
  return <span id={id} role="alert" className="mt-1.5 block text-[13px] font-normal text-red-600">{children}</span>;
}
