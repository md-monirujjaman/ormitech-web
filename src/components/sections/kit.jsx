"use client";

import { ease } from "@/components/ui/Reveal";

// Small building blocks shared by the redesigned home sections.
export const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
export const fadeLeft = { hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } } };
export const stagger = (gap = 0.09, delay = 0.1) => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
export const viewOnce = { once: true, margin: "-70px" };

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {children}
    </span>
  );
}

export function DotGrid({ className = "", cols = 3, rows = 4 }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute grid gap-3 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 4px)` }}>
      {Array.from({ length: cols * rows }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-brand/60" />
      ))}
    </div>
  );
}

export const headingClass = "mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[42px]";
