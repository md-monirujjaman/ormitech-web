"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { TypingDots, useTimeline } from "@/components/ui/effects";
import { interTight } from "@/styles/fonts";
import { DotGrid, Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const channelCards = [
  { name: "Facebook", label: "Facebook", sub: "Messenger", href: "/solutions/facebook-messenger-automation" },
  { name: "Instagram", label: "Instagram", sub: "Direct", href: "/solutions/instagram-dm-automation" },
  { name: "WhatsApp", label: "WhatsApp", sub: "Business", href: "/solutions/whatsapp-ai-chatbot" },
  { name: "Website", label: "Website", sub: "Live Chat", href: "/product/omnichannel-inbox" }
];

const bubble = { hidden: { opacity: 0, y: 12, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

// Conversation replays every few seconds while the window is on screen.
function LiveConversation() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [round, setRound] = useState(0);
  const phase = useTimeline(ref, [400, 1500, 2300, 3600], round);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = setInterval(() => setRound(value => value + 1), 9000);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} role="img" aria-label="Example live conversation: a customer asks about pricing and OrmiTech replies instantly" className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_40px_80px_-36px_rgba(242,13,69,.3),0_18px_40px_-28px_rgba(13,27,61,.25)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[14.5px] font-semibold text-[#0B0D12]">Live Conversation</p>
        <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Online
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-[11px] font-semibold text-white">C</span>
        <div>
          <p className="text-[12.5px] font-semibold text-[#0B0D12]">Customer</p>
          <p className="text-[11px] text-slate-400">Active 2m ago</p>
        </div>
      </div>

      <div className="mt-4 flex h-[190px] flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {phase >= 1 && (
            <motion.p key={`q${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="max-w-[82%] self-start rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-[12.5px] leading-5 text-slate-600">
              Hi, I&apos;m interested in your product. Can you tell me more about the pricing?
            </motion.p>
          )}
          {phase === 3 && (
            <motion.span key={`t${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="self-end rounded-2xl bg-[#FFE3EA] px-4 py-3.5">
              <TypingDots dotClassName="bg-brand" />
            </motion.span>
          )}
          {phase >= 4 && (
            <motion.p key={`a${round}`} variants={bubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className="max-w-[86%] self-end rounded-2xl rounded-tr-md bg-[#FFE3EA] px-4 py-3 text-[12.5px] leading-5 text-[#8A1230]">
              Yes, of course! Here&apos;s an overview of our plans. Would you like to see the full details?
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

export default function OmnichannelDemo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="channels" aria-labelledby="channels-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-[#FFF8FA] to-[#FFF3F6] py-16 sm:py-20 lg:py-28`}>
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] lg:gap-16">
          <motion.div variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>Channels</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="channels-title" className={headingClass}>
              One inbox, Every <span className="text-brand">channel</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-[15px] leading-7 text-slate-500">
              Your customers chat across multiple channels. OrmiTech brings them all together in one smart inbox — so you never miss a message.
            </motion.p>

            <motion.ul variants={stagger(0.09, 0.15)} className="mt-9 grid max-w-lg gap-3 sm:grid-cols-2">
              {channelCards.map(card => (
                <motion.li key={card.name} variants={fadeUp}>
                  <Link href={card.href} className="group flex items-center gap-3.5 rounded-2xl border border-white bg-white px-4 py-4 shadow-[0_1px_2px_rgba(13,27,61,.05),0_16px_34px_-26px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_24px_44px_-24px_rgba(242,13,69,.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 motion-safe:hover:-translate-y-1">
                    <ChannelLogo name={card.name} className="h-9 w-9 transition-transform duration-300 motion-safe:group-hover:scale-110" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-[#0B0D12]">{card.label}</span>
                      <span className="block text-[12px] text-slate-400">{card.sub}</span>
                    </span>
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                    <span className="sr-only">Learn about {card.label} {card.sub}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewOnce} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -right-14 top-[30%] h-56 w-56 rounded-full bg-gradient-to-br from-[#FF4F7B] to-brand sm:-right-20 sm:h-72 sm:w-72" />
            <DotGrid className="-right-2 top-2 hidden sm:grid" />
            <div className="relative motion-safe:animate-float">
              <LiveConversation />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
