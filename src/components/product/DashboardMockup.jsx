"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChartNoAxesColumnIncreasing, Check, Inbox, Search, Send, Settings, Sparkles, UsersRound, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import { PulseDot, TypingDots, useTimeline } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";
import { markPath, markViewBox } from "@/data/ormitechMark";

const navItems = [
  { label: "Inbox", icon: Inbox, active: true },
  { label: "Contacts", icon: UsersRound },
  { label: "Automations", icon: Zap },
  { label: "Analytics", icon: ChartNoAxesColumnIncreasing },
  { label: "Settings", icon: Settings }
];

// Names and messages reuse the examples from the homepage walkthrough.
const conversations = [
  { name: "Sadia R.", channel: "Instagram", text: "Do you have this in blue?", time: "now", tone: "from-fuchsia-400 to-pink-600", active: true },
  { name: "Nusrat J.", channel: "Website", text: "Is this refundable?", time: "2m", tone: "from-rose-400 to-red-600", unread: true },
  { name: "Tanvir H.", channel: "WhatsApp", typing: true, time: "5m", tone: "from-emerald-400 to-emerald-700" },
  { name: "Rahim U.", channel: "Facebook", text: "Wholesale price?", time: "18m", tone: "from-sky-400 to-blue-600" },
  { name: "Ayesha K.", channel: "Instagram", text: "Got my order, thanks!", time: "1h", tone: "from-amber-400 to-orange-600" }
];

const activity = [
  ["Asked about the blue shirt", "now"],
  ["Viewed new collection", "1d"],
  ["Order #4790 delivered", "3w"]
];

const PHASE = { question: 1, typing: 2, reply: 3, actions: 4, order: 5 };
const show = visible => ({ opacity: visible ? 1 : 0, y: visible ? 0 : 6 });

