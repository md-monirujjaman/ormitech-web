"use client";

import { motion } from "framer-motion";
import { Check, HeartHandshake, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { PulseDot, Spotlight, useMediaQuery } from "@/components/ui/effects";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/product";
import { channels } from "@/data/site";

const STEP_DELAY = 0.28;
const viewport = { once: true, margin: "-80px" };

// Small visual at the bottom of each step card.
function StepVisual({ id }) {
  switch (id) {
    case "capture":
      return (
        <span className="flex -space-x-1.5">
          {channels.map(channel => (
            <span key={channel.name} className="rounded-full bg-white p-0.5 ring-1 ring-slate-100 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
              <ChannelLogo name={channel.name} className="h-5 w-5" />
            </span>
          ))}
        </span>
      );
    case "understand":
      return (
        <span className="flex flex-wrap gap-1.5 lg:justify-center">
          <span className="rounded-full bg-navy px-2 py-0.5 text-[11px] font-semibold text-white">Intent: pricing</span>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">Hot lead</span>
        </span>
      );
    case "automate":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <PulseDot className="bg-emerald-500" />
          <Zap className="h-3 w-3" />
          Workflow active
        </span>
      );
    case "convert":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy ring-1 ring-slate-200">
          <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
          Order #4822 created
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/[.08] px-2.5 py-1 text-[11px] font-semibold text-brandInk">
          <HeartHandshake className="h-3 w-3" />
          Follow-up scheduled
        </span>
      );
  }
}

export default function HowItWorks() {
  const { steps } = howItWorks;
  const lastIndex = steps.length - 1;
  // On the horizontal (lg+) layout all steps enter together, so they reveal one after another along the line.
  // Stacked on smaller screens, each step reveals as it scrolls in.
  const horizontal = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="how-it-works-title" align="center" eyebrow={howItWorks.eyebrow} title={howItWorks.title} description={howItWorks.description} />
        </Reveal>

        <div className="relative mt-14">
          <div aria-hidden className="absolute left-[10%] right-[10%] top-[23px] hidden h-0.5 rounded-full bg-slate-200 lg:block">
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand/50 to-brand"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ duration: STEP_DELAY * lastIndex + 0.3, delay: 0.25, ease: "easeInOut" }}
            />
          </div>

          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, index) => {
              const delay = horizontal ? index * STEP_DELAY : 0;
              return (
                <motion.li
                  key={step.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="relative flex gap-4 sm:gap-5 lg:flex-col lg:items-center lg:gap-6"
                >
                  {index < lastIndex && (
                    <span aria-hidden className="absolute -bottom-6 left-[23px] top-12 w-0.5 rounded-full bg-slate-200 lg:hidden">
                      <motion.span
                        className="absolute inset-0 origin-top rounded-full bg-brand"
                        variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, delay: 0.35, ease: "easeInOut" } } }}
                      />
                    </span>
                  )}
                  <motion.span
                    aria-hidden
                    variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 + delay, ease } } }}
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(242,13,69,.7)]"
                  >
                    {step.number}
                  </motion.span>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 + delay, ease } } }}
                    className="min-w-0 flex-1 lg:w-full"
                  >
                    <Spotlight
                      as="article"
                      className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1.5 lg:items-center lg:text-center"
                    >
                      <IconTile icon={step.icon} size="sm" interactive />
                      <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-600">{step.text}</p>
                      <span aria-hidden className="mt-4 flex">
                        <StepVisual id={step.id} />
                      </span>
                    </Spotlight>
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
