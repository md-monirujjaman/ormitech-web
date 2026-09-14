"use client";

import { useRef } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Inbox, MessageSquare, Target, TrendingUp, Users, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { channels } from "@/data/site";

const panel = "rounded-2xl border border-black/[.06] bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,.28)]";

const miniCards = [
  { label: "Unified Inbox", Icon: Inbox, tone: "from-blue-500 to-blue-700", pos: "left-[5%] top-[4%] lg:block", thumb: "-bottom-9 -right-10 rotate-6", depth: "up", amp: 7, delay: 0 },
  { label: "AI Automation", Icon: Bot, tone: "from-brand to-red-700", pos: "right-[6%] top-[5%] lg:block", thumb: "-bottom-4 -right-14 -rotate-6", depth: "down", amp: 9, delay: .6 },
  { label: "Human Handover", Icon: Users, tone: "from-emerald-500 to-emerald-700", pos: "left-[3%] top-[31%] xl:block", thumb: "-top-6 -right-12 rotate-3", depth: "down", amp: 8, delay: 1.1 },
  { label: "Lead Management", Icon: Target, tone: "from-violet-500 to-violet-700", pos: "right-[3%] top-[29%] xl:block", thumb: "-top-7 -right-4 -rotate-3", depth: "up", amp: 6, delay: .3 }
];

const conversations = [["Facebook", "Nusrat", "Order follow-up", "2m"], ["WhatsApp", "Tanvir", "Pricing request", "5m"], ["Instagram", "Sadia", "Product question", "9m"]];
const trustIcons = [[Bot, "bg-brand"], [Users, "bg-emerald-600"], [Inbox, "bg-blue-600"], [Zap, "bg-amber-500"], [TrendingUp, "bg-violet-600"]];
const tileOffsets = [3, -.6, 3.8, .4];
const tileRotate = ["-rotate-[10deg]", "rotate-[8deg]", "-rotate-[5deg]", "rotate-[10deg]"];
const dotLines = ["M10 8 L50 12", "M90 9 L50 12", "M8 35 L50 12", "M92 33 L50 12", "M24 12 L76 12"];

