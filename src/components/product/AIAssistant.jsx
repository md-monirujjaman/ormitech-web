"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, FileText, Lightbulb, PackageCheck, ScanSearch, Sparkles } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Initials from "@/components/ui/Initials";
import { PulseDot, TypingDots, useTimeline } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { aiAssistant } from "@/data/product";
import ProductTourButton from "@/components/ui/ProductTourButton";

const PHASE = { message: 1, thinking: 2, reply: 3, insights: 4, action: 5 };
const show = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 8 });

function InsightCard({ icon: Icon, title, visible, delay = 0, highlight = false, children }) {
  return (
    <motion.div
      initial={false}
      animate={show(visible)}
      transition={{ duration: 0.4, delay: visible ? delay : 0, ease }}
      className={`rounded-xl border p-3 transition-shadow duration-300 hover:shadow-[0_14px_28px_-20px_rgba(13,27,61,.4)] ${highlight ? "border-brand/25 bg-brand/[.04]" : "border-slate-200/80 bg-white"}`}
    >
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">
        <Icon className="h-3.5 w-3.5 text-brand" />
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
    </motion.div>
  );
}

// The conversation example continues the "#4821 · swapped to M" story from the homepage contact record.
function AssistantInterface() {
  const ref = useRef(null);
  const phase = useTimeline(ref, [300, 900, 2200, 3000, 3800]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="OrmiTech AI assistant: a customer asks to exchange order 4821 for a medium; the assistant suggests a reply, summarizes the conversation, detects an exchange request, extracts the order details and recommends creating the exchange"
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]"
    >
      <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white">
          <Bot className="h-3.5 w-3.5" />
        </span>
        <p className="text-[12.5px] font-semibold text-navy">OrmiTech AI assistant</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <PulseDot className="bg-emerald-500" />
          Active
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div className="p-4 sm:p-5 md:border-r md:border-slate-100">
          <div className="flex items-center gap-2.5">
            <Initials name="Nusrat J." className="h-8 w-8 text-[10px]" />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-navy">Nusrat J.</p>
              <p className="text-[10.5px] text-slate-500">Website chat · Repeat buyer</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <motion.p
              initial={false}
              animate={show(phase >= PHASE.message)}
              transition={{ duration: 0.35, ease }}
              className="max-w-[88%] rounded-xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[12.5px] leading-5 text-slate-700"
            >
              Hi! I ordered the linen dress last week (#4821). Can I exchange it for a medium?
            </motion.p>

            <div className="relative min-h-[140px]">
              <AnimatePresence>
                {phase === PHASE.thinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-x-0 top-0 flex items-center gap-2 rounded-xl border border-dashed border-brand/30 bg-brand/[.03] px-3 py-2.5 text-[12px] font-medium text-brandInk"
                  >
                    <Sparkles className="h-3.5 w-3.5 motion-safe:animate-pulse" />
                    Reading the conversation
                    <TypingDots dotClassName="bg-brand" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div initial={false} animate={show(phase >= PHASE.reply)} transition={{ duration: 0.4, ease }} className="rounded-xl border border-brand/20 bg-brand/[.05] p-3">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-brandInk">
                  <Sparkles className="h-3 w-3" />
                  Suggested reply
                </p>
                <p className="mt-1.5 text-[12.5px] leading-5 text-slate-700">
                  Of course, Nusrat! Medium is in stock. I can set up the exchange for order #4821 and arrange a pickup.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">Send</span>
                  <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">Edit</span>
                  <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">Shorter</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5 md:border-t-0">
          <InsightCard icon={FileText} title="Conversation summary" visible={phase >= PHASE.reply} delay={0.15}>
            <p className="text-[12px] leading-5 text-slate-700">Wants to exchange order #4821 for size M. Repeat customer, happy with the product.</p>
          </InsightCard>
          <InsightCard icon={ScanSearch} title="Detected intent" visible={phase >= PHASE.insights}>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full bg-navy px-2 py-0.5 text-[11px] font-semibold text-white">Exchange request</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Positive</span>
            </div>
          </InsightCard>
          <InsightCard icon={PackageCheck} title="Order details" visible={phase >= PHASE.insights} delay={0.15}>
            <dl className="grid grid-cols-3 gap-2 text-[11.5px]">
              {[
                ["Order", "#4821"],
                ["Item", "Linen dress"],
                ["Size", "S → M"]
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="truncate font-semibold text-navy">{value}</dd>
                </div>
              ))}
            </dl>
          </InsightCard>
          <InsightCard icon={Lightbulb} title="Recommended action" visible={phase >= PHASE.action} highlight>
            <span className="flex items-center justify-between gap-2 rounded-lg bg-brand px-3 py-2 text-[12px] font-semibold text-white shadow-[0_10px_20px_-12px_rgba(242,13,69,.8)]">
              <span className="flex items-center gap-2">
                <PulseDot className="bg-white" />
                Create exchange for #4821
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </InsightCard>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  return (
    <section id="ai-assistant" aria-labelledby="ai-assistant-title" className="scroll-mt-24 py-4 lg:py-8">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-14">
        <Reveal delay={0.1} className="lg:order-last">
          <SectionHeading id="ai-assistant-title" eyebrow={aiAssistant.eyebrow} title={aiAssistant.title} description={aiAssistant.description} />
          <Stagger as="ul" stagger={0.06} delay={0.15} className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {aiAssistant.capabilities.map(({ label, icon: Icon }, index) => (
              <StaggerItem
                as="li"
                variants={fadeRight}
                key={label}
                className={`group flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5 text-sm font-medium text-navy transition-[border-color,box-shadow] duration-300 hover:border-brand/25 hover:shadow-[0_12px_24px_-18px_rgba(13,27,61,.35)] ${index === aiAssistant.capabilities.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/[.08] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>Get started</ButtonLink>
            <ProductTourButton />
          </div>
        </Reveal>

        <Reveal>
          <AssistantInterface />
        </Reveal>
      </div>
    </section>
  );
}
