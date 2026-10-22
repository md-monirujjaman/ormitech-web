"use client";

import { useRef } from "react";
import Link from "next/link";
import { MotionConfig, motion, useInView } from "framer-motion";
import { ArrowRight, Check, MessageCircleMore, Sparkles } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { ease } from "@/components/ui/Reveal";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { interTight } from "@/styles/fonts";

const points = ["Every channel, one inbox", "AI answers 24/7", "Hand over to your team anytime"];

const floaters = [
  { name: "Facebook", className: "left-[6%] top-[14%]", delay: 0, drift: 10 },
  { name: "Instagram", className: "right-[7%] top-[18%]", delay: 0.8, drift: -12 },
  { name: "WhatsApp", className: "bottom-[16%] left-[10%]", delay: 1.4, drift: -9 },
  { name: "Website", className: "bottom-[20%] right-[9%]", delay: 0.4, drift: 11 }
];

function Mark({ className = "" }) {
  return (
    <svg aria-hidden viewBox={markViewBox} className={className}>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

export default function FinalCta() {
  // The looping ring and floating logos only run while the panel is on screen.
  const panelRef = useRef(null);
  const live = useInView(panelRef, { margin: "120px" });

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="final-cta-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5F7] py-16 sm:py-20 lg:py-24`}>
        <div className="container-x">
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-brand via-[#E00B3F] to-[#B3082F] px-6 py-14 text-center shadow-[0_50px_100px_-40px_rgba(242,13,69,.6)] sm:rounded-[36px] sm:px-12 sm:py-20 lg:py-24"
          >
            {/* Soft light, rings and a dot grid, all in the brand red so the panel reads as one piece. */}
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#FF6A8C]/40 blur-3xl" />
            <motion.div aria-hidden animate={live ? { rotate: 360 } : undefined} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[820px] sm:w-[820px]">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-white/70 shadow-[0_0_18px_6px_rgba(255,255,255,.35)]" />
            </motion.div>
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[560px] sm:w-[560px]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[.18] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

            {floaters.map(item => (
              <motion.span
                key={item.name}
                aria-hidden
                animate={live ? { y: [0, item.drift, 0] } : undefined}
                transition={{ duration: 6 + item.delay, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_22px_40px_-18px_rgba(80,0,20,.55)] md:flex ${item.className}`}
              >
                <ChannelLogo name={item.name} className="h-7 w-7" />
              </motion.span>
            ))}

            <div className="relative mx-auto max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_24px_44px_-18px_rgba(80,0,20,.6)] ring-8 ring-white/15"
              >
                <Mark className="h-9 w-9" />
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22, ease }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-white backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ready when you are
              </motion.span>

              <motion.h2
                id="final-cta-title"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-white [text-wrap:balance] sm:text-[48px] lg:text-[56px]"
              >
                Never miss a customer message again
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.38, ease }}
                className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-white/85 sm:text-lg sm:leading-8"
              >
                Let OrmiTech IT answer the routine questions while your team focuses on growth. Pick a plan, or talk to us first.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-white/90"
              >
                {points.map(point => (
                  <li key={point} className="inline-flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.2} />
                    </span>
                    {point}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.52, ease }}
                className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href="/pricing"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand shadow-[0_20px_44px_-16px_rgba(80,0,20,.6)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-16px_rgba(80,0,20,.7)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover:translate-x-[420%] group-hover:opacity-100" />
                  See pricing
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  <MessageCircleMore className="h-[18px] w-[18px]" />
                  Contact us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
