"use client";

import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

// Direct-answer section for answer engines and readers: a plain definition first, then extractable facts.
export default function AnswerBlock({ id, eyebrow, heading, definition, facts, lang }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} lang={lang} className="scroll-mt-24 py-16 lg:py-20">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={heading} size="sm" />
            <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">{definition}</p>
          </Reveal>
          <Stagger as="dl" stagger={0.08} className="divide-y divide-slate-200/80 self-start rounded-2xl border border-slate-200/80 bg-white px-5 shadow-[0_1px_2px_rgba(13,27,61,.04)]">
            {facts.map(([label, value]) => (
              <StaggerItem key={label} className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-[13px] font-semibold uppercase tracking-[.08em] text-brandInk">{label}</dt>
                <dd className="text-[15px] leading-6 text-slate-700">{value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
