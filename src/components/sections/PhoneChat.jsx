"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BatteryFull, Bot, Check, CheckCheck, ChevronLeft, EllipsisVertical, FileText, Paperclip, Send, Signal, Smile, Tag, UserRound, Wifi } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { TypingDots } from "@/components/ui/effects";
import { ease } from "@/components/ui/Reveal";

// The five story steps, in the order the section walks through them.
export const phaseNames = ["Inbox", "Contact", "AI reply", "Handover", "Notes"];

const rise = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.1, ease } },
  exit: { opacity: 0, transition: { duration: 0.05 } }
};

// Sizes inside the phone are written in cqw (1cqw = 1% of the phone width), so the whole device scales as one piece.
const fs = size => ({ fontSize: `${size}cqw` });

function Bubble({ side, label, children, time, ticks, tone = "light" }) {
  const mine = side === "right";
  return (
    <motion.div variants={rise} initial="hidden" animate="show" exit="exit" layout className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        style={fs(3.4)}
        className={`max-w-[84%] px-[3cqw] py-[2.2cqw] leading-[1.45] ${mine ? "rounded-[3.6cqw] rounded-br-[1cqw]" : "rounded-[3.6cqw] rounded-bl-[1cqw]"} ${
          tone === "ai" ? "bg-gradient-to-br from-[#FFE9EF] to-[#FFDCE5] text-[#7A1030]" : mine ? "bg-brand text-white" : "bg-[#F1F3F7] text-slate-700"
        }`}
      >
        {label && (
          <p style={fs(2.6)} className={`mb-[0.8cqw] flex items-center gap-[1cqw] font-bold uppercase tracking-[.1em] ${tone === "ai" ? "text-brand" : "text-brand"}`}>
            {label}
          </p>
        )}
        {children}
        <p style={fs(2.5)} className={`mt-[1cqw] flex items-center justify-end gap-[0.8cqw] ${mine && tone !== "ai" ? "text-white/70" : "text-slate-400"}`}>
          {time}
          {ticks && <CheckCheck className="h-[3cqw] w-[3cqw] text-sky-500" />}
        </p>
      </div>
    </motion.div>
  );
}

function SystemPill({ children }) {
  return (
    <motion.p variants={rise} initial="hidden" animate="show" exit="exit" layout style={fs(2.9)} className="mx-auto max-w-[92%] rounded-full border border-dashed border-slate-300 bg-white px-[3cqw] py-[1.2cqw] text-center font-medium text-slate-500">
      {children}
    </motion.p>
  );
}

const toolbar = [
  { label: "Tag", Icon: Tag, at: 1 },
  { label: "AI reply", Icon: Bot, at: 2 },
  { label: "Assign", Icon: UserRound, at: 3 },
  { label: "Note", Icon: FileText, at: 4 }
];

const stages = ["New", "Qualified", "Won"];

