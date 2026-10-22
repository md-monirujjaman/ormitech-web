"use client";

import { useRef } from "react";
import { MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChartNoAxesColumnIncreasing, Check, MessagesSquare, ShieldCheck, Sparkles, UsersRound, Zap } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { Spotlight } from "@/components/ui/effects";
import { markPath, markViewBox } from "@/data/ormitechMark";
import { answerBlocks } from "@/data/solutions";
import { interTight } from "@/styles/fonts";
import { Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const orbit = ["Facebook", "Instagram", "WhatsApp", "Website"];

const stats = [
  ["4", "channels"],
  ["24/7", "AI replies"],
  ["1", "inbox"]
];

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

function Mark({ className = "" }) {
  return (
    <svg aria-hidden viewBox={markViewBox} className={className}>
      <path d={markPath} fill="currentColor" />
    </svg>
  );
}

// The OrmiTech mark in the middle with the four channels circling it, so the idea reads at a glance.
function OrbitVisual() {
  const ref = useRef(null);
  const live = useInView(ref, { margin: "100px" });
  const spin = { rotate: live ? 360 : 0 };

  return (
    <div ref={ref} aria-hidden className="relative mx-auto aspect-square w-full max-w-[400px]">
      <div className="absolute inset-[3%] rounded-full border border-brand/15" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-brand/25" />
      <div className="absolute inset-[33%] rounded-full border border-brand/10" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(242,13,69,.12),transparent_62%)]" />

      <motion.div className="absolute inset-0" animate={spin} transition={{ duration: 48, repeat: live ? Infinity : 0, ease: "linear" }}>
        {orbit.map((name, index) => {
          const angle = (index / orbit.length) * 2 * Math.PI;
          const left = 50 + 40 * Math.sin(angle);
          const top = 50 - 40 * Math.cos(angle);
          return (
            <span key={name} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
              <motion.span animate={{ rotate: live ? -360 : 0 }} transition={{ duration: 48, repeat: live ? Infinity : 0, ease: "linear" }} className="-ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_20px_36px_-16px_rgba(13,27,61,.4)] ring-1 ring-slate-100">
                <ChannelLogo name={name} className="h-7 w-7" />
              </motion.span>
            </span>
          );
        })}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.span animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full bg-brand/30" />
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand2 via-brand to-[#7A0722] text-white shadow-[0_26px_50px_-14px_rgba(242,13,69,.7)] ring-[6px] ring-white">
          <Mark className="h-12 w-12" />
        </span>
      </div>
    </div>
  );
}

// "What is OrmiTech IT?" — a direct-answer section: plain definition first, then what the product does.
export default function AboutOrmiTech() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const facts = answerBlocks.home.facts;

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="what-is-ormitech" aria-labelledby="about-title" className={`${interTight.className} relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFD9E1] to-transparent opacity-70 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>About OrmiTech IT</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="about-title" className={`${headingClass} sm:text-[48px]`}>
              What is <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">OrmiTech IT</span>?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-slate-500">
              {answerBlocks.home.definition}
            </motion.p>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-gradient-to-br from-white to-[#FFF5F7] p-6 shadow-[0_40px_80px_-44px_rgba(242,13,69,.4),0_18px_40px_-30px_rgba(13,27,61,.25)] sm:p-9"
            >
              <OrbitVisual />
              <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
                {stats.map(([value, label]) => (
                  <li key={label}>
                    <p className="text-[26px] font-bold tracking-[-0.03em] text-brand sm:text-[30px]">{value}</p>
                    <p className="mt-0.5 text-[12px] leading-4 text-slate-500">{label}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid gap-5">
              <motion.ul variants={stagger(0.1, 0.1)} initial="hidden" whileInView="show" viewport={viewOnce} className="grid gap-3.5 sm:grid-cols-2">
                {whatWeDo.map(item => {
                  const Icon = item.icon;
                  return (
                    <motion.li key={item.title} variants={fadeUp}>
                      <Spotlight as="div" className="group h-full rounded-2xl border border-white bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.05),0_18px_38px_-28px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_28px_50px_-26px_rgba(242,13,69,.45)] motion-safe:hover:-translate-y-1">
                        <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6">
                          <Icon className="h-5 w-5" strokeWidth={2.1} />
                        </span>
                        <p className="mt-4 text-[15.5px] font-semibold text-[#0B0D12]">{item.title}</p>
                        <p className="mt-1 text-[13px] leading-6 text-slate-500">{item.text}</p>
                      </Spotlight>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.ul variants={stagger(0.1, 0.2)} initial="hidden" whileInView="show" viewport={viewOnce} className="grid gap-3 rounded-[24px] bg-gradient-to-br from-brand via-[#E00B3F] to-[#B3082F] p-6 text-white shadow-[0_36px_70px_-38px_rgba(242,13,69,.7)] sm:p-7">
                {points.map(point => {
                  const Icon = point.icon;
                  return (
                    <motion.li key={point.title} variants={fadeUp} className="flex items-start gap-4">
                      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold">{point.title}</span>
                        <span className="mt-0.5 block text-[13px] leading-6 text-white/80">{point.text}</span>
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>

          <motion.dl variants={stagger(0.08, 0.1)} initial="hidden" whileInView="show" viewport={viewOnce} className="mt-5 grid gap-px overflow-hidden rounded-[24px] border border-slate-100 bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([term, detail]) => (
              <motion.div key={term} variants={fadeUp} className="bg-white p-6">
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-brand">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand/10">
                    <Check className="h-2.5 w-2.5" strokeWidth={3.4} />
                  </span>
                  {term}
                </dt>
                <dd className="mt-2.5 text-[13.5px] leading-6 text-slate-600">{detail}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>
    </MotionConfig>
  );
}
