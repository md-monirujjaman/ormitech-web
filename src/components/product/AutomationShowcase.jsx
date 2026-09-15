"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, MessageSquareText, Workflow, Zap } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { PulseDot } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { automation } from "@/data/product";

const AUTO_ADVANCE_MS = 2800;
const NAV_KEYS = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

// Steps play through on their own while the builder is on screen. Hovering pauses; choosing a step stops autoplay.
function AutomationBuilder() {
  const { steps, trigger } = automation;
  const builderRef = useRef(null);
  const tabRefs = useRef([]);
  const baseId = useId();
  const inView = useInView(builderRef, { margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion || hovering || manual) return;
    const timer = setInterval(() => setActive(index => (index + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, hovering, manual, steps.length]);

  function select(index, moveFocus = false) {
    setManual(true);
    setActive(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event, index) {
    if (event.key in NAV_KEYS) {
      event.preventDefault();
      select((index + NAV_KEYS[event.key] + steps.length) % steps.length, true);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : steps.length - 1, true);
    }
  }

  const tabId = index => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;
  const current = steps[active];

  return (
    <div
      ref={builderRef}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-start"
    >
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_32px_64px_-40px_rgba(13,27,61,.45)] sm:p-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <IconTile icon={Zap} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">Automation builder</p>
            <p className="truncate text-[11.5px] text-slate-500">{automation.flowName}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
            <PulseDot className="bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-brand/30 bg-brand/[.03] px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[.12em] text-brandInk">
            <MessageSquareText className="h-3.5 w-3.5" aria-hidden />
            Trigger
          </p>
          <p className="mt-1 text-[13px] font-semibold text-navy">{trigger.title}</p>
          <p className="text-[12px] text-slate-500">{trigger.detail}</p>
        </div>

        <div role="tablist" aria-label="Automation steps" aria-orientation="vertical" className="mt-1">
          {steps.map((step, index) => {
            const isActive = index === active;
            const done = index < active;
            const Icon = step.icon;
            return (
              <div key={step.id}>
                <span aria-hidden className={`ml-[25px] block h-3 w-0.5 rounded-full transition-colors duration-500 ${index <= active ? "bg-brand" : "bg-slate-200"}`} />
                <button
                  ref={element => {
                    tabRefs.current[index] = element;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={event => handleKeyDown(event, index)}
                  className={`group flex w-full items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    isActive ? "border-brand/40 bg-brand/[.05] shadow-[0_10px_24px_-16px_rgba(242,13,69,.6)]" : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${isActive ? "bg-brand text-white" : done ? "bg-brand/10 text-brand" : "bg-slate-100 text-slate-500 group-hover:text-navy"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-navy">{step.title}</span>
                    <span className="block truncate text-[11.5px] text-slate-500">{step.summary}</span>
                  </span>
                  <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {done ? <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} /> : isActive ? <PulseDot /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-[11.5px] text-slate-500">
          <span>Runs on every new message</span>
          <span className="flex items-center gap-1" aria-hidden>
            {steps.map((step, index) => (
              <span key={step.id} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-5 bg-brand" : index < active ? "w-1.5 bg-brand/40" : "w-1.5 bg-slate-200"}`} />
            ))}
          </span>
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        className="min-h-[250px] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_32px_64px_-40px_rgba(13,27,61,.45)] sm:p-5 md:mt-12"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease }}>
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-[0_8px_18px_-8px_rgba(242,13,69,.7)]">
                <current.icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[.12em] text-brandInk">
                  Step {active + 1} of {steps.length}
                </p>
                <p className="text-sm font-semibold text-navy">{current.title}</p>
              </div>
            </div>
            <p className="mt-3 text-[13.5px] leading-6 text-slate-600">{current.description}</p>
            <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/70 px-3">
              {current.rows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3 py-2 text-[12px]">
                  <dt className="shrink-0 text-slate-500">{label}</dt>
                  <dd className="text-right font-medium text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AutomationShowcase() {
  return (
    <section id="automation" aria-labelledby="automation-title" className="scroll-mt-24 py-4 lg:py-8">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#F4F7FC] px-5 py-12 sm:px-10 lg:px-12 lg:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/[.06] blur-3xl motion-safe:animate-drift" />
          <div className="relative grid items-center gap-12 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
            <Reveal>
              <SectionHeading id="automation-title" eyebrow={automation.eyebrow} title={automation.title} description={automation.description} />
              <Stagger as="ul" stagger={0.08} delay={0.15} className="mt-7 space-y-3">
                {automation.points.map(point => (
                  <StaggerItem as="li" variants={fadeRight} key={point} className="group flex items-start gap-3 text-[15px] text-slate-700">
                    <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 motion-safe:group-hover:scale-110">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {point}
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" arrow>Get started</ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" icon={Workflow}>See how it works</ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <AutomationBuilder />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
