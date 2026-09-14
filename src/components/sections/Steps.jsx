"use client";

import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Database, Sparkles, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { channels } from "@/data/site";
import { markPath, markViewBox } from "@/data/ormitechMark";

const ease = [0.22, 1, 0.36, 1];
const inView = { once: true, margin: "-60px" };

function Mark({ className }) {
  return (
    <svg viewBox={markViewBox} className={className} aria-hidden>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

function CenterMark({ size }) {
  return (
    <div className={`relative ${size}`}>
      <motion.div
        aria-hidden
        className="absolute -inset-5 rounded-full opacity-35 blur-2xl"
        style={{ background: "conic-gradient(from 180deg, #FF8AA3, #F20D45, #9E0A2E, #FF4D6D, #FFE3EA, #F20D45)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        aria-hidden
        className="absolute -inset-2.5 rounded-full border border-brand/20 bg-brand/[.05]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 0.45, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand2 via-brand to-[#7A0722] shadow-[0_18px_40px_-10px_rgba(242,13,69,.6)] ring-4 ring-white">
        <Mark className="h-[56%] w-[56%] text-white" />
      </div>
    </div>
  );
}

function Connectors() {
  const paths = ["M550 48 H262 Q192 48 192 104 V128", "M650 48 H938 Q1008 48 1008 104 V128", "M600 96 V128"];
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1200 128" preserveAspectRatio="none" fill="none">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="rgba(242,13,69,.38)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease }}
        />
      ))}
    </svg>
  );
}

