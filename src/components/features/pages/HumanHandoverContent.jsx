"use client";

import { UserRound } from "lucide-react";
import { humanHandoverPage } from "@/data/featurePages";
import { PulseDot, Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, fadeRight } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import BridgeCallout from "./BridgeCallout";
import CheckList from "./CheckList";
import FeaturePageHero from "./FeaturePageHero";

function HandoverMockup() {
  return (
    <div
      role="img"
      aria-label="A wholesale pricing conversation handed from OrmiTech AI to a teammate, with an AI summary and high-intent tag attached"
      className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-brandInk">Handover · context intact</p>
      <p className="mt-2 text-sm font-semibold text-navy">Wholesale pricing request</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10.5px] font-semibold text-slate-600 ring-1 ring-slate-200">
          <UserRound className="h-3 w-3" /> Rahim U.
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10.5px] font-semibold text-slate-600 ring-1 ring-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Farhan A.
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-1 text-[10.5px] font-semibold text-red-700">
          <PulseDot className="bg-red-500" />
          High intent
        </span>
      </div>
      <Stagger stagger={0.5} delay={0.6}>
        <StaggerItem variants={fadeRight} className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-600">
          <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-[.1em] text-slate-400">AI summary · Facebook</span>
          Wants 50 units every month and asked about bulk discounts.
        </StaggerItem>
        <StaggerItem variants={fadeRight} className="mt-2 rounded-lg bg-brand/[.06] px-3 py-2 text-[12px] text-slate-700 ring-1 ring-brand/15">
          <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-[.1em] text-brandInk">Farhan A. · reply</span>
          Hi Rahim — I'll send you a custom quote within the hour.
        </StaggerItem>
      </Stagger>
    </div>
  );
}

export default function HumanHandoverContent() {
  const { hero, handoverPoints, whenPrinciple, whenExamples, teamBridge, useCases } = humanHandoverPage;

  return (
    <>
      <FeaturePageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        visual={<HandoverMockup />}
        secondaryHref="/features/ai-chatbot"
        secondaryLabel="See the AI Chatbot"
      />

      <section id="handover" aria-labelledby="handover-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="handover-title" eyebrow="AI + Human" title="Nothing gets lost in the handoff." description="Automate the routine. Escalate the important — with the full conversation intact." />
          </Reveal>
          <CheckList items={handoverPoints} className="mt-7 grid gap-3 sm:grid-cols-2" />
        </div>
      </section>

      <section id="when-to-hand-over" aria-labelledby="when-to-hand-over-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="when-to-hand-over-title" eyebrow="Why it matters" title={whenPrinciple.title} description={whenPrinciple.text} />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {whenExamples.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08}>
                <Spotlight as="article" className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1.5">
                  <IconTile icon={item.icon} interactive />
                  <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <BridgeCallout {...teamBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
