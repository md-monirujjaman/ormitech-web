"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

// Small cross-link card connecting one feature page to a related one (e.g. AI Chatbot → Human Handover).
export default function BridgeCallout({ eyebrow, title, description, linkLabel, linkHref }) {
  return (
    <section className="py-4 lg:py-6">
      <div className="container-x">
        <Reveal>
          <Link
            href={linkHref}
            className="group flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand/25 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div className="max-w-2xl">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-navy sm:text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-[15px]">{description}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brandInk">
              {linkLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
