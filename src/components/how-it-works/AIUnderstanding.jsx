"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check, Sparkles, UserCheck } from "lucide-react";
import Initials from "@/components/ui/Initials";
import { TypingDots, useTimeline } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { understand } from "@/data/howItWorks";

const show = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 8 });
const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function HighlightedMessage({ text, phrases, active }) {
  const parts = text.split(new RegExp(`(${phrases.map(escapePattern).join("|")})`, "gi"));
  return parts.map((part, index) =>
    phrases.some(phrase => phrase.toLowerCase() === part.toLowerCase()) ? (
      <mark key={index} className={`rounded px-0.5 transition-colors duration-500 ${active ? "bg-brand/15 text-brandInk" : "bg-transparent text-inherit"}`}>
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

// Phases: 1 read message, 2 intent detected, 3 context added, 4 action chosen.
function AnalysisPanel({ sample }) {
  const ref = useRef(null);
  const phase = useTimeline(ref, [500, 1300, 2100, 2900], sample.id);
  const done = phase >= understand.stages.length;
  const [intent, ...context] = sample.fields;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-navy">
          <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          AI understanding
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${done ? "bg-emerald-50 text-emerald-700" : "bg-brand/[.08] text-brandInk"}`}>
          {done ? <Check aria-hidden className="h-3 w-3" strokeWidth={3} /> : <TypingDots dotClassName="bg-brand" />}
          {done ? "Understood" : "Analyzing"}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-2.5">
          <Initials name="Customer" className="h-8 w-8 text-[10px]" />
          <p className="rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-[14px] leading-6 text-slate-700">
            <HighlightedMessage text={sample.message} phrases={sample.highlights} active={phase >= 1} />
          </p>
        </div>

        <ol className="mt-5 grid grid-cols-4 gap-1.5" aria-label="Analysis stages">
          {understand.stages.map((stage, index) => {
            const reached = phase >= index + 1;
            return (
              <li key={stage} className="min-w-0">
                <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-slate-200">
                  <span className={`block h-full origin-left rounded-full bg-brand transition-transform duration-500 ${reached ? "scale-x-100" : "scale-x-0"}`} />
                </span>
                <span className={`mt-1.5 block text-[10.5px] font-semibold leading-tight transition-colors duration-300 sm:text-[11.5px] ${reached ? "text-navy" : "text-slate-400"}`}>{stage}</span>
              </li>
            );
          })}
        </ol>

        <dl className="mt-5 grid gap-2 sm:grid-cols-2">
          <motion.div initial={false} animate={show(phase >= 2)} transition={{ duration: 0.4, ease }} className="rounded-xl border border-brand/25 bg-brand/[.04] px-3 py-2.5 sm:col-span-2">
            <dt className="text-[11px] font-semibold uppercase tracking-[.12em] text-brandInk">{intent[0]}</dt>
            <dd className="mt-0.5 text-[15px] font-semibold text-navy">{intent[1]}</dd>
          </motion.div>
          {context.map(([label, value], index) => (
            <motion.div key={label} initial={false} animate={show(phase >= 3)} transition={{ duration: 0.4, delay: phase >= 3 ? index * 0.1 : 0, ease }} className="rounded-xl border border-slate-200/80 px-3 py-2.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[.12em] text-slate-500">{label}</dt>
              <dd className="mt-0.5 text-[14px] font-semibold text-navy">{value}</dd>
            </motion.div>
          ))}
        </dl>

        <motion.div
          initial={false}
          animate={show(phase >= 4)}
          transition={{ duration: 0.4, ease }}
          className={`mt-3 flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-[13.5px] font-semibold text-white ${sample.handover ? "bg-navy" : "bg-brand"}`}
        >
          <span className="flex items-center gap-2">
            {sample.handover ? <UserCheck aria-hidden className="h-4 w-4" /> : <Sparkles aria-hidden className="h-4 w-4" />}
            {sample.action}
          </span>
          <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
        </motion.div>
      </div>
    </div>
  );
}

export default function AIUnderstanding() {
  const [active, setActive] = useState(0);
  const sample = understand.samples[active];

  return (
    <section id="understand" aria-labelledby="understand-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <Reveal>
            <SectionHeading id="understand-title" eyebrow={understand.eyebrow} title={understand.title} description={understand.description} />
          </Reveal>

          <Reveal delay={0.05} className="mt-7">
            <p id="understand-samples" className="text-sm font-semibold text-navy">
              Try a message
            </p>
            <div role="group" aria-labelledby="understand-samples" className="mt-3 flex flex-wrap gap-2">
              {understand.samples.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-[border-color,background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    index === active ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand/30 hover:text-brandInk"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-[#F7F9FC] p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy">
              <BookOpen aria-hidden className="h-4 w-4 text-brand" />
              What the AI knows about your business
            </p>
            <Stagger as="ul" stagger={0.08} className="mt-3 space-y-2.5">
              {understand.knowledge.map(item => (
                <StaggerItem as="li" variants={fadeRight} key={item.title} className="flex items-start gap-2.5 text-sm">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={3} />
                  <span>
                    <span className="font-semibold text-navy">{item.title}</span>
                    <span className="text-slate-600"> — {item.text}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-40">
          <AnalysisPanel sample={sample} />
        </Reveal>
      </div>
    </section>
  );
}
