"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { automation } from "@/data/howItWorks";
import FlowLine from "./FlowLine";

const KIND_TONES = {
  When: "bg-navy text-white",
  Check: "bg-sky-100 text-sky-800",
  If: "bg-amber-100 text-amber-800",
  Action: "bg-brand/10 text-brandInk",
  Otherwise: "bg-slate-100 text-slate-600"
};

const RUN_ORDER = [...automation.flow, ...automation.actions].map(node => node.id);
const ALL_NODES = [...automation.flow, ...automation.actions, automation.otherwise];

function WorkflowNode({ node, selected, lit, onSelect, panelId, muted = false }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-controls={panelId}
      onMouseEnter={() => onSelect(node.id)}
      onFocus={() => onSelect(node.id)}
      onClick={() => onSelect(node.id)}
      className={`group relative z-10 flex w-full items-center gap-3 rounded-xl border bg-white px-3.5 py-3 text-left transition-[border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 motion-safe:hover:-translate-y-0.5 ${
        selected
          ? "border-brand shadow-[0_14px_30px_-16px_rgba(242,13,69,.6)]"
          : lit
            ? "border-brand/30 shadow-[0_10px_24px_-20px_rgba(13,27,61,.4)]"
            : muted
              ? "border-dashed border-slate-300"
              : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[.12em] ${KIND_TONES[node.kind]}`}>{node.kind}</span>
      <span className="min-w-0 flex-1 text-[13.5px] font-semibold leading-snug text-navy">{node.title}</span>
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${lit ? "bg-brand" : "bg-slate-200"}`} />
    </button>
  );
}

// Steps light up in order the first time the workflow scrolls into view; hovering or selecting a step shows its details.
export default function AutomationWorkflow() {
  const canvasRef = useRef(null);
  const panelId = useId();
  const inView = useInView(canvasRef, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [runIndex, setRunIndex] = useState(-1);
  const [selectedId, setSelectedId] = useState("when");

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      const timer = setTimeout(() => setRunIndex(RUN_ORDER.length - 1), 0);
      return () => clearTimeout(timer);
    }
    const timers = RUN_ORDER.map((_, index) => setTimeout(() => setRunIndex(index), 300 + index * 550));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  const isLit = id => RUN_ORDER.indexOf(id) !== -1 && RUN_ORDER.indexOf(id) <= runIndex;
  const branchLit = runIndex >= automation.flow.length;
  const selected = ALL_NODES.find(node => node.id === selectedId);

  return (
    <section id="automate" aria-labelledby="automate-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="automate-title" eyebrow={automation.eyebrow} title={automation.title} description={automation.description} />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-start">
          <Reveal>
            <div ref={canvasRef} className="dot-bg relative rounded-3xl border border-slate-200/70 bg-[#F7F9FC] p-5 sm:p-8">
              <div className="mx-auto max-w-sm">
                {automation.flow.map((node, index) => (
                  <div key={node.id}>
                    {index > 0 && <FlowLine className="mx-auto h-6" delay={index * 0.4} />}
                    <WorkflowNode node={node} selected={selectedId === node.id} lit={isLit(node.id)} onSelect={setSelectedId} panelId={panelId} />
                  </div>
                ))}
              </div>

              <svg aria-hidden viewBox="0 0 400 44" preserveAspectRatio="none" className="hidden h-11 w-full sm:block" fill="none">
                {["M200 0 V14 Q200 22 190 22 H110 Q100 22 100 30 V44", "M200 0 V14 Q200 22 210 22 H290 Q300 22 300 30 V44"].map((d, index) => (
                  <path
                    key={d}
                    d={d}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className={`transition-colors duration-500 ${index === 0 && branchLit ? "stroke-brand" : "stroke-slate-300"}`}
                    strokeDasharray={index === 1 ? "4 4" : undefined}
                  />
                ))}
              </svg>
              <FlowLine className="mx-auto h-6 sm:hidden" />

              <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
                <div>
                  <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[.14em] text-emerald-700">Yes · sales path</p>
                  {automation.actions.map((node, index) => (
                    <div key={node.id}>
                      {index > 0 && <FlowLine className="mx-auto h-4" delay={index * 0.4} />}
                      <WorkflowNode node={node} selected={selectedId === node.id} lit={isLit(node.id)} onSelect={setSelectedId} panelId={panelId} />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">No · AI continues</p>
                  <WorkflowNode node={automation.otherwise} selected={selectedId === automation.otherwise.id} lit={false} muted onSelect={setSelectedId} panelId={panelId} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-40">
            <div id={panelId} className="min-h-[260px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_32px_64px_-40px_rgba(13,27,61,.45)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-slate-500">Step details</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }}>
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[.12em] ${KIND_TONES[selected.kind]}`}>{selected.kind}</span>
                    <h3 className="text-lg font-semibold text-navy">{selected.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{selected.detail}</p>
                  <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/70 px-3">
                    {selected.rows.map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-3 py-2.5 text-[13px]">
                        <dt className="shrink-0 text-slate-500">{label}</dt>
                        <dd className="text-right font-medium text-slate-700">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
