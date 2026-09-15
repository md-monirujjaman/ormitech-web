"use client";

import { featureCards, featureValues } from "@/data/features";
import FeatureCard from "@/components/ui/FeatureCard";
import { CountUp } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";

function ValueCard({ item }) {
  return (
    <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1">
      <IconTile icon={item.icon} interactive />
      <div className="min-w-0">
        <CountUp value={item.value} className="block text-2xl font-bold leading-none tracking-[-0.03em] text-navy tabular-nums" />
        <p className="mt-1 text-sm font-medium text-navy">{item.label}</p>
        <p className="text-xs text-slate-500">{item.detail}</p>
      </div>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <section id="core-features" aria-labelledby="core-features-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] xl:items-end">
          <Reveal>
            <SectionHeading
              id="core-features-title"
              eyebrow="Core features"
              title="Powerful features designed to make your work easier."
              description="A single operational layer designed around channels, AI automation, human teams and measurable outcomes."
            />
          </Reveal>
          <Stagger as="ul" stagger={0.1} delay={0.05} className="grid gap-3 sm:grid-cols-3" aria-label="OrmiTech at a glance">
            {featureValues.map(item => (
              <StaggerItem as="li" key={item.label}>
                <ValueCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((feature, index) => (
            <Reveal as="li" key={feature.title} delay={(index % 4) * 0.07}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
