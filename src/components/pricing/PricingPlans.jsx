"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Bot, ChartNoAxesColumnIncreasing, Check, Building2, ContactRound, Gem, Headset, Inbox, Languages, PanelTop, Rocket, Send, Sparkles, Sprout, Star } from "lucide-react";
import Link from "next/link";
import { buttonClasses, ButtonShine } from "@/components/common/ButtonLink";
import { DotGrid, Pill } from "@/components/sections/kit";
import { Spotlight } from "@/components/ui/effects";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { formatMoney, getPlanPrice, getPricingConfig } from "@/data/pricing";
import EnterpriseBanner from "./EnterpriseBanner";

const PLAN_ICONS = { free: Send, starter: Rocket, growth: Sprout, accelerate: ChartNoAxesColumnIncreasing, enterprise: Building2 };

// One icon per "every plan includes" item, matched by label so the list can be edited in the pricing config.
const INCLUDED_ICONS = {
  "Unified inbox": Inbox,
  "Website chat widget": PanelTop,
  "OrmiTech AI assistant": Bot,
  "Human takeover": Headset,
  "English and Bangla replies": Languages,
  "Customer profiles": ContactRound
};

// Enterprise banner checklist. Every item is a capability the Enterprise column of the comparison table has.
const ENTERPRISE_FEATURES = ["Everything in Growth", "Custom usage and team size", "Custom integrations", "Advanced controls", "Custom onboarding", "Dedicated support", "Workflow automation", "Lead management", "Analytics dashboard", "Roles and permissions"];

function Segmented({ label, options, value, onChange, layoutId, badge }) {
  const refs = useRef([]);

  function handleKeyDown(event, index) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = (index + step + options.length) % options.length;
    onChange(options[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className="relative">
      <div role="radiogroup" aria-label={label} className="inline-grid rounded-full border border-slate-200/80 bg-white p-1 shadow-[0_10px_24px_-16px_rgba(13,27,61,.35)]" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option, index) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              ref={element => {
                refs.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.id)}
              onKeyDown={event => handleKeyDown(event, index)}
              className="relative rounded-full px-6 py-2 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {selected && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-brand shadow-[0_10px_20px_-10px_rgba(242,13,69,.8)]" transition={{ duration: 0.3, ease }} />}
              <span className={`relative transition-colors duration-200 ${selected ? "text-white" : "text-slate-700 hover:text-[#0B0D12]"}`}>{option.label}</span>
            </button>
          );
        })}
      </div>
      {badge}
    </div>
  );
}

