"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, Sparkles, UserRound, Workflow } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { aiShowcase } from "@/data/features";
import { PulseDot, TypingDots, useTimeline } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

// Conversation plays once when the card scrolls into view: question, AI typing, then the reply.
const PHASE = { idle: 0, question: 1, typing: 2, reply: 3 };

const bubble = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 8 });

// Conversation examples reuse the AI assistant and handover walkthrough from the homepage.
function AssistantCard() {
  const ref = useRef(null);
  const phase = useTimeline(ref, [250, 850, 2100]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_32px_64px_-40px_rgba(13,27,61,.45)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_40px_72px_-40px_rgba(13,27,61,.55)] motion-safe:hover:-translate-y-1"
    >
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white">
          <Bot className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold text-navy">OrmiTech AI</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <PulseDot className="bg-emerald-500" />
          Active
        </span>
      </div>
      <div className="space-y-2.5 py-4">
        <motion.p
          initial={false}
          animate={bubble(phase >= PHASE.question)}
          transition={{ duration: 0.35, ease }}
          className="max-w-[78%] rounded-xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[12.5px] text-slate-600"
        >
          Do you deliver to Khulna?
        </motion.p>
        <div className="relative">
          <AnimatePresence>
            {phase === PHASE.typing && (
              <motion.span
                key="typing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-0 inline-flex items-center rounded-xl rounded-br-sm bg-brand/[.07] px-3 py-2.5 ring-1 ring-brand/20"
              >
                <TypingDots dotClassName="bg-brand" />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            initial={false}
            animate={bubble(phase >= PHASE.reply)}
            transition={{ duration: 0.4, ease }}
            className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-brand/[.07] px-3 py-2 text-[12.5px] text-slate-700 ring-1 ring-brand/20"
          >
            <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.1em] text-brandInk">
              <Sparkles className="h-3 w-3 motion-safe:animate-pulse" /> Replied by OrmiTech AI
            </span>
            Yes — delivery to Khulna takes 2–3 days. Want me to start your order?
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={bubble(phase >= PHASE.reply)}
          transition={{ duration: 0.35, delay: phase >= PHASE.reply ? 0.2 : 0, ease }}
          className="flex flex-wrap justify-end gap-1.5"
        >
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10.5px] font-semibold text-white transition-colors duration-200 hover:bg-brand2">Start order</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-slate-600 ring-1 ring-slate-200 transition-colors duration-200 hover:text-brandInk hover:ring-brand/30">
            Talk to a human
          </span>
        </motion.div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[11px]">
        <span className="text-slate-500">Handled by AI</span>
        <span className="font-medium text-slate-600">no agent needed</span>
      </div>
    </div>
  );
}

function HandoverCard() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_32px_64px_-40px_rgba(13,27,61,.45)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_40px_72px_-40px_rgba(13,27,61,.55)] motion-safe:hover:-translate-y-1">
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
      <Stagger stagger={0.5} delay={1.2}>
        <StaggerItem variants={fadeRight} className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-600">
          <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-[.1em] text-slate-400">AI summary · Facebook</span>
          Wants 50 units every month and asked about bulk discounts.
        </StaggerItem>
        <StaggerItem variants={fadeRight} className="mt-2 rounded-lg bg-brand/[.06] px-3 py-2 text-[12px] text-slate-700 ring-1 ring-brand/15">
          <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-[.1em] text-brandInk">Farhan A. · reply</span>
          Hi Rahim — I’ll send you a custom quote within the hour.
        </StaggerItem>
      </Stagger>
    </div>
  );
}

export default function AIShowcase() {
  return (
    <section id="ai-automation" aria-labelledby="ai-automation-title" className="scroll-mt-24 py-4 lg:py-8">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#F4F7FC] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand/[.06] blur-3xl motion-safe:animate-drift" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <Reveal>
              <SectionHeading id="ai-automation-title" eyebrow={aiShowcase.eyebrow} title={aiShowcase.title} description={aiShowcase.description} />
              <Stagger as="ul" stagger={0.08} delay={0.15} className="mt-7 grid gap-3 sm:grid-cols-2">
                {aiShowcase.points.map(point => (
                  <StaggerItem as="li" variants={fadeRight} key={point} className="group flex items-start gap-2.5 text-[15px] text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand transition-transform duration-300 motion-safe:group-hover:scale-125" strokeWidth={3} aria-hidden />
                    {point}
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" arrow>Get started</ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" icon={Workflow}>See how it works</ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                role="img"
                aria-label="Illustration of OrmiTech AI answering a delivery question, then handing a wholesale request to a human agent with an AI summary"
                className="grid gap-4 sm:grid-cols-2 sm:items-start"
              >
                <div className="motion-safe:animate-float">
                  <AssistantCard />
                </div>
                <div className="sm:mt-10 motion-safe:animate-float [animation-delay:-3s]">
                  <HandoverCard />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
