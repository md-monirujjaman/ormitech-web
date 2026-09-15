"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPriceLabel, planFinder, recommendPlan } from "@/data/pricing";

const initialAnswers = Object.fromEntries(planFinder.questions.map(question => [question.id, question.options[0].id]));

// Lightweight client-side helper: the recommendation updates as soon as an answer changes.
export default function PlanFinder() {
  const baseId = useId();
  const [answers, setAnswers] = useState(initialAnswers);

  const selectedOptions = planFinder.questions.map(question => ({
    question,
    option: question.options.find(option => option.id === answers[question.id])
  }));
  const values = Object.fromEntries(selectedOptions.map(({ question, option }) => [question.id, option.value]));
  const plan = recommendPlan(values);

  return (
    <section id="plan-finder" aria-labelledby="plan-finder-title" className="scroll-mt-24 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="plan-finder-title" eyebrow="Plan finder" title="Not sure which plan is right for you?" description="Answer four quick questions and we’ll point you to the plan that fits." />
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <Reveal className="space-y-5">
            {planFinder.questions.map((question, index) => (
              <fieldset key={question.id} className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <legend className="sr-only">{question.label}</legend>
                <p aria-hidden className="flex items-center gap-2.5 text-[15px] font-semibold text-navy">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-[12px] font-bold text-brandInk">{index + 1}</span>
                  {question.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {question.options.map(option => (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${baseId}-${question.id}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => setAnswers(current => ({ ...current, [question.id]: option.id }))}
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-[border-color,background-color,color] duration-200 hover:border-slate-300 hover:text-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div aria-live="polite" className="overflow-hidden rounded-2xl border border-brand/25 bg-white shadow-[0_32px_64px_-36px_rgba(242,13,69,.4)]">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-brand/[.04] px-5 py-3 text-[12px] font-bold uppercase tracking-[.14em] text-brandInk">
                <Sparkles aria-hidden className="h-4 w-4" />
                Recommended for you
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease }} className="p-5 sm:p-6">
                  <p className="text-3xl font-bold tracking-[-0.03em] text-navy">{plan.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{getPriceLabel(plan)}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{plan.tagline}</p>
                  <p className="mt-5 text-[12px] font-bold uppercase tracking-[.12em] text-slate-500">Matches your answers</p>
                  <ul className="mt-2 space-y-2">
                    {selectedOptions.map(({ question, option }) => (
                      <li key={question.id} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={3} />
                        {option.label}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] font-medium text-slate-600">{plan.summary}</p>
                  <ButtonLink href={plan.cta.href} variant={plan.id === "enterprise" ? "dark" : "primary"} arrow className="mt-5 w-full">
                    {plan.cta.label}
                  </ButtonLink>
                  <a href="#compare" className="mt-3 block rounded text-center text-sm font-semibold text-brandInk hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
                    See everything in {plan.name}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
