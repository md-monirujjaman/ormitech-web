"use client";

import { motion, useTransform } from "framer-motion";
import { Bot, UserPlus } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { Highlight, useTilt } from "@/components/ui/effects";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { Eyebrow, IconTile } from "@/components/ui/SectionHeading";
import { productHero } from "@/data/product";
import DashboardMockup from "./DashboardMockup";
import ProductTourButton from "@/components/ui/ProductTourButton";

function FloatingChip({ x, y, delay, className = "", floatDelay = "0s", children }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, ease }}
      style={{ x, y }}
      className={`absolute hidden lg:block ${className}`}
    >
      <div
        className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-[0_20px_40px_-20px_rgba(13,27,61,.35)] motion-safe:animate-float"
        style={{ animationDelay: floatDelay }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function HeroVisual() {
  const { handlers, rotateX, rotateY, pointerX, pointerY } = useTilt(4);
  const chipX = useTransform(pointerX, latest => latest * -18);
  const chipY = useTransform(pointerY, latest => latest * -12);

  return (
    <div className="relative [perspective:1400px]" {...handlers}>
      <div aria-hidden className="absolute -inset-x-6 -inset-y-8 rounded-[48px] bg-brand/[.05] blur-2xl" />
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <DashboardMockup />
      </motion.div>

      <FloatingChip x={chipX} y={chipY} delay={4.2} floatDelay="-2s" className="-top-16 right-6 xl:-right-4">
        <IconTile icon={UserPlus} size="sm" />
        <div>
          <p className="text-xs font-semibold text-navy">New lead detected</p>
          <p className="text-[11px] text-slate-500">Sadia R. · ready to order</p>
        </div>
      </FloatingChip>

      <FloatingChip x={chipX} y={chipY} delay={1} floatDelay="-4s" className="-bottom-8 -left-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-navy">AI replies instantly</p>
          <p className="text-[11px] text-slate-500">Hands over when needed</p>
        </div>
      </FloatingChip>
    </div>
  );
}

export default function ProductHero() {
  return (
    <section aria-labelledby="product-hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F7F9FC] to-white pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand/[.07] blur-3xl motion-safe:animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-navy/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
        <Stagger stagger={0.09}>
          <StaggerItem>
            <Eyebrow dot>{productHero.eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem as="h1" id="product-hero-title" className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-[-0.04em] text-navy [text-wrap:balance] sm:text-5xl xl:text-[54px]">
            {productHero.titleLead} <Highlight>{productHero.titleHighlight}</Highlight>
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            {productHero.description}
          </StaggerItem>
          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>Get started</ButtonLink>
            <ProductTourButton />
          </StaggerItem>
          <StaggerItem
            as="ul"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200/70 pt-8 sm:grid-cols-4"
            aria-label="Key benefits"
          >
            {productHero.benefits.map(item => (
              <StaggerItem as="li" key={item.title} className="group flex cursor-default flex-col items-start">
                <IconTile icon={item.icon} size="sm" interactive />
                <span className="mt-3 text-sm font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-brandInk">{item.title}</span>
                <span className="mt-0.5 text-xs leading-snug text-slate-500">{item.detail}</span>
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
          <HeroVisual />
        </StaggerItem>
      </div>
    </section>
  );
}