function FloatSquare({ className, delay = 0 }) {
  return (
    <motion.span
      aria-hidden
      className={`absolute rounded-md ${className}`}
      animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ConnectVisual() {
  return (
    <div className="relative mx-auto grid w-full max-w-[170px] grid-cols-2 gap-4 py-1">
      <span aria-hidden className="absolute -inset-x-6 top-1/4 h-px bg-brand/10" />
      <span aria-hidden className="absolute -inset-x-6 top-3/4 h-px bg-brand/10" />
      {channels.map((channel, i) => (
        <motion.div
          key={channel.name}
          title={channel.name}
          className="relative flex aspect-square items-center justify-center rounded-2xl border border-black/[.06] bg-white shadow-[0_12px_30px_-14px_rgba(15,23,42,.3)]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChannelLogo name={channel.name} className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  );
}

const flow = [
  [Database, "Input Data"],
  [Sparkles, "Process with AI"],
  [Zap, "Take Action"]
];

function BuildVisual() {
  return (
    <div className="relative w-full rounded-2xl border border-black/[.06] bg-[#FAFAFB] p-3">
      <div className="flex items-center justify-between rounded-xl border border-black/[.06] bg-white px-3 py-2 text-xs font-semibold text-[#0B0D12] shadow-sm">
        <span className="flex items-center gap-2"><Sparkles size={14} className="text-brand" /> AI Agent</span>
        <ChevronDown size={14} className="text-black/40" />
      </div>
      <div className="mt-2">
        {flow.map(([Icon, label], i) => (
          <div key={label}>
            <motion.div
              className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 text-xs font-medium text-[#0B0D12]"
              animate={{ boxShadow: ["0 0 0 0 rgba(242,13,69,0)", "0 0 0 2px rgba(242,13,69,.35)", "0 0 0 0 rgba(242,13,69,0)", "0 0 0 0 rgba(242,13,69,0)"] }}
              transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, times: [0, 0.17, 0.33, 1] }}
            >
              <Icon size={14} className="text-black/60" /> {label}
            </motion.div>
            {i < flow.length - 1 && <div aria-hidden className="ml-[18px] h-2.5 border-l border-dashed border-black/15" />}
          </div>
        ))}
      </div>
      <motion.span
        className="absolute right-3 top-[54%] inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand shadow-[0_10px_24px_-10px_rgba(242,13,69,.55)] ring-1 ring-brand/15"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white"><Zap size={10} /></span>
        Auto
      </motion.span>
    </div>
  );
}

function LaunchVisual() {
  const line = "M0 70 C 20 62, 35 66, 50 55 S 80 58, 95 44 S 125 40, 140 30 S 170 22, 200 10";
  return (
    <div className="w-full rounded-2xl border border-black/[.06] bg-[#FAFAFB] p-3">
      <div className="overflow-hidden rounded-xl border border-black/[.06] bg-white px-3 pb-2 pt-2.5">
        <div className="flex items-center justify-between">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[.06] bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0B0D12] shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mt-1.5 h-16 w-full" aria-hidden>
          <defs>
            <linearGradient id="steps-launch-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F20D45" stopOpacity=".25" />
              <stop offset="1" stopColor="#F20D45" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d={`${line} L200 80 L0 80 Z`} fill="url(#steps-launch-fill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inView} transition={{ duration: 0.8, delay: 1 }} />
          <motion.path d={line} fill="none" stroke="#F20D45" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={inView} transition={{ duration: 1.4, ease }} />
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[["Conversations", "12,458", "24%"], ["AI replies", "8,930", "32%"]].map(([label, value, up]) => (
          <div key={label} className="rounded-xl border border-black/[.06] bg-white px-3 py-2 shadow-sm">
            <div className="text-[10px] text-black/45">{label}</div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#0B0D12]">{value}</span>
              <span className="text-[10px] font-semibold text-emerald-600">↑ {up}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { n: 1, tag: "Connect", title: "Connect Your Platforms", text: "Link Facebook, Instagram, WhatsApp and your website in one place. No code, no hassle.", cta: "Integrate Now", href: "/contact", Visual: ConnectVisual },
  { n: 2, tag: "Build", title: "Create Your AI Workflow", text: "Tell the AI about your business so it can answer questions, qualify leads and get things done.", cta: "Build Your Flow", href: "/how-it-works", Visual: BuildVisual, highlight: true },
  { n: 3, tag: "Launch", title: "Go Live & Grow", text: "Go live on every channel, track performance and scale as you grow.", cta: "Launch Now", href: "/contact", Visual: LaunchVisual }
];

function StepCard({ step, index }) {
  const { Visual } = step;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease }}
      className={`relative flex w-[85%] shrink-0 snap-center flex-col rounded-3xl border bg-white p-5 shadow-[0_24px_60px_-34px_rgba(15,23,42,.35)] sm:w-[60%] md:w-auto md:p-6 ${step.highlight ? "border-brand/70 ring-4 ring-brand/[.06]" : "border-black/[.07]"}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand2 to-[#9E0A2E] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(242,13,69,.6)]">{step.n}</span>
        <span className="rounded-full bg-brand/[.08] px-3 py-1 text-sm font-semibold text-brand">{step.tag}</span>
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-tight text-[#0B0D12] lg:text-xl">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-black/55">{step.text}</p>
      <div className="mt-4 flex flex-1 items-center">
        <Visual />
      </div>
      <a
        href={step.href}
        className="group mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-[#B8082F] to-[#1A0A0F] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(242,13,69,.55)] transition hover:shadow-[0_18px_36px_-10px_rgba(242,13,69,.7)]"
      >
        {step.cta}
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}

export default function Steps() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="steps" aria-label="Start in 3 simple steps" className="relative overflow-hidden bg-white py-10 md:py-12">
        <div aria-hidden className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full opacity-30 sm:h-96 sm:w-96" style={{ background: "radial-gradient(circle at 65% 65%, #F20D45, #FF8AA3 40%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full opacity-30 sm:h-96 sm:w-96" style={{ background: "radial-gradient(circle at 35% 35%, #F20D45, #FF8AA3 40%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <FloatSquare className="left-[3%] top-[12%] h-7 w-7 bg-brand/25" />
          <FloatSquare className="left-[5.5%] top-[19%] h-8 w-8 bg-brand" delay={0.8} />
          <FloatSquare className="left-[3.5%] top-[24%] h-5 w-5 bg-[#140A0E]" delay={1.4} />
          <FloatSquare className="right-[5%] top-[66%] h-4 w-4 bg-[#140A0E]" delay={0.4} />
          <FloatSquare className="right-[6.5%] top-[71%] h-8 w-8 bg-brand" delay={1.1} />
          <FloatSquare className="right-[3.5%] top-[77%] h-7 w-7 bg-brand/40" delay={1.8} />
        </div>

        <div className="container-x relative">
          <div className="flex justify-center md:hidden">
            <CenterMark size="h-16 w-16" />
          </div>

          <div className="relative mx-auto hidden h-32 md:block">
            <Connectors />
            {["left-[16%]", "left-1/2", "left-[84%]"].map((position, i) => (
              <motion.span
                key={position}
                aria-hidden
                className={`absolute bottom-0 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand/15 ${position}`}
                style={{ x: "-50%", y: "50%" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inView}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
              />
            ))}
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <CenterMark size="h-24 w-24" />
            </div>
          </div>

          <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:mt-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {steps.map((step, i) => <StepCard key={step.n} step={step} index={i} />)}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