function Float({ children, amp = 8, duration = 6, delay = 0, className = "" }) {
  return (
    <motion.div className={className} animate={{ y: [0, -amp, 0] }} transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const depth = {
    up: useTransform(scrollYProgress, [0, 1], [0, -140]),
    down: useTransform(scrollYProgress, [0, 1], [0, 90])
  };
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, -4]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="relative mt-20 h-[85vh] overflow-hidden bg-[#F6F7F9]">
        <div aria-hidden className="dot-bg absolute inset-0" />
        <div aria-hidden className="absolute left-1/2 top-[40%] h-[85%] w-[1100px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-3xl" />
        <div aria-hidden className="red-glow absolute left-1/2 top-[60%] h-[420px] w-[420px] -translate-x-1/2 opacity-40" />

        <svg aria-hidden className="absolute inset-0 hidden h-full w-full xl:block" viewBox="0 0 100 100" preserveAspectRatio="none">
          {dotLines.map(d => <path key={d} d={d} fill="none" stroke="rgba(0,0,0,.22)" strokeWidth="2" strokeDasharray="0 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
        </svg>

        {miniCards.map(c => (
          <motion.div key={c.label} aria-hidden style={{ y: depth[c.depth] }} className={`absolute z-[1] hidden ${c.pos}`}>
            <Float amp={c.amp} duration={c.amp - 1} delay={c.delay}>
              <div className="relative w-36 rounded-xl border border-black/[.06] bg-white p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,.18)]">
                <p className="text-[10px] font-semibold text-black/70">{c.label}</p>
                <div className="mt-2 h-1.5 w-[85%] rounded-full bg-black/[.07]" />
                <div className="mt-1.5 h-1.5 w-[55%] rounded-full bg-black/[.07]" />
                <div className={`absolute flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ring-4 ring-white ${c.tone} ${c.thumb}`}>
                  <c.Icon size={20} />
                </div>
              </div>
            </Float>
          </motion.div>
        ))}

        <motion.div aria-hidden style={{ y: leftY, rotate: tilt }} className="absolute -left-10 bottom-16 hidden xl:block">
          <div className="relative origin-bottom-left scale-[.85] tall:scale-100">
            <Float amp={8} duration={7}>
              <div className={`${panel} w-[400px] rotate-[7deg] p-4`}>
                <div className="flex items-center gap-3 border-b border-black/5 pb-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-400 to-red-700" />
                  <div><p className="text-sm font-semibold">Rahim · New lead</p><p className="text-[11px] text-emerald-600">● Active now</p></div>
                  <div className="ml-auto flex -space-x-1.5">
                    {channels.map(c => <span key={c.name} className="rounded-full bg-white p-0.5"><ChannelLogo name={c.name} className="h-5 w-5" /></span>)}
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-black/[.05] p-3 text-xs leading-5 text-black/65">Hi! Which plan is best for my business?</div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-brand/15 p-3 text-xs leading-5 text-red-900">I can help you compare options based on your team size.</div>
                  <div className="flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/[.06] p-2.5 text-[11px] text-black/55">
                    <Bot size={14} className="text-brand" /> AI is handling this conversation
                    <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600">AI active</span>
                  </div>
                </div>
              </div>
            </Float>
            <Float amp={10} duration={6} delay={.8} className="absolute -bottom-24 left-32">
              <div className={`${panel} w-[270px] -rotate-[9deg] p-4`}>
                <div className="flex gap-5 border-b border-black/5 pb-2 text-xs"><span className="font-semibold">Conversations</span><span className="text-black/40">Unassigned</span></div>
                {conversations.map(([channel, name, topic, time]) => (
                  <div key={name} className="mt-3 flex items-center gap-2.5 rounded-xl border border-black/[.06] p-2">
                    <ChannelLogo name={channel} className="h-7 w-7" />
                    <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold">{name}</p><p className="truncate text-[10px] text-black/45">{topic}</p></div>
                    <span className="text-[10px] text-black/35">{time}</span>
                  </div>
                ))}
              </div>
            </Float>
          </div>
        </motion.div>

        <motion.div aria-hidden style={{ y: rightY }} className="absolute -right-10 bottom-2 hidden xl:block">
          <div className="relative origin-bottom-right scale-[.85] tall:scale-100">
            <Float amp={9} duration={7.5} delay={.4}>
              <div className={`${panel} w-[410px] -rotate-[8deg] p-4`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Leads pipeline</p>
                  <span className="rounded-md bg-black/[.05] px-2 py-1 text-[10px] text-black/50">This week</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[["New", "bg-blue-500", ["Nusrat", "Karim"]], ["Qualified", "bg-amber-500", ["Tanvir", "Mitu"]], ["Won", "bg-emerald-500", ["Sadia"]]].map(([col, dot, names]) => (
                    <div key={col} className="rounded-xl bg-black/[.03] p-2">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold text-black/60"><span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{col}</p>
                      {names.map(n => (
                        <div key={n} className="mt-2 rounded-lg border border-black/[.06] bg-white p-2">
                          <p className="text-[10px] font-semibold">{n}</p>
                          <div className="mt-1.5 h-1 w-4/5 rounded-full bg-black/[.08]" />
                          <div className="mt-1 h-1 w-1/2 rounded-full bg-black/[.08]" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Float>
            <Float amp={11} duration={6.5} delay={1.2} className="absolute -top-36 right-10">
              <div className={`${panel} w-[200px] -rotate-[12deg] p-3`}>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 text-brand"><Zap size={13} /></span>
                  <p className="text-[11px] font-semibold">AI suggested reply</p>
                </div>
                <p className="mt-2 rounded-xl bg-black/[.04] p-2 text-[10px] leading-4 text-black/60">Yes, we deliver in Khulna. Want me to place the order?</p>
                <div className="mt-2 flex gap-1.5">
                  <span className="flex-1 rounded-lg bg-brand py-1.5 text-center text-[10px] font-semibold text-white">Send</span>
                  <span className="flex-1 rounded-lg border border-black/10 py-1.5 text-center text-[10px] font-semibold text-black/60">Edit</span>
                </div>
              </div>
            </Float>
          </div>
        </motion.div>

        <motion.div style={{ y: contentY }} className="absolute inset-0 z-10">
          <div className="absolute left-1/2 top-[12%] -translate-x-1/2 -translate-y-1/2">
            <Float amp={6} duration={5}>
              <div className="flex h-[clamp(48px,8vh,80px)] w-[clamp(48px,8vh,80px)] items-center justify-center rounded-2xl border border-black/[.06] bg-white shadow-[0_18px_40px_-14px_rgba(0,0,0,.25)]">
                <MessageSquare strokeWidth={2.6} className="h-[45%] w-[45%] text-brand" />
              </div>
            </Float>
          </div>

          <div className="container-x absolute inset-x-0 bottom-[4%] top-[21%] flex flex-col items-center text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="text-[clamp(1.9rem,min(8.4vw,7.6vh),4.5rem)] font-bold leading-[1.05] tracking-[-.045em]">
              Every conversation.
              <span className="block bg-gradient-to-r from-brand to-brand2 bg-clip-text pb-[.08em] text-transparent">One powerful workspace.</span>
            </motion.h1>

            <p className="mt-[2vh] max-w-xl text-[clamp(.9rem,min(4vw,2.2vh),1.125rem)] leading-relaxed text-black/60">
              Connect your customer channels, automate routine conversations with AI, and let your team take over whenever a human touch matters.
            </p>

            <div className="mt-[2.4vh] hidden items-center justify-center gap-3 sm:flex short:hidden">
              <div className="flex -space-x-2">
                {trustIcons.map(([Icon, bg], i) => <span key={i} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white ${bg}`}><Icon size={13} /></span>)}
              </div>
              <span className="text-sm text-black/60">AI + human teams in one workspace</span>
            </div>

            <a href="/contact" className="mt-[2.6vh] inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-[clamp(.7rem,1.6vh,1rem)] text-[clamp(1rem,2vh,1.125rem)] font-semibold text-white shadow-[0_18px_45px_-12px_rgba(242,13,69,.55)] transition hover:-translate-y-0.5 hover:bg-brand2">
              Get Started <ArrowRight size={18} />
            </a>
            <p className="mt-[1.4vh] hidden text-sm font-medium text-black/55 sm:block short:hidden">Facebook, Instagram, WhatsApp &amp; website — one inbox.</p>

            <div className="mt-[3.5vh] flex items-start justify-center gap-5 sm:gap-8 short:hidden">
              {channels.map((c, i) => (
                <Float key={c.name} amp={7} duration={4.5 + i * .7} delay={i * .4} className="shrink-0">
                  <div title={c.name} style={{ marginTop: `${tileOffsets[i]}vh` }} className={`flex h-[clamp(44px,6.5vh,60px)] w-[clamp(44px,6.5vh,60px)] items-center justify-center rounded-2xl border border-black/[.05] bg-white shadow-[0_14px_30px_-12px_rgba(0,0,0,.25)] ${tileRotate[i]}`}>
                    <ChannelLogo name={c.name} className="h-[58%] w-[58%]" />
                  </div>
                </Float>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
