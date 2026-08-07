import Image from "next/image";

export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-live="polite" aria-label="Loading Codezela Technologies">
      <div className="page-loading__mark" aria-hidden="true">
        <Image src="/images/Untitled-150x150.png" alt="" width={72} height={72} />
      </div>
      <span className="page-loading__bar" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
