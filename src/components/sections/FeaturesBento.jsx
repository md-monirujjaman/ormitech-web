"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { Bot, FileText, MessageCircleMore, Paperclip, Send, Smile, UserRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { TypingDots } from "@/components/ui/effects";
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

// Conversation that grows as the visitor scrolls through the five steps.
function LiveWindow({ step }) {
  const [aiShown, setAiShown] = useState(false);

  useEffect(() => {
    if (step < 2) {
      setAiShown(false);
      return undefined;
    }
    if (step > 2) {
      setAiShown(true);
      return undefined;
    }
    const timer = setTimeout(() => setAiShown(true), 1200);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div role="img" aria-label="Example live conversation: a customer asks about pricing, the message becomes a contact, AI replies, a teammate takes over and the lead is tracked with internal notes" className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_40px_80px_-36px_rgba(13,27,61,.35)]">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFC145]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3DD68C]" />
      </div>
      <div className="flex items-center justify-between px-5 py-3.5">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-[#0B0D12]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live Conversation
        </p>
        <span className="flex items-center gap-1.5 text-[11.5px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Online
        </span>
      </div>

      <div className="border-t border-slate-100 px-5 pb-4 pt-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 text-[12px] font-semibold text-white">SJ</span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#0B0D12]">Sarah Johnson</p>
            <p className="text-[11px] text-slate-400">Active 2m ago</p>
          </div>
          <AnimatePresence>
            {step >= 4 && (
              <motion.span key="stage" initial="hidden" animate="show" exit="exit" variants={rise} className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-700">
                Lead · Qualified
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex h-[376px] flex-col justify-start gap-2.5 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div key="customer" initial="hidden" animate="show" variants={rise} className="max-w-[86%] self-start rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5">
              <p className="text-[12px] leading-5 text-slate-600">Hi, I&apos;m interested in your product. Can you tell me more about the pricing?</p>
              <p className="mt-1 text-right text-[9.5px] text-slate-400">10:24 AM</p>
            </motion.div>

            {step >= 1 && (
              <motion.div key="contact" initial="hidden" animate="show" exit="exit" variants={rise} className="flex flex-wrap items-center gap-1.5 self-start">
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-semibold text-slate-500">Saved to contacts</span>
                <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10.5px] font-semibold text-brand">Interested</span>
              </motion.div>
            )}

            {step >= 2 && aiShown && (
              <motion.div key="ai" initial="hidden" animate="show" exit="exit" variants={rise} className="max-w-[88%] self-end rounded-2xl rounded-tr-md bg-[#FFE3EA] px-3.5 py-2.5">
                <p className="mb-0.5 flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-[.1em] text-brand">
                  <Bot className="h-3 w-3" /> OrmiTech AI
                </p>
                <p className="text-[12px] leading-5 text-[#8A1230]">Yes, of course! Here&apos;s an overview of our plans. Would you like to see the full details?</p>
                <p className="mt-1 text-right text-[9.5px] text-[#C97A8E]">10:25 AM ✓✓</p>
              </motion.div>
            )}

            {step >= 2 && !aiShown && (
              <motion.div key="typing" initial="hidden" animate="show" exit="exit" variants={rise} className="self-end rounded-2xl bg-[#FFE3EA] px-3.5 py-3">
                <TypingDots dotClassName="bg-brand" />
              </motion.div>
            )}

            {step >= 3 && aiShown && (
              <motion.p key="handover" initial="hidden" animate="show" exit="exit" variants={rise} className="self-center rounded-full border border-dashed border-slate-300 px-3 py-1 text-[10.5px] font-medium text-slate-500">
                Handed over to Farhan A. · full history attached
              </motion.p>
            )}

            {step >= 3 && aiShown && (
              <motion.div key="agent" initial="hidden" animate="show" exit="exit" variants={rise} className="max-w-[88%] self-end rounded-2xl rounded-tr-md bg-[#FFE3EA] px-3.5 py-2.5">
                <p className="mb-0.5 text-[9.5px] font-bold uppercase tracking-[.1em] text-brand">Farhan A.</p>
                <p className="text-[12px] leading-5 text-[#8A1230]">Hi Sarah, I&apos;ll walk you through the plans.</p>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div key="note" initial="hidden" animate="show" exit="exit" variants={rise} className="rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-2">
                <p className="text-[9.5px] font-bold uppercase tracking-[.1em] text-amber-700">Internal note</p>
                <p className="text-[11.5px] leading-5 text-slate-600">Wants a plan for her team. Follow up tomorrow.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
        <span className="flex h-10 flex-1 items-center rounded-xl border border-slate-200 px-3 text-[12px] text-slate-400">Type your message...</span>
        <Smile aria-hidden className="h-[18px] w-[18px] text-slate-400" />
        <Paperclip aria-hidden className="h-[18px] w-[18px] text-slate-400" />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_20px_-10px_rgba(242,13,69,.9)]">
          <Send aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export default function FeaturesBento() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  // Soft parallax on the background shapes as the section scrolls past.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const circleY = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-38% 0px -50% 0px" }
    );
    cardRefs.current.forEach(node => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="features-bento" aria-labelledby="connected-title" className={`${interTight.className} relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#FFF3F6_0%,#FFFFFF_55%)] py-16 sm:py-20 lg:py-28`}>
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

          <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <ol className="space-y-4">
              {steps.map((step, index) => {
                const isActive = index === active;
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    ref={node => {
                      cardRefs.current[index] = node;
                    }}
                    data-index={index}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: 0.05, ease }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-[transform,box-shadow,background-color,border-color] duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:p-6 ${
                        isActive
                          ? "border-brand/60 bg-[#FFF0F4] shadow-[0_24px_50px_-26px_rgba(242,13,69,.55)] motion-safe:scale-[1.015]"
                          : "border-transparent bg-white shadow-[0_1px_2px_rgba(13,27,61,.05),0_20px_40px_-30px_rgba(13,27,61,.3)] hover:border-brand/15 motion-safe:hover:-translate-y-0.5"
                      }`}
                    >
                      <span aria-hidden className={`absolute bottom-0 left-0 top-0 w-1.5 origin-top rounded-l-2xl bg-brand transition-transform duration-500 ${isActive ? "scale-y-100" : "scale-y-0"}`} />
                      <span aria-hidden className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#C1093A] text-[13px] font-bold text-white ring-[6px] transition-[box-shadow] duration-500 ${isActive ? "ring-brand/20" : "ring-brand/10"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10.5px] font-bold uppercase tracking-[.14em] text-brand">{step.label}</span>
                        <span className="mt-1.5 block text-[17px] font-semibold tracking-[-0.01em] text-[#0B0D12]">{step.title}</span>
                        <span className="mt-1.5 block max-w-sm text-[13.5px] leading-6 text-slate-500">{step.text}</span>
                        <span className="mt-4 flex flex-wrap gap-2">
                          {step.chips.map(chip => (
                            <span key={chip} className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${isActive ? "border-brand/20 bg-white text-slate-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                              {chip}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span aria-hidden className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-500 sm:flex ${isActive ? "bg-white text-brand motion-safe:scale-110" : "bg-brand/10 text-brand"}`}>
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ol>

            <motion.div className="relative lg:sticky lg:top-28" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease }}>
              <div aria-hidden className="pointer-events-none absolute -top-10 left-[28%] h-48 w-48 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -right-14 top-[32%] h-44 w-44 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -bottom-6 left-1/4 h-56 w-56 rounded-full bg-[#FFC9D5] opacity-50 blur-3xl" />
              <DotGrid className="-right-4 top-20 hidden xl:grid" cols={4} rows={3} />

              <div className="relative motion-safe:animate-float">
                <LiveWindow step={active} />
              </div>

              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3.5">
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

              <div className="relative mt-4 flex items-start justify-center gap-2">
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

          <motion.div className="mx-auto mt-14 flex max-w-3xl items-center gap-5 text-center lg:mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span aria-hidden className="hidden h-px flex-1 bg-slate-200 sm:block" />
            <p className="text-[14.5px] text-slate-500">All the tools you need. For every step of the customer journey.</p>
            <span aria-hidden className="hidden h-px flex-1 bg-slate-200 sm:block" />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
