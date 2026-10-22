"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Camera, Check, MessagesSquare, Moon, PackageCheck, Star, Truck } from "lucide-react";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";
import { AiReply, Avatar, glide, CourierCard, Incoming, OrderCard, PhoneShell, PhotoMessage, ProductCard, Stars, Typing, photos } from "./ChatParts";

// The five jobs the AI does. The left list and the phone are driven by the same stage number.
const jobs = [
  { title: "Answers day and night", text: "Customers get a reply in seconds, at 3 a.m. too.", icon: Moon },
  { title: "Recognises products from photos", text: "A customer sends a picture and the AI finds the item.", icon: Camera },
  { title: "Takes the order", text: "Name, address and quantity are collected right in the chat.", icon: PackageCheck },
  { title: "Sends courier updates", text: "Delivery progress reaches the customer without you typing.", icon: Truck },
  { title: "Asks for a review", text: "After delivery the AI asks how it went and records the rating.", icon: Star }
];

const happenings = [
  ["Customer is waiting", "AI replies in seconds"],
  ["Photo received", "Navy blue suit matched"],
  ["Order created", "#4821 added to Orders"],
  ["Courier updated", "Out for delivery today"],
  ["Review collected", "5 stars from the customer"]
];

const STAGE_MS = 6800;

// Which messages are visible at a given stage. Each group appears as a customer message, typing dots and an AI reply.
function Conversation({ stage, sub }) {
  return (
    <AnimatePresence initial={false}>
      {stage >= 0 && <Incoming key="s0q">Hi, are you open? I need help with an order.</Incoming>}
      {stage >= 0 && sub >= 2 && <AiReply key="s0a">Hello! Yes, we are always here. How can I help?</AiReply>}
      {stage >= 1 && <PhotoMessage key="s1q" photo={photos.blue} caption="Do you have this one?" time="10:26" />}
      {stage === 1 && sub === 1 && <Typing key="s1t" />}
      {stage >= 1 && sub >= 2 && (
        <AiReply key="s1a" time="10:26" card={<ProductCard photo={photos.blue} />}>
          Found it! Size 40 is in stock.
        </AiReply>
      )}
      {stage >= 2 && <Incoming key="s2q" time="10:27">I&apos;ll take it. Size 40.</Incoming>}
      {stage === 2 && sub === 1 && <Typing key="s2t" />}
      {stage >= 2 && sub >= 2 && (
        <AiReply key="s2a" time="10:27" card={<OrderCard />}>
          Done! Your order is confirmed.
        </AiReply>
      )}
      {stage >= 3 && sub >= 1 && <CourierCard key="s3c" />}
      {stage >= 4 && sub >= 1 && (
        <AiReply key="s4q" time="10:31">
          How was your order? Please rate us.
        </AiReply>
      )}
      {stage >= 4 && sub >= 2 && (
        <motion.div key="s4a" layout="position" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease, ...glide }} className="max-w-[84%] self-start rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 shadow-[0_6px_14px_-10px_rgba(13,27,61,.4)]">
          <Stars />
          <p className="mt-1 text-[12.5px] text-slate-700">Loved it, thank you!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AssistantPhone({ stage }) {
  const [sub, setSub] = useState(0);

  // Within a stage the message, typing dots and reply arrive one after the other.
  useEffect(() => {
    setSub(0);
    const timers = [500, 1700, 3000].map((delay, index) => setTimeout(() => setSub(index + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  return (
    <PhoneShell
      height={540}
      headerClass="bg-white"
      header={
        <div className="flex items-center gap-2.5">
          <Avatar name="Sarah Johnson" tone="from-rose-400 to-rose-600" size={38} />
          <span className="leading-tight">
            <span className="block text-[13.5px] font-semibold text-[#0B0D12]">Sarah Johnson</span>
            <span className="flex items-center gap-1 text-[10.5px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active now
            </span>
          </span>
          <span className="ml-auto rounded-full bg-brand/10 px-2 py-1 text-[9.5px] font-bold uppercase tracking-wide text-brand">AI on</span>
        </div>
      }
      footer={
        <div className="flex items-center gap-2 border-t border-slate-200/70 bg-white px-3 py-2.5">
          <span className="flex h-9 flex-1 items-center rounded-full bg-slate-100 px-3.5 text-[11.5px] text-slate-400">Message...</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_20px_-10px_rgba(242,13,69,.9)]">
            <MessagesSquare className="h-4 w-4" />
          </span>
        </div>
      }
    >
      <Conversation stage={stage} sub={sub} />
    </PhoneShell>
  );
}

function Happening({ stage }) {
  const [title, text] = happenings[stage];
  const Icon = jobs[stage].icon;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={stage} initial={{ opacity: 0, x: -14, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3, ease }} className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_22px_44px_-22px_rgba(13,27,61,.45)] backdrop-blur">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[12.5px] font-semibold text-[#0B0D12]">{title}</span>
          <span className="mt-0.5 block text-[11px] text-slate-500">{text}</span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FeaturesBento() {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const inView = useInView(sectionRef, { margin: "-120px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const circleY = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  // The chat plays through the five jobs and starts over, while the section is on screen.
  useEffect(() => {
    if (!inView || paused) return undefined;
    const timer = setInterval(() => setStage(current => (current + 1) % jobs.length), STAGE_MS);
    return () => clearInterval(timer);
  }, [inView, paused]);

  const pick = index => {
    setPaused(true);
    setStage(index);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="features-bento" aria-labelledby="connected-title" className={`${interTight.className} relative overflow-clip bg-[radial-gradient(ellipse_at_top,#FFF3F6_0%,#FFFFFF_55%)] py-16 sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#FFC3D0] to-transparent opacity-70 blur-2xl" />
        <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -bottom-32 -left-[170px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-brand to-[#C1093A]" />

        <div className="container-x relative">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)]">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              AI chat examples
            </span>
            <h2 id="connected-title" className="mt-5 text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B0D12] [text-wrap:balance] sm:text-[46px]">
              Finally, <span className="text-brand">everything&apos;s</span> connected
            </h2>
          </motion.div>

          <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, ease }}>
              <h3 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[40px]">
                You run the business.
                <br />
                <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">AI handles the hassle.</span>
              </h3>
              <p className="mt-5 max-w-xl text-[15.5px] leading-8 text-slate-500">
                Answering messages day and night, recognising products from photos, taking orders, courier updates, asking for reviews — the jobs that eat hours of your day, OrmiTech IT does on its own. You focus on growing the business.
              </p>

              <ol className="mt-8 space-y-2.5">
                {jobs.map((job, index) => {
                  const Icon = job.icon;
                  const isActive = index === stage;
                  const done = index < stage;
                  return (
                    <li key={job.title}>
                      <button
                        type="button"
                        onClick={() => pick(index)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-[transform,box-shadow,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 ${isActive ? "border-brand/40 bg-[#FFF0F4] shadow-[0_22px_44px_-26px_rgba(242,13,69,.55)] motion-safe:translate-x-1.5" : "border-transparent bg-white/80 shadow-[0_1px_2px_rgba(13,27,61,.05)] hover:bg-white"}`}
                      >
                        <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-[background-color,color] duration-300 ${isActive ? "bg-brand text-white shadow-[0_12px_24px_-10px_rgba(242,13,69,.7)]" : done ? "bg-emerald-500/10 text-emerald-600" : "bg-brand/10 text-brand"}`}>
                          {done ? <Check className="h-5 w-5" strokeWidth={2.6} /> : <Icon className="h-5 w-5" strokeWidth={2.1} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold text-[#0B0D12]">{job.title}</span>
                          <span className="mt-0.5 block text-[12.5px] leading-5 text-slate-500">{job.text}</span>
                        </span>
                        {isActive && !paused && <motion.span key={`${stage}-bar`} aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: STAGE_MS / 1000, ease: "linear" }} />}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </motion.div>

            <motion.div className="relative min-w-0" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease }}>
              <div aria-hidden className="pointer-events-none absolute -top-10 left-[28%] h-48 w-48 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -right-14 top-[36%] h-44 w-44 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -bottom-6 left-1/4 h-56 w-56 rounded-full bg-[#FFC9D5] opacity-50 blur-3xl" />

              <div className="relative motion-safe:animate-float">
                <AssistantPhone stage={stage} />
                <motion.div aria-hidden animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 top-[14%] hidden w-[200px] lg:block xl:-left-14">
                  <Happening stage={stage} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