function CardArt({ id }) {
  const wrap = "pointer-events-none absolute bottom-3 right-3 transition-transform duration-500 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-105";
  if (id === "starter") {
    return (
      <div aria-hidden className={wrap}>
        <span className="absolute -bottom-2 -right-4 h-9 w-24 rounded-full bg-gradient-to-r from-brand/10 to-brand/20 blur-[2px]" />
        <span className="absolute -bottom-3 right-6 h-7 w-16 rounded-full bg-brand/10" />
        <Rocket className="relative h-14 w-14 -rotate-6 text-brand" strokeWidth={1.7} fill="rgba(242,13,69,.14)" />
      </div>
    );
  }
  if (id === "growth") {
    return (
      <div aria-hidden className={wrap}>
        <svg viewBox="0 0 96 76" className="h-[74px] w-[92px]">
          {[[6, 46, 20], [28, 34, 32], [50, 22, 44], [72, 8, 58]].map(([x, y, h], index) => (
            <rect key={x} x={x} y={y + 10} width="14" height={h} rx="2.5" fill={index === 3 ? "#F20D45" : "#F20D45"} opacity={0.35 + index * 0.2} />
          ))}
          <path d="M8 40 C 26 34, 44 26, 84 4" fill="none" stroke="#F20D45" strokeWidth="3" strokeLinecap="round" />
          <path d="M72 3 L86 3 L86 17" fill="none" stroke="#F20D45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (id === "accelerate") {
    return (
      <div aria-hidden className={wrap}>
        <span className="absolute -inset-3 rounded-full bg-gradient-to-br from-brand/15 to-transparent blur-md" />
        <span className="absolute -inset-x-3 inset-y-3 rotate-[-18deg] rounded-[50%] border border-brand/40" />
        <Gem className="relative h-12 w-12 text-brand" strokeWidth={1.6} fill="rgba(242,13,69,.9)" />
      </div>
    );
  }
  return null;
}

function priceNote(plan, period, price, currency) {
  if (!price) return plan.priceNote;
  if (plan.monthlyPrice === 0) return "Free forever";
  return period === "annual" ? `Billed yearly · ${formatMoney(price.yearly, currency)} per year` : "Billed monthly";
}

function ctaClass(plan) {
  if (plan.popular) return buttonClasses({ variant: "primary", size: "sm", className: "w-full" });
  if (plan.id === "starter") return buttonClasses({ variant: "secondary", size: "sm", className: "w-full !border-brand/60 !text-brand hover:!border-brand hover:!bg-brand/5" });
  return buttonClasses({ variant: "secondary", size: "sm", className: "w-full !border-slate-300 !text-[#0B0D12] hover:!border-[#0B0D12]" });
}

function PlanCard({ plan, period, currency }) {
  const price = getPlanPrice(plan, period);
  const Icon = PLAN_ICONS[plan.id] ?? Sparkles;
  const titleId = `plan-${plan.id}-title`;

  return (
    <div className={`relative h-full ${plan.popular ? "lg:z-10 lg:scale-[1.035]" : ""}`}>
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[.1em] text-white shadow-[0_10px_20px_-8px_rgba(242,13,69,.8)]">
          <Star aria-hidden className="h-3 w-3 fill-current" />
          Most popular
        </span>
      )}
      <Spotlight
        as="article"
        aria-labelledby={titleId}
        className={`relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[18px] border bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1.5 ${
          plan.popular
            ? "border-brand shadow-[0_34px_64px_-34px_rgba(242,13,69,.5)] ring-[3px] ring-brand/[.07]"
            : "border-slate-200/70 shadow-[0_1px_2px_rgba(13,27,61,.04),0_22px_44px_-34px_rgba(242,13,69,.28)] hover:border-brand/30 hover:shadow-[0_28px_52px_-30px_rgba(242,13,69,.35)]"
        }`}
      >
        {plan.popular && <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand/20 to-transparent" />}
        {plan.id === "accelerate" && <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-tl from-brand/20 via-brand/5 to-transparent" />}

        <span aria-hidden className={`relative flex h-11 w-11 items-center justify-center rounded-full text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-105 ${plan.popular ? "bg-brand/15" : "bg-brand/10"}`}>
          <Icon className="h-5 w-5" strokeWidth={2.3} />
        </span>

        <h3 id={titleId} className="relative mt-3.5 text-[21px] font-bold tracking-[-0.02em] text-[#0B0D12]">
          {plan.name}
        </h3>
        <p className="relative mt-1 min-h-[40px] text-[13px] leading-5 text-slate-500">{plan.tagline}</p>

        <div className="relative mt-4 flex min-h-[42px] items-end gap-1.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${period}-${currency}-${price ? price.perMonth : plan.priceLabel}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="text-[38px] font-bold leading-none tracking-[-0.04em] text-[#0B0D12] tabular-nums"
            >
              {price ? formatMoney(price.perMonth, currency) : plan.priceLabel}
            </motion.span>
          </AnimatePresence>
          {price && <span className="pb-0.5 text-[13px] text-slate-400">/month</span>}
        </div>
        <p className="relative mt-1.5 min-h-[18px] text-[12px] text-slate-500">{priceNote(plan, period, price, currency)}</p>

        <Link href={plan.cta.href} className={`relative mt-4 ${ctaClass(plan)}`}>
          {plan.popular && <ButtonShine />}
          {plan.cta.label}
          <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <div className="relative mt-5 flex-1">
          <p className="text-[12px] font-medium text-slate-500">{plan.summary}</p>
          {plan.featuresIntro && <p className="mt-3 text-[12.5px] font-semibold text-[#0B0D12]">{plan.featuresIntro}</p>}
          <ul className={`space-y-2 ${plan.featuresIntro ? "mt-2.5" : "mt-3.5"}`}>
            {plan.features.map(feature => (
              <li key={feature} className="group/feature flex items-start gap-2.5 text-[12.5px] leading-[18px] text-slate-600">
                <span aria-hidden className="mt-[2px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-200 group-hover/feature:scale-125">
                  <Check className="h-2 w-2" strokeWidth={4} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <CardArt id={plan.id} />
      </Spotlight>
    </div>
  );
}

export default function PricingPlans() {
  const { billing, hero, plans, enterprisePlan, includedInAll } = getPricingConfig();
  const [period, setPeriod] = useState(billing.periods[0].id);
  const [currency, setCurrency] = useState(billing.currencies[0].id);
  // The Free plan has no annual billing, so it is not offered while Annual is selected.
  const cardPlans = plans.filter(plan => plan.id !== enterprisePlan.id);
  const visiblePlans = period === "annual" ? cardPlans.filter(plan => plan.monthlyPrice !== 0) : cardPlans;

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="pricing-hero-title" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#FFF3F6_0%,#FFFFFF_60%)] pb-16 pt-32 lg:pb-24 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute -left-28 top-40 h-72 w-72 rounded-full bg-brand/[.06] blur-3xl motion-safe:animate-drift" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-brand/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />
        <DotGrid className="left-[6%] top-44 hidden xl:grid" cols={3} rows={3} />
        <DotGrid className="right-[7%] top-56 hidden xl:grid" cols={3} rows={3} />

        <div className="relative mx-auto w-[min(1320px,calc(100%-32px))]">
          <Stagger stagger={0.08} className="mx-auto max-w-3xl text-center">
            <StaggerItem>
              <Pill>{hero.eyebrow}</Pill>
            </StaggerItem>
            <StaggerItem as="h1" id="pricing-hero-title" className="mt-5 text-[38px] font-bold leading-[1.06] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-5xl xl:text-[56px]">
              {hero.titleLead} <span className="text-brand">{hero.titleHighlight}</span>
            </StaggerItem>
            <StaggerItem as="p" className="mx-auto mt-5 max-w-lg text-[16px] leading-7 text-slate-500">
              {hero.description}
            </StaggerItem>
            <StaggerItem className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-5">
              <Segmented label="Currency" options={billing.currencies} value={currency} onChange={setCurrency} layoutId="billing-currency" />
              <span aria-hidden className="hidden h-8 w-px bg-slate-200 sm:block" />
              <Segmented
                label="Billing period"
                options={billing.periods}
                value={period}
                onChange={setPeriod}
                layoutId="billing-period"
                badge={
                  billing.annualDiscountPercent > 0 && (
                    <span className="absolute -top-3.5 right-1 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand shadow-[0_6px_14px_-8px_rgba(242,13,69,.6)] ring-1 ring-brand/20">
                      <Sparkles aria-hidden className="h-2.5 w-2.5" />
                      Save {billing.annualDiscountPercent}%
                    </span>
                  )
                }
              />
            </StaggerItem>
          </Stagger>

          <h2 className="sr-only">Plans and prices</h2>
          <motion.ul layout aria-label="OrmiTech plans" className={`mx-auto mt-12 grid max-w-md gap-6 md:max-w-none md:grid-cols-2 lg:gap-4 lg:px-5 ${visiblePlans.length === 3 ? "lg:mx-auto lg:max-w-[990px] lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visiblePlans.map((plan, index) => (
                <motion.li
                  layout
                  key={plan.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 26, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease, delay: index * 0.08 }}
                >
                  <PlanCard plan={plan} period={period} currency={currency} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <div className="mt-10">
            <EnterpriseBanner enterprisePlan={enterprisePlan} features={ENTERPRISE_FEATURES} />
          </div>

          <Stagger stagger={0.07} delay={0.1}>
            <StaggerItem className="mt-4 rounded-[16px] border border-brand/10 bg-white/90 px-6 py-4 shadow-[0_18px_40px_-32px_rgba(242,13,69,.35)]">
              <div className="flex flex-col items-center gap-4 xl:flex-row xl:gap-7">
                <p className="flex shrink-0 items-center gap-2 text-[14px] font-bold text-[#0B0D12]">
                  <Sparkles aria-hidden className="h-4 w-4 text-brand" />
                  Every plan includes:
                </p>
                <ul className="grid w-full flex-1 grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 xl:flex xl:w-auto xl:items-center xl:justify-between xl:gap-0">
                  {includedInAll.map(item => {
                    const Icon = INCLUDED_ICONS[item] ?? Check;
                    return (
                      <li key={item} className="group flex items-center gap-2 text-[11.5px] font-medium text-slate-500 xl:border-l xl:border-slate-200 xl:px-5 xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0">
                        <Icon aria-hidden className="h-[18px] w-[18px] shrink-0 text-brand transition-transform duration-300 group-hover:scale-125" strokeWidth={2.2} />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium">
              <a href="#compare" className="group inline-flex items-center gap-1.5 rounded text-slate-500 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
                Compare every plan
                <ArrowRight aria-hidden className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <span aria-hidden className="h-3.5 w-px bg-slate-300" />
              <a href="#plan-finder" className="group inline-flex items-center gap-1.5 rounded text-slate-500 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30">
                Not sure? Find your plan
                <ArrowRight aria-hidden className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </MotionConfig>
  );
}
