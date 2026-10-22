"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { Bot, Check, FileText, MessageCircleMore, Send, UserRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import PhoneChat, { phaseNames } from "./PhoneChat";
import { ease } from "@/components/ui/Reveal";
import { caveat, interTight } from "@/styles/fonts";

const steps = [
  { label: "Incoming", title: "Every conversation, one inbox.", text: "See all customer messages from every channel in one place, so you never miss a thing.", chips: ["Facebook", "Instagram", "WhatsApp", "Website"], icon: MessageCircleMore },
  { label: "Contacts", title: "Conversations turn into contacts.", text: "Talk to someone once, and their history sits on the contact for next time.", chips: ["Tags", "Notes", "History"], icon: Send },
  { label: "AI automation", title: "AI handles the routine.", text: "Automate replies, qualify leads and save hours with intelligent workflows.", chips: ["Auto-reply", "Lead qualify", "Smart tags"], icon: Bot },
  { label: "Handover", title: "Hand over when it matters.", text: "Complex queries get routed to your team with the full conversation history.", chips: ["Human support", "Context", "Full history"], icon: UserRound },
  { label: "Internal notes", title: "Move leads through your stages.", text: "Keep your team aligned with internal notes, tags and custom stages.", chips: ["Notes", "Tags", "Pipeline"], icon: FileText }
];

const channels = ["Facebook", "Instagram", "WhatsApp", "Website"];

const rise = { hidden: { opacity: 0, y: 12, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } }, exit: { opacity: 0, transition: { duration: 0.15 } } };

function DotGrid({ className = "", cols = 3, rows = 3 }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute grid gap-3 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 4px)` }}>
      {Array.from({ length: cols * rows }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-brand/60" />
      ))}
    </div>
  );
}

// Small cards that float beside the phone and say what just happened in the conversation.
const happenings = [
  { title: "New message", text: "Sarah asks about pricing", icon: "channel" },
  { title: "Contact saved", text: "Tags, notes and history start here", icon: Send },
  { title: "AI answered", text: "A routine question, no agent needed", icon: Bot },
  { title: "Handed over", text: "Farhan A. received the full history", icon: UserRound },
  { title: "Lead qualified", text: "Follow-up is set for tomorrow", icon: FileText }
];

function Happening({ step }) {
  const item = happenings[step];
  const Icon = item.icon;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: -14, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -8, scale: 0.98 }}
        transition={{ duration: 0.1, ease }}
        className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_22px_44px_-22px_rgba(13,27,61,.45)] backdrop-blur"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          {Icon === "channel" ? <ChannelLogo name="Facebook" className="h-5 w-5" /> : <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[12.5px] font-semibold text-[#0B0D12]">{item.title}</span>
          <span className="mt-0.5 block text-[11px] text-slate-500">{item.text}</span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

function RecordCard({ step }) {
  return (
    <div className="rounded-2xl border border-white bg-white/95 p-3.5 shadow-[0_22px_44px_-22px_rgba(13,27,61,.45)] backdrop-blur">
      <p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">One customer record</p>
      <ul className="mt-2.5 space-y-1.5">
        {phaseNames.map((name, index) => {
          const done = step >= index;
          return (
            <li key={name} className={`flex items-center gap-2 text-[11.5px] font-semibold transition-colors duration-100 ${done ? "text-[#0B0D12]" : "text-slate-300"}`}>
              <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-[background-color,color] duration-100 ${done ? "bg-emerald-500 text-white" : "bg-slate-100 text-transparent"}`}>
                <Check className="h-2.5 w-2.5" strokeWidth={3.2} />
              </span>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const AUTO_ADVANCE_MS = 5500;

