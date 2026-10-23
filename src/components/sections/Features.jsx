"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, ChartNoAxesColumnIncreasing, Inbox, Settings, TrendingUp, UserRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { ease } from "@/components/ui/Reveal";
import { markPath, markViewBox } from "@/data/ormitechMark";
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
const features = [
  { title: "Unified Inbox", text: "Bring Facebook, Instagram, WhatsApp and website conversations into one workspace.", icon: Inbox, Visual: InboxVisual },
  { title: "AI Automation", text: "Automate repetitive questions, qualify leads and respond around the clock.", icon: Bot, Visual: AutomationVisual },
  { title: "Human Handover", text: "Move a conversation from AI to a human agent without losing context.", icon: UserRound, Visual: HandoverVisual },
  { title: "Lead Management", text: "Capture customer intent, tag leads and keep follow-ups organized.", icon: Settings, Visual: LeadsVisual },
  { title: "Real-Time Conversations", text: "Built around live events and instant team visibility.", icon: TrendingUp, Visual: RealtimeVisual },
  { title: "Analytics", text: "Understand response time, lead flow, automation and team performance.", icon: ChartNoAxesColumnIncreasing, Visual: AnalyticsVisual }
];

const SLIDE_MS = 5200;

// Hub and spokes: the OrmiTech mark in the middle, three capabilities on each side joined to it by curved lines, and one
// stage below that plays the capability you pick. It moves on by itself while on screen and stops once a visitor picks one.
const ROW = 104;
const GAP = 36;
const HEIGHT = ROW * 3 + GAP * 2;
const GUTTER = 72;
const rowY = index => ROW / 2 + index * (ROW + GAP);

