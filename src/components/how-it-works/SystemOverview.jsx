"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Server, ShoppingBag, Sparkles, Target, UserRound, UsersRound, Workflow } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { system } from "@/data/howItWorks";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { channels } from "@/data/site";
import FlowLine from "./FlowLine";

const draw = { hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease } } };

// Curved connectors that fan out from (or into) the centre to `count` evenly spaced columns.
function Junction({ count, direction = "out", className = "" }) {
  const width = 400;
  const paths = Array.from({ length: count }, (_, index) => {
    const x = ((index + 0.5) / count) * width;
    return direction === "out" ? `M200 0 C200 26 ${x} 22 ${x} 48` : `M${x} 0 C${x} 26 200 22 200 48`;
  });
  return (
    <svg aria-hidden viewBox={`0 0 ${width} 48`} preserveAspectRatio="none" className={`h-12 w-full ${className}`} fill="none">
      {paths.map(d => (
        <g key={d}>
          <motion.path d={d} variants={draw} stroke="rgba(242,13,69,.28)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={d} stroke="#F20D45" strokeWidth="1.5" strokeDasharray="4 12" vectorEffect="non-scaling-stroke" className="opacity-0 motion-safe:animate-dash motion-safe:opacity-60" />
        </g>
      ))}
    </svg>
  );
}

// `compact` stacks the icon above the label on phones, for rows of three narrow nodes.
function Node({ icon: Icon, label, sub, tone = "light", compact = false, className = "" }) {
  const tones = {
    light: "border border-slate-200/80 bg-white text-navy",
    brand: "bg-brand text-white shadow-[0_18px_36px_-14px_rgba(242,13,69,.65)]",
    navy: "bg-navy text-white shadow-[0_18px_36px_-18px_rgba(13,27,61,.7)]"
  };
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } } }}
      className={`group flex items-center justify-center rounded-2xl py-2.5 text-center transition-transform duration-300 motion-safe:hover:-translate-y-1 ${compact ? "flex-col gap-1 px-1.5 sm:flex-row sm:gap-2 sm:px-3" : "gap-2 px-3"} ${tones[tone]} ${className}`}
    >
      {Icon && <Icon aria-hidden className={`h-4 w-4 shrink-0 ${tone === "light" ? "text-brand" : ""}`} />}
      <span className="min-w-0">
        <span className="block text-[13.5px] font-semibold leading-tight">{label}</span>
        {sub && <span className={`block text-[11.5px] leading-tight ${tone === "light" ? "text-slate-500" : "text-white/70"}`}>{sub}</span>}
      </span>
    </motion.div>
  );
}

export default function SystemOverview() {
  return (
    <section id="system" aria-labelledby="system-title" className="scroll-mt-36 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="system-title" align="center" eyebrow={system.eyebrow} title={system.title} description={system.description} />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          role="img"
          aria-label="OrmiTech system overview: a customer messages you on Facebook, Instagram, WhatsApp or your website; OrmiTech passes the conversation through the AI engine, automation engine and backend services; this produces leads, orders and customer records, which appear in your dashboard for your team"
          className="dot-bg mx-auto mt-14 max-w-3xl rounded-3xl border border-slate-200/70 bg-white/60 p-5 sm:p-8"
        >
          <Node icon={UserRound} label="Customer" className="mx-auto w-fit px-5" />
          <Junction count={4} className="hidden sm:block" />
          <FlowLine className="mx-auto h-8 sm:hidden" />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {channels.map(channel => (
              <motion.div
                key={channel.name}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-2 py-2.5 text-[13px] font-semibold text-navy transition-transform duration-300 motion-safe:hover:-translate-y-1"
              >
                <ChannelLogo name={channel.name} className="h-5 w-5" />
                {channel.name}
              </motion.div>
            ))}
          </div>

          <Junction count={4} direction="in" className="hidden sm:block" />
          <FlowLine className="mx-auto h-8 sm:hidden" delay={0.5} />

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease } } }}
            className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-brand px-5 py-3.5 text-white shadow-[0_22px_44px_-16px_rgba(242,13,69,.7)]"
          >
            <svg aria-hidden viewBox={markViewBox} className="h-6 w-6">
              <path d={markPath} fill="currentColor" />
            </svg>
            <span>
              <span className="block text-base font-semibold leading-tight">OrmiTech</span>
              <span className="block text-[12px] text-white/80">Unified inbox</span>
            </span>
          </motion.div>

          <FlowLine className="mx-auto h-8" delay={1} />
          <div className="mx-auto grid max-w-xs gap-0">
            <Node icon={Sparkles} label="AI engine" sub="Understands and replies" tone="navy" />
            <FlowLine className="mx-auto h-6" delay={1.4} />
            <Node icon={Workflow} label="Automation engine" sub="Runs your workflows" tone="navy" />
            <FlowLine className="mx-auto h-6" delay={1.8} />
            <Node icon={Server} label="Backend services" sub="Processes and stores data" tone="navy" />
          </div>

          <Junction count={3} />
          <div className="grid grid-cols-3 gap-2">
            <Node icon={Target} label="Leads" compact />
            <Node icon={ShoppingBag} label="Orders" compact />
            <Node icon={UserRound} label="Customers" compact />
          </div>
          <Junction count={3} direction="in" />

          <Node icon={LayoutDashboard} label="Your dashboard" sub="Everything in one workspace" tone="brand" className="mx-auto w-fit px-5" />
          <FlowLine className="mx-auto h-8" delay={2.2} />
          <Node icon={UsersRound} label="Your team" sub="Replies, takes over, follows up" className="mx-auto w-fit px-5" />
        </motion.div>
      </div>
    </section>
  );
}
