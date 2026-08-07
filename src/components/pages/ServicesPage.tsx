"use client";

import { MotionReveal } from "@/components/shared/MotionReveal";
import tabStatesJson from "../../../docs/research/codezela/services-tab-states.json";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

type ServiceDefinition = {
  title: string;
  summary: string;
  icon: string;
};

type TabState = {
  card: number;
  tab: string;
  panel: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    title: "Inception Meeting",
    description:
      "Begin with a collaborative session where we dive deep into your vision, goals, and challenges.",
  },
  {
    title: "Strategize for Success",
    description:
      "Craft a tailored strategy that aligns with your objectives. We analyze market trends, competitors",
  },
  {
    title: "Bringing Ideas to Life",
    description:
      "Our talented team transforms concepts into reality. From elegant designs to functional",
  },
  {
    title: "Refining Perfection",
    description:
      "Embrace a collaborative review process. Regular checkpoints allow for feedback incorporation,",
  },
];

const services: ServiceDefinition[] = [
  {
    title: "Web Application Development",
    summary:
      "Crafting visually appealing websites with seamless functionality and user-centric design.",
    icon: "/images/services/device-desktop-code.png.webp",
  },
  {
    title: "Mobile Application Development (iOS, Android)",
    summary:
      "Creating sleek and functional iOS applications tailored to meet your business goals.",
    icon: "/images/services/app-development-1.svg",
  },
  {
    title: "Custom Software Development",
    summary:
      "Designing tailored software solutions that meet the specific needs of your business.",
    icon: "/images/services/coding.svg",
  },
  {
    title: "Artificial Intelligence, Machine Learning, and NLP Solutions Development",
    summary:
      "Implementing AI solutions that automate tasks and improve decision-making through data-driven insights.",
    icon: "/images/services/artificial-intelligence_900961-1.svg",
  },
  {
    title: "UI/UX Design and Product Development",
    summary:
      "Focusing on user-centric design to create interfaces that are intuitive and engaging.",
    icon: "/images/services/web-site_1073508.svg",
  },
  {
    title: "E-commerce Solutions",
    summary:
      "Building custom e-commerce websites designed to convert visitors into customers.",
    icon: "/images/services/shopping-bag.svg",
  },
  {
    title: "Content Management Systems (CMS) Development",
    summary:
      "Building responsive and customisable WordPress websites that empower businesses to manage content easily.",
    icon: "/images/services/digital-content.svg",
  },
  {
    title: "Enterprise Software and Cloud-based Solutions",
    summary:
      "Designing cloud-based software that supports large-scale enterprise operations.",
    icon: "/images/services/building.svg",
  },
];

const liveEcommerceTypo = "Custom E-commerce Website Development i";
const correctedEcommerceLabel = "Custom E-commerce Website Development";
const tabStates = (tabStatesJson as TabState[]).map((state) =>
  state.card === 5 && state.tab === liveEcommerceTypo
    ? {
        ...state,
        tab: correctedEcommerceLabel,
        panel: state.panel.replace(liveEcommerceTypo, correctedEcommerceLabel),
      }
    : state,
);
const serviceTabs = services.map((_, cardIndex) =>
  tabStates.filter(({ card }) => card === cardIndex),
);

function splitPanel(panel: string) {
  const splitAt = panel.indexOf("\n");

  return {
    title: panel.slice(0, splitAt),
    description: panel.slice(splitAt + 1),
  };
}

