"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { analytics } from "@/data/product";

// Bars start at zero size, which intersection observers can miss, so the whole dashboard triggers them together.
const growY = delay => ({ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, delay, ease } } });
const growX = (delay, duration = 0.7) => ({ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration, delay, ease } } });

// Illustrative dashboard: every number comes from `analytics.sample` and is labelled as sample data.
function AnalyticsDashboard() {
  const { kpis, weekly, handled, intents } = analytics.sample;
  const peak = weekly.reduce((best, day) => (day.value > best.value ? day : best), weekly[0]);

  const label = [
    "Sample OrmiTech analytics dashboard.",
    kpis.map(kpi => `${kpi.label}: ${kpi.value}`).join(", "),
    `Conversations per day peak on ${peak.day} at ${peak.value}.`,
    `${handled.ai}% handled by AI and ${handled.team}% by the team.`,
    `Top intents: ${intents.map(intent => `${intent.label} ${intent.share}%`).join(", ")}.`
  ].join(" ");

  return (
    <motion.div
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-navy">Analytics</p>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">This week</span>
        <span className="ml-auto rounded-full border border-dashed border-slate-300 px-2 py-0.5 text-[10.5px] font-medium text-slate-500">Sample data</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="group rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 transition-colors duration-300 hover:border-brand/20 hover:bg-[#FFF8FA]">
            <p className="text-[11px] text-slate-500">{kpi.label}</p>
            <CountUp value={kpi.value} className="mt-0.5 block text-xl font-bold tracking-[-0.02em] text-navy tabular-nums" />
            <p className="text-[10.5px] text-slate-400">{kpi.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex flex-col rounded-xl border border-slate-100 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-navy">Conversations per day</p>
            <span className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
              <span className="h-2 w-2 rounded-sm bg-brand" />
              Peak
            </span>
          </div>
          <div className="mt-3 flex min-h-32 flex-1 items-end gap-2">
            {weekly.map((day, index) => (
              <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <motion.span
                  variants={growY(0.2 + index * 0.06)}
                  className={`block w-full max-w-[26px] origin-bottom rounded-t-[4px] transition-colors duration-200 ${day === peak ? "bg-brand" : "bg-brand/20 hover:bg-brand/40"}`}
                  style={{ height: `${(day.value / peak.value) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-slate-100 p-3">
            <p className="text-[12px] font-semibold text-navy">Who handled conversations</p>
            <div className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
              <motion.span variants={growX(0.3, 0.8)} className="block h-full origin-left rounded-l-full bg-brand" style={{ width: `${handled.ai}%` }} />
              <motion.span variants={growX(0.9, 0.6)} className="block h-full origin-left rounded-r-full bg-navy" style={{ width: `${handled.team}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-brand" />
                AI {handled.ai}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-navy" />
                Team {handled.team}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-3">
            <p className="text-[12px] font-semibold text-navy">Top intents</p>
            <ul className="mt-2.5 space-y-2">
              {intents.map((intent, index) => (
                <li key={intent.label} className="text-[11px]">
                  <span className="flex justify-between text-slate-600">
                    <span>{intent.label}</span>
                    <span className="font-semibold text-navy">{intent.share}%</span>
                  </span>
                  <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.span
                      variants={growX(0.4 + index * 0.12)}
                      className="block h-full origin-left rounded-full bg-brand/70"
                      style={{ width: `${(intent.share / intents[0].share) * 100}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnalyticsShowcase() {
  return (
    <section id="analytics" aria-labelledby="analytics-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <Reveal>
            <SectionHeading id="analytics-title" eyebrow={analytics.eyebrow} title={analytics.title} description={analytics.description} />
          </Reveal>
          <Stagger as="dl" stagger={0.09} delay={0.1} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/80">
            {analytics.facts.map(fact => (
              <StaggerItem key={fact.label} className="group flex flex-col-reverse bg-white p-5 transition-colors duration-300 hover:bg-[#FFF8FA]">
                <dt className="mt-1 text-[13.5px] leading-snug text-slate-600">{fact.label}</dt>
                <dd>
                  <CountUp value={fact.value} className="block text-4xl font-bold tracking-[-0.04em] text-navy tabular-nums" />
                  <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-brand transition-[width] duration-300 group-hover:w-14" />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <AnalyticsDashboard />
        </Reveal>
      </div>
    </section>
  );
}
