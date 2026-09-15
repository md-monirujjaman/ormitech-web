"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dumbbell, RotateCcw, Sparkles } from "lucide-react";
import Initials from "@/components/ui/Initials";
import { PulseDot, TypingDots, useTimeline } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { respond } from "@/data/howItWorks";

const PHASE = { message: 1, typing: 2, reply: 3, product: 4, quickReplies: 5 };
const show = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 8 });

function ChatDemo() {
  const ref = useRef(null);
  const [replay, setReplay] = useState(0);
  const phase = useTimeline(ref, [300, 900, 2100, 2800, 3400], replay);
  const { conversation } = respond;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
        <Initials name="Sadia R." tone="from-fuchsia-400 to-pink-600" className="h-8 w-8 text-[10px]" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-navy">Sadia R.</p>
          <p className="text-[11px] text-slate-500">Instagram · Replied by OrmiTech AI</p>
        </div>
        <button
          type="button"
          onClick={() => setReplay(count => count + 1)}
          className="group ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-brand/30 hover:text-brandInk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <RotateCcw aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 motion-safe:group-hover:-rotate-180" />
          Replay
        </button>
      </div>

      <div aria-live="polite" className="min-h-[380px] space-y-3 bg-slate-50/60 p-4 sm:p-5">
        <motion.p initial={false} animate={show(phase >= PHASE.message)} transition={{ duration: 0.35, ease }} className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[13.5px] text-slate-700 ring-1 ring-slate-200/70">
          {conversation.customer}
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
                className="absolute right-0 top-0 inline-flex items-center gap-2 rounded-2xl rounded-br-md bg-brand/[.07] px-3.5 py-3 text-[12px] font-medium text-brandInk ring-1 ring-brand/20"
              >
                <TypingDots dotClassName="bg-brand" />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div initial={false} animate={show(phase >= PHASE.reply)} transition={{ duration: 0.4, ease }} className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-brand/[.07] px-3.5 py-2.5 text-[13.5px] leading-6 text-slate-700 ring-1 ring-brand/20">
            <span className="mb-0.5 flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[.1em] text-brandInk">
              <Sparkles aria-hidden className="h-3 w-3" />
              OrmiTech AI
            </span>
            {conversation.reply}
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: phase >= PHASE.product ? 1 : 0, scale: phase >= PHASE.product ? 1 : 0.96, y: phase >= PHASE.product ? 0 : 8 }}
          transition={{ duration: 0.45, ease }}
          className="group ml-auto flex max-w-[88%] gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_18px_36px_-24px_rgba(13,27,61,.4)] transition-shadow hover:shadow-[0_24px_44px_-24px_rgba(13,27,61,.45)]"
        >
          <span aria-hidden className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF4F6] to-[#F4F7FC] text-brand ring-1 ring-slate-100">
            <Dumbbell className="h-7 w-7 transition-transform duration-500 motion-safe:group-hover:-rotate-12" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-slate-500">Recommended</p>
            <p className="text-[14px] font-semibold text-navy">{conversation.product.name}</p>
            <p className="text-[12px] text-slate-500">{conversation.product.detail}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-bold text-navy">{conversation.product.price}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <PulseDot className="bg-emerald-500" />
                {conversation.product.stock}
              </span>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <span className="rounded-lg bg-brand px-2.5 py-1 text-[12px] font-semibold text-white">Order now</span>
              <span className="rounded-lg bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-600 ring-1 ring-slate-200">More details</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={false} animate={show(phase >= PHASE.quickReplies)} transition={{ duration: 0.35, ease }} className="flex flex-wrap justify-end gap-1.5">
          {["Is it good for daily use?", "Delivery time?", "Other flavours"].map(reply => (
            <span key={reply} className="rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-slate-600 ring-1 ring-slate-200">
              {reply}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function AIRecommendation() {
  return (
    <section id="respond" aria-labelledby="respond-title" className="scroll-mt-36 py-4 lg:py-8">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#F4F7FC] px-5 py-12 sm:px-10 lg:px-12 lg:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/[.06] blur-3xl motion-safe:animate-drift" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-14">
            <Reveal className="lg:order-last">
              <SectionHeading id="respond-title" eyebrow={respond.eyebrow} title={respond.title} description={respond.description} />
              <Stagger as="ul" stagger={0.1} delay={0.1} className="mt-8 space-y-4">
                {respond.points.map(point => (
                  <StaggerItem as="li" key={point.title} className="group flex gap-4">
                    <IconTile icon={point.icon} interactive />
                    <div>
                      <h3 className="text-base font-semibold text-navy">{point.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{point.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
            <Reveal delay={0.1}>
              <ChatDemo />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
