"use client";

import { CirclePlus } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProposalDialog = dynamic(() => import("./ProposalDialog"), { ssr: false });

export function ProposalLauncher() {
  const [proposalOpen, setProposalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setProposalOpen(true)}
        className="pill-button hero-action hero-action--secondary absolute left-0 top-[355px] h-[70px] w-full cursor-pointer gap-[10px] whitespace-nowrap px-[14px] font-footer text-[17px] md:left-auto md:right-[70px] md:top-[433px] md:h-[52px] md:w-[243px] md:gap-3 md:px-6"
      >
        <CirclePlus
          size={19}
          strokeWidth={2.5}
          aria-hidden="true"
          className="hero-action__icon shrink-0"
        />
        Request a Proposal
      </button>

      {proposalOpen ? <ProposalDialog open onClose={() => setProposalOpen(false)} /> : null}
    </>
  );
}
