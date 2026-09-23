"use client";

import AnalyticsShowcase from "@/components/product/AnalyticsShowcase";
import { analyticsPage } from "@/data/featurePages";
import { Spotlight } from "@/components/ui/effects";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import BridgeCallout from "./BridgeCallout";
import FeaturePageHero from "./FeaturePageHero";

export default function AnalyticsContent() {
  const { hero, measurePoints, teamBridge, useCases } = analyticsPage;

  return (
    <>
      <FeaturePageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} secondaryHref="/how-it-works" secondaryLabel="See how it works" />

      <AnalyticsShowcase />

      <section id="what-you-measure" aria-labelledby="what-you-measure-title" className="scroll-mt-24 py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" id="what-you-measure-title" eyebrow="What you can measure" title="Numbers your team can act on." description="Every metric ties back to a real conversation, lead or order — not a vanity number." />
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {measurePoints.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.07}>
                <Spotlight as="article" className="flex h-full items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1">
                  <IconTile icon={item.icon} interactive />
                  <div>
                    <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <BridgeCallout {...teamBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
