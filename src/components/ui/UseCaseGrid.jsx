"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import { Spotlight } from "./effects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const COLUMNS = {
  3: "lg:grid-cols-3",
  5: "lg:grid-cols-5"
};

// Industry / use-case cards that link to the contact page. `columns` sets the desktop grid (3 or 5).
export default function UseCaseGrid({ id = "use-cases", eyebrow, title, description, items, columns = 5 }) {
  const lastIndex = items.length - 1;
  const oddCount = items.length % 2 === 1;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} />
          </Reveal>
          <Reveal delay={0.05} className="shrink-0">
            <ButtonLink href="/contact" variant="secondary" arrow>
              Discuss your use case
            </ButtonLink>
          </Reveal>
        </div>

        <ul className={`mt-12 grid gap-4 sm:grid-cols-2 ${COLUMNS[columns]}`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={(index % columns) * 0.07} className={oddCount && index === lastIndex ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Spotlight
                  as={Link}
                  href="/contact"
                  aria-label={`Talk to us about OrmiTech for ${item.title}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 motion-safe:hover:-translate-y-1.5"
                >
                  <span aria-hidden className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#FFF4F6] via-white to-[#F4F7FC] ring-1 ring-slate-100">
                    <span className="grid-bg absolute inset-0 opacity-60 transition-transform duration-700 motion-safe:group-hover:scale-110" />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_14px_30px_-14px_rgba(242,13,69,.55)] ring-1 ring-brand/10 transition-[transform,background-color,color] duration-500 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-110">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-slate-600 shadow-sm ring-1 ring-slate-100 transition-transform duration-500 motion-safe:group-hover:-translate-y-1">
                      {item.chip}
                    </span>
                  </span>
                  <div className="flex flex-1 flex-col px-1.5 pb-1.5">
                    <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-600">{item.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandInk">
                      Talk to us
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
