"use client";

import { useRef } from "react";
import { MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChartNoAxesColumnIncreasing, MessageSquareText, Settings, Sparkles, Tag, UserRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { ease } from "@/components/ui/Reveal";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { interTight } from "@/styles/fonts";
import { fadeUp, stagger, viewOnce } from "./kit";

const phases = [
  ["01", "Connect", "Bring Facebook, Instagram, WhatsApp and website conversations into the OrmiTech communication layer.", MessageSquareText],
  ["02", "Organize", "Normalize messages, customer context, ownership, tags and conversation state into one workspace.", Settings],
  ["03", "Automate", "Let configured AI handle repetitive questions, qualification and approved workflows.", Sparkles],
  ["04", "Handover", "Escalate complex or high-value conversations to the right human agent with context intact.", UserRound],
  ["05", "Measure", "Turn conversations, leads, response time and automation outcomes into useful operational signals.", ChartNoAxesColumnIncreasing]
];

const loop = (duration, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" });
const glass = "rounded-xl bg-white/[.07] ring-1 ring-white/10 backdrop-blur";

// One small animated picture per phase. They only move while their card is on screen.
function ConnectVisual({ live }) {
  const names = ["Facebook", "Instagram", "WhatsApp", "Website"];
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="grid grid-cols-2 gap-2.5">
        {names.map((name, index) => (
          <motion.span key={name} animate={live ? { y: [0, -4, 0] } : undefined} transition={loop(2.8, index * 0.3)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_10px_20px_-10px_rgba(0,0,0,.6)]">
            <ChannelLogo name={name} className="h-5 w-5" />
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function OrganizeVisual({ live }) {
  const tags = [["VIP", "bg-brand/25 text-[#FF9DB4]"], ["Order", "bg-sky-400/20 text-sky-200"], ["Lead", "bg-amber-400/20 text-amber-200"]];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {tags.map(([label, tone], index) => (
        <motion.div key={label} animate={live ? { x: [0, 5, 0] } : undefined} transition={loop(3, index * 0.4)} className={`${glass} flex items-center justify-between px-3 py-1.5`}>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-white/40 to-white/10" /> Customer {index + 1}
          </span>
          <span className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${tone}`}>
            <Tag className="h-2.5 w-2.5" /> {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function AutomateVisual({ live }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <p className="max-w-[80%] self-start rounded-xl rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-[10.5px] text-white/80">Price of this?</p>
      <div className="relative h-8">
        <motion.span animate={live ? { opacity: [0, 1, 1, 0, 0] } : { opacity: 0 }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.1, 0.3, 0.35, 1] }} className="absolute right-0 top-0 flex gap-1 rounded-xl bg-brand/30 px-2.5 py-2">
          {[0, 1, 2].map(dot => (
            <motion.span key={dot} animate={live ? { y: [0, -3, 0] } : undefined} transition={{ duration: 0.8, delay: dot * 0.12, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </motion.span>
        <motion.p animate={live ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.33, 0.42, 0.9, 1] }} className="absolute right-0 top-0 max-w-[90%] rounded-xl rounded-br-sm bg-brand px-2.5 py-1.5 text-[10.5px] font-medium text-white">৳7,450. Want to order?</motion.p>
      </div>
    </div>
  );
}

function HandoverVisual({ live }) {
  return (
    <div className="relative flex h-full items-center justify-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/30 text-white ring-1 ring-white/20">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="relative h-px w-14 bg-white/20">
        {live && <motion.span className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-brand shadow-[0_0_12px_3px_rgba(242,13,69,.8)]" animate={{ left: ["0%", "92%"] }} transition={{ ...loop(1.8), repeatDelay: 0.5 }} />}
      </span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#0B0D12] ring-1 ring-white/30">FA</span>
    </div>
  );
}

function MeasureVisual({ live }) {
  const bars = [30, 44, 38, 58, 74, 90];
  return (
    <div className="flex h-full items-end justify-between gap-1.5 pb-1">
      {bars.map((height, index) => (
        <motion.span key={index} initial={{ height: "8%" }} animate={{ height: live ? `${height}%` : "8%" }} transition={{ duration: 0.8, delay: 0.1 + index * 0.09, ease }} className={`flex-1 rounded-t-md ${index === bars.length - 1 ? "bg-gradient-to-t from-brand to-[#FF5C85]" : "bg-white/20"}`} />
      ))}
    </div>
  );
}

const visuals = [ConnectVisual, OrganizeVisual, AutomateVisual, HandoverVisual, MeasureVisual];

function Phase({ phase, index }) {
  const [number, title, text, Icon] = phase;
  const ref = useRef(null);
  const live = useInView(ref, { margin: "-30px" });
  const Visual = visuals[index];

  return (
    <motion.li ref={ref} variants={fadeUp} className="group relative flex flex-col">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.35, ease }}
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#B3082F] text-[13px] font-bold text-white shadow-[0_0_0_6px_rgba(242,13,69,.15),0_14px_30px_-8px_rgba(242,13,69,.8)]"
      >
        {number}
      </motion.span>

      <div className="mt-5 flex flex-1 flex-col overflow-hidden rounded-[22px] bg-white/[.05] ring-1 ring-white/10 backdrop-blur transition-[transform,background-color,box-shadow] duration-300 hover:bg-white/[.08] hover:ring-brand/40 motion-safe:hover:-translate-y-1.5">
        <div aria-hidden className="relative h-[132px] border-b border-white/10 bg-gradient-to-br from-white/[.06] to-transparent px-4 py-4">
          <Visual live={live} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/20 text-[#FF8AA3] transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-white">
              <Icon className="h-4 w-4" strokeWidth={2.1} />
            </span>
            <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-white">{title}</h3>
          </div>
          <p className="mt-3 text-[13px] leading-6 text-white/65">{text}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default function ArchitectureFlow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="phases" aria-labelledby="phases-title" className={`${interTight.className} relative overflow-hidden bg-[#0B0D12] py-16 text-white sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,13,69,.35),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.35] [background-image:radial-gradient(rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-white backdrop-blur">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-70 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              How OrmiTech IT works
            </motion.span>
            <motion.h2 variants={fadeUp} id="phases-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] [text-wrap:balance] sm:text-[48px]">
              Five phases from message to <span className="bg-gradient-to-r from-[#FF5C85] to-brand bg-clip-text text-transparent">measurable outcome.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-[15.5px] leading-7 text-white/65">
              The experience is designed as one continuous flow, instead of disconnected tools.
            </motion.p>
          </motion.div>

          <div className="relative mt-14 lg:mt-16">
            {/* The line that joins the five phases. It lights up from left to right once the section is in view. */}
            <div aria-hidden className="absolute left-[22px] right-[22px] top-[22px] hidden h-[2px] rounded-full bg-white/10 lg:block">
              <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }} className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand to-[#FF5C85] shadow-[0_0_16px_rgba(242,13,69,.8)]" />
            </div>
            <div aria-hidden className="absolute bottom-6 left-[22px] top-6 w-[2px] rounded-full bg-gradient-to-b from-brand/60 to-white/10 lg:hidden" />

            <motion.ol variants={stagger(0.12, 0.1)} initial="hidden" whileInView="show" viewport={viewOnce} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {phases.map((phase, index) => (
                <Phase key={phase[0]} phase={phase} index={index} />
              ))}
            </motion.ol>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }} className="mx-auto mt-14 flex w-fit items-center gap-3 rounded-full bg-white/[.06] py-2 pl-2 pr-5 ring-1 ring-white/10 backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#B3082F] text-white">
              <svg aria-hidden viewBox={markViewBox} className="h-5 w-5">
                <path d={markPath} fill="currentColor" />
              </svg>
            </span>
            <span className="text-[13px] font-medium text-white/75">One workspace carries every message from first hello to final report.</span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
