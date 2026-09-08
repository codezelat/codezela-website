import type { Metadata } from "next";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { PaymentForm } from "@/components/pages/payment/PaymentForm";

export const metadata: Metadata = {
  title: "Pay invoice - Codezela Technologies",
  description: "Pay an invoice issued by Codezela Technologies through the secure Genie Business payment gateway.",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
  referrer: "strict-origin-when-cross-origin",
};

export default function PaymentPage() {
  return (
    <>
      <a className="skip-link" href="#payment-content">Skip to payment</a>
      <Header />
      <main id="payment-content" className="overflow-hidden bg-[radial-gradient(circle_at_85%_16%,rgba(211,0,255,0.08),transparent_29%),linear-gradient(180deg,#fff_0%,#fff9ff_100%)]">
        <section className="mx-auto w-full max-w-[640px] px-5 pb-24 pt-10 min-[700px]:pb-32 min-[700px]:pt-16">
          <h1 className="text-center font-display text-[42px] font-semibold leading-tight text-codezela-title min-[700px]:text-[56px]">Pay invoice</h1>
          <p className="mx-auto mb-8 mt-4 max-w-[480px] text-center text-[16px] leading-6 text-codezela-copy">Enter the exact amount payable on your Codezela Technologies invoice.</p>
          <PaymentForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />
        </section>
      </main>
      <Footer />
    </>
  );
}
