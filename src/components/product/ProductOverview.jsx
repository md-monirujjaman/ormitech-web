"use client";

import { ArrowRight } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { Highlight, Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { overview } from "@/data/product";

export default function ProductOverview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24 py-16 lg:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-[#F7F9FC] p-6 sm:p-10 lg:p-12">
          <div aria-hidden className="dot-bg absolute inset-y-0 right-0 w-1/2 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div className="relative grid gap-10 xl:grid-cols-[minmax(0,.85fr)_minmax(0,2fr)] xl:items-center">
            <Reveal>
              <SectionHeading
                id="overview-title"
                size="sm"
                eyebrow={overview.eyebrow}
                title={
                  <>
                    {overview.titleLead} <Highlight delay={0.3}>{overview.titleHighlight}</Highlight>
                  </>
                }
                description={overview.description}
              />
              <ButtonLink href="/contact" arrow className="mt-7">
                Get started
              </ButtonLink>
            </Reveal>

            <Stagger as="ul" stagger={0.09} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {overview.cards.map(card => (
                <StaggerItem as="li" key={card.title}>
                  <Spotlight
                    as="a"
                    href={card.href}
                    className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-1.5"
                  >
                    <span className="flex items-center justify-between">
                      <IconTile icon={card.icon} size="sm" interactive />
                      <span aria-hidden className="text-xs font-bold tabular-nums text-slate-400 transition-colors duration-300 group-hover:text-brandInk">
                        {card.number}
                      </span>
                    </span>
                    <h3 className="mt-4 text-[15px] font-semibold leading-snug text-navy">{card.title}</h3>
                    <p className="mt-1.5 flex-1 text-[13.5px] leading-6 text-slate-600">{card.text}</p>
                    <span
                      aria-hidden
                      className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                    >
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Spotlight>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
