"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { Users, Workflow } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import ChannelLogo from "@/components/common/ChannelLogo";
import { featuresHero, heroHighlights } from "@/data/features";
import { channels } from "@/data/site";
import { Highlight, useTilt } from "@/components/ui/effects";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { Eyebrow, IconTile } from "@/components/ui/SectionHeading";

function HeroDashboard() {
  const { handlers, rotateX, rotateY, pointerX, pointerY } = useTilt(5);
  // Floating chips drift against the tilt for a light parallax.
  const chipX = useTransform(pointerX, latest => latest * -18);
  const chipY = useTransform(pointerY, latest => latest * -12);

  return (
    <div className="relative [perspective:1400px]" {...handlers}>
      <div aria-hidden className="absolute -inset-x-8 -inset-y-10 rounded-[48px] bg-brand/[.05] blur-2xl" />
      <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
        <div className="motion-safe:animate-float">
          <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)] transition-shadow duration-500 hover:shadow-[0_60px_110px_-50px_rgba(13,27,61,.55)]">
            <div className="relative aspect-[1483/1061] overflow-hidden rounded-xl">
              <Image
                src="/images/ormitech-dashboard.webp"
                alt="OrmiTech inbox: conversation list with channel filters, a customer chat with AI replies, and order actions, tags and activity for the customer"
                fill
                priority
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 100vw"
                className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:group-hover:animate-shine"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.45, ease }}
        style={{ x: chipX, y: chipY }}
        className="absolute -left-4 bottom-10 hidden sm:block lg:-left-8"
      >
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(13,27,61,.35)] motion-safe:animate-float [animation-delay:-2s]">
          <IconTile icon={Users} size="sm" />
          <div>
            <p className="text-xs font-semibold text-navy">Human handover</p>
            <p className="text-[11px] text-slate-500">Context stays with the conversation</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.45, ease }}
        style={{ x: chipX, y: chipY }}
        className="absolute -right-3 -top-5 hidden sm:block"
      >
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white py-1.5 pl-2 pr-3 shadow-[0_20px_40px_-20px_rgba(13,27,61,.35)] motion-safe:animate-float [animation-delay:-4s]">
          <span className="flex -space-x-1.5">
            {channels.map(channel => (
              <span key={channel.name} className="rounded-full bg-white p-0.5 ring-1 ring-slate-100">
                <ChannelLogo name={channel.name} className="h-5 w-5" />
              </span>
            ))}
          </span>
          <span className="text-[11px] font-semibold text-navy">One inbox</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturesHero() {
  return (
    <section aria-labelledby="features-hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F7F9FC] to-white pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand/[.07] blur-3xl motion-safe:animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-navy/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
        <Stagger stagger={0.09}>
          <StaggerItem>
            <Eyebrow dot>{featuresHero.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem as="h1" id="features-hero-title" className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] text-navy [text-wrap:balance] sm:text-5xl xl:text-[56px]">
            {featuresHero.titleLead} <Highlight>{featuresHero.titleHighlight}</Highlight>
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            {featuresHero.description}
          </StaggerItem>
          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>Get started</ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" icon={Workflow}>See how it works</ButtonLink>
          </StaggerItem>
          <StaggerItem
            as="ul"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
            aria-label="Key capabilities"
          >
            {heroHighlights.map(item => (
              <StaggerItem as="li" key={item.title} className="group flex cursor-default items-center gap-2.5 sm:flex-col sm:items-start">
                <IconTile icon={item.icon} size="sm" interactive />
                <span className="text-sm font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-brandInk">{item.title}</span>
              </StaggerItem>
            ))}
          </StaggerItem>
        </Stagger>

        <StaggerItem
          variants={{ hidden: { opacity: 0, y: 24, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <HeroDashboard />
        </StaggerItem>
      </div>
    </section>
  );
}