export default function FeaturesBento() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Soft parallax on the background shapes as the section scrolls past.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const circleY = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  // Steps play on their own until a visitor picks one.
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setActive(current => (current + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [autoplay]);

  const goToStep = index => {
    setAutoplay(false);
    setActive(index);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="features-bento" aria-labelledby="connected-title" className={`${interTight.className} relative overflow-clip bg-[radial-gradient(ellipse_at_top,#FFF3F6_0%,#FFFFFF_55%)] py-16 sm:py-20 lg:pb-28 lg:pt-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#FFC3D0] to-transparent opacity-70 blur-2xl" />
        <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -bottom-32 -left-[170px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
        <DotGrid className="left-[8%] top-40 hidden lg:grid" />
        <DotGrid className="right-[10%] top-28 hidden lg:grid" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              AI chat examples
            </span>
            <h2 id="connected-title" className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[46px]">
              Finally, <span className="text-brand">everything&apos;s</span> connected
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-500">
              Every conversation, task and handover flows back to one customer record. One workspace, one tool, total clarity.
            </p>
          </motion.div>

          <div className="mt-12 lg:mt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
              <ol className="min-w-0 space-y-3">
                {steps.map((step, index) => {
                  const isActive = index === active;
                  const Icon = step.icon;
                  return (
                    <li key={step.title}>
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[transform,box-shadow,background-color,border-color,opacity] duration-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:px-6 ${
                          isActive
                            ? "border-brand/60 bg-[#FFF0F4] shadow-[0_24px_50px_-26px_rgba(242,13,69,.55)] motion-safe:translate-x-1.5 motion-safe:scale-[1.015]"
                            : "border-transparent bg-white opacity-60 shadow-[0_1px_2px_rgba(13,27,61,.05),0_20px_40px_-30px_rgba(13,27,61,.3)] hover:opacity-100"
                        }`}
                      >
                        <span aria-hidden className={`absolute bottom-0 left-0 top-0 w-1.5 origin-top rounded-l-2xl bg-brand transition-transform duration-100 ${isActive ? "scale-y-100" : "scale-y-0"}`} />
                        <span aria-hidden className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#C1093A] text-[13px] font-bold text-white ring-[6px] transition-[box-shadow] duration-100 ${isActive ? "ring-brand/20" : "ring-brand/10"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[10.5px] font-bold uppercase tracking-[.14em] text-brand">{step.label}</span>
                          <span className="mt-1 block text-[17px] font-semibold tracking-[-0.01em] text-[#0B0D12]">{step.title}</span>
                          <span className={`grid transition-[grid-template-rows,opacity] duration-100 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <span className="overflow-hidden">
                              <span className="mt-1.5 block max-w-sm text-[13.5px] leading-6 text-slate-500">{step.text}</span>
                              <span className="mt-3.5 flex flex-wrap gap-2">
                                {step.chips.map(chip => (
                                  <span key={chip} className="rounded-full border border-brand/20 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                                    {chip}
                                  </span>
                                ))}
                              </span>
                            </span>
                          </span>
                        </span>
                        <span aria-hidden className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-100 sm:flex ${isActive ? "bg-white text-brand motion-safe:scale-110" : "bg-brand/10 text-brand"}`}>
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <motion.div className="relative min-w-0" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease }}>
                <div aria-hidden className="pointer-events-none absolute -top-10 left-[28%] h-48 w-48 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
                <div aria-hidden className="pointer-events-none absolute -right-14 top-[32%] h-44 w-44 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
                <div aria-hidden className="pointer-events-none absolute -bottom-6 left-1/4 h-56 w-56 rounded-full bg-[#FFC9D5] opacity-50 blur-3xl" />
                <DotGrid className="-right-4 top-20 hidden xl:grid" cols={4} rows={3} />

                <div className="relative motion-safe:animate-float">
                  <PhoneChat step={active} />
                  <motion.div aria-hidden animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 top-[15%] hidden w-[190px] lg:block xl:-left-12">
                    <Happening step={active} />
                  </motion.div>
                  <motion.div aria-hidden animate={{ y: [0, 9, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute -right-2 bottom-[16%] hidden w-[150px] lg:block xl:-right-12">
                    <RecordCard step={active} />
                  </motion.div>
                </div>

                <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3.5">
                  {channels.map((name, index) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, y: 14, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease }}
                      whileHover={{ y: -4 }}
                      className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white shadow-[0_14px_30px_-16px_rgba(13,27,61,.35)] ring-1 ring-slate-100"
                    >
                      <ChannelLogo name={name} className="h-7 w-7" />
                    </motion.span>
                  ))}
                </div>

                <div className="relative mt-4 flex items-start justify-center gap-2 ">
                  <svg aria-hidden viewBox="0 0 60 50" className="mt-2 h-10 w-12 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M52 40 C 34 46, 12 36, 10 10" />
                    <path d="M3 18 L10 8 L18 16" />
                  </svg>
                  <p className={`${caveat.className} -rotate-3 text-[23px] leading-tight text-brand`}>
                    All your channels,
                    <br />
                    one inbox.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div className="mx-auto mt-14 flex max-w-3xl items-center gap-5 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span aria-hidden className="hidden h-px flex-1 bg-slate-200 sm:block" />
            <p className="text-[14.5px] text-slate-500">All the tools you need. For every step of the customer journey.</p>
            <span aria-hidden className="hidden h-px flex-1 bg-slate-200 sm:block" />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
