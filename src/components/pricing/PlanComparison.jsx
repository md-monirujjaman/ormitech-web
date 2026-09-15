"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Minus } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { comparison, getPriceLabel, plans } from "@/data/pricing";

function CellValue({ value, align = "center" }) {
  const position = align === "center" ? "mx-auto" : "";
  if (value === true) {
    return (
      <>
        <Check aria-hidden className={`h-[18px] w-[18px] text-brand ${position}`} strokeWidth={2.75} />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus aria-hidden className={`h-4 w-4 text-slate-300 ${position}`} />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[13.5px] font-medium text-navy">{value}</span>;
}

function DesktopTable({ openCategories, onToggle }) {
  return (
    <div className="mt-12 hidden overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-36px_rgba(13,27,61,.35)] md:block">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">Features included in each OrmiTech plan</caption>
        <colgroup>
          <col className="w-[32%]" />
          {plans.map(plan => (
            <col key={plan.id} className={plan.popular ? "bg-brand/[.03]" : ""} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-slate-200/80">
            <th scope="col" className="px-5 py-5 align-bottom text-sm font-semibold text-slate-500">
              Features
            </th>
            {plans.map(plan => (
              <th key={plan.id} scope="col" className="px-3 py-5 text-center align-bottom">
                {plan.popular && <span className="mb-2 inline-block rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.12em] text-white">Most popular</span>}
                <span className="block text-base font-semibold text-navy">{plan.name}</span>
                <span className="block text-[13px] font-normal text-slate-500">{getPriceLabel(plan)}</span>
                <Link
                  href={plan.cta.href}
                  className="mt-2.5 inline-block rounded text-[13px] font-semibold text-brandInk underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                >
                  {plan.cta.label}
                  <span className="sr-only"> with the {plan.name} plan</span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        {comparison.map(category => {
          const open = openCategories.has(category.id);
          return (
            <tbody key={category.id}>
              <tr>
                <th scope="colgroup" colSpan={plans.length + 1} className="border-t border-slate-200/80 bg-slate-50/80 p-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => onToggle(category.id)}
                    className="group flex w-full items-center justify-between px-5 py-3 text-left text-[12px] font-bold uppercase tracking-[.12em] text-navy transition-colors hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40"
                  >
                    {category.label}
                    <ChevronDown aria-hidden className={`h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:text-navy ${open ? "rotate-180" : ""}`} />
                  </button>
                </th>
              </tr>
              {open &&
                category.rows.map((row, index) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="border-t border-slate-100 transition-colors duration-200 hover:bg-slate-50/70"
                  >
                    <th scope="row" className="px-5 py-3 text-sm font-medium text-slate-700">
                      {row.label}
                      {row.hint && <span className="block text-xs font-normal text-slate-500">{row.hint}</span>}
                    </th>
                    {plans.map(plan => (
                      <td key={plan.id} className="px-3 py-3 text-center">
                        <CellValue value={row.values[plan.id]} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

// On phones: pick one plan, then browse its features by category.
function MobileComparison() {
  const baseId = useId();
  const [selectedId, setSelectedId] = useState(plans.find(plan => plan.popular)?.id ?? plans[0].id);
  const [openCategory, setOpenCategory] = useState(comparison[0].id);
  const selected = plans.find(plan => plan.id === selectedId);

  return (
    <div className="mt-10 md:hidden">
      <fieldset>
        <legend className="text-sm font-semibold text-navy">Choose a plan</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {plans.map(plan => (
            <label key={plan.id} className="cursor-pointer">
              <input type="radio" name={`${baseId}-plan`} value={plan.id} checked={plan.id === selectedId} onChange={() => setSelectedId(plan.id)} className="peer sr-only" />
              <span className="flex h-full flex-col rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors duration-200 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">
                <span className="text-sm font-semibold">{plan.name}</span>
                <span className="text-[12px] opacity-75">{getPriceLabel(plan)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4">
        <p className="text-sm text-slate-600">{selected.tagline}</p>
        <ButtonLink href={selected.cta.href} variant={selected.popular ? "primary" : "secondary"} arrow className="mt-3 w-full">
          {selected.cta.label}
        </ButtonLink>
      </div>

      <ul className="mt-4 space-y-2">
        {comparison.map(category => {
          const open = openCategory === category.id;
          const panelId = `${baseId}-${category.id}`;
          return (
            <li key={category.id} className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenCategory(open ? null : category.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40"
                >
                  {category.label}
                  <ChevronDown aria-hidden className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div key="panel" id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
                    <dl className="divide-y divide-slate-100 border-t border-slate-100 px-4">
                      {category.rows.map(row => (
                        <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
                          <dt className="text-[13.5px] text-slate-700">{row.label}</dt>
                          <dd className="shrink-0 text-right">
                            <CellValue value={row.values[selected.id]} align="end" />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function PlanComparison() {
  const [openCategories, setOpenCategories] = useState(() => new Set(comparison.map(category => category.id)));

  function toggle(id) {
    setOpenCategories(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="compare-title" align="center" eyebrow="Compare plans" title="Compare every plan." description="See exactly what each plan includes, from channels and AI to automation, team features and support." />
        </Reveal>
        <Reveal delay={0.05}>
          <DesktopTable openCategories={openCategories} onToggle={toggle} />
        </Reveal>
        <MobileComparison />
      </div>
    </section>
  );
}
