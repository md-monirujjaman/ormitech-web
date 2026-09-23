"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/effects";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { productEcosystem } from "@/data/productPages";

// Teaser cards linking the Product Overview to its three dedicated sub-pages.
export default function ProductEcosystem() {
  return (
    <section id="explore-product" aria-labelledby="explore-product-title" className="scroll-mt-24 py-16 lg:py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading align="center" id="explore-product-title" eyebrow={productEcosystem.eyebrow} title={productEcosystem.title} description={productEcosystem.description} />
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {productEcosystem.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.08}>
              <Spotlight
                as={Link}
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-1.5"
              >
                <IconTile icon={item.icon} interactive />
                <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brandInk">
                  Explore
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
