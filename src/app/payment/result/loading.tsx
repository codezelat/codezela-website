export default function PaymentResultLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fffaff] px-6" aria-live="polite" aria-busy="true">
      <div className="text-center">
        <span className="mx-auto block h-12 w-12 animate-spin rounded-full border-4 border-codezela-purple/15 border-t-codezela-purple motion-reduce:animate-none" />
        <p className="mt-5 font-display text-[18px] font-semibold text-codezela-title">Verifying payment with Genie...</p>
      </div>
    </main>
  );
}
