"use client";

import { Check } from "lucide-react";
import { Stagger, StaggerItem, fadeRight } from "@/components/ui/Reveal";

// Checkmark bullet list used across the dedicated feature pages.
export default function CheckList({ items, className = "mt-7 space-y-3" }) {
  return (
    <Stagger as="ul" stagger={0.08} delay={0.1} className={className}>
      {items.map(point => (
        <StaggerItem as="li" variants={fadeRight} key={point} className="group flex items-start gap-3 text-[15px] text-slate-700">
          <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 motion-safe:group-hover:scale-110">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {point}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
