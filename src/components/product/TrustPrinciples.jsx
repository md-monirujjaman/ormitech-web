"use client";

import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { trust } from "@/data/product";

export default function TrustPrinciples() {
  return (
    <section id="why-ormitech" aria-labelledby="why-ormitech-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="why-ormitech-title" eyebrow={trust.eyebrow} title={trust.title} description={trust.description} />
          <figure className="group relative mt-8 overflow-hidden rounded-2xl bg-navy p-6 text-white sm:p-7">
            <div aria-hidden className="red-glow absolute -right-16 -top-16 h-56 w-56 opacity-70 transition-transform duration-700 motion-safe:group-hover:scale-125" />
            <Quote aria-hidden className="relative h-7 w-7 text-brand" />
            <blockquote className="relative mt-3 text-lg font-medium leading-8 tracking-[-0.01em]">{trust.quote.text}</blockquote>
            <figcaption className="relative mt-4">
              <Link
                href={trust.quote.href}
                className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {trust.quote.source}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </figcaption>
          </figure>
        </Reveal>

        <Stagger as="ul" stagger={0.1} className="grid gap-px self-start overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/80 sm:grid-cols-2">
          {trust.principles.map(item => (
            <StaggerItem as="li" key={item.title} className="group bg-white p-6 transition-colors duration-300 hover:bg-[#FFF8FA] sm:p-7">
              <IconTile icon={item.icon} interactive />
              <h3 className="mt-5 text-lg font-semibold leading-snug text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
