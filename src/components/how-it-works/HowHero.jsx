"use client";

import { motion } from "framer-motion";
import { Check, LayoutDashboard, Server, ShoppingBag, Sparkles, Target, UserRound, Workflow } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import ChannelLogo from "@/components/common/ChannelLogo";
import { CountUp, Highlight, PulseDot } from "@/components/ui/effects";
import ProductTourButton from "@/components/ui/ProductTourButton";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { hero } from "@/data/howItWorks";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { channels } from "@/data/site";
import FlowLine from "./FlowLine";

const engines = [
  { label: "AI engine", icon: Sparkles },
  { label: "Automation", icon: Workflow },
  { label: "Backend", icon: Server }
];

const outcomes = [
  { label: "Lead created", icon: Target },
  { label: "Order recorded", icon: ShoppingBag },
  { label: "Customer updated", icon: UserRound }
];

const rise = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } };

function SystemPreview() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-x-6 -inset-y-8 rounded-[48px] bg-brand/[.05] blur-2xl" />
      <Stagger
        stagger={0.2}
        delay={0.35}
        role="img"
        aria-label="How OrmiTech works: messages from Facebook, Instagram, WhatsApp and your website arrive in OrmiTech, pass through the AI engine, automation and backend, appear in your dashboard and become leads, orders and updated customer records"
        className="relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] sm:p-7"
      >
        <StaggerItem variants={rise}>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[.14em] text-slate-500">Your customers message you on</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {channels.map(channel => (
              <span key={channel.name} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-2 py-2 text-[12px] font-semibold text-navy transition-colors duration-200 hover:border-brand/25 hover:bg-white">
                <ChannelLogo name={channel.name} className="h-5 w-5" />
                {channel.name}
              </span>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem variants={rise}>
          <FlowLine className="mx-auto h-7" />
        </StaggerItem>

        <StaggerItem variants={rise} className="flex justify-center">
          <span className="flex items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-[0_18px_40px_-18px_rgba(13,27,61,.7)]">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
              <span className="absolute inset-0 rounded-xl bg-brand opacity-50 motion-safe:animate-ping [animation-duration:2.4s]" />
              <svg viewBox={markViewBox} className="relative h-5 w-5 text-white">
                <path d={markPath} fill="currentColor" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold">OrmiTech</span>
              <span className="block text-[11.5px] text-white/70">One inbox for every conversation</span>
            </span>
          </span>
        </StaggerItem>

        <StaggerItem variants={rise}>
          <FlowLine className="mx-auto h-7" delay={0.8} />
        </StaggerItem>

        <StaggerItem variants={rise} className="grid grid-cols-3 gap-2">
          {engines.map(({ label, icon: Icon }) => (
            <span key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200/80 px-2 py-2.5 text-center text-[12px] font-semibold text-navy sm:flex-row sm:justify-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/[.08] text-brand">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </span>
          ))}
        </StaggerItem>

        <StaggerItem variants={rise}>
          <FlowLine className="mx-auto h-7" delay={1.6} />
        </StaggerItem>

        <StaggerItem variants={rise} className="flex items-center justify-between gap-3 rounded-xl border border-brand/20 bg-brand/[.04] px-3.5 py-2.5">
          <span className="flex items-center gap-2.5 text-[13px] font-semibold text-navy">
            <LayoutDashboard className="h-4 w-4 text-brand" />
            Your OrmiTech dashboard
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <PulseDot className="bg-emerald-500" />
            Live
          </span>
        </StaggerItem>

        <StaggerItem variants={rise}>
          <FlowLine className="mx-auto h-7" delay={2.2} />
        </StaggerItem>

        <StaggerItem variants={rise} className="grid grid-cols-3 gap-2">
          {outcomes.map(({ label, icon: Icon }) => (
            <span key={label} className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 px-2 py-2.5 text-center text-[11.5px] font-semibold text-navy ring-1 ring-slate-100">
              <span className="flex items-center gap-1 text-emerald-600">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </span>
          ))}
        </StaggerItem>
      </Stagger>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, duration: 0.45, ease }}
        className="absolute -right-4 -top-6 hidden lg:block"
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-[0_20px_40px_-20px_rgba(13,27,61,.35)] motion-safe:animate-float">
          <ChannelLogo name="WhatsApp" className="h-7 w-7" />
          <div>
            <p className="text-xs font-semibold text-navy">New message</p>
            <p className="text-[11px] text-slate-500">Tanvir H. · just now</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowHero() {
  return (
    <section aria-labelledby="how-hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F7F9FC] to-white pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand/[.07] blur-3xl motion-safe:animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-navy/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <Stagger stagger={0.09}>
          <StaggerItem>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem as="h1" id="how-hero-title" className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-[-0.04em] text-navy [text-wrap:balance] sm:text-5xl xl:text-[56px]">
            {hero.titleLead} <Highlight>{hero.titleHighlight}</Highlight>
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            {hero.description}
          </StaggerItem>
          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>Get started</ButtonLink>
            <ProductTourButton label="Watch how it works" />
          </StaggerItem>
          <StaggerItem as="dl" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200/70 pt-8 sm:grid-cols-4">
            {hero.facts.map(fact => (
              <div key={fact.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-xs leading-snug text-slate-500">{fact.label}</dt>
                <dd>
                  <CountUp value={fact.value} className="block text-2xl font-bold tracking-[-0.03em] text-navy tabular-nums" />
                </dd>
              </div>
            ))}
          </StaggerItem>
        </Stagger>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
          <SystemPreview />
        </motion.div>
      </div>
    </section>
  );
}