function Spokes({ side, active, live }) {
  const items = side === "left" ? [0, 1, 2] : [3, 4, 5];
  const from = side === "left" ? 0 : GUTTER;
  const to = side === "left" ? GUTTER : 0;
  return (
    <svg aria-hidden viewBox={`0 0 ${GUTTER} ${HEIGHT}`} preserveAspectRatio="none" className="hidden h-full w-full overflow-visible lg:block">
      {items.map((feature, row) => {
        const y = rowY(row);
        const d = `M${from} ${y} C ${GUTTER / 2} ${y}, ${GUTTER / 2} ${HEIGHT / 2}, ${to} ${HEIGHT / 2}`;
        const isActive = feature === active;
        return (
          <g key={feature} fill="none" strokeLinecap="round">
            <path d={d} stroke="#F20D45" strokeOpacity={isActive ? 0.8 : 0.25} strokeWidth="1.6" vectorEffect="non-scaling-stroke" style={{ transition: "stroke-opacity .4s" }} />
            {isActive && live && (
              <motion.path key={`${feature}-pulse`} d={d} pathLength={1} stroke="#F20D45" strokeWidth="3" strokeDasharray="0.2 1.01" vectorEffect="non-scaling-stroke" initial={{ strokeDashoffset: 0.2 }} animate={{ strokeDashoffset: -1 }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Chip({ feature, isActive, auto, onPick, index }) {
  const Icon = feature.icon;
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onPick}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.09, ease }}
      style={{ minHeight: ROW }}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[22px] border px-5 text-left backdrop-blur-md transition-[background-color,box-shadow,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 lg:h-[104px] ${isActive ? "border-brand/50 bg-white/[.12] shadow-[0_30px_60px_-30px_rgba(242,13,69,.8),inset_0_1px_0_rgba(255,255,255,.18)]" : "border-white/10 bg-white/[.05] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] hover:border-white/25 hover:bg-white/[.09]"}`}
    >
      <span aria-hidden className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-[background-color,color,box-shadow] duration-300 ${isActive ? "bg-gradient-to-br from-brand to-[#B3082F] text-white shadow-[0_14px_26px_-10px_rgba(242,13,69,.75)]" : "bg-white/10 text-[#FF8AA3] group-hover:bg-white/15"}`}>
        <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[16px] font-semibold tracking-[-0.01em] text-white">{feature.title}</span>
        <span className="mt-0.5 line-clamp-2 block text-[13px] leading-[19px] text-white/55">{feature.text}</span>
      </span>
      {isActive && auto && <motion.span key={`${feature.title}-bar`} aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-brand to-[#FF5C85]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />}
    </motion.button>
  );
}

function Hub({ live }) {
  return (
    <div className="relative mx-auto flex h-[170px] w-[170px] items-center justify-center lg:h-full lg:w-full">
      <div className="relative flex h-[150px] w-[150px] items-center justify-center">
        {live && <motion.span aria-hidden className="absolute inset-0 rounded-full bg-brand/25" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }} />}
        <motion.span aria-hidden className="absolute -inset-4 rounded-full border border-dashed border-white/25" animate={live ? { rotate: 360 } : undefined} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <span aria-hidden className="absolute -inset-9 rounded-full border border-white/10" />
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand2 via-brand to-[#7A0722] text-white shadow-[0_0_80px_-10px_rgba(242,13,69,.75)] ring-[6px] ring-white/15">
          <svg aria-hidden viewBox={markViewBox} className="h-[54%] w-[54%]">
            <path d={markPath} fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Showcase({ live }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!live || !auto) return undefined;
    const timer = setInterval(() => setActive(current => (current + 1) % features.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [live, auto]);

  const pick = index => {
    setAuto(false);
    setActive(index);
  };

  const { title, text, icon: Icon, Visual } = features[active];
  const chip = index => <Chip key={features[index].title} feature={features[index]} index={index} isActive={index === active} auto={auto} onPick={() => pick(index)} />;

  return (
    <div>
      <div role="tablist" aria-label="Platform capabilities" className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_72px_minmax(200px,260px)_72px_minmax(0,1fr)] lg:gap-0" style={{ "--rows": HEIGHT }}>
        <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-none lg:flex lg:flex-col lg:justify-between lg:gap-9">{[0, 1, 2].map(chip)}</div>
        <Spokes side="left" active={active} live={live} />
        <div className="order-1 lg:order-none">
          <Hub live={live} />
        </div>
        <Spokes side="right" active={active} live={live} />
        <div className="order-3 grid gap-3 sm:grid-cols-2 lg:order-none lg:flex lg:flex-col lg:justify-between lg:gap-9">{[3, 4, 5].map(chip)}</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }} className="relative mx-auto mt-10 max-w-3xl lg:mt-12">
        <div aria-hidden className="absolute -inset-6 rounded-[44px] bg-brand/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-white/[.07] p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl">
          <div className="flex items-center gap-1.5 px-3 pb-2 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 rounded-md bg-white/10 px-3 py-0.5 text-[10.5px] text-white/50">app.ormitechit.com</span>
          </div>
          <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-white/[.09] to-white/[.02] ring-1 ring-white/10 sm:h-[340px]">
            <div aria-hidden className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:16px_16px]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.97 }} transition={{ duration: 0.45, ease }} className="relative w-[62%] max-w-[400px]">
                <div className="origin-center scale-[1.3] sm:scale-[1.45]" style={{ height: 156 }}>
                  <Visual live={live} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3 px-3 pb-2 pt-4">
              <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FF8AA3]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
              </span>
              <span className="leading-tight">
                <span className="block text-[14.5px] font-semibold text-white">{title}</span>
                <span className="mt-0.5 block text-[12.5px] text-white/55">{text}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const live = useInView(ref, { margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="features" aria-labelledby="platform-title" className={`${interTight.className} relative overflow-hidden bg-[#0B0D12] py-16 text-white sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,13,69,.32),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-[#7A0722]/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.35] [background-image:radial-gradient(rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-white backdrop-blur">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Platform
            </span>
            <h2 id="platform-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] sm:text-[48px]">
              Everything your customer <span className="bg-gradient-to-r from-[#FF5C85] to-brand bg-clip-text text-transparent">conversations need</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-7 text-white/65">A single, centralized hub designed to handle channels, AI automation and multi-team collaboration — all in one place.</p>
          </motion.div>

          <div className="mt-14 lg:mt-16">
            <Showcase live={live} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