export default function PhoneChat({ step }) {
  const [aiShown, setAiShown] = useState(false);
  const [agentShown, setAgentShown] = useState(false);

  // The AI "types" for a moment on its own step, then its reply lands; later steps already have it.
  useEffect(() => {
    if (step < 2) {
      setAiShown(false);
      return undefined;
    }
    if (step > 2) {
      setAiShown(true);
      return undefined;
    }
    const timer = setTimeout(() => setAiShown(true), 100);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step < 3) {
      setAgentShown(false);
      return undefined;
    }
    if (step > 3) {
      setAgentShown(true);
      return undefined;
    }
    const timer = setTimeout(() => setAgentShown(true), 100);
    return () => clearTimeout(timer);
  }, [step]);

  const handler = step >= 3 ? "agent" : step >= 2 ? "ai" : null;

  return (
    <div
      role="img"
      aria-label="A phone showing one conversation: a customer asks about pricing, it becomes a contact, AI answers, a teammate takes over and a note and lead stage are added"
      className="relative mx-auto w-[min(100%,340px)] min-w-[230px] drop-shadow-[0_40px_60px_rgba(13,27,61,.28)]"
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[16%] h-[5%] w-[3px] rounded-l bg-[#1B2030]" />
      <span aria-hidden className="absolute -left-[3px] top-[24%] h-[9%] w-[3px] rounded-l bg-[#1B2030]" />
      <span aria-hidden className="absolute -left-[3px] top-[35%] h-[9%] w-[3px] rounded-l bg-[#1B2030]" />
      <span aria-hidden className="absolute -right-[3px] top-[28%] h-[13%] w-[3px] rounded-r bg-[#1B2030]" />

      <div className="aspect-[9/18.6] rounded-[13.5%/6.6%] bg-gradient-to-b from-[#2A3045] via-[#0B0D12] to-[#1B2030] p-[2.6%] ring-1 ring-black/40">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[11.6%/5.7%] bg-white [container-type:inline-size]">
          {/* status bar + dynamic island */}
          <div className="relative flex shrink-0 items-center justify-between px-[7cqw] pb-[1cqw] pt-[3.4cqw]" style={fs(3.1)}>
            <span className="font-semibold text-slate-900">10:24</span>
            <span aria-hidden className="absolute left-1/2 top-[2.4cqw] h-[6cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-[#0B0D12]" />
            <span className="flex items-center gap-[1.2cqw] text-slate-900">
              <Signal className="h-[3.4cqw] w-[3.4cqw]" />
              <Wifi className="h-[3.4cqw] w-[3.4cqw]" />
              <BatteryFull className="h-[4.2cqw] w-[4.2cqw]" />
            </span>
          </div>

          {/* conversation header */}
          <div className="flex shrink-0 items-center gap-[2.2cqw] border-b border-slate-100 px-[3.5cqw] pb-[2.6cqw] pt-[1.6cqw]">
            <ChevronLeft className="h-[5cqw] w-[5cqw] text-brand" />
            <span className="relative shrink-0">
              <span style={fs(3.2)} className="flex h-[9.6cqw] w-[9.6cqw] items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 font-semibold text-white">SJ</span>
              <span className="absolute -bottom-[0.6cqw] -right-[0.8cqw] flex h-[4.4cqw] w-[4.4cqw] items-center justify-center rounded-full bg-white ring-[0.5cqw] ring-white">
                <ChannelLogo name="Facebook" className="h-[3.6cqw] w-[3.6cqw]" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p style={fs(3.7)} className="truncate font-semibold text-slate-900">Sarah Johnson</p>
              <p style={fs(2.8)} className="flex items-center gap-[1cqw] text-emerald-600">
                <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-emerald-500" /> Active now
              </p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {handler && (
                <motion.span
                  key={handler}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1, ease }}
                  style={fs(2.7)}
                  className={`flex items-center gap-[1cqw] rounded-full py-[0.9cqw] pl-[1cqw] pr-[2.2cqw] font-semibold ${handler === "ai" ? "bg-brand/10 text-brand" : "bg-emerald-50 text-emerald-700"}`}
                >
                  <span className={`flex h-[4.4cqw] w-[4.4cqw] items-center justify-center rounded-full text-white ${handler === "ai" ? "bg-brand" : "bg-emerald-600"}`}>
                    {handler === "ai" ? <Bot className="h-[2.8cqw] w-[2.8cqw]" /> : <span style={fs(2)}>FA</span>}
                  </span>
                  {handler === "ai" ? "AI" : "Farhan"}
                </motion.span>
              )}
            </AnimatePresence>
            <EllipsisVertical className="h-[4.6cqw] w-[4.6cqw] shrink-0 text-slate-400" />
          </div>

          {/* new-message banner, only while the message is first arriving */}
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                key="banner"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease }}
                className="absolute inset-x-[3.5cqw] top-[16cqw] z-10 flex items-center gap-[2.4cqw] rounded-[3cqw] border border-slate-100 bg-white/95 px-[3cqw] py-[2.2cqw] shadow-[0_10px_30px_-12px_rgba(13,27,61,.35)] backdrop-blur"
              >
                <span className="flex h-[7cqw] w-[7cqw] items-center justify-center rounded-[2cqw] bg-slate-50">
                  <ChannelLogo name="Facebook" className="h-[4.6cqw] w-[4.6cqw]" />
                </span>
                <span style={fs(3)} className="min-w-0 flex-1 leading-tight">
                  <span className="block font-semibold text-slate-900">New message</span>
                  <span className="block truncate text-slate-500">Sarah Johnson · Facebook</span>
                </span>
                <span style={fs(2.6)} className="text-slate-400">now</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* messages: newest at the bottom, older ones scroll away under a soft fade */}
          <div
            className="relative flex min-h-0 flex-1 flex-col justify-end gap-[2.2cqw] overflow-hidden px-[3.5cqw] pb-[2cqw] pt-[3cqw] [mask-image:linear-gradient(to_bottom,transparent_0,#000_9cqw)]"
            style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 9cqw)" }}
          >
            <p style={fs(2.6)} className="mx-auto shrink-0 rounded-full bg-slate-100 px-[2.6cqw] py-[0.8cqw] font-medium text-slate-400">Today</p>
            <AnimatePresence initial={false}>
              <Bubble key="customer" side="left" time="10:24 AM">
                Hi, I&apos;m interested in your product. Can you tell me more about the pricing?
              </Bubble>

              {step >= 1 && (
                <motion.div key="contact" variants={rise} initial="hidden" animate="show" exit="exit" layout className="flex items-center gap-[2cqw] rounded-[3cqw] border border-slate-200 bg-white p-[2.4cqw]">
                  <span style={fs(2.8)} className="flex h-[7.6cqw] w-[7.6cqw] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 font-semibold text-white">SJ</span>
                  <span style={fs(3)} className="min-w-0 flex-1 leading-tight">
                    <span className="block font-semibold text-slate-800">Saved to contacts</span>
                    <span className="block text-slate-400">Facebook · first message</span>
                  </span>
                  <span style={fs(2.6)} className="rounded-full bg-brand/10 px-[2cqw] py-[0.8cqw] font-semibold text-brand">Interested</span>
                </motion.div>
              )}

              {step >= 2 && !aiShown && (
                <motion.div key="typing" variants={rise} initial="hidden" animate="show" exit="exit" layout className="flex justify-end">
                  <span className="rounded-[3.6cqw] rounded-br-[1cqw] bg-[#FFE3EA] px-[3.4cqw] py-[2.6cqw]">
                    <TypingDots dotClassName="bg-brand" />
                  </span>
                </motion.div>
              )}

              {step >= 2 && aiShown && (
                <Bubble key="ai" side="right" tone="ai" time="10:25 AM" ticks label={<><Bot className="h-[3cqw] w-[3cqw]" /> OrmiTech AI</>}>
                  Yes, of course! Here&apos;s an overview of our plans. Would you like to see the full details?
                </Bubble>
              )}

              {step >= 3 && aiShown && <SystemPill key="handover">Handed over to Farhan A. · full history attached</SystemPill>}

              {step >= 3 && agentShown && (
                <Bubble key="agent" side="right" time="10:27 AM" ticks label="Farhan A.">
                  Hi Sarah, I&apos;ll walk you through the plans.
                </Bubble>
              )}

              {step >= 4 && (
                <motion.div key="note" variants={rise} initial="hidden" animate="show" exit="exit" layout className="rounded-[3cqw] border border-amber-100 bg-amber-50 px-[3cqw] py-[2cqw]">
                  <p style={fs(2.6)} className="flex items-center gap-[1cqw] font-bold uppercase tracking-[.1em] text-amber-700">
                    <FileText className="h-[2.8cqw] w-[2.8cqw]" /> Internal note
                  </p>
                  <p style={fs(3.1)} className="mt-[0.6cqw] leading-snug text-slate-600">Wants a plan for her team. Follow up tomorrow.</p>
                  <div className="mt-[1.8cqw] flex items-center gap-[1.4cqw]" style={fs(2.6)}>
                    {stages.map((stage, index) => (
                      <span key={stage} className="flex items-center gap-[1.4cqw]">
                        <span className={`rounded-full px-[2cqw] py-[0.7cqw] font-semibold ${index === 1 ? "bg-emerald-500 text-white" : "bg-white text-slate-400 ring-1 ring-slate-200"}`}>
                          {stage}
                        </span>
                        {index < stages.length - 1 && <span aria-hidden className="h-px w-[3cqw] bg-slate-300" />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* what the team can do from here; each one lights up on its own step */}
          <div className="flex shrink-0 items-center gap-[1.6cqw] overflow-hidden border-t border-slate-100 px-[3.5cqw] py-[2cqw]">
            {toolbar.map(({ label, Icon, at }) => {
              const done = step > at;
              const live = step === at;
              return (
                <span
                  key={label}
                  style={fs(2.8)}
                  className={`flex items-center gap-[1cqw] rounded-full border px-[2.4cqw] py-[1.1cqw] font-semibold transition-[background-color,color,border-color,transform] duration-100 ${
                    live ? "scale-105 border-brand bg-brand text-white" : done ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {done ? <Check className="h-[3cqw] w-[3cqw]" /> : <Icon className="h-[3cqw] w-[3cqw]" />}
                  {label}
                </span>
              );
            })}
          </div>

          {/* composer */}
          <div className="flex shrink-0 items-center gap-[2cqw] px-[3.5cqw] pb-[1.6cqw]">
            <span style={fs(3.2)} className="flex h-[10cqw] flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-[3.6cqw] text-slate-400">Type your message...</span>
            <Smile aria-hidden className="h-[5cqw] w-[5cqw] text-slate-400" />
            <Paperclip aria-hidden className="h-[5cqw] w-[5cqw] text-slate-400" />
            <span className="flex h-[10cqw] w-[10cqw] items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_16px_-8px_rgba(242,13,69,.9)]">
              <Send aria-hidden className="h-[4.4cqw] w-[4.4cqw]" />
            </span>
          </div>
          <span aria-hidden className="mx-auto mb-[1.8cqw] h-[1.2cqw] w-[32cqw] shrink-0 rounded-full bg-slate-900/80" />
        </div>
      </div>
    </div>
  );
}
