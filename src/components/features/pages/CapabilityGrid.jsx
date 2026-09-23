"use client";

import { Stagger, StaggerItem, fadeRight } from "@/components/ui/Reveal";

// Icon + label capability chips, reused across the dedicated feature pages.
export default function CapabilityGrid({ items, className = "mt-7 grid gap-2.5 sm:grid-cols-2" }) {
  return (
    <Stagger as="ul" stagger={0.06} delay={0.1} className={className}>
      {items.map(({ label, icon: Icon }) => (
        <StaggerItem
          as="li"
          variants={fadeRight}
          key={label}
          className="group flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5 text-sm font-medium text-navy transition-[border-color,box-shadow] duration-300 hover:border-brand/25 hover:shadow-[0_12px_24px_-18px_rgba(13,27,61,.35)]"
        >
          <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/[.08] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {label}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
