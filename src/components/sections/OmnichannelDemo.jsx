"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { interTight } from "@/styles/fonts";
import { AiReply, Avatar, CourierCard, Incoming, PhoneShell, PhotoMessage, ProductCard, Typing, photos } from "./ChatParts";
import { DotGrid, Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const channelCards = [
  { name: "Facebook", label: "Facebook", sub: "Messenger", href: "/solutions/facebook-messenger-automation" },
  { name: "Instagram", label: "Instagram", sub: "Direct", href: "/solutions/instagram-dm-automation" },
  { name: "WhatsApp", label: "WhatsApp", sub: "Business", href: "/solutions/whatsapp-ai-chatbot" },
  { name: "Website", label: "Website", sub: "Live Chat", href: "/product/omnichannel-inbox" }
];

// Illustrative conversations, one per channel. The phone plays them in turn while it is on screen.
const scenarios = [
  { channel: "Facebook", sub: "Messenger", who: "Rafi Hasan", tone: "from-sky-400 to-blue-600", accent: "#1877F2", photo: photos.brown, ask: "Do you have this in size 40?", answer: "Yes, size 40 is in stock. Shall I hold one for you?", card: "product" },
  { channel: "Instagram", sub: "Direct", who: "Nusrat Jahan", tone: "from-pink-400 to-rose-600", accent: "#E1306C", photo: photos.blue, ask: "Saw this on your reel. How much?", answer: "Delivery takes 2–3 days. Want me to place the order?", card: "product" },
  { channel: "WhatsApp", sub: "Business", who: "Tanvir Ahmed", tone: "from-emerald-400 to-teal-600", accent: "#25D366", text: "Where is my order #4821?", answer: "It is with the courier and will reach you today.", card: "courier" },
  { channel: "Website", sub: "Live Chat", who: "New visitor", tone: "from-slate-500 to-slate-700", accent: "#334155", text: "Which plan fits a small shop?", answer: "Starter is a good fit for a small shop. Want a quick comparison?", card: "none" }
];

const CYCLE_MS = 4600;

// A phone whose chat changes with the active channel: customer message or photo, typing dots, instant AI reply.
function ChannelPhone({ active, onPick, auto }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [phase, setPhase] = useState(0);
  const scenario = scenarios[active];

  useEffect(() => {
    setPhase(0);
    const timers = [150, 650, 1250].map((delay, index) => setTimeout(() => setPhase(index + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  useEffect(() => {
    if (!inView || !auto) return undefined;
    const timer = setInterval(() => onPick((active + 1) % scenarios.length, true), CYCLE_MS);
    return () => clearInterval(timer);
  }, [inView, auto, active, onPick]);

  const card = scenario.card === "product" ? <ProductCard photo={scenario.photo} /> : scenario.card === "courier" ? <CourierCard /> : null;

  return (
    <div ref={ref} role="img" aria-label={`Example ${scenario.channel} conversation: a customer asks a question and OrmiTech replies instantly`}>
      <PhoneShell
        height={560}
        headerClass="text-white"
        header={
          <div className="-mx-4 -mb-3 -mt-9 px-4 pb-3 pt-9" style={{ backgroundColor: scenario.accent, transition: "background-color .4s" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={scenario.channel} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex items-center gap-2.5">
                <span className="relative">
                  <Avatar name={scenario.who} tone={scenario.tone} size={38} />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2" style={{ "--tw-ring-color": scenario.accent }}>
                    <ChannelLogo name={scenario.channel} className="h-2.5 w-2.5" />
                  </span>
                </span>
                <span className="leading-tight">
                  <span className="block text-[13.5px] font-semibold">{scenario.who}</span>
                  <span className="flex items-center gap-1 text-[10.5px] text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {scenario.channel} · {scenario.sub}
                  </span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        }
        footer={
          <div className="flex items-center justify-between gap-1 border-t border-slate-200/70 bg-white px-3 py-2.5">
            {scenarios.map((item, index) => (
              <button key={item.channel} type="button" onClick={() => onPick(index, false)} aria-label={`Show ${item.channel} example`} aria-pressed={index === active} className={`relative flex h-9 flex-1 items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${index === active ? "bg-slate-100" : "hover:bg-slate-50"}`}>
                <ChannelLogo name={item.channel} className={`h-[18px] w-[18px] transition-opacity duration-200 ${index === active ? "opacity-100" : "opacity-50"}`} />
                {index === active && auto && <motion.span key={`${active}-${inView}`} aria-hidden className="absolute inset-x-2 bottom-0 h-[2px] origin-left rounded-full bg-brand" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CYCLE_MS / 1000, ease: "linear" }} />}
              </button>
            ))}
          </div>
        }
      >
        <AnimatePresence>
          {phase >= 1 && (scenario.photo ? <PhotoMessage key={`q${active}`} photo={scenario.photo} caption={scenario.ask} /> : <Incoming key={`q${active}`}>{scenario.text}</Incoming>)}
          {phase === 2 && <Typing key={`t${active}`} />}
          {phase >= 3 && (
            <AiReply key={`a${active}`} card={card}>
              {scenario.answer}
            </AiReply>
          )}
        </AnimatePresence>
      </PhoneShell>
    </div>
  );
}

export default function OmnichannelDemo() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const pick = (index, fromTimer) => {
    if (!fromTimer) setAuto(false);
    setActive(index);
  };
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
              Your customers chat across multiple channels. OrmiTech IT brings them all together in one smart inbox — so you never miss a message.
            </motion.p>

            <motion.ul variants={stagger(0.09, 0.15)} className="mt-9 grid max-w-lg gap-3 sm:grid-cols-2">
              {channelCards.map((card, index) => (
                <motion.li key={card.name} variants={fadeUp}>
                  <Link href={card.href} className={`group flex items-center gap-3.5 rounded-2xl border bg-white ${index === active ? "border-brand/40 ring-4 ring-brand/10" : "border-white"} px-4 py-4 shadow-[0_1px_2px_rgba(13,27,61,.05),0_16px_34px_-26px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_24px_44px_-24px_rgba(242,13,69,.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 motion-safe:hover:-translate-y-1`}>
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
              <ChannelPhone active={active} onPick={pick} auto={auto} />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
