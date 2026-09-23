"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, Workflow } from "lucide-react";
import { aiChatbotPage } from "@/data/featurePages";
import { PulseDot, TypingDots, useTimeline } from "@/components/ui/effects";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import BridgeCallout from "./BridgeCallout";
import CapabilityGrid from "./CapabilityGrid";
import CheckList from "./CheckList";
import FeaturePageHero from "./FeaturePageHero";

const PHASE = { question: 1, typing: 2, reply: 3 };
const bubble = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 8 });

function AssistantMockup() {
  const ref = useRef(null);
  const phase = useTimeline(ref, [300, 950, 2200]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="OrmiTech AI answering a delivery question in seconds, with an option to start an order or talk to a human"
      className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-5"
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
          className="max-w-[80%] rounded-xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[12.5px] text-slate-600"
        >
          Do you deliver to Khulna?
        </motion.p>
        <div className="relative min-h-[70px]">
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
            className="ml-auto max-w-[88%] rounded-xl rounded-br-sm bg-brand/[.07] px-3 py-2 text-[12.5px] text-slate-700 ring-1 ring-brand/20"
          >
            <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.1em] text-brandInk">
              <Sparkles className="h-3 w-3 motion-safe:animate-pulse" /> Replied by OrmiTech AI
            </span>
            Yes — delivery to Khulna takes 2–3 days. Want me to start your order?
          </motion.div>
        </div>
        <motion.div initial={false} animate={bubble(phase >= PHASE.reply)} transition={{ duration: 0.35, ease }} className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10.5px] font-semibold text-white">Start order</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-slate-600 ring-1 ring-slate-200">Talk to a human</span>
        </motion.div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[11px]">
        <span className="text-slate-500">Handled by AI</span>
        <span className="font-medium text-slate-600">no agent needed</span>
      </div>
    </div>
  );
}

export default function AiChatbotContent() {
  const { hero, capabilities, contextPoints, handoverBridge, useCases } = aiChatbotPage;

  return (
    <>
      <FeaturePageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        visual={<AssistantMockup />}
        secondaryHref="/how-it-works"
        secondaryLabel="See how it works"
        secondaryIcon={Workflow}
      />

      <section id="how-it-works" aria-labelledby="ai-chatbot-how-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#F4F7FC] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand/[.06] blur-3xl motion-safe:animate-drift" />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <SectionHeading id="ai-chatbot-how-title" eyebrow="How it works" title="One assistant, trained on your business." description="OrmiTech AI works inside every conversation, with context from your business and the customer's history." />
                <CapabilityGrid items={capabilities} />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm font-semibold uppercase tracking-[.14em] text-brandInk">Built for context</p>
                <CheckList items={contextPoints} className="mt-4 space-y-3" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BridgeCallout {...handoverBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
