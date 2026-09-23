"use client";

import ButtonLink from "@/components/common/ButtonLink";
import { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

// Shared hero shell for the five dedicated feature pages. `visual` is the feature-specific mockup.
export default function FeaturePageHero({ eyebrow, title, description, visual, ctaHref = "/contact", ctaLabel = "Get started", secondaryHref, secondaryLabel, secondaryIcon }) {
  return (
    <section aria-labelledby="feature-hero-title" className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F7F9FC] to-white pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand/[.07] blur-3xl motion-safe:animate-drift" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-navy/[.05] blur-3xl motion-safe:animate-drift [animation-delay:-7s]" />

      <div className={`container-x relative grid items-center gap-14 ${visual ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-12" : ""}`}>
        <Stagger stagger={0.09}>
          <StaggerItem>
            <Eyebrow dot>{eyebrow}</Eyebrow>
          </StaggerItem>
          <StaggerItem
            as="h1"
            id="feature-hero-title"
            className="mt-5 max-w-2xl text-[36px] font-extrabold leading-[1.06] tracking-[-0.04em] text-navy [text-wrap:balance] sm:text-[44px] xl:text-5xl"
          >
            {title}
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            {description}
          </StaggerItem>
          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} arrow>
              {ctaLabel}
            </ButtonLink>
            {secondaryHref && (
              <ButtonLink href={secondaryHref} variant="secondary" icon={secondaryIcon}>
                {secondaryLabel}
              </ButtonLink>
            )}
          </StaggerItem>
        </Stagger>

        {visual && (
          <StaggerItem
            variants={{ hidden: { opacity: 0, y: 24, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {visual}
          </StaggerItem>
        )}
      </div>
    </section>
  );
}