export default function DashboardMockup() {
  const ref = useRef(null);
  const phase = useTimeline(ref, [500, 1100, 2400, 2900, 3900]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="OrmiTech workspace: a unified inbox with Instagram, website, WhatsApp and Facebook conversations, OrmiTech AI answering a customer and creating an order, and the customer profile with tags, activity and order history"
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 px-3.5 py-2.5">
        <span className="flex items-center gap-1.5">
          <svg viewBox={markViewBox} className="h-4 w-4 text-brand">
            <path d={markPath} fill="currentColor" />
          </svg>
          <span className="text-[12px] font-bold tracking-[-0.02em] text-navy">OrmiTech</span>
        </span>
        <span className="ml-2 hidden max-w-[220px] flex-1 items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10.5px] text-slate-400 ring-1 ring-slate-100 sm:flex">
          <Search className="h-3 w-3" /> Search conversations…
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <PulseDot className="bg-emerald-500" />
          Available
        </span>
        <Initials name="Farhan A." tone="from-sky-400 to-blue-600" className="h-6 w-6 text-[8.5px]" />
      </div>

      <div className="grid sm:grid-cols-[150px_minmax(0,1fr)] md:grid-cols-[44px_168px_minmax(0,1fr)_156px] lg:grid-cols-[44px_150px_minmax(0,1fr)] xl:grid-cols-[44px_150px_minmax(0,1fr)_140px]">
        <div className="hidden flex-col items-center gap-1.5 border-r border-slate-100 py-3 md:flex">
          {navItems.map(({ label, icon: Icon, active }) => (
            <span
              key={label}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${active ? "bg-brand text-white shadow-[0_8px_16px_-8px_rgba(242,13,69,.8)]" : "text-slate-400 hover:bg-slate-50 hover:text-navy"}`}
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>

        <div className="hidden min-w-0 border-r border-slate-100 sm:block">
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[11.5px] font-semibold text-navy">Inbox</span>
            <span className="rounded-full bg-brand/10 px-1.5 py-px text-[9.5px] font-semibold text-brandInk">5 open</span>
          </div>
          <ul className="space-y-0.5 px-1.5 pb-2">
            {conversations.map(row => (
              <li key={row.name} className={`flex items-center gap-2 rounded-lg px-1.5 py-2 transition-colors duration-200 ${row.active ? "bg-brand/[.06] ring-1 ring-brand/15" : "hover:bg-slate-50"}`}>
                <span className="relative">
                  <Initials name={row.name} tone={row.tone} className="h-7 w-7 text-[9px]" />
                  <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-px">
                    <ChannelLogo name={row.channel} className="h-3 w-3" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-1">
                    <span className="truncate text-[11px] font-semibold text-navy">{row.name}</span>
                    <span className="shrink-0 text-[9px] text-slate-400">{row.time}</span>
                  </span>
                  {row.typing ? <TypingDots className="mt-1" dotClassName="bg-emerald-500" /> : <span className="block truncate text-[10px] text-slate-500">{row.text}</span>}
                </span>
                {row.unread && <PulseDot />}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Initials name="Sadia R." tone="from-fuchsia-400 to-pink-600" className="h-7 w-7 text-[9px]" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] font-semibold text-navy">Sadia R.</span>
              <span className="flex items-center gap-1 text-[9.5px] text-slate-500">
                <ChannelLogo name="Instagram" className="h-2.5 w-2.5" />
                via Instagram
              </span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-navy px-2 py-0.5 text-[9.5px] font-semibold text-white">
              <Sparkles className="h-2.5 w-2.5" />
              AI on
            </span>
          </div>

          <div className="flex-1 space-y-2 bg-slate-50/60 px-3 py-3">
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 text-[11px] text-slate-600 ring-1 ring-slate-100">Hi! I love the linen shirt from your last post.</p>
            <motion.p
              initial={false}
              animate={show(phase >= PHASE.question)}
              transition={{ duration: 0.35, ease }}
              className="max-w-[85%] rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 text-[11px] text-slate-600 ring-1 ring-slate-100"
            >
              Do you have it in blue? I’d like 2 in medium.
            </motion.p>
            <div className="relative">
              <AnimatePresence>
                {phase === PHASE.typing && (
                  <motion.span
                    key="typing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-0 inline-flex rounded-xl rounded-br-sm bg-brand/[.07] px-2.5 py-2 ring-1 ring-brand/20"
                  >
                    <TypingDots dotClassName="bg-brand" />
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                initial={false}
                animate={show(phase >= PHASE.reply)}
                transition={{ duration: 0.4, ease }}
                className="ml-auto max-w-[88%] rounded-xl rounded-br-sm bg-brand/[.07] px-2.5 py-1.5 text-[11px] text-slate-700 ring-1 ring-brand/20"
              >
                <span className="flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[.1em] text-brandInk">
                  <Sparkles className="h-2.5 w-2.5" />
                  OrmiTech AI
                </span>
                Yes — blue is in stock in medium. Shall I create an order for 2?
              </motion.div>
            </div>
            <motion.div initial={false} animate={show(phase >= PHASE.actions)} transition={{ duration: 0.35, ease }} className="flex flex-wrap justify-end gap-1.5">
              <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-white">Create order</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">Talk to a human</span>
            </motion.div>
            <motion.div
              initial={false}
              animate={show(phase >= PHASE.order)}
              transition={{ duration: 0.4, ease }}
              className="mx-auto flex w-fit max-w-full items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100"
            >
              <Check className="h-3 w-3 shrink-0" strokeWidth={3} />
              <span className="truncate">Order #4822 created</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2">
            <span className="flex-1 truncate rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10.5px] text-slate-400 ring-1 ring-slate-100">Type a message…</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 space-y-3 border-l border-slate-100 p-3 md:block lg:hidden xl:block">
          <div className="text-center">
            <Initials name="Sadia R." tone="from-fuchsia-400 to-pink-600" className="mx-auto h-10 w-10 text-[11px]" />
            <p className="mt-1.5 text-[11.5px] font-semibold text-navy">Sadia R.</p>
            <p className="truncate text-[9.5px] text-slate-500">Customer since 2025</p>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1">
              <span className="rounded-full bg-brand/10 px-1.5 py-px text-[9px] font-semibold text-brandInk">Repeat buyer</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-px text-[9px] font-semibold text-slate-600">VIP</span>
            </div>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-slate-400">Recent activity</p>
            <ul className="mt-1.5 space-y-1.5">
              {activity.map(([label, time]) => (
                <li key={label} className="flex items-start gap-1.5 text-[9.5px] text-slate-600">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60" />
                  <span className="min-w-0 flex-1 leading-tight">{label}</span>
                  <span className="text-slate-400">{time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-slate-400">Orders</p>
            <ul className="mt-1.5 space-y-1">
              <motion.li initial={false} animate={show(phase >= PHASE.order)} transition={{ duration: 0.4, delay: 0.2, ease }} className="flex items-center justify-between rounded-md bg-emerald-50 px-1.5 py-1 text-[9.5px]">
                <span className="font-semibold text-navy">#4822</span>
                <span className="font-semibold text-emerald-700">New</span>
              </motion.li>
              <li className="flex items-center justify-between rounded-md bg-slate-50 px-1.5 py-1 text-[9.5px]">
                <span className="font-semibold text-navy">#4790</span>
                <span className="text-slate-500">Delivered</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
