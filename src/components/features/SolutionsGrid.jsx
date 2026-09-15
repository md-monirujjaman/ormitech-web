"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { solutions } from "@/data/features";
import { Spotlight } from "@/components/ui/effects";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";

export default function SolutionsGrid() {
  const { plans } = solutions;

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="solutions-title" eyebrow={solutions.eyebrow} title={solutions.title} description={solutions.description} />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.07}>
              <Spotlight
                as="article"
                className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1.5"
              >
                <IconTile icon={item.icon} interactive />
                <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </Spotlight>
            </Reveal>
          ))}

          <Reveal as="li" delay={0.21}>
            <Spotlight
              as={Link}
              href={plans.href}
              color="rgba(242,13,69,.12)"
              className="flex h-full flex-col rounded-2xl border border-brand/15 bg-[#FFF4F6] p-6 transition-[transform,box-shadow] duration-300 hover:shadow-[0_22px_44px_-26px_rgba(242,13,69,.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-1.5"
            >
              <IconTile icon={Layers} interactive className="bg-white" />
              <h3 className="mt-5 text-lg font-semibold text-navy">{plans.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{plans.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brandInk">
                {plans.linkLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-safe:group-hover:animate-nudge" aria-hidden />
              </span>
            </Spotlight>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
