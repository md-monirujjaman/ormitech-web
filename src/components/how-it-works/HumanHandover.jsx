"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, FileText, Send, UserCheck } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import { PulseDot } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { handover } from "@/data/howItWorks";

const AUTO_SWITCH_MS = 3500;
const appear = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35, ease } };

// Starts in AI mode and switches to the team once in view. The visitor can flip the switch at any time.
export default function HumanHandover() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [human, setHuman] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion || touched) return;
    const timer = setTimeout(() => setHuman(true), AUTO_SWITCH_MS);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, touched]);

  function toggle() {
    setTouched(true);
    setHuman(value => !value);
  }

  const activeStep = human ? 3 : 1;

  return (
    <section id="handover" aria-labelledby="handover-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <Reveal>
            <SectionHeading id="handover-title" eyebrow={handover.eyebrow} title={handover.title} description={handover.description} />
          </Reveal>

          <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Handover flow">
            {handover.flow.map((step, index) => {
              const reached = index <= activeStep;
              return (
                <li key={step} className={`rounded-xl border px-3 py-2.5 transition-colors duration-500 ${reached ? "border-brand/30 bg-brand/[.05]" : "border-slate-200/80 bg-white"}`}>
                  <span className={`block text-[11px] font-bold tabular-nums ${reached ? "text-brandInk" : "text-slate-400"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-0.5 block text-[13px] font-semibold leading-snug text-navy">{step}</span>
                </li>
              );
            })}
          </ol>

          <h3 className="mt-8 text-sm font-semibold text-navy">Handover rules you control</h3>
          <Stagger as="ul" stagger={0.08} className="mt-3 space-y-2.5">
            {handover.rules.map(rule => {
              const Icon = rule.icon;
              const fired = human && rule.id === handover.firedRule;
              return (
                <StaggerItem
                  as="li"
                  variants={fadeRight}
                  key={rule.id}
                  className={`group flex items-start gap-3 rounded-xl border p-3 transition-[border-color,background-color,box-shadow] duration-500 ${fired ? "border-brand/40 bg-brand/[.05] shadow-[0_12px_28px_-20px_rgba(242,13,69,.6)]" : "border-slate-200/80 bg-white hover:border-slate-300"}`}
                >
                  <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500 ${fired ? "bg-brand text-white" : "bg-brand/[.08] text-brand"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-navy">{rule.title}</span>
                    <span className="block text-[13px] leading-5 text-slate-600">{rule.text}</span>
                  </span>
                  {fired && <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-semibold text-white">Triggered</span>}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-40">
          <div ref={ref} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]">
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3">
              <Initials name="Rahim U." tone="from-sky-400 to-blue-600" className="h-9 w-9 text-[11px]" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-navy">Rahim U.</p>
                <p className="flex items-center gap-1 text-[11.5px] text-slate-500">
                  <ChannelLogo name="Facebook" className="h-3 w-3" />
                  Facebook · Wholesale enquiry
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={human}
                aria-label="Human takeover"
                onClick={toggle}
                className="relative order-last grid w-full grid-cols-2 rounded-full bg-slate-100 p-1 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:order-none sm:w-auto"
              >
                <motion.span
                  aria-hidden
                  className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full shadow-sm ${human ? "bg-brand" : "bg-navy"}`}
                  animate={{ left: human ? "50%" : "4px" }}
                  transition={{ duration: 0.35, ease }}
                />
                <span className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 transition-colors duration-300 ${human ? "text-slate-500" : "text-white"}`}>
                  <Bot aria-hidden className="h-3.5 w-3.5" />
                  AI active
                </span>
                <span className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 transition-colors duration-300 ${human ? "text-white" : "text-slate-500"}`}>
                  <UserCheck aria-hidden className="h-3.5 w-3.5" />
                  Human
                </span>
              </button>
            </div>

            <div className="min-h-[360px] space-y-3 bg-slate-50/60 p-4 sm:p-5">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[13.5px] text-slate-700 ring-1 ring-slate-200/70">Can I get a wholesale price for 50 units every month?</p>
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-brand/[.07] px-3.5 py-2.5 text-[13.5px] text-slate-700 ring-1 ring-brand/20">
                <span className="mb-0.5 flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[.1em] text-brandInk">
                  <Bot aria-hidden className="h-3 w-3" />
                  OrmiTech AI
                </span>
                Great question! Bulk orders need a quick check from our team — let me bring someone in.
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {human ? (
                  <motion.div key="human" {...appear} className="space-y-3">
                    <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] font-medium text-slate-600 ring-1 ring-slate-200">
                      <UserCheck aria-hidden className="h-3.5 w-3.5 text-brand" />
                      Farhan A. took over · AI paused
                    </p>
                    <div className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5">
                      <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[.12em] text-slate-500">
                        <FileText aria-hidden className="h-3.5 w-3.5 text-brand" />
                        AI summary for the agent
                      </p>
                      <p className="mt-1 text-[13px] text-slate-700">Wants 50 units monthly and asked about a bulk discount. Rule: order needs manual confirmation.</p>
                    </div>
                    <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-[13.5px] text-white">
                      <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-[.1em] text-white/70">Farhan A. · Sales</span>
                      Hi Rahim — I’ll send you a custom quote within the hour.
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="ai" {...appear} className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] font-medium text-slate-600 ring-1 ring-slate-200">
                    <PulseDot />
                    Needs attention · handover rule matched
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
              <span className="flex-1 truncate rounded-lg bg-slate-50 px-3 py-2 text-[13px] text-slate-500 ring-1 ring-slate-100">
                {human ? "Reply as Farhan A.…" : "OrmiTech AI is handling this conversation"}
              </span>
              <span aria-hidden className={`flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors duration-300 ${human ? "bg-brand" : "bg-slate-300"}`}>
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
