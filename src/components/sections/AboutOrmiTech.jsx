"use client";

import { useState } from "react";
import { LayoutGroup, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChartNoAxesColumnIncreasing, MessagesSquare, ShieldCheck, Sparkles, UsersRound, Zap } from "lucide-react";
import { Spotlight } from "@/components/ui/effects";
import { answerBlocks } from "@/data/solutions";
import { interTight } from "@/styles/fonts";
import { DotGrid, Pill, fadeLeft, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const points = [
  { title: "Smarter Communication", text: "Bring all your messages, leads and customers together in one place with AI-powered automation.", icon: Zap },
  { title: "More Sales, Less Effort", text: "Automate replies, qualify leads and focus on what matters most — growing your business.", icon: UsersRound },
  { title: "Built for Your Business", text: "Designed for growing teams — start with the channels you use today and add people as you scale.", icon: ShieldCheck }
];

const whatWeDo = [
  { title: "Multi-Channel Support", text: "Facebook, Instagram, WhatsApp and website chat — all in one platform.", icon: MessagesSquare },
  { title: "AI-Powered Automation", text: "Instant replies, lead qualification and smart workflows.", icon: Sparkles },
  { title: "Lead Management", text: "Track, organize and follow up leads with ease.", icon: UsersRound },
  { title: "Real-Time Insights", text: "Monitor performance and make data-driven decisions.", icon: ChartNoAxesColumnIncreasing }
];

// "What is OrmiTech?" — a direct-answer section: plain definition first, then what the product does.
export default function AboutOrmiTech() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="what-is-ormitech" aria-labelledby="about-title" className={`${interTight.className} relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28`}>
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] lg:gap-16">
          <motion.div variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>About OrmiTech</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="about-title" className={headingClass}>
              What is <span className="text-brand">OrmiTech</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-[15.5px] leading-7 text-slate-500">
              {answerBlocks.home.definition}
            </motion.p>

            <LayoutGroup>
              <motion.ul variants={stagger(0.12, 0.1)} className="relative mt-8 max-w-xl border-l-[3px] border-slate-100">
                {points.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <motion.li key={point.title} variants={fadeLeft} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} className="group relative flex cursor-default items-start gap-4 py-4 pl-6">
                      {active === index && <motion.span layoutId="about-bar" aria-hidden className="absolute -left-[3px] bottom-0 top-0 w-[3px] rounded-full bg-brand" transition={{ type: "spring", stiffness: 320, damping: 32 }} />}
                      <span aria-hidden className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:scale-105 ${active === index ? "bg-brand text-white shadow-[0_12px_24px_-10px_rgba(242,13,69,.7)]" : "bg-brand/10 text-brand"}`}>
                        <Icon className="h-5 w-5" strokeWidth={2.1} />
                      </span>
                      <span>
                        <span className="block text-[15.5px] font-semibold text-[#0B0D12]">{point.title}</span>
                        <span className="mt-1 block text-[13.5px] leading-6 text-slate-500">{point.text}</span>
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </LayoutGroup>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewOnce} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -right-16 top-[18%] h-64 w-64 rounded-full bg-gradient-to-br from-[#FF4F7B] to-brand sm:-right-24 sm:h-72 sm:w-72" />
            <DotGrid className="-right-2 -top-6 hidden sm:grid" />
            <div className="relative motion-safe:animate-float">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_40px_80px_-36px_rgba(242,13,69,.35),0_18px_40px_-28px_rgba(13,27,61,.25)] sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand">What we do</p>
                <motion.ul variants={stagger(0.1, 0.25)} initial="hidden" whileInView="show" viewport={viewOnce} className="mt-5 space-y-2">
                  {whatWeDo.map(item => {
                    const Icon = item.icon;
                    return (
                      <motion.li key={item.title} variants={fadeUp}>
                        <Spotlight as="div" className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-[background-color,transform] duration-300 hover:bg-[#FFF3F6] motion-safe:hover:translate-x-1">
                          <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6">
                            <Icon className="h-5 w-5" strokeWidth={2.1} />
                          </span>
                          <span>
                            <span className="block text-[14.5px] font-semibold text-[#0B0D12]">{item.title}</span>
                            <span className="mt-0.5 block text-[12.5px] leading-5 text-slate-500">{item.text}</span>
                          </span>
                        </Spotlight>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
