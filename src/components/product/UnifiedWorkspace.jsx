"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bot, Check, MessageSquareText, StickyNote, UserCheck } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import { PulseDot, useMediaQuery } from "@/components/ui/effects";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { workspace } from "@/data/product";

// Messages, contact details and the #4821 exchange reuse the homepage walkthrough examples.
const incoming = [
  { channel: "Website", text: "Is this refundable if it doesn’t fit?", time: "2m" },
  { channel: "WhatsApp", text: "Can you send the pickup time?", time: "1d" },
  { channel: "Instagram", text: "Do you have this in blue?", time: "1w" },
  { channel: "Facebook", text: "Loved the new collection!", time: "3w" }
];

const orders = [
  ["#4821", "Exchanged → M", "bg-amber-50 text-amber-700"],
  ["#4790", "Delivered", "bg-emerald-50 text-emerald-700"],
  ["#4702", "Delivered", "bg-emerald-50 text-emerald-700"]
];

const timeline = [
  { icon: MessageSquareText, text: "Asked about refunds on website chat", time: "2m" },
  { icon: Bot, text: "OrmiTech AI shared the return policy", time: "2m" },
  { icon: UserCheck, text: "Assigned to Farhan A.", time: "1m" },
  { icon: StickyNote, text: "Note: prefers WhatsApp follow-up", time: "now" }
];

const card = "rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-32px_rgba(13,27,61,.4)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_32px_60px_-32px_rgba(13,27,61,.45)] motion-safe:hover:-translate-y-1";

function Connector({ side, delay }) {
  return (
    <span aria-hidden className={`absolute top-1/2 hidden h-px w-8 lg:block ${side === "right" ? "-right-8" : "-left-8"}`}>
      <motion.span
        className={`block h-full bg-gradient-to-r from-brand/10 to-brand/50 ${side === "right" ? "origin-left" : "origin-right rotate-180"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay }}
      />
    </span>
  );
}

export default function UnifiedWorkspace() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  // Parallax only on the three-column layout; stacked columns would overlap each other.
  const threeColumns = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = reduceMotion || !threeColumns ? 0 : 36;
  const sideY = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const centerY = useTransform(scrollYProgress, [0, 1], [-drift / 2, drift / 2]);

  return (
    <section ref={ref} id="workspace" aria-labelledby="workspace-title" className="scroll-mt-24 overflow-hidden border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="workspace-title" align="center" eyebrow={workspace.eyebrow} title={workspace.title} description={workspace.description} />
        </Reveal>

        <div
          role="img"
          aria-label="Illustration: messages from website chat, WhatsApp, Instagram and Facebook connect to one customer profile with tags, notes, order history and an activity timeline"
          className="relative mt-14 grid items-center gap-5 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-8"
        >
          <motion.ul style={{ y: sideY }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {incoming.map((row, index) => (
              <Reveal as="li" key={row.channel} delay={index * 0.08}>
                <div className={`relative flex items-center gap-3 px-3.5 py-3 ${card}`}>
                  <ChannelLogo name={row.channel} className="h-8 w-8" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-navy">{row.channel === "Website" ? "Website chat" : row.channel}</p>
                    <p className="truncate text-[12px] text-slate-500">{row.text}</p>
                  </div>
                  <span className="shrink-0 text-[10.5px] text-slate-400">{row.time}</span>
                  <Connector side="right" delay={0.3 + index * 0.1} />
                </div>
              </Reveal>
            ))}
          </motion.ul>

          <motion.div style={{ y: centerY }} className="relative">
            <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-brand/[.06] blur-2xl" />
            <Reveal className="relative">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_48px_90px_-48px_rgba(13,27,61,.5)] sm:p-6">
                <div className="flex items-center gap-3.5">
                  <Initials name="Nusrat J." className="h-14 w-14 text-base" />
                  <div className="min-w-0">
                    <p className="text-lg font-semibold tracking-[-0.01em] text-navy">Nusrat J.</p>
                    <p className="truncate text-[13px] text-slate-500">nusrat@brightloom.co</p>
                  </div>
                  <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
                    <PulseDot className="bg-emerald-500" />
                    Online
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/70 py-3 text-center">
                  {[
                    ["7", "Conversations"],
                    ["3", "Channels"],
                    ["3", "Orders"]
                  ].map(([value, label]) => (
                    <div key={label} className="px-2">
                      <p className="text-xl font-bold text-navy">{value}</p>
                      <p className="text-[11px] text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-[12px] text-slate-500">Talks to you on</span>
                  <span className="flex -space-x-1.5">
                    {["Website", "WhatsApp", "Instagram"].map(channel => (
                      <span key={channel} className="rounded-full bg-white p-0.5 ring-1 ring-slate-100">
                        <ChannelLogo name={channel} className="h-5 w-5" />
                      </span>
                    ))}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["VIP", "Repeat buyer", "Size M"].map(tag => (
                    <span key={tag} className="rounded-full bg-brand/[.08] px-2.5 py-1 text-[11.5px] font-semibold text-brandInk">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-amber-700">Team note</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-700">Prefers WhatsApp follow-up. First seen on live chat, Mar 2026.</p>
                </div>
              </div>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: sideY }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={0.1}>
              <div className={`relative p-4 ${card}`}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-slate-500">Order history</p>
                <ul className="mt-2.5 space-y-2">
                  {orders.map(([id, status, tone]) => (
                    <li key={id} className="flex items-center justify-between gap-2 text-[12.5px]">
                      <span className="font-semibold text-navy">{id}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>{status}</span>
                    </li>
                  ))}
                </ul>
                <Connector side="left" delay={0.5} />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className={`relative p-4 ${card}`}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-slate-500">Activity timeline</p>
                <ol className="mt-2.5 space-y-2.5">
                  {timeline.map(({ icon: Icon, text, time }) => (
                    <li key={text} className="flex items-start gap-2.5 text-[12px] text-slate-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/[.08] text-brand">
                        <Icon className="h-3 w-3" />
                      </span>
                      <span className="min-w-0 flex-1 pt-0.5 leading-snug">{text}</span>
                      <span className="shrink-0 pt-0.5 text-[10.5px] text-slate-400">{time}</span>
                    </li>
                  ))}
                </ol>
                <Connector side="left" delay={0.6} />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <div className={`relative flex items-center gap-3 p-4 ${card}`}>
                <Initials name="Farhan A." tone="from-sky-400 to-blue-600" className="h-9 w-9 text-[11px]" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-navy">Farhan A. · Owner</p>
                  <p className="text-[12px] text-slate-500">AI assistant supporting</p>
                </div>
                <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
                <Connector side="left" delay={0.7} />
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
