"use client";

import { createContext, useContext, useRef } from "react";
import Link from "next/link";
import { MotionConfig, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Database, Sparkles, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { channels } from "@/data/site";
import { interTight } from "@/styles/fonts";

const ease = [0.22, 1, 0.36, 1];
const inView = { once: true, margin: "-80px" };

// True while the section is on screen. Every looping animation below only runs then, which keeps phones light.
const Live = createContext(false);

function ConnectVisual() {
  const live = useContext(Live);
  return (
    <div className="relative mx-auto grid w-full max-w-[170px] grid-cols-2 gap-4 py-1">
      <span aria-hidden className="absolute -inset-x-6 top-1/4 h-px bg-brand/10" />
      <span aria-hidden className="absolute -inset-x-6 top-3/4 h-px bg-brand/10" />
      {channels.map((channel, i) => (
        <motion.div
          key={channel.name}
          title={channel.name}
          className="relative flex aspect-square items-center justify-center rounded-2xl border border-black/[.06] bg-white shadow-[0_12px_30px_-14px_rgba(15,23,42,.3)]"
          animate={live ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 3.2, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          {live && <motion.span aria-hidden className="absolute inset-0 rounded-2xl ring-2 ring-brand/40" animate={{ scale: [1, 1.25], opacity: [0.6, 0] }} transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }} />}
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
  const live = useContext(Live);
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
              animate={live ? { boxShadow: ["0 0 0 0 rgba(242,13,69,0)", "0 0 0 2px rgba(242,13,69,.35)", "0 0 0 0 rgba(242,13,69,0)", "0 0 0 0 rgba(242,13,69,0)"] } : undefined}
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
        animate={live ? { y: [0, -4, 0] } : undefined}
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
  { n: 2, tag: "Build", title: "Create Your AI Workflow", text: "Tell the AI about your business so it can answer questions, qualify leads and get things done.", cta: "Build Your Flow", href: "/how-it-works", Visual: BuildVisual },
  { n: 3, tag: "Launch", title: "Go Live & Grow", text: "Go live on every channel, track performance and scale as you grow.", cta: "Launch Now", href: "/contact", Visual: LaunchVisual }
];

// One step of the timeline. Text and picture swap sides on wide screens; on phones everything sits beside the line.
function Step({ step, index }) {
  const { Visual } = step;
  const flip = index % 2 === 1;

  return (
    <li className="relative grid items-center gap-6 pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={inView}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="absolute left-0 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand2 to-[#9E0A2E] text-[15px] font-bold text-white shadow-[0_0_0_6px_rgba(242,13,69,.12),0_16px_30px_-10px_rgba(242,13,69,.7)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        {step.n}
      </motion.span>

      <motion.div initial={{ opacity: 0, x: flip ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.7, ease }} className={flip ? "md:order-2 md:pl-10" : "md:pr-10 md:text-right"}>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/[.08] px-3 py-1 text-[12px] font-bold uppercase tracking-[.14em] text-brand">
          Step {step.n} · {step.tag}
        </span>
        <h3 className="mt-4 text-[26px] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B0D12] sm:text-[32px]">{step.title}</h3>
        <p className={`mt-3 max-w-md text-[15.5px] leading-7 text-slate-500 ${flip ? "" : "md:ml-auto"}`}>{step.text}</p>
        <Link
          href={step.href}
          className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand via-[#B8082F] to-[#1A0A0F] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_16px_32px_-14px_rgba(242,13,69,.6)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_rgba(242,13,69,.75)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
        >
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-shine" />
          {step.cta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: flip ? -40 : 40, scale: 0.97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={inView} transition={{ duration: 0.7, delay: 0.1, ease }} className={flip ? "md:order-1 md:pr-10" : "md:pl-10"}>
        <div className="group/frame relative">
          <div aria-hidden className="absolute -inset-3 rounded-[34px] bg-gradient-to-br from-[#FFC3D0]/60 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover/frame:opacity-100" />
          <div className="relative rounded-[28px] border border-white bg-white/90 p-5 shadow-[0_1px_2px_rgba(13,27,61,.05),0_34px_64px_-36px_rgba(242,13,69,.4)] backdrop-blur transition-[transform,box-shadow] duration-500 sm:p-6 motion-safe:group-hover/frame:-translate-y-1.5">
            <div className="flex min-h-[210px] items-center sm:min-h-[230px]">
              <Visual />
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
}

export default function Steps() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const live = useInView(ref, { margin: "120px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  // The red line fills down the middle as the visitor scrolls through the three steps.
  const { scrollYProgress: trackProgress } = useScroll({ target: trackRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(trackProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <Live.Provider value={live}>
      <MotionConfig reducedMotion="user">
        <section ref={ref} id="steps" aria-labelledby="steps-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-white via-[#FFF8FA] to-white py-16 sm:py-20 lg:py-28`}>
          <motion.div aria-hidden style={{ y: topY, background: "radial-gradient(circle at 65% 65%, #F20D45, #FF8AA3 40%, transparent 70%)" }} className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full opacity-30 sm:h-96 sm:w-96" />
          <motion.div aria-hidden style={{ y: bottomY, background: "radial-gradient(circle at 35% 35%, #F20D45, #FF8AA3 40%, transparent 70%)" }} className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full opacity-30 sm:h-96 sm:w-96" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(242,13,69,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]" />

          <div className="container-x relative">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.55, ease }} className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                Get started
              </span>
              <h2 id="steps-title" className="mt-4 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[46px]">
                Start in <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">3 simple steps</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-7 text-slate-500">From your first connected channel to a workspace that answers for you.</p>
            </motion.div>

            <div ref={trackRef} className="relative mx-auto mt-14 max-w-5xl md:mt-20">
              <span aria-hidden className="absolute bottom-4 left-[21px] top-4 w-[2px] rounded-full bg-slate-200/80 md:left-1/2 md:-translate-x-1/2" />
              <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-4 left-[21px] top-4 w-[2px] origin-top rounded-full bg-gradient-to-b from-brand to-[#C1093A] shadow-[0_0_14px_rgba(242,13,69,.6)] md:left-1/2 md:-translate-x-1/2" />
              <ol className="relative space-y-16 md:space-y-24">
                {steps.map((step, index) => (
                  <Step key={step.n} step={step} index={index} />
                ))}
              </ol>
            </div>
          </div>
        </section>
      </MotionConfig>
    </Live.Provider>
  );
}
