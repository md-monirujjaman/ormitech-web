"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, ChartNoAxesColumnIncreasing, Inbox, Settings, TrendingUp, UserRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { Spotlight } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";

const loop = (duration, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" });

// ---- Small animated pictures, one per capability. They only move while their card is on screen. ----

const incoming = [
  ["Facebook", "Rafi H.", "Do you have size 40?"],
  ["Instagram", "Nusrat J.", "How much is the linen set?"],
  ["WhatsApp", "Tanvir A.", "Where is my order?"],
  ["Website", "Visitor", "Which plan fits me?"]
];

function InboxVisual({ live }) {
  const [start, setStart] = useState(0);
  useEffect(() => {
    if (!live) return undefined;
    const timer = setInterval(() => setStart(value => value + 1), 2200);
    return () => clearInterval(timer);
  }, [live]);

  // Three rows are visible at a time. A new message slides in at the top and the oldest one leaves.
  const rows = [0, 1, 2].map(offset => ({ key: start + offset, data: incoming[(start + offset) % incoming.length] }));

  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-white p-3 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100">
      <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>All conversations</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      </div>
      <div className="space-y-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {rows
            .slice()
            .reverse()
            .map(({ key, data: [channel, who, text] }, index) => (
              <motion.div key={key} layout initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: index === 0 ? 1 : 1 - index * 0.28, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14 }} transition={{ duration: 0.45, ease }} className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-2.5 py-2">
                <ChannelLogo name={channel} className="h-6 w-6" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[11.5px] font-semibold text-[#0B0D12]">{who}</span>
                  <span className="block truncate text-[10.5px] text-slate-500">{text}</span>
                </span>
                <span className="rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">New</span>
              </motion.div>
            ))
            .reverse()}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AutomationVisual({ live }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100">
      <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-[11px] text-slate-600">Do you deliver to Khulna?</p>
      <div className="relative h-[38px]">
        <motion.span animate={live ? { opacity: [0, 1, 1, 0, 0] } : { opacity: 0 }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.3, 0.35, 1] }} className="absolute right-0 top-0 flex gap-1 rounded-2xl bg-[#FFE3EA] px-3 py-3">
          {[0, 1, 2].map(dot => (
            <motion.span key={dot} animate={live ? { y: [0, -3, 0] } : undefined} transition={{ duration: 0.8, delay: dot * 0.12, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-brand" />
          ))}
        </motion.span>
        <motion.p animate={live ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.33, 0.42, 0.9, 1] }} className="absolute right-0 top-0 max-w-[90%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[11px] leading-4 text-white shadow-[0_10px_20px_-12px_rgba(242,13,69,.8)]">
          Yes! 2–3 days. Shall I start your order?
        </motion.p>
      </div>
    </div>
  );
}

function HandoverVisual({ live }) {
  return (
    <div className="relative flex h-full items-center justify-center rounded-2xl bg-white p-3.5 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand ring-2 ring-white">
          <Bot className="h-5 w-5" />
        </span>
        <span className="relative h-px w-16 bg-slate-200">
          {live && <motion.span className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-brand shadow-[0_0_10px_3px_rgba(242,13,69,.55)]" animate={{ left: ["0%", "92%"] }} transition={{ ...loop(1.8), repeatDelay: 0.6 }} />}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B0D12] text-[12px] font-bold text-white ring-2 ring-white">FA</span>
      </div>
      <span className="absolute bottom-2.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">Context attached</span>
    </div>
  );
}

function LeadsVisual({ live }) {
  const stages = ["New", "Qualified", "Won"];
  return (
    <div className="relative grid h-full grid-cols-3 gap-2 rounded-2xl bg-white p-3 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100">
      {stages.map((stage, index) => (
        <div key={stage} className="rounded-xl bg-slate-50 p-1.5">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">{stage}</p>
          <span className="block h-4 rounded-md bg-slate-200/80" />
          {index === 0 && <span className="mt-1.5 block h-4 rounded-md bg-slate-200/80" />}
        </div>
      ))}
      <motion.span aria-hidden className="absolute left-[8%] top-[46%] h-5 w-[26%] rounded-md bg-brand shadow-[0_8px_16px_-8px_rgba(242,13,69,.9)]" animate={live ? { x: ["0%", "118%", "118%", "236%", "236%", "0%"], opacity: [1, 1, 1, 1, 0, 0] } : undefined} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.4, 0.65, 0.8, 1] }} />
    </div>
  );
}

function RealtimeVisual({ live }) {
  const bars = [0.5, 0.9, 0.6, 1, 0.7, 0.85, 0.45, 0.95, 0.65];
  return (
    <div className="flex h-full items-center justify-center rounded-2xl bg-white p-3.5 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100">
      <div className="flex h-12 items-center gap-1.5">
        {bars.map((height, index) => (
          <motion.span key={index} className="w-1.5 rounded-full bg-gradient-to-t from-brand to-[#FF8AA3]" initial={{ height: `${height * 100}%` }} animate={live ? { height: [`${height * 40}%`, `${height * 100}%`, `${height * 40}%`] } : undefined} transition={loop(1.1 + (index % 3) * 0.25, index * 0.08)} />
        ))}
      </div>
      <span className="ml-4 flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Live
      </span>
    </div>
  );
}

