import Image from "next/image";

export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-live="polite" aria-label="Loading Codezela Technologies">
      <div className="page-loading__mark" aria-hidden="true">
        <Image
          src="/images/Frame-12.png"
          alt=""
          width={154}
          height={42}
          className="h-auto w-[118px] object-contain"
          priority
        />
      </div>
      <span className="page-loading__bar" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