function WorkflowTimeline() {
  return (
    <div
      className="relative grid gap-12 pl-[70px] min-[1025px]:gap-0 min-[1025px]:pl-0"
      aria-label="Our professional workflow"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-[34px] left-[25px] top-[30px] w-[2px] bg-[#9341d1] min-[1025px]:bottom-[41px] min-[1025px]:left-[279px] min-[1025px]:top-0"
      />

      {processSteps.map((step, index) => (
        <div
          key={step.title}
          className="relative min-h-[172px] min-[1025px]:grid min-[1025px]:min-h-[157px] min-[1025px]:grid-cols-[240px_160px_1fr] min-[1025px]:items-start"
        >
          <Image
            src="/images/services/circle-svg.svg"
            alt=""
            width={88}
            height={88}
            aria-hidden="true"
            className={`absolute -left-[70px] top-[-4px] z-[1] h-[54px] w-[54px] min-[1025px]:left-[243px] min-[1025px]:h-[74px] min-[1025px]:w-[74px] ${
              index === 0
                ? "block min-[1025px]:top-[30px]"
                : index === processSteps.length - 1
                  ? "block min-[1025px]:top-[-44px]"
                  : "hidden"
            }`}
          />
          <h2 className="max-w-[220px] font-display text-[27px] font-medium leading-[1.22] text-[#3d3a3d] min-[1025px]:pt-[19px] min-[1025px]:text-[30px] min-[1025px]:leading-[1.25]">
            {step.title}
          </h2>
          <span aria-hidden="true" className="hidden min-[1025px]:block" />
          <p className="mt-3 max-w-[305px] font-display text-[16px] font-normal leading-[1.45] text-[#999599] min-[1025px]:mt-0 min-[1025px]:pt-[23px] min-[1025px]:text-[17px] min-[1025px]:leading-[1.4]">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function ServiceRow({ service, cardIndex }: { service: ServiceDefinition; cardIndex: number }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = serviceTabs[cardIndex];
  const panel = splitPanel(tabs[activeTab].panel);

  const focusTab = (index: number) => {
    document.getElementById(`service-${cardIndex}-tab-${index}`)?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tabIndex: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(tabIndex);
      return;
    }

    let nextTab: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextTab = (tabIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextTab = (tabIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextTab = 0;
    } else if (event.key === "End") {
      nextTab = tabs.length - 1;
    }

    if (nextTab === null) return;

    event.preventDefault();
    focusTab(nextTab);
  };

  return (
    <article className="grid min-h-[354px] overflow-hidden rounded-[6px] border border-[#eadfec] bg-white font-display shadow-[0_0_0_rgba(113,11,192,0)] transition-[box-shadow,border-color] duration-300 hover:border-[#dfcce5] hover:shadow-[0_12px_30px_rgba(80,8,136,0.045)] min-[1025px]:grid-cols-[33.5%_30%_36.5%]">
      <div className="flex flex-col justify-center border-b border-[#eadfec] px-[22px] py-[38px] min-[1025px]:justify-start min-[1025px]:border-b-0 min-[1025px]:border-r min-[1025px]:pb-[40px] min-[1025px]:pl-[37px] min-[1025px]:pr-0 min-[1025px]:pt-[92px]">
        <Image
          src={service.icon}
          alt=""
          width={160}
          height={160}
          aria-hidden="true"
          className="h-[42px] w-[42px] object-contain"
        />
        <h2 className="mt-[18px] max-w-[370px] text-[24px] font-bold leading-[1.12] text-[#484548] min-[1025px]:text-[25px]">
          {service.title}
        </h2>
        <p className="mt-[20px] max-w-[360px] text-[16px] font-normal leading-[1.38] text-[#4f4d4f] min-[1025px]:max-w-[390px] min-[1025px]:leading-[1.35]">
          {service.summary}
        </p>
      </div>

      <div
        role="tablist"
        aria-label={`${service.title} options`}
        aria-orientation="vertical"
        className="grid border-b border-[#eadfec] px-[22px] py-[13px] min-[1025px]:self-center min-[1025px]:border-b-0 min-[1025px]:border-r min-[1025px]:px-[20px] min-[1025px]:py-0"
      >
        {tabs.map((tab, tabIndex) => {
          const selected = tabIndex === activeTab;

          return (
            <button
              key={tab.tab}
              id={`service-${cardIndex}-tab-${tabIndex}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`service-${cardIndex}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tabIndex)}
              onKeyDown={(event) => handleTabKeyDown(event, tabIndex)}
              className={`group flex min-h-[76px] cursor-pointer items-center justify-between gap-4 border-b border-[#eadfec] bg-transparent py-[15px] text-left text-[17px] font-medium leading-[1.14] transition-colors duration-200 last:border-b-0 min-[1025px]:text-[18px] ${
                selected ? "text-[#8d32c5]" : "text-[#585558] hover:text-[#710bc0]"
              }`}
            >
              <span>{tab.tab}</span>
              <ChevronRight
                aria-hidden="true"
                size={26}
                strokeWidth={2.6}
                className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                  selected ? "text-[#8d32c5]" : "text-[#646164]"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`service-${cardIndex}-panel`}
        role="tabpanel"
        aria-labelledby={`service-${cardIndex}-tab-${activeTab}`}
        aria-live="polite"
        tabIndex={0}
        className="flex flex-col justify-center px-[22px] py-[38px] min-[1025px]:justify-start min-[1025px]:pb-[48px] min-[1025px]:pl-[60px] min-[1025px]:pr-[20px] min-[1025px]:pt-[60px]"
      >
        <h3 className="text-[16px] font-semibold leading-[1.3] text-[#4d4a4d]">{panel.title}</h3>
        <p className="mt-[20px] text-[16px] font-normal leading-[1.45] text-[#5d595d]">
          {panel.description}
        </p>
      </div>
    </article>
  );
}

export function ServicesPage() {
  return (
    <main id="content" className="overflow-x-clip bg-white">
      <section aria-labelledby="services-workflow-heading" className="min-h-[1010px] min-[1025px]:min-h-[859px]">
        <div className="site-shell grid pt-[339px] min-[1025px]:grid-cols-[45.2%_54.8%] min-[1025px]:pt-[357px]">
          <MotionReveal distance={26}>
            <p
              id="services-workflow-heading"
              className="max-w-[530px] font-display text-[40px] font-medium leading-[1.06] tracking-[-0.02em] text-codezela-title min-[1025px]:text-[52px] min-[1025px]:leading-[1.075]"
            >
              <span className="sr-only">
                We offer premium services with a professional workflow, to achieve successful outcomes
              </span>
              <span aria-hidden="true" className="hidden min-[1025px]:block">
                <span className="block">We offer premium</span>
                <span className="block">services with a</span>
                <span className="block">professional</span>
                <span className="block">workflow, to</span>
                <span className="block">achieve successful</span>
                <span className="block">outcomes</span>
              </span>
              <span aria-hidden="true" className="block min-[1025px]:hidden">
                <span className="block">We offer</span>
                <span className="block">premium</span>
                <span className="block">services with a</span>
                <span className="block">professional</span>
                <span className="block">workflow, to</span>
                <span className="block">achieve</span>
                <span className="block">successful</span>
                <span className="block">outcomes</span>
              </span>
            </p>
          </MotionReveal>

          <MotionReveal className="mt-[120px] min-[1025px]:mt-0" delay={0.1} distance={26}>
            <WorkflowTimeline />
          </MotionReveal>
        </div>
      </section>

      <section
        aria-labelledby="services-heading"
        className="pb-[100px] min-[1025px]:mt-[64px] min-[1025px]:pb-[140px]"
      >
        <MotionReveal className="site-shell text-center" distance={20}>
          <h1
            id="services-heading"
            className="font-display text-[34px] font-semibold leading-[1.1] text-codezela-title min-[1025px]:text-[40px]"
          >
            Our Services
          </h1>
          <p className="mx-auto mt-[18px] max-w-[820px] font-display text-[17px] font-normal leading-[1.45] text-[#666166] min-[1025px]:text-[18px] min-[1025px]:leading-[1.4]">
            Empower your brand’s digital journey with innovative design, compelling branding, seamless
            e-commerce, and strategic marketing solutions.
          </p>
        </MotionReveal>

        <div className="site-shell mt-[86px] grid gap-[30px] min-[1025px]:mt-[54px]">
          {services.map((service, cardIndex) => (
            <MotionReveal
              key={service.title}
              delay={Math.min(cardIndex * 0.035, 0.14)}
              distance={24}
              className="[content-visibility:auto] [contain-intrinsic-size:354px]"
            >
              <ServiceRow service={service} cardIndex={cardIndex} />
            </MotionReveal>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