function AnalyticsVisual({ live }) {
  const line = "M0 70 C 40 66, 60 50, 100 52 S 160 30, 200 34 S 260 12, 300 10";
  const stats = [["Response time", "Faster"], ["Lead flow", "Growing"], ["Automation", "Rising"]];
  return (
    <div className="grid h-full gap-3 rounded-2xl bg-white p-3.5 shadow-[0_14px_30px_-20px_rgba(13,27,61,.45)] ring-1 ring-slate-100 sm:grid-cols-[1.4fr_1fr]">
      <svg aria-hidden viewBox="0 0 300 80" preserveAspectRatio="none" className="h-full min-h-[84px] w-full overflow-visible">
        <defs>
          <linearGradient id="analytics-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F20D45" stopOpacity=".22" />
            <stop offset="1" stopColor="#F20D45" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={`${line} L 300 80 L 0 80 Z`} fill="url(#analytics-fill)" initial={{ opacity: 0 }} animate={{ opacity: live ? 1 : 0 }} transition={{ duration: 1, delay: 0.5 }} />
        <motion.path d={line} fill="none" stroke="#F20D45" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: live ? 1 : 0 }} transition={{ duration: 1.6, ease: "easeInOut" }} />
      </svg>
      <ul className="flex flex-col justify-center gap-1.5">
        {stats.map(([label, value]) => (
          <li key={label} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px]">
            <span className="text-slate-500">{label}</span>
            <span className="font-semibold text-emerald-600">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Same six capabilities listed in data/site.js `features`, in the order shown on the site.
const cards = [
  { title: "Unified Inbox", text: "Bring Facebook, Instagram, WhatsApp and website conversations into one workspace.", icon: Inbox, Visual: InboxVisual, span: "lg:col-span-2" },
  { title: "AI Automation", text: "Automate repetitive questions, qualify leads and respond around the clock.", icon: Bot, Visual: AutomationVisual, span: "" },
  { title: "Human Handover", text: "Move a conversation from AI to a human agent without losing context.", icon: UserRound, Visual: HandoverVisual, span: "" },
  { title: "Lead Management", text: "Capture customer intent, tag leads and keep follow-ups organized.", icon: Settings, Visual: LeadsVisual, span: "" },
  { title: "Real-Time Conversations", text: "Built around live events and instant team visibility.", icon: TrendingUp, Visual: RealtimeVisual, span: "" },
  { title: "Analytics", text: "Understand response time, lead flow, automation and team performance.", icon: ChartNoAxesColumnIncreasing, Visual: AnalyticsVisual, span: "lg:col-span-3" }
];

function Card({ card, index }) {
  const ref = useRef(null);
  const live = useInView(ref, { margin: "-40px" });
  const { title, text, icon: Icon, Visual, span } = card;
  const wide = span.includes("col-span");

  return (
    <motion.li ref={ref} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease }} className={span}>
      <Spotlight as="article" className={`group flex h-full flex-col rounded-[24px] border border-white bg-white p-4 shadow-[0_1px_2px_rgba(13,27,61,.05),0_24px_48px_-34px_rgba(242,13,69,.4)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_34px_60px_-30px_rgba(242,13,69,.5)] motion-safe:hover:-translate-y-1.5 ${wide ? "lg:flex-row lg:items-center lg:gap-6" : ""}`}>
        <div aria-hidden className={`relative overflow-hidden rounded-[18px] bg-gradient-to-br from-[#FFF5F7] to-[#FFEAF0] p-3.5 ${wide ? "lg:w-[52%] lg:shrink-0" : ""}`}>
          <div className="relative h-[150px]">
            <Visual live={live} />
          </div>
        </div>
        <div className={`px-2 pb-2 pt-5 ${wide ? "lg:pt-2" : ""}`}>
          <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
            <Icon className="h-5 w-5" strokeWidth={2.1} />
          </span>
          <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.015em] text-[#0B0D12]">{title}</h3>
          <p className="mt-1.5 max-w-md text-[14px] leading-6 text-slate-500">{text}</p>
        </div>
      </Spotlight>
    </motion.li>
  );
}

export default function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="features" aria-labelledby="platform-title" className={`${interTight.className} relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-b from-[#FFF7F9] to-[#FFF1F4] py-16 sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -bottom-20 -left-[230px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
        <div aria-hidden className="pointer-events-none absolute -right-[190px] top-[30%] h-[240px] w-[240px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60 [background-image:radial-gradient(rgba(242,13,69,.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Platform
            </span>
            <h2 id="platform-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[48px]">
              Everything your customer <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">conversations need</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-7 text-slate-500">A single, centralized hub designed to handle channels, AI automation and multi-team collaboration — all in one place.</p>
          </motion.div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {cards.map((card, index) => (
              <Card key={card.title} card={card} index={index} />
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
