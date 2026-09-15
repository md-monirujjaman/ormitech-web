"use client";

import { ArrowRight, Check } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import ChannelLogo from "@/components/common/ChannelLogo";
import { inboxHighlight } from "@/data/features";
import { PulseDot, TypingDots } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, fadeRight } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

// Conversations and contact details reuse the examples from the homepage walkthrough.
const conversations = [
  { name: "Nusrat J.", channel: "Website", text: "Is this refundable if it doesn't fit?", time: "2m", unread: true, tone: "from-rose-400 to-red-600" },
  { name: "Tanvir H.", channel: "WhatsApp", typing: true, time: "5m", tone: "from-emerald-400 to-emerald-700" },
  { name: "Sadia R.", channel: "Instagram", text: "Do you have this in blue?", time: "12m", tone: "from-fuchsia-400 to-pink-600" },
  { name: "Rahim U.", channel: "Facebook", text: "Can I get a wholesale price?", time: "18m", tone: "from-sky-400 to-blue-600" }
];

const contactRows = [
  ["First seen", "Live chat · Mar 2026"],
  ["Conversations", "7 across 3 channels"],
  ["Last order", "#4821 · swapped to M"],
  ["Notes", "Prefers WhatsApp follow-up"]
];

const filters = ["All", "Facebook", "Instagram", "WhatsApp", "Website"];

function Initials({ name, tone, className = "h-9 w-9 text-[11px]" }) {
  const initials = name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return <span className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${tone} ${className}`}>{initials}</span>;
}

function InboxMockup() {
  return (
    <div
      role="img"
      aria-label="Illustration of the OrmiTech unified inbox with conversations from Facebook, Instagram, WhatsApp and website chat next to a contact record"
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] transition-[transform,box-shadow] duration-500 hover:shadow-[0_60px_110px_-50px_rgba(13,27,61,.55)] motion-safe:hover:-translate-y-1"
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="mx-auto text-[10px] font-medium uppercase tracking-[.14em] text-slate-400">ormitech · inbox</span>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="min-w-0 sm:border-r sm:border-slate-100">
          <Stagger stagger={0.05} delay={0.2} className="flex gap-1.5 overflow-hidden border-b border-slate-100 px-4 py-3">
            {filters.map((filter, index) => (
              <StaggerItem
                as="span"
                key={filter}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors duration-200 ${index === 0 ? "bg-brand text-white" : "border border-slate-200 text-slate-500 hover:border-brand/30 hover:text-brandInk"}`}
              >
                {filter}
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger as="ul" stagger={0.12} delay={0.35} className="divide-y divide-slate-100">
            {conversations.map(row => (
              <StaggerItem
                as="li"
                variants={fadeRight}
                key={row.name}
                className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-slate-50 ${row.unread ? "bg-brand/[.04]" : ""}`}
              >
                <span className="relative">
                  <Initials name={row.name} tone={row.tone} />
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-white p-px">
                    <ChannelLogo name={row.channel} className="h-4 w-4" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-semibold text-navy">{row.name}</span>
                    <span className="shrink-0 text-[10px] text-slate-400">{row.time}</span>
                  </div>
                  {row.typing ? (
                    <p className="mt-1 flex items-center gap-1.5 text-[11.5px] italic text-slate-400">
                      <TypingDots dotClassName="bg-emerald-500" />
                      typing
                    </p>
                  ) : (
                    <p className="mt-0.5 truncate text-[11.5px] text-slate-500">{row.text}</p>
                  )}
                </div>
                {row.unread && <PulseDot />}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="hidden p-5 sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-brandInk">Contact record</p>
          <div className="mt-3 flex items-center gap-3">
            <Initials name="Nusrat J." tone="from-rose-400 to-red-600" className="h-11 w-11 text-xs" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy">Nusrat J.</p>
              <p className="truncate text-[11px] text-slate-500">nusrat@brightloom.co</p>
            </div>
          </div>
          <Stagger as="dl" stagger={0.1} delay={0.6} className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/60 px-3">
            {contactRows.map(([label, value]) => (
              <StaggerItem key={label} className="flex items-center justify-between gap-3 py-2 text-[11px]">
                <dt className="text-slate-400">{label}</dt>
                <dd className="truncate text-right font-medium text-slate-600">{value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Tags", "Notes", "History"].map(chip => (
              <span key={chip} className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200 transition-colors duration-200 hover:text-brandInk hover:ring-brand/30">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InboxHighlight() {
  return (
    <section id="unified-inbox" aria-labelledby="unified-inbox-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <SectionHeading id="unified-inbox-title" eyebrow={inboxHighlight.eyebrow} title={inboxHighlight.title} description={inboxHighlight.description} />
          <Stagger as="ul" stagger={0.1} delay={0.15} className="mt-7 space-y-3">
            {inboxHighlight.points.map(point => (
              <StaggerItem as="li" variants={fadeRight} key={point} className="group flex items-start gap-3 text-[15px] text-slate-700">
                <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 motion-safe:group-hover:scale-110">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </StaggerItem>
            ))}
          </Stagger>
          <ButtonLink href="/product" variant="secondary" className="mt-8">
            Explore the product
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1}>
          <InboxMockup />
        </Reveal>
      </div>
    </section>
  );
}
