"use client";

import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { Messenger } from "@thesvg/react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";

const channels = [
  { name: "Messenger", text: "Your page inbox: text, photos, voice, buttons", logo: <Messenger role="img" aria-label="Messenger" variant="default" className="h-6 w-6" /> },
  { name: "Instagram", text: "DMs answered from the same catalogue", logo: <ChannelLogo name="Instagram" className="h-6 w-6" /> },
  { name: "WhatsApp", text: "Your own number — the phone works just as before", logo: <ChannelLogo name="WhatsApp" className="h-6 w-6" /> },
  { name: "Comments", text: "Replies to comments by name, plus a message in the inbox", logo: <MessageSquareText aria-label="Comments" className="h-6 w-6 text-slate-600" strokeWidth={1.8} /> }
];

const agentPoints = ["Same catalogue, same rules", "Keeps every conversation, remembers the recent part", "Replies in Bangla, English or both — you choose"];

// Layout numbers shared by the cards and the connector lines, so every line meets its card exactly.
const ROW_H = 104;
const GAP = 16;
const TOTAL_H = channels.length * ROW_H + (channels.length - 1) * GAP;
const LINE_W = 170;
const CENTER_Y = TOTAL_H / 2;
const PULSE = 0.16;

function Mark({ className = "" }) {
  return (
    <svg aria-hidden viewBox={markViewBox} className={className}>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

// Curves from each channel card into the agent card, with a bright pulse travelling along every one.
function Lines({ still }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${LINE_W} ${TOTAL_H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <linearGradient id="solutions-pulse" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#F20D45" stopOpacity="0" />
          <stop offset="1" stopColor="#F20D45" />
        </linearGradient>
      </defs>
      {channels.map((channel, index) => {
        const y = ROW_H / 2 + index * (ROW_H + GAP);
        const d = `M0 ${y} C ${LINE_W * 0.55} ${y}, ${LINE_W * 0.45} ${CENTER_Y}, ${LINE_W} ${CENTER_Y}`;
        return (
          <g key={channel.name} fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke">
            <path d={d} stroke="#F20D45" strokeOpacity=".28" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            {still ? (
              <path d={d} stroke="#F20D45" strokeOpacity=".5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            ) : (
              <motion.path
                d={d}
                pathLength={1}
                stroke="url(#solutions-pulse)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                strokeDasharray={`${PULSE} ${1 - PULSE + 0.001}`}
                initial={{ strokeDashoffset: PULSE }}
                animate={{ strokeDashoffset: -1 }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6, delay: index * 0.55 }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ChannelCard({ channel, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease }}
      whileHover={{ y: -3 }}
      style={{ minHeight: ROW_H }}
      className="group flex items-center gap-4 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-[0_1px_2px_rgba(13,27,61,.05),0_22px_44px_-28px_rgba(13,27,61,.35)] ring-1 ring-slate-100 backdrop-blur transition-[box-shadow,border-color] duration-300 hover:ring-brand/30 sm:px-5 lg:h-[104px]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100 transition-colors duration-300 group-hover:bg-brand/5">{channel.logo}</span>
      <span className="min-w-0">
        <span className="block text-[17px] font-semibold tracking-[-0.01em] text-[#0B0D12]">{channel.name}</span>
        <span className="mt-0.5 block text-[13.5px] leading-5 text-slate-500">{channel.text}</span>
      </span>
    </motion.li>
  );
}

function AgentCard({ still }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
      className="relative flex h-full flex-col justify-center rounded-3xl border border-white bg-white/90 p-6 shadow-[0_1px_2px_rgba(13,27,61,.05),0_40px_80px_-40px_rgba(242,13,69,.35)] ring-1 ring-slate-100 backdrop-blur sm:p-7"
    >
      <div className="relative w-fit">
        {!still && <span aria-hidden className="absolute inset-0 rounded-2xl bg-brand/25 motion-safe:animate-ping [animation-duration:2.8s]" />}
        <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#C1093A] text-white shadow-[0_18px_36px_-14px_rgba(242,13,69,.7)] ring-4 ring-brand/10">
          <Mark className="h-10 w-10" />
        </span>
      </div>
      <h3 className="mt-5 text-[26px] font-bold tracking-[-0.02em] text-[#0B0D12]">One agent</h3>
      <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
        {agentPoints.map(point => (
          <li key={point} className="flex items-start gap-3 py-3 text-[14.5px] leading-6 text-slate-600">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-brand" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Solutions() {
  const still = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section id="solutions" aria-labelledby="solutions-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-white to-[#FFF7F9] py-16 sm:py-20 lg:py-28`}>
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFD9E1] to-transparent opacity-70 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#FFC9D5] opacity-40 blur-3xl" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              AI Chat
            </span>
            <h2 id="solutions-title" className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[44px]">
              OrmiTech IT replies to all of your customers so <span className="text-brand">you can focus on growth</span>
            </h2>
            <p className="mt-4 text-base text-slate-500 sm:text-lg">Just like your superhuman sales agent.</p>
          </motion.div>

          <div className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_170px_minmax(0,.82fr)] lg:gap-0" style={{ "--rows-h": `${TOTAL_H}px` }}>
            <ul className="flex min-w-0 flex-col gap-4">
              {channels.map((channel, index) => (
                <ChannelCard key={channel.name} channel={channel} index={index} />
              ))}
            </ul>

            <div aria-hidden className="relative hidden lg:block">
              <Lines still={still} />
              <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand shadow-[0_0_0_5px_rgba(242,13,69,.15)]" />
            </div>

            {/* Below lg the lines collapse into one short connector between the channels and the agent. */}
            <div aria-hidden className="relative mx-auto h-12 w-[2px] overflow-hidden rounded-full bg-brand/15 lg:hidden">
              {!still && (
                <motion.span
                  className="absolute inset-x-0 top-0 h-5 rounded-full bg-gradient-to-b from-transparent to-brand"
                  animate={{ y: ["-100%", "260%"] }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                />
              )}
            </div>

            <AgentCard still={still} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
