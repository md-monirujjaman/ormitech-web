"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/effects";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { relatedLabels } from "@/data/solutions";

// Descriptive internal links to related pages. Titles come from relatedLabels so anchor text stays consistent.
export default function RelatedLinks({ paths, eyebrow = "Related", title = "Keep exploring", lang }) {
  const items = paths.map(path => ({ path, ...relatedLabels[path] })).filter(item => item.title);
  return (
    <section aria-labelledby="related-title" lang={lang} className="py-16 lg:py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="related-title" eyebrow={eyebrow} title={title} size="sm" />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal as="li" key={item.path} delay={index * 0.06}>
              <Spotlight
                as={Link}
                href={item.path}
                className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-1"
              >
                <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-600">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandInk">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
