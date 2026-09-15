"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CheckCheck, Inbox } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { messages } from "@/data/howItWorks";
import { channels } from "@/data/site";
import FlowLine from "./FlowLine";

const CHANNELS = channels.map(channel => channel.name);
const AUTO_ADVANCE_MS = 3200;

// Customer-side bubble colors per channel (white text only on backgrounds with enough contrast).
const BUBBLES = {
  Facebook: "bg-[#0866FF] text-white",
  Instagram: "bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white",
  WhatsApp: "bg-[#d9fdd3] text-navy",
  Website: "bg-brandInk text-white"
};

function CustomerDevice({ channel }) {
  const sample = messages.samples[channel];
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[28px] border border-slate-200 bg-white p-2 shadow-[0_32px_64px_-36px_rgba(13,27,61,.45)]">
      <div className="overflow-hidden rounded-[22px] bg-slate-50">
        <div className="flex items-center gap-2.5 border-b border-slate-200/70 bg-white px-3 py-2.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={channel} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
              <ChannelLogo name={channel} className="h-7 w-7" />
            </motion.span>
          </AnimatePresence>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-navy">Northwind Store</p>
            <p className="truncate text-[11px] text-slate-500">{sample.surface}</p>
          </div>
        </div>
        <div className="flex min-h-[200px] flex-col justify-end gap-2 p-3">
          <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12px] text-slate-600 ring-1 ring-slate-200/70">Hi! How can we help you today?</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={channel} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }} className="max-w-[85%] self-end">
              <p className={`rounded-2xl rounded-br-md px-3 py-2 text-[12.5px] ${BUBBLES[channel]}`}>{sample.text}</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-slate-500">
                <CheckCheck aria-hidden className="h-3 w-3" />
                Sent by {sample.customer}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function UnifiedInbox({ selected }) {
  const ordered = [selected, ...CHANNELS.filter(channel => channel !== selected)];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_32px_64px_-36px_rgba(13,27,61,.45)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Inbox aria-hidden className="h-4 w-4 text-brand" />
          Unified inbox
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">All channels</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {ordered.map(channel => {
          const sample = messages.samples[channel];
          const isNew = channel === selected;
          return (
            <motion.li key={channel} layout transition={{ layout: { duration: 0.5, ease } }} className={`flex items-center gap-3 px-4 py-3 transition-colors duration-500 ${isNew ? "bg-brand/[.05]" : "bg-white"}`}>
              <span className="relative">
                <Initials name={sample.customer} tone={sample.tone} className="h-9 w-9 text-[11px]" />
                <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-px">
                  <ChannelLogo name={channel} className="h-4 w-4" />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-navy">{sample.customer}</span>
                  <span className="shrink-0 text-[11px] text-slate-500">{isNew ? "now" : sample.time}</span>
                </div>
                <p className="truncate text-[12.5px] text-slate-500">{sample.text}</p>
              </div>
              {isNew && <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-semibold text-white">New</span>}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

// Visitors pick a channel (or watch them cycle) and see the same message arrive at the top of the unified inbox.
export default function MessageInbox() {
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const baseId = useId();
  const inView = useInView(sectionRef, { margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion || manual) return;
    const timer = setInterval(() => setActive(index => (index + 1) % CHANNELS.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, manual]);

  function select(index, moveFocus = false) {
    setManual(true);
    setActive(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event, index) {
    const count = CHANNELS.length;
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key in moves) {
      event.preventDefault();
      select((index + moves[event.key] + count) % count, true);
    }
  }

  const channel = CHANNELS[active];

  return (
    <section ref={sectionRef} id="messages" aria-labelledby="messages-title" className="scroll-mt-36 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="messages-title" align="center" eyebrow={messages.eyebrow} title={messages.title} description={messages.description} />
        </Reveal>

        <Reveal delay={0.05} className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Customer channel" className="flex flex-wrap justify-center gap-2">
            {CHANNELS.map((name, index) => {
              const selected = index === active;
              return (
                <button
                  key={name}
                  ref={element => {
                    tabRefs.current[index] = element;
                  }}
                  id={`${baseId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={event => handleKeyDown(event, index)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-[border-color,background-color,box-shadow,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    selected ? "border-brand/40 bg-white text-navy shadow-[0_10px_24px_-14px_rgba(242,13,69,.55)]" : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-navy"
                  }`}
                >
                  <ChannelLogo name={name} className="h-5 w-5" />
                  {name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          className="mx-auto mt-10 grid max-w-5xl items-center gap-6 lg:grid-cols-[minmax(0,.8fr)_auto_minmax(0,1.2fr)] lg:gap-8"
        >
          <Reveal>
            <CustomerDevice channel={channel} />
          </Reveal>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <FlowLine className="h-10 lg:hidden" />
            <FlowLine direction="horizontal" className="hidden w-12 lg:block" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={channel}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-[12px] font-semibold text-white"
              >
                <Inbox aria-hidden className="h-3.5 w-3.5" />
                Delivered to OrmiTech
              </motion.span>
            </AnimatePresence>
            <FlowLine className="h-10 lg:hidden" delay={1} />
            <FlowLine direction="horizontal" className="hidden w-12 lg:block" delay={1} />
          </div>
          <Reveal delay={0.1}>
            <UnifiedInbox selected={channel} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
