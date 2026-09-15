"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, Sparkles } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { Highlight } from "@/components/ui/effects";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { billing, formatPrice, getPlanPrice, includedInAll, plans, pricingHero } from "@/data/pricing";

function BillingToggle({ period, onChange }) {
  const optionRefs = useRef([]);

  function handleKeyDown(event, index) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = (index + step + billing.periods.length) % billing.periods.length;
    onChange(billing.periods[next].id);
    optionRefs.current[next]?.focus();
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div role="radiogroup" aria-label="Billing period" className="inline-grid grid-cols-2 rounded-full border border-slate-200 bg-white p-1 shadow-[0_1px_2px_rgba(13,27,61,.06)]">
        {billing.periods.map((option, index) => {
          const selected = option.id === period;
          return (
            <button
              key={option.id}
              ref={element => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.id)}
              onKeyDown={event => handleKeyDown(event, index)}
              className="relative rounded-full px-6 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {selected && <motion.span layoutId="billing-period" className="absolute inset-0 rounded-full bg-navy" transition={{ duration: 0.3, ease }} />}
              <span className={`relative transition-colors duration-200 ${selected ? "text-white" : "text-slate-600 hover:text-navy"}`}>{option.label}</span>
            </button>
          );
        })}
      </div>
      {billing.annualDiscountPercent > 0 && (
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Save {billing.annualDiscountPercent}% with annual billing</span>
      )}
    </div>
  );
}

function priceNote(plan, period, price) {
  if (!price) return plan.priceNote;
  if (plan.monthlyPrice === 0) return "Free forever";
  return period === "annual" ? `Billed yearly · ${formatPrice(price.yearly)} per year` : "Billed monthly";
}

const CARD_TONES = {
  popular: "border-brand shadow-[0_32px_64px_-32px_rgba(242,13,69,.45)] ring-4 ring-brand/[.07]",
  enterprise: "border-slate-200/80 hover:border-navy/30 hover:shadow-[0_28px_56px_-30px_rgba(13,27,61,.45)]",
  default: "border-slate-200/80 hover:border-brand/25 hover:shadow-[0_24px_48px_-30px_rgba(13,27,61,.35)]"
};

function PlanCard({ plan, period }) {
  const price = getPlanPrice(plan, period);
  const tone = plan.popular ? "popular" : plan.id === "enterprise" ? "enterprise" : "default";
  const titleId = `plan-${plan.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 ${CARD_TONES[tone]}`}
    >
      {plan.popular && (
        <>
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-2xl bg-brand">
            <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent motion-safe:animate-shine" />
          </span>
          <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-white shadow-[0_8px_18px_-8px_rgba(242,13,69,.8)]">
            <Sparkles aria-hidden className="h-3 w-3" />
            Most popular
          </span>
        </>
      )}

      <h3 id={titleId} className="text-lg font-semibold text-navy">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-600 sm:min-h-12">{plan.tagline}</p>

      <div className="mt-5 flex min-h-[48px] items-end gap-1.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${period}-${price ? price.perMonth : plan.priceLabel}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="text-[40px] font-bold leading-none tracking-[-0.04em] text-navy tabular-nums"
          >
            {price ? formatPrice(price.perMonth) : plan.priceLabel}
          </motion.span>
        </AnimatePresence>
        {price && <span className="pb-1 text-sm text-slate-500">/ month</span>}
      </div>
      <p className="mt-1.5 text-[13px] text-slate-500">{priceNote(plan, period, price)}</p>

      <ButtonLink href={plan.cta.href} variant={plan.popular ? "primary" : plan.id === "enterprise" ? "dark" : "secondary"} arrow className="mt-6 w-full">
        {plan.cta.label}
      </ButtonLink>

      <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] font-medium text-slate-600">{plan.summary}</p>

      <div className="mt-5 flex-1">
        {plan.featuresIntro && <p className="text-[13px] font-semibold text-navy">{plan.featuresIntro}</p>}
        <ul className="mt-3 space-y-2.5">
          {plan.features.map(feature => (
            <li key={feature} className="group/feature flex items-start gap-2.5 text-sm leading-5 text-slate-700">
              <span aria-hidden className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover/feature:scale-125 ${plan.popular ? "bg-brand text-white" : "bg-brand/10 text-brand"}`}>
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function PricingPlans() {
  const [period, setPeriod] = useState(billing.periods[0].id);

  return (
    <section aria-labelledby="pricing-hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F7F9FC] to-white pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand/[.07] blur-3xl motion-safe:animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-navy/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

      <div className="container-x relative">
        <Stagger stagger={0.08} className="mx-auto max-w-3xl text-center">
          <StaggerItem>
            <Eyebrow dot>{pricingHero.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem as="h1" id="pricing-hero-title" className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-[-0.04em] text-navy [text-wrap:balance] sm:text-5xl xl:text-[56px]">
            {pricingHero.titleLead} <Highlight>{pricingHero.titleHighlight}</Highlight>
          </StaggerItem>
          <StaggerItem as="p" className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            {pricingHero.description}
          </StaggerItem>
          <StaggerItem className="mt-8">
            <BillingToggle period={period} onChange={setPeriod} />
          </StaggerItem>
        </Stagger>

        <h2 className="sr-only">Plans and prices</h2>
        <Stagger as="ul" stagger={0.09} delay={0.25} aria-label="OrmiTech plans" className="mx-auto mt-14 grid max-w-md gap-6 md:max-w-none md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {plans.map(plan => (
            <StaggerItem as="li" key={plan.id} variants={{ hidden: { opacity: 0, y: 24, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } } }}>
              <PlanCard plan={plan} period={period} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger stagger={0.08} delay={0.2}>
          <StaggerItem className="mt-10 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4">
            <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
              <p className="shrink-0 text-sm font-semibold text-navy">Every plan includes</p>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {includedInAll.map(item => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Check aria-hidden className="h-4 w-4 text-brand" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            <a href="#compare" className="group inline-flex items-center gap-1.5 rounded text-brandInk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
              Compare every plan
              <ArrowDown aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href="#plan-finder" className="group inline-flex items-center gap-1.5 rounded text-slate-600 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
              Not sure? Find your plan
              <ArrowDown aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
