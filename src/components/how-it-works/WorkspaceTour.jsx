"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, UserCheck } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import { PulseDot, useTimeline } from "@/components/ui/effects";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { workspaceTour } from "@/data/howItWorks";
import { markPath, markViewBox } from "@/data/ormitechMark";

const inboxRows = [
  { name: "Rahim U.", channel: "Facebook", text: "Wholesale price?", status: "With team", tone: "from-sky-400 to-blue-600", active: true },
  { name: "Sadia R.", channel: "Instagram", text: "Is the blue one in stock?", status: "AI", tone: "from-fuchsia-400 to-pink-600" },
  { name: "Tanvir H.", channel: "WhatsApp", text: "1 kg pack please", status: "AI", tone: "from-emerald-400 to-emerald-700" },
  { name: "Nusrat J.", channel: "Website", text: "Exchange for size M", status: "Resolved", tone: "from-rose-400 to-red-600" }
];

// A dashboard mockup whose areas highlight when the matching legend item is hovered, focused or selected.
export default function WorkspaceTour() {
  const ref = useRef(null);
  const phase = useTimeline(ref, [2500]);
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hovered ?? pinned;

  const region = id =>
    `rounded-xl transition-[opacity,box-shadow] duration-300 ${active === null ? "" : active === id ? "relative z-10 shadow-[0_0_0_2px_#F20D45,0_18px_40px_-20px_rgba(242,13,69,.55)]" : "opacity-40"}`;

  return (
    <section id="dashboard" aria-labelledby="dashboard-title" className="scroll-mt-36 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="dashboard-title" align="center" eyebrow={workspaceTour.eyebrow} title={workspaceTour.title} description={workspaceTour.description} />
        </Reveal>

        <div className="mt-12 grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
          <Reveal>
            <ul className="flex flex-wrap justify-center gap-2 xl:flex-col" onMouseLeave={() => setHovered(null)} aria-label="Dashboard areas">
              {workspaceTour.regions.map(item => {
                const selected = pinned === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onMouseEnter={() => setHovered(item.id)}
                      onFocus={() => setHovered(item.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setPinned(current => (current === item.id ? null : item.id))}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-left transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                        active === item.id ? "border-brand/40 bg-white shadow-[0_12px_28px_-20px_rgba(242,13,69,.6)]" : "border-slate-200/80 bg-white/70 hover:bg-white"
                      }`}
                    >
                      <span className={`block text-[14px] font-semibold ${active === item.id ? "text-brandInk" : "text-navy"}`}>{item.label}</span>
                      <span className="hidden text-[12.5px] leading-5 text-slate-500 xl:block">{item.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              ref={ref}
              role="img"
              aria-label="OrmiTech dashboard: conversation list, a Facebook conversation with AI activity and a human takeover, the customer profile with tags and notes, lead status Qualified, an order awaiting confirmation, team assignment and analytics"
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-3"
            >
              <div className="flex flex-wrap items-center gap-3 px-2 pb-3 pt-1">
                <span className="flex items-center gap-1.5">
                  <svg viewBox={markViewBox} className="h-4 w-4 text-brand">
                    <path d={markPath} fill="currentColor" />
                  </svg>
                  <span className="text-[13px] font-bold text-navy">OrmiTech</span>
                </span>
                <div className={`ml-auto flex flex-wrap gap-2 p-1 ${region("stats")}`}>
                  {[
                    ["First reply", "38s"],
                    ["Handled by AI", "64%"],
                    ["Leads today", "9"]
                  ].map(([label, value]) => (
                    <span key={label} className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] text-slate-500 ring-1 ring-slate-100">
                      {label} <b className="text-navy">{value}</b>
                    </span>
                  ))}
                  <span className="rounded-lg border border-dashed border-slate-300 px-2 py-1 text-[10.5px] text-slate-500">Sample data</span>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_220px]">
                <div className={`border border-slate-100 bg-slate-50/60 p-2 ${region("inbox")}`}>
                  <div className="flex gap-1 px-1 pb-2 text-[11px] font-semibold">
                    <span className="rounded-full bg-brand px-2 py-0.5 text-white">Open</span>
                    <span className="rounded-full px-2 py-0.5 text-slate-500">Resolved</span>
                  </div>
                  <ul className="space-y-1">
                    <AnimatePresence initial={false}>
                      {phase >= 1 && (
                        <motion.li key="live" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                          <span className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-2 ring-1 ring-emerald-100">
                            <ChannelLogo name="WhatsApp" className="h-6 w-6" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[12px] font-semibold text-navy">Ayesha K.</span>
                              <span className="block truncate text-[11px] text-slate-500">New message</span>
                            </span>
                            <PulseDot className="bg-emerald-500" />
                          </span>
                        </motion.li>
                      )}
                    </AnimatePresence>
                    {inboxRows.map(row => (
                      <li key={row.name} className={`flex items-center gap-2 rounded-lg px-2 py-2 ${row.active ? "bg-white shadow-sm ring-1 ring-brand/20" : ""}`}>
                        <span className="relative">
                          <Initials name={row.name} tone={row.tone} className="h-7 w-7 text-[9px]" />
                          <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-px">
                            <ChannelLogo name={row.channel} className="h-3 w-3" />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-semibold text-navy">{row.name}</span>
                          <span className="block truncate text-[11px] text-slate-500">{row.text}</span>
                        </span>
                        <span className={`shrink-0 rounded-full px-1.5 py-px text-[9.5px] font-semibold ${row.status === "AI" ? "bg-navy text-white" : row.status === "Resolved" ? "bg-slate-100 text-slate-500" : "bg-brand/10 text-brandInk"}`}>{row.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`border border-slate-100 p-3 ${region("activity")}`}>
                  <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-navy">
                    <ChannelLogo name="Facebook" className="h-4 w-4" />
                    Rahim U. · Wholesale enquiry
                  </p>
                  <div className="mt-3 space-y-2 text-[12px]">
                    <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-slate-700">Can I get a wholesale price for 50 units every month?</p>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Sparkles aria-hidden className="h-3 w-3 text-brand" />
                      AI answered from Products · 2m
                    </p>
                    <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-brand/[.07] px-2.5 py-1.5 text-slate-700 ring-1 ring-brand/20">Bulk orders need a quick check — bringing in our sales team.</p>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Bot aria-hidden className="h-3 w-3 text-brand" />
                      Handover rule: order needs manual confirmation
                    </p>
                    <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-navy px-2.5 py-1.5 text-white">Hi Rahim — I’ll send you a custom quote within the hour.</p>
                    <AnimatePresence initial={false}>
                      {phase >= 1 && (
                        <motion.p key="reply" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="max-w-[85%] rounded-xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-slate-700">
                          Sounds good, thanks!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 md:col-span-2 lg:col-span-1 lg:grid-cols-1">
                  <div className={`border border-slate-100 p-3 ${region("customer")}`}>
                    <div className="flex items-center gap-2">
                      <Initials name="Rahim U." tone="from-sky-400 to-blue-600" className="h-8 w-8 text-[10px]" />
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-semibold text-navy">Rahim U.</p>
                        <p className="truncate text-[11px] text-slate-500">rahim@cornerstudio.co</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded-full bg-brand/10 px-1.5 py-px text-[10px] font-semibold text-brandInk">Wholesale</span>
                      <span className="rounded-full bg-red-50 px-1.5 py-px text-[10px] font-semibold text-red-700">High intent</span>
                    </div>
                    <p className="mt-2 rounded-md bg-amber-50 px-2 py-1 text-[11px] text-slate-700">Note: wants 50 units monthly</p>
                  </div>
                  <div className={`border border-slate-100 p-3 ${region("lead")}`}>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-slate-500">Lead status</p>
                    <p className="mt-1 text-[13px] font-semibold text-navy">Qualified</p>
                    <div className="mt-1.5 grid grid-cols-4 gap-1">
                      {[0, 1, 2, 3].map(step => (
                        <span key={step} className={`h-1.5 rounded-full ${step < 3 ? "bg-brand" : "bg-slate-200"}`} />
                      ))}
                    </div>
                  </div>
                  <div className={`border border-slate-100 p-3 ${region("order")}`}>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-slate-500">Order</p>
                    <p className="mt-1 text-[12.5px] font-semibold text-navy">#4823 · 50 units</p>
                    <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-700">Awaiting confirmation</span>
                  </div>
                  <div className={`flex items-center gap-2 border border-slate-100 p-3 ${region("team")}`}>
                    <UserCheck aria-hidden className="h-4 w-4 text-brand" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-navy">Owner: Farhan A.</p>
                      <p className="text-[11px] text-slate-500">AI assistant paused</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
