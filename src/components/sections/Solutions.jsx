"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Image as ImageIcon, Link2, MessageCircle, Send, TrendingUp, Zap } from "lucide-react";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { TypingDots } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";

const TAB_DURATION = 5.5;

const tabs = [
  { title: "All-channel Support", text: "OrmiTech attends to your customers across your website and social channels, 24/7, and helps you close more sales.", icon: MessageCircle },
  { title: "Instant Response", text: "OrmiTech instantly answers across all your platforms and organizes the messages for you.", icon: Zap },
  { title: "Increased Productivity", text: "OrmiTech handles customer conversations all day, so you can focus on growing your business.", icon: TrendingUp }
];

// Illustrative chat examples. The delivery and exchange lines reuse examples already shown on the site.
const scenarios = [
  { greeting: false, carousel: true, question: "What is the price of this?", answer: "This suit is priced at ৳8,120." },
  { greeting: true, carousel: false, question: "Do you deliver to Khulna?", answer: "Yes — delivery to Khulna takes 2–3 days. Want me to start your order?" },
  { greeting: true, carousel: false, question: "Can I exchange it for a medium?", answer: "Of course! I've set up the exchange for order #4821." }
];

function Mark({ className = "" }) {
  return (
    <svg aria-hidden viewBox={markViewBox} className={className}>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

function BotAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-brand">
      <Mark className="h-4 w-4" />
    </span>
  );
}

const rise = { hidden: { opacity: 0, y: 10, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } } };

