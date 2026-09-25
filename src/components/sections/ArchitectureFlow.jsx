"use client";

import { useRef } from "react";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChartNoAxesColumnIncreasing, MessageSquareText, Settings, Sparkles, UserRound } from "lucide-react";
import { interTight } from "@/styles/fonts";
import { DotGrid, Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const phases = [
  ["01", "Connect", "Bring Facebook, Instagram, WhatsApp and website conversations into the OrmiTech communication layer.", MessageSquareText],
  ["02", "Organize", "Normalize messages, customer context, ownership, tags and conversation state into one workspace.", Settings],
  ["03", "Automate", "Let configured AI handle repetitive questions, qualification and approved workflows.", Sparkles],
  ["04", "Handover", "Escalate complex or high-value conversations to the right human agent with context intact.", UserRound],
  ["05", "Measure", "Turn conversations, leads, response time and automation outcomes into useful operational signals.", ChartNoAxesColumnIncreasing]
];

export default function ArchitectureFlow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineScale = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="phases" aria-labelledby="phases-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-[#FFF8FA] to-[#FFF1F4] py-16 sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -left-[210px] top-[46%] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />
        <DotGrid className="left-[7%] top-[68%] hidden lg:grid" cols={3} rows={3} />

        <div className="container-x relative">
          <motion.div variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>How OrmiTech works</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="phases-title" className={`${headingClass} max-w-xl`}>
              Five phases from message to <span className="text-brand">measurable outcome.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[15px] leading-7 text-slate-500">
              The experience is designed as one continuous flow, instead of disconnected tools.
            </motion.p>
          </motion.div>

          <div className="relative mt-12">
            <span aria-hidden className="absolute left-[10%] right-[10%] top-[38px] hidden h-px bg-slate-200 lg:block" />
            <motion.span aria-hidden style={{ scaleX: lineScale }} className="absolute left-[10%] right-[10%] top-[38px] hidden h-px origin-left bg-brand lg:block" />

            <motion.ol variants={stagger(0.1, 0.15)} initial="hidden" whileInView="show" viewport={viewOnce} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {phases.map(([number, title, text, Icon]) => (
                <motion.li key={number} variants={fadeUp}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-white bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.05),0_18px_38px_-28px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_28px_48px_-26px_rgba(242,13,69,.45)] motion-safe:hover:-translate-y-2">
                    <div className="flex items-center justify-between">
                      <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110">
                        <Icon className="h-4 w-4" strokeWidth={2.1} />
                      </span>
                      <span className="text-[11px] font-bold tabular-nums text-slate-400 transition-colors duration-300 group-hover:text-brand">{number}</span>
                    </div>
                    <h3 className="mt-6 text-[17px] font-semibold text-[#0B0D12]">{title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-500">{text}</p>
                    <span aria-hidden className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </article>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
