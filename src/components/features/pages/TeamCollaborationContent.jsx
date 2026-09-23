"use client";

import { Check } from "lucide-react";
import { teamCollaborationPage } from "@/data/featurePages";
import { PulseDot, Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, popIn } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import BridgeCallout from "./BridgeCallout";
import FeaturePageHero from "./FeaturePageHero";

function AssignMockup({ step }) {
  return (
    <div
      role="img"
      aria-label={`Workflow step: ${step.title}. ${step.description}`}
      className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-5"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-[0_8px_18px_-8px_rgba(242,13,69,.7)]">
          <step.icon className="h-4 w-4" strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-brandInk">Workflow step</p>
          <p className="text-sm font-semibold text-navy">{step.title}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <PulseDot className="bg-emerald-500" />
          Live
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-6 text-slate-600">{step.description}</p>
      <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/70 px-3">
        {step.rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3 py-2 text-[12px]">
            <dt className="shrink-0 text-slate-500">{label}</dt>
            <dd className="text-right font-medium text-slate-700">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function TeamCollaborationContent() {
  const { hero, workspacePoints, configureChips, assignExample, handoverBridge, useCases } = teamCollaborationPage;

  return (
    <>
      <FeaturePageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} visual={<AssignMockup step={assignExample} />} secondaryHref="/how-it-works" secondaryLabel="See how it works" />

      <section id="workspace" aria-labelledby="workspace-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="workspace-title" eyebrow="One workspace" title="Assign, route and work together." description="AI and your team share the same conversations, the same context and the same view." />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workspacePoints.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.07}>
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

      <section id="configure" aria-labelledby="configure-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" id="configure-title" eyebrow="Roles & access" title="Set it up once. It applies to every conversation." description="Roles, routing, tags and business context decide who sees what — and who a conversation goes to next." />
          </Reveal>
          <Stagger stagger={0.08} delay={0.15} className="mt-8 flex flex-wrap justify-center gap-2">
            {configureChips.map((chip, index) => (
              <StaggerItem
                as="span"
                variants={popIn}
                key={chip}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${index < 2 ? "bg-brand text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}
              >
                {index < 2 && <Check className="h-3 w-3" strokeWidth={3} />}
                {chip}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <BridgeCallout {...handoverBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
