"use client";

import { useRef } from "react";
import { MotionConfig, motion, useInView } from "framer-motion";
import { BarChart3, Bot, Check, Link2, Settings2 } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { ease } from "@/components/ui/Reveal";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { interTight } from "@/styles/fonts";
import { Pill } from "./kit";

const steps = [
  ["01", "Connect", "Connect your customer channels and bring conversations into one workspace.", Link2],
  ["02", "Configure", "Define routing, team access, tags, workflows and AI behavior.", Settings2],
  ["03", "Automate", "Let AI handle repeatable questions and qualify incoming demand.", Bot],
  ["04", "Grow", "Measure conversations, leads and team performance and improve over time.", BarChart3]
];

const loop = (duration, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" });

function ConnectPreview({ live }) {
  const names = ["Facebook", "Instagram", "WhatsApp"];
  return (
    <div className="relative flex h-full items-center justify-between px-2">
      <div className="flex flex-col gap-2.5">
        {names.map((name, index) => (
          <motion.span key={name} animate={live ? { x: [0, 3, 0] } : undefined} transition={loop(2.4, index * 0.3)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_10px_20px_-12px_rgba(13,27,61,.4)] ring-1 ring-slate-100">
            <ChannelLogo name={name} className="h-5 w-5" />
          </motion.span>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 80 100" preserveAspectRatio="none" className="h-full w-20">
        {[16, 50, 84].map((y, index) => (
          <g key={y} fill="none">
            <path d={`M0 ${y} C 40 ${y}, 40 50, 80 50`} stroke="#F20D45" strokeOpacity=".22" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            {live && (
              <motion.path d={`M0 ${y} C 40 ${y}, 40 50, 80 50`} pathLength={1} stroke="#F20D45" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.2 1.01" vectorEffect="non-scaling-stroke" initial={{ strokeDashoffset: 0.2 }} animate={{ strokeDashoffset: -1 }} transition={{ ...loop(2, index * 0.35), repeatDelay: 0.4 }} />
            )}
          </g>
        ))}
      </svg>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#C1093A] text-white shadow-[0_16px_30px_-12px_rgba(242,13,69,.7)]">
        <svg aria-hidden viewBox={markViewBox} className="h-7 w-7">
          <path d={markPath} fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function ConfigurePreview({ live }) {
  const rows = ["Routing", "Team access", "AI replies"];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {rows.map((row, index) => (
        <div key={row} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-[0_8px_18px_-14px_rgba(13,27,61,.4)] ring-1 ring-slate-100">
          <span className="text-[12px] font-semibold text-slate-700">{row}</span>
          <motion.span animate={live ? { backgroundColor: ["#E2E8F0", "#F20D45", "#F20D45", "#E2E8F0"] } : { backgroundColor: "#F20D45" }} transition={{ duration: 4.5, delay: index * 0.5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }} className="relative h-[18px] w-8 rounded-full">
            <motion.span animate={live ? { x: [2, 16, 16, 2] } : { x: 16 }} transition={{ duration: 4.5, delay: index * 0.5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }} className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow" />
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function AutomatePreview({ live }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[11.5px] text-slate-600 shadow-[0_8px_18px_-14px_rgba(13,27,61,.4)] ring-1 ring-slate-100">Do you deliver to Khulna?</p>
      <div className="relative h-[46px]">
        <motion.span animate={live ? { opacity: [0, 1, 1, 0, 0], y: [6, 0, 0, 0, 0] } : { opacity: 0 }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.3, 0.35, 1] }} className="absolute right-0 top-0 flex gap-1 rounded-2xl bg-[#FFE3EA] px-3 py-2.5">
          {[0, 1, 2].map(dot => (
            <motion.span key={dot} animate={live ? { y: [0, -3, 0] } : undefined} transition={{ duration: 0.8, delay: dot * 0.12, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-brand" />
          ))}
        </motion.span>
        <motion.p animate={live ? { opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 0] } : { opacity: 1 }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.33, 0.42, 0.9, 1] }} className="absolute right-0 top-0 max-w-[88%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[11.5px] leading-4 text-white shadow-[0_10px_20px_-12px_rgba(242,13,69,.8)]">
          Yes — 2–3 days. Want me to start your order?
        </motion.p>
      </div>
    </div>
  );
}

function GrowPreview({ live }) {
  const bars = [34, 48, 42, 62, 78, 92];
  return (
    <div className="flex h-full items-end justify-between gap-2 px-1 pb-1">
      {bars.map((height, index) => (
        <motion.span key={index} initial={{ height: "8%" }} animate={live ? { height: `${height}%` } : { height: "8%" }} transition={{ duration: 0.8, delay: 0.1 + index * 0.09, ease }} className={`flex-1 rounded-t-lg ${index === bars.length - 1 ? "bg-gradient-to-t from-brand to-[#FF5C85]" : "bg-brand/20"}`} />
      ))}
    </div>
  );
}

const previews = [ConnectPreview, ConfigurePreview, AutomatePreview, GrowPreview];

function StepCard({ step, index }) {
  const [num, title, text, Icon] = step;
  const ref = useRef(null);
  const live = useInView(ref, { margin: "-40px" });
  const Preview = previews[index];

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      className="group relative flex flex-col"
    >
      <div className="relative z-10 flex items-center">
        <motion.span
          initial={{ scale: 0.6, backgroundColor: "#FFFFFF", color: "#F20D45" }}
          whileInView={{ scale: 1, backgroundColor: "#F20D45", color: "#FFFFFF" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.55, ease }}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand text-[13px] font-bold shadow-[0_14px_26px_-10px_rgba(242,13,69,.6)] ring-[6px] ring-brand/10"
        >
          {num}
        </motion.span>
      </div>

      <div className="mt-5 flex flex-1 flex-col overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_1px_2px_rgba(13,27,61,.05),0_28px_56px_-36px_rgba(242,13,69,.4)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_36px_64px_-34px_rgba(242,13,69,.5)] motion-safe:hover:-translate-y-1.5">
        <div className="relative h-[150px] bg-gradient-to-br from-[#FFF5F7] to-[#FFEAF0] px-4 py-4">
          <div aria-hidden className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(242,13,69,.18)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div aria-hidden className="relative h-full">
            <Preview live={live} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[.08] text-brand transition-[transform,background-color,color] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6">
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <h3 className="text-[22px] font-bold tracking-[-0.025em] text-[#0B0D12]">{title}</h3>
          </div>
          <p className="mt-3 text-[14.5px] leading-7 text-slate-500">{text}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default function HowItWorks() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="how-it-works" aria-labelledby="home-how-title" className={`${interTight.className} relative overflow-hidden border-y border-slate-100 bg-gradient-to-b from-white via-[#FFF8FA] to-white py-16 sm:py-20 lg:py-28`}>
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#FFD9E1] opacity-40 blur-3xl" />
        <div className="container-x relative">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="mx-auto max-w-3xl text-center">
            <Pill>How it works</Pill>
            <h2 id="home-how-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[48px]">
              From connection to <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">conversion.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-7 text-slate-500">Four simple steps take OrmiTech IT from your first connected channel to a workspace that works while you sleep.</p>
          </motion.div>

          <div className="relative mt-14 lg:mt-16">
            {/* The track that links the four steps; it fills in as the section scrolls into view. */}
            <div aria-hidden className="absolute left-[22px] right-[22px] top-[22px] hidden h-[2px] rounded-full bg-slate-200/80 lg:block">
              <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }} className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand to-[#C1093A]" />
            </div>
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((step, index) => (
                <StepCard key={step[0]} step={step} index={index} />
              ))}
            </ol>
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-2 text-center text-[13.5px] font-medium text-slate-500">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3 w-3" strokeWidth={3.4} />
            </span>
            Start with one channel and add more whenever you are ready.
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
}
