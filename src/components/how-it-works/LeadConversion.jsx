"use client";

import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import { useTimeline } from "@/components/ui/effects";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { leads } from "@/data/howItWorks";

const COLUMN_TONES = ["bg-sky-500", "bg-slate-400", "bg-amber-500", "bg-emerald-500"];

const otherLeads = [
  { name: "Ayesha K.", channel: "Instagram", topic: "Product question", tone: "from-amber-400 to-orange-600" },
  { name: "Tanvir H.", channel: "WhatsApp", topic: "Price request", tone: "from-emerald-400 to-emerald-700" },
  { name: "Nusrat J.", channel: "Website", topic: "Bulk sizes", tone: "from-rose-400 to-red-600" },
  { name: "Sadia R.", channel: "Instagram", topic: "Order #4822", tone: "from-fuchsia-400 to-pink-600" }
];

function LeadCard({ lead, highlight = false, layoutId }) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ layout: { duration: 0.6, ease } }}
      className={`rounded-xl border bg-white p-2.5 ${highlight ? "border-brand/40 shadow-[0_14px_30px_-16px_rgba(242,13,69,.6)]" : "border-slate-200/80"}`}
    >
      <div className="flex items-center gap-2">
        <Initials name={lead.name} tone={lead.tone} className="h-7 w-7 text-[9px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold text-navy">{lead.name}</p>
          <p className="flex items-center gap-1 truncate text-[11px] text-slate-500">
            <ChannelLogo name={lead.channel} className="h-3 w-3" />
            {lead.topic}
          </p>
        </div>
      </div>
      {highlight && (
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="rounded-full bg-red-50 px-1.5 py-px text-[10px] font-semibold text-red-700">High intent</span>
          <span className="rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-600">Farhan A.</span>
        </div>
      )}
    </motion.div>
  );
}

// The highlighted lead moves through the dashboard's lead statuses once the board is in view.
export default function LeadConversion() {
  const ref = useRef(null);
  const layoutBase = useId();
  const [replay, setReplay] = useState(0);
  const stage = useTimeline(ref, [1400, 2800, 4200], replay);
  const featured = { name: "Rahim U.", channel: "Facebook", topic: "Wholesale · 50 units", tone: "from-sky-400 to-blue-600" };

  return (
    <section id="convert" aria-labelledby="convert-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <Reveal>
            <SectionHeading id="convert-title" eyebrow={leads.eyebrow} title={leads.title} description={leads.description} />
          </Reveal>
          <Reveal delay={0.05}>
            <ol className="mt-8 space-y-2" aria-label="Lead journey">
              {leads.journey.map((step, index) => {
                const reached = step.stage <= stage;
                return (
                  <li key={step.title} className="flex items-center gap-3">
                    <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-500 ${reached ? "bg-brand text-white" : "bg-slate-100 text-slate-400"}`}>
                      {reached ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
                    </span>
                    <span className={`text-[15px] font-medium transition-colors duration-500 ${reached ? "text-navy" : "text-slate-400"}`}>{step.title}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div ref={ref} className="rounded-2xl border border-slate-200/80 bg-[#F7F9FC] p-3 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-4">
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <p className="text-sm font-semibold text-navy">Leads</p>
              <button
                type="button"
                onClick={() => setReplay(count => count + 1)}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-brand/30 hover:text-brandInk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <RotateCcw aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 motion-safe:group-hover:-rotate-180" />
                Replay
              </button>
            </div>
            <div role="img" aria-label={`Lead board with New, Contacted, Qualified and Converted columns. Rahim U.’s wholesale lead is currently ${leads.statuses[stage]}.`} className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {leads.statuses.map((status, column) => (
                <div key={status} className="min-h-[190px] rounded-xl bg-white/70 p-2 ring-1 ring-slate-200/70">
                  <p className="mb-2 flex items-center justify-between px-1 text-[11.5px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${COLUMN_TONES[column]}`} />
                      {status}
                    </span>
                    <span className="rounded-full bg-slate-100 px-1.5 text-[10.5px]">{1 + (stage === column ? 1 : 0)}</span>
                  </p>
                  <div className="space-y-2">
                    {stage === column && <LeadCard lead={featured} highlight layoutId={`${layoutBase}-featured`} />}
                    <LeadCard lead={otherLeads[column]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