// Plays the conversation for the active scenario: (product card) -> question -> typing -> answer.
function PhoneChat({ scenario, instant }) {
  const [phase, setPhase] = useState(instant ? 4 : 0);

  useEffect(() => {
    if (instant) {
      setPhase(4);
      return undefined;
    }
    setPhase(0);
    const timers = [250, 1100, 1900, 3100].map((delay, index) => setTimeout(() => setPhase(index + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, [scenario, instant]);

  const data = scenarios[scenario];

  return (
    <div className="flex h-full flex-col justify-end gap-2.5 px-3 pb-2">
      {data.greeting && phase >= 1 && (
        <motion.div initial="hidden" animate="show" variants={rise} className="flex items-end gap-2">
          <BotAvatar />
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[.12] px-3 py-2 text-[11.5px] leading-snug text-white">Hi! How can I help you today?</p>
        </motion.div>
      )}

      {data.carousel && phase >= 1 && (
        <motion.div initial="hidden" animate="show" variants={rise} className="relative mx-auto w-[86%]">
          <div className="flex gap-px overflow-hidden rounded-xl bg-white p-1">
            <Image src="/images/product-suit-brown.jpg" alt="Brown three-piece suit on a mannequin" width={156} height={246} className="h-[104px] w-1/2 rounded-lg object-cover" />
            <Image src="/images/product-suit-blue.jpg" alt="Navy blue suit on a mannequin" width={162} height={246} className="h-[104px] w-1/2 rounded-lg object-cover" />
          </div>
          <span aria-hidden className="absolute -left-2 bottom-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-black text-white">
            <ArrowLeft className="h-3 w-3" />
          </span>
          <span aria-hidden className="absolute -right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black text-white">
            <ArrowRight className="h-3 w-3" />
          </span>
          <span aria-hidden className="mt-1.5 flex justify-center gap-1">
            {[0, 1, 2].map(dot => (
              <span key={dot} className={`h-1 w-1 rounded-full ${dot === 0 ? "bg-white" : "bg-white/40"}`} />
            ))}
          </span>
        </motion.div>
      )}

      {phase >= 2 && (
        <motion.div initial="hidden" animate="show" variants={rise} className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white shadow-[0_10px_20px_-12px_rgba(242,13,69,.9)]">
          <p className="text-[11.5px] font-medium leading-snug">{data.question}</p>
          <p className="mt-0.5 text-right text-[8px] text-white/70">09:41 ✓✓</p>
        </motion.div>
      )}

      <div className="min-h-[54px]">
        <AnimatePresence mode="wait">
          {phase === 3 && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
              <BotAvatar />
              <span className="inline-flex rounded-2xl rounded-bl-md bg-white/[.12] px-3 py-3">
                <TypingDots dotClassName="bg-white/70" />
              </span>
            </motion.div>
          )}
          {phase >= 4 && (
            <motion.div key="answer" initial="hidden" animate="show" variants={rise} className="flex items-end gap-2">
              <BotAvatar />
              <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/[.12] px-3 py-2 text-white">
                <p className="text-[11.5px] font-medium leading-snug">{data.answer}</p>
                <p className="mt-0.5 text-right text-[8px] text-white/50">09:41</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Phone({ scenario, instant }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-[34px] bg-white p-[9px] shadow-[0_40px_80px_-30px_rgba(242,13,69,.45),0_18px_40px_-20px_rgba(13,27,61,.35)] ring-1 ring-black/[.04]">
        <div className="relative flex h-[400px] flex-col overflow-hidden rounded-[26px] bg-black">
          <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-white">
            <span>9:41</span>
            <span aria-hidden className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                {[3, 5, 7, 9].map(height => (
                  <span key={height} className="w-[2.5px] rounded-sm bg-white" style={{ height }} />
                ))}
              </span>
              <span className="ml-0.5 h-2.5 w-4 rounded-[3px] border border-white/80 p-[1px]">
                <span className="block h-full w-4/5 rounded-[1px] bg-white" />
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-4 pb-2.5 pt-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand ring-2 ring-brand/70">
              <Mark className="h-[18px] w-[18px]" />
            </span>
            <div className="leading-tight">
              <p className="text-[12.5px] font-semibold text-white">OrmiTech</p>
              <p className="flex items-center gap-1 text-[9.5px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1">
            <PhoneChat scenario={scenario} instant={instant} />
          </div>

          <div className="flex items-center gap-2 px-3 pb-3.5 pt-1.5">
            <ImageIcon aria-hidden className="h-4 w-4 shrink-0 text-white/80" />
            <Link2 aria-hidden className="h-4 w-4 shrink-0 text-white/80" />
            <span className="flex h-8 flex-1 items-center rounded-full bg-white/[.12] px-3 text-[10.5px] text-white/50">Type a message...</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_16px_-8px_rgba(242,13,69,.9)]">
              <Send aria-hidden className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Solutions() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const autoplay = !reduceMotion;

  const select = index => {
    setActive(index);
    setCycle(value => value + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="solutions" aria-labelledby="solutions-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-white to-[#FFF7F9] py-16 sm:py-20 lg:py-28`}>
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                AI Chat
              </span>
              <h2 id="solutions-title" className="mt-5 max-w-xl text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[44px]">
                OrmiTech replies to all of your customers so <span className="text-brand">you can focus on growth</span>
              </h2>
              <p className="mt-4 text-base text-slate-500 sm:text-lg">Just like your superhuman sales agent.</p>
            </motion.div>

            <div role="tablist" aria-label="OrmiTech benefits" className="relative mt-9 max-w-xl">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-black/[.06]" />
              {tabs.map((tab, index) => {
                const isActive = index === active;
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(index)}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.1, ease }}
                    className="group relative flex w-full items-start gap-4 rounded-r-xl py-4 pl-7 text-left transition-colors duration-300 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:pl-8"
                  >
                    <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px] overflow-hidden rounded-full">
                      {isActive &&
                        (autoplay ? (
                          <motion.span
                            key={cycle}
                            className="block w-full rounded-full bg-brand"
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            transition={{ duration: TAB_DURATION, ease: "linear" }}
                            onAnimationComplete={() => select((index + 1) % tabs.length)}
                          />
                        ) : (
                          <span className="block h-full w-full rounded-full bg-brand" />
                        ))}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform,box-shadow] duration-300 motion-safe:group-hover:scale-105 bg-brand/10 text-brand ${isActive ? "ring-4 ring-brand/15" : ""}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-[15.5px] font-semibold transition-colors duration-300 text-[#0B0D12]`}>{tab.title}</span>
                      <span className={`mt-1 block text-[13.5px] leading-6 transition-colors duration-300 text-slate-500`}>{tab.text}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            id="solutions-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="relative mx-auto w-[300px] max-w-full py-6 lg:ml-auto lg:mr-20"
          >
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-[52%] -translate-y-[44%]">
              <div className="h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#FFD9E1] to-[#FFB8C8] motion-safe:animate-drift" />
            </div>
            <div aria-hidden className="pointer-events-none absolute -right-[44px] top-[18%] h-[190px] w-[190px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
            <div aria-hidden className="pointer-events-none absolute -right-9 -top-1 grid grid-cols-3 gap-2.5">
              {Array.from({ length: 12 }).map((_, dot) => (
                <span key={dot} className="h-1 w-1 rounded-full bg-brand" />
              ))}
            </div>
            <div className="relative motion-safe:animate-float">
              <Phone scenario={active} instant={!autoplay} />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
