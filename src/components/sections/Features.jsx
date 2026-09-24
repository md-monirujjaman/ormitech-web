"use client";

import { MotionConfig, motion } from "framer-motion";
import { Bot, ChartNoAxesColumnIncreasing, Inbox, Settings, TrendingUp, UserRound } from "lucide-react";
import { Spotlight } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";

// Same six capabilities listed in data/site.js `features`, in the order shown on the site.
const cards = [
  { title: "Unified Inbox", text: "Bring Facebook, Instagram, WhatsApp and website conversations into one workspace.", icon: Inbox },
  { title: "AI Automation", text: "Automate repetitive questions, qualify leads and respond around the clock.", icon: Bot },
  { title: "Human Handover", text: "Move a conversation from AI to a human agent without losing context.", icon: UserRound },
  { title: "Lead Management", text: "Capture customer intent, tag leads and keep follow-ups organized.", icon: Settings },
  { title: "Real-Time Conversations", text: "Built around live events and instant team visibility.", icon: TrendingUp },
  { title: "Analytics", text: "Understand response time, lead flow, automation and team performance.", icon: ChartNoAxesColumnIncreasing }
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

export default function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="features" aria-labelledby="platform-title" className={`${interTight.className} relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-b from-[#FFF7F9] to-[#FFF1F4] py-16 sm:py-20 lg:py-28`}>
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-[230px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
        <div aria-hidden className="pointer-events-none absolute -right-[190px] top-[38%] h-[240px] w-[240px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />

        <div className="container-x relative">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Platform
            </span>
            <h2 id="platform-title" className="mt-5 max-w-2xl text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[44px]">
              Everything your customer <span className="text-brand">conversations need</span>.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              A single, centralized hub designed to handle channels, AI automation and multi-team collaboration — all in one place.
            </p>
          </motion.div>

          <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(card => {
              const Icon = card.icon;
              return (
                <motion.li key={card.title} variants={item}>
                  <Spotlight
                    as="article"
                    className="flex h-full flex-col rounded-xl border border-white bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.05),0_18px_40px_-28px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_28px_50px_-26px_rgba(242,13,69,.45)] motion-safe:hover:-translate-y-1.5"
                  >
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-5 text-[16.5px] font-semibold text-[#0B0D12]">{card.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-6 text-slate-500">{card.text}</p>
                  </Spotlight>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
