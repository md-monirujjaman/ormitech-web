"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, Check, Send } from "lucide-react";
import { TypingDots, useTimeline } from "@/components/ui/effects";
import { interTight } from "@/styles/fonts";
import { DotGrid, Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const bubble = { hidden: { opacity: 0, y: 12, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

const checks = ["AI handles FAQs & common queries", "Human support for complex issues", "Seamless handoff, no data loss", "Better customer experiences, faster"];

function AssistantCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [round, setRound] = useState(0);
  const phase = useTimeline(ref, [400, 1700, 2600, 4000], round);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = setInterval(() => setRound(value => value + 1), 10000);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} role="img" aria-label="Example AI assistant conversation: the assistant offers help and answers a follow-up question about customization" className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_40px_80px_-36px_rgba(242,13,69,.3),0_18px_40px_-28px_rgba(13,27,61,.25)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2.5 text-[14px] font-semibold text-[#0B0D12]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Bot className="h-4 w-4" />
          </span>
          AI Assistant
        </p>
        <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Online
        </span>
      </div>

      <div className="mt-5 flex h-[190px] flex-col gap-3 border-t border-slate-100 pt-5">
        <AnimatePresence mode="popLayout">
          {phase >= 1 && (
            <motion.p key={`a${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="max-w-[80%] self-start rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-[12.5px] leading-5 text-slate-600">
              Sure! I can help you with that. Here are the details...
            </motion.p>
          )}
          {phase === 3 && (
            <motion.span key={`t${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="self-end rounded-2xl bg-[#FFE3EA] px-4 py-3.5">
              <TypingDots dotClassName="bg-brand" />
            </motion.span>
          )}
          {phase >= 4 && (
            <motion.p key={`b${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="max-w-[88%] self-end rounded-2xl rounded-tr-md bg-[#FFE3EA] px-4 py-3 text-[12.5px] leading-5 text-[#8A1230]">
              That sounds great! Can you also tell me about the customization options?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-4 pr-1.5">
        <span className="flex-1 text-[12px] text-slate-400">Type your message...</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_20px_-10px_rgba(242,13,69,.9)]">
          <Send aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export default function AIIntegration() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="ai-human" aria-labelledby="ai-human-title" className={`${interTight.className} relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28`}>
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1fr)] lg:gap-20">
          <motion.div className="relative order-2 lg:order-1" initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewOnce} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -left-16 top-[26%] h-56 w-56 rounded-full bg-gradient-to-br from-[#FF9DB4] to-[#FF4F7B] sm:-left-24 sm:h-72 sm:w-72" />
            <DotGrid className="-left-8 top-8 hidden sm:grid" cols={3} rows={3} />
            <div className="relative motion-safe:animate-float">
              <AssistantCard />
            </div>
          </motion.div>

          <motion.div className="order-1 lg:order-2" variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>AI + Human</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="ai-human-title" className={headingClass}>
              Automate the routine. <span className="text-brand">Escalate the important.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-[15px] leading-7 text-slate-500">
              OrmiTech&apos;s AI handles the repetitive conversations, while your team steps in for the ones that matter. Together, you get the best of both worlds.
            </motion.p>
            <motion.ul variants={stagger(0.12, 0.2)} className="mt-7 space-y-3.5">
              {checks.map(text => (
                <motion.li key={text} variants={fadeUp} className="group flex items-center gap-3 text-[14.5px] text-slate-600">
                  <motion.span
                    aria-hidden
                    variants={{ hidden: { scale: 0.4, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 18 } } }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_16px_-8px_rgba(242,13,69,.8)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </motion.span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
