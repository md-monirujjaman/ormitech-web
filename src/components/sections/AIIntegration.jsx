"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRightLeft, Bot, Check, ClipboardCheck, Flame, History, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";
import { Avatar } from "./ChatParts";
import { Pill, fadeUp, headingClass, stagger, viewOnce } from "./kit";

const checks = [
  ["AI handles FAQs & common queries", Bot],
  ["Human support for complex issues", UserRound],
  ["Seamless handoff, no data loss", History],
  ["Better customer experiences, faster", Sparkles]
];

const pop = { hidden: { opacity: 0, y: 12, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const glide = { layout: { type: "spring", stiffness: 240, damping: 30 } };

// The story plays in beats, then starts over: customer, AI reply, handover, context, agent typing, agent reply, resolved.
const BEAT_MS = 2000;
const LAST_BEAT = 7;

// Types a sentence out one letter at a time once `active` is true.
function Typewriter({ text, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return undefined;
    }
    const timer = setInterval(() => setCount(value => (value >= text.length ? value : value + 1)), 38);
    return () => clearInterval(timer);
  }, [active, text]);
  return <>{text.slice(0, count)}</>;
}

const W = 760;
const H = 470;
const AGENT_REPLY = "Hi Sarah, I have your full history. I'm sorry about the damage. I've started your refund now.";

// The agent's desktop dashboard, drawn at a fixed size and scaled to fit its box.
function AgentScreen({ beat }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const fit = () => setScale(box.clientWidth / W);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const sent = beat >= 6;
  const typing = beat === 5;
  const needsAgent = beat >= 3 && beat < 5;
  const assigned = beat >= 5 && beat < LAST_BEAT;
  const resolved = beat >= LAST_BEAT;

  const status = resolved
    ? ["Resolved", "bg-emerald-50 text-emerald-600"]
    : assigned
      ? ["Farhan", "bg-slate-900 text-white"]
      : needsAgent
        ? ["Needs agent", "bg-amber-50 text-amber-700"]
        : ["AI replying", "bg-brand/10 text-brand"];

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200/80" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute left-0 top-0 origin-top-left select-none text-[#0B0D12]" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <div className="flex h-9 items-center gap-2 border-b border-slate-100 bg-slate-50 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-4 rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">app.ormitechit.com/inbox</span>
        </div>

        <div className="flex" style={{ height: H - 36 }}>
          <div className="w-[190px] shrink-0 border-r border-slate-100 p-3">
            <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Inbox</p>
            <div className="mt-3 space-y-2">
              <motion.div animate={{ backgroundColor: needsAgent ? "#FFF7E6" : "#FFF0F4" }} className="rounded-xl p-2.5 ring-1 ring-brand/20">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold">Sarah Johnson</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={status[0]} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${status[1]}`}>
                      {status[0]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="mt-1 truncate text-[11px] text-slate-500">My order arrived damaged…</p>
                {needsAgent && <motion.span aria-hidden className="mt-2 block h-0.5 rounded-full bg-amber-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: "linear" }} style={{ originX: 0 }} />}
              </motion.div>
              {[["Tanvir Ahmed", "Where is my order?"], ["Nusrat Jahan", "Thanks, got it!"]].map(([name, text]) => (
                <div key={name} className="rounded-xl p-2.5 opacity-70">
                  <span className="text-[12.5px] font-semibold">{name}</span>
                  <p className="mt-1 truncate text-[11px] text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <Avatar name="Sarah Johnson" tone="from-rose-400 to-rose-600" size={32} />
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold">Sarah Johnson</p>
                  <p className="text-[10.5px] text-slate-400">Facebook · Order #4821</p>
                </div>
              </div>
              <div className="relative flex rounded-full bg-slate-100 p-1 text-[10.5px] font-semibold">
                <motion.span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand" animate={{ x: assigned || resolved ? "100%" : "0%" }} transition={{ type: "spring", stiffness: 340, damping: 30 }} />
                <span className={`relative z-10 flex items-center gap-1 px-2.5 py-1 ${assigned || resolved ? "text-slate-500" : "text-white"}`}><Bot className="h-3 w-3" /> AI</span>
                <span className={`relative z-10 flex items-center gap-1 px-2.5 py-1 ${assigned || resolved ? "text-white" : "text-slate-500"}`}><UserRound className="h-3 w-3" /> Human</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden bg-[#F8F9FC] px-5 pb-3 pt-4">
              <AnimatePresence initial={false}>
                {beat >= 1 && beat <= LAST_BEAT && (
                  <motion.div key="c" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[78%] self-start">
                    <p className="rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[12px] leading-5 text-slate-700 shadow-[0_6px_14px_-10px_rgba(13,27,61,.4)]">My order arrived damaged and I would like a refund.</p>
                    {beat >= 2 && (
                      <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9.5px] font-semibold text-amber-700">
                        <Flame className="h-3 w-3" /> Upset customer detected
                      </motion.span>
                    )}
                  </motion.div>
                )}
                {beat >= 2 && beat <= LAST_BEAT && (
                  <motion.div key="ai" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[78%] self-end">
                    <p className="mb-1 flex items-center justify-end gap-1 text-[10px] font-semibold text-brand"><Bot className="h-3 w-3" /> OrmiTech AI</p>
                    <p className="rounded-2xl rounded-tr-md bg-brand px-3.5 py-2.5 text-[12px] leading-5 text-white">I&apos;m so sorry about that. Let me bring in a teammate who can fix this right away.</p>
                  </motion.div>
                )}
                {beat >= 3 && beat <= LAST_BEAT && (
                  <motion.div key="h" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0B0D12] shadow-[0_10px_20px_-14px_rgba(242,13,69,.5)]">
                      <ArrowRightLeft className="h-3.5 w-3.5 text-brand" /> Handed over to Farhan · full history attached
                    </span>
                  </motion.div>
                )}
                {sent && beat <= LAST_BEAT && (
                  <motion.div key="hu" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[80%] self-end">
                    <p className="mb-1 flex items-center justify-end gap-1 text-[10px] font-semibold text-slate-700"><UserRound className="h-3 w-3" /> Farhan · Support</p>
                    <p className="rounded-2xl rounded-tr-md bg-slate-900 px-3.5 py-2.5 text-[12px] leading-5 text-white">{AGENT_REPLY}</p>
                  </motion.div>
                )}
                {resolved && (
                  <motion.div key="ok" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /> Resolved in 2 minutes</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-slate-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5">
                <span className="min-h-[18px] flex-1 truncate text-[12px] text-slate-700">
                  {typing ? <Typewriter text={AGENT_REPLY} active /> : <span className="text-slate-400">{assigned || resolved ? "Reply as Farhan…" : "AI is handling this chat"}</span>}
                  {typing && <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-brand align-middle" />}
                </span>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-white transition-colors duration-300 ${typing ? "bg-brand" : "bg-slate-300"}`}><Send className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </div>

          <div className="w-[170px] shrink-0 border-l border-slate-100 p-3">
            <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Context</p>
            <AnimatePresence initial={false}>
              {beat >= 4 && beat <= LAST_BEAT && (
                <motion.div key="ctx" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="mt-3 space-y-2">
                  {[[ClipboardCheck, "Order #4821", "Delivered · ৳7,450"], [History, "12 messages", "Full history kept"], [ShieldCheck, "Priority: high", "Upset customer"]].map(([Icon, title, text], index) => (
                    <motion.div key={title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 * index, duration: 0.4 }} className="rounded-xl bg-slate-50 p-2.5">
                      <p className="flex items-center gap-1.5 text-[11.5px] font-semibold"><Icon className="h-3.5 w-3.5 text-brand" /> {title}</p>
                      <p className="mt-0.5 pl-5 text-[10.5px] text-slate-500">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// The customer's phone: what Sarah sees while all this happens on the agent's screen.
function CustomerPhone({ beat }) {
  return (
    <div className="mx-auto w-[168px] rounded-[30px] bg-[#0F1220] p-[6px] shadow-[0_40px_70px_-26px_rgba(13,27,61,.65)] ring-1 ring-black/10">
      <div className="relative flex h-[290px] flex-col overflow-hidden rounded-[24px] bg-[#F6F7FB]">
        <span aria-hidden className="absolute left-1/2 top-1.5 z-20 h-3 w-14 -translate-x-1/2 rounded-full bg-[#0F1220]" />
        <div className="flex items-center gap-1.5 bg-white px-3 pb-2 pt-6">
          <Avatar name="OrmiTech IT" tone="from-brand to-[#B3082F]" size={22} />
          <span className="text-[10.5px] font-semibold leading-tight">OrmiTech IT<span className="block text-[8.5px] font-normal text-emerald-600">Online</span></span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2 pb-2">
          <AnimatePresence initial={false}>
            {beat >= 1 && beat <= LAST_BEAT && (
              <motion.p key="q" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[88%] self-end rounded-xl rounded-tr-sm bg-brand px-2 py-1.5 text-[9.5px] leading-[13px] text-white">My order arrived damaged and I would like a refund.</motion.p>
            )}
            {beat >= 2 && beat <= LAST_BEAT && (
              <motion.p key="a" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[88%] self-start rounded-xl rounded-tl-sm bg-white px-2 py-1.5 text-[9.5px] leading-[13px] text-slate-700 shadow-sm">I&apos;m so sorry! Let me bring in a teammate.</motion.p>
            )}
            {beat >= 3 && beat < 6 && (
              <motion.span key="w" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-center rounded-full bg-amber-50 px-2 py-0.5 text-[8.5px] font-semibold text-amber-700">Connecting you to Farhan…</motion.span>
            )}
            {beat >= 6 && beat <= LAST_BEAT && (
              <motion.p key="h" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="max-w-[90%] self-start rounded-xl rounded-tl-sm bg-white px-2 py-1.5 text-[9.5px] leading-[13px] text-slate-700 shadow-sm"><b className="block text-[8.5px] text-slate-500">Farhan</b>I have your full history. I&apos;ve started your refund now.</motion.p>
            )}
            {beat >= LAST_BEAT && (
              <motion.span key="ok" layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-center rounded-full bg-emerald-500 px-2 py-0.5 text-[8.5px] font-semibold text-white">Refund started ✓</motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HandoverDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const timer = setInterval(() => setBeat(current => (current + 1) % (LAST_BEAT + 2)), BEAT_MS);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} role="img" aria-label="Example handover: the AI answers a customer on their phone, then passes the conversation with its full history to a human agent on the dashboard" className="relative pb-2 sm:pb-12 sm:pl-10">
      <div className="rounded-[28px] bg-gradient-to-br from-white to-[#FFF0F4] p-3 shadow-[0_50px_100px_-44px_rgba(242,13,69,.45),0_24px_48px_-30px_rgba(13,27,61,.3)] ring-1 ring-white">
        <AgentScreen beat={beat} />
      </div>

      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="mt-6 sm:absolute sm:-bottom-2 sm:left-0 sm:mt-0">
        <CustomerPhone beat={beat} />
      </motion.div>

      <motion.span aria-hidden animate={{ y: [0, 9, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute -right-3 -top-4 hidden rounded-2xl border border-white bg-white/95 px-3.5 py-2.5 text-[11.5px] font-semibold text-[#0B0D12] shadow-[0_22px_44px_-22px_rgba(13,27,61,.45)] backdrop-blur md:flex md:items-center md:gap-1.5 lg:-right-6">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-white"><UserRound className="h-3.5 w-3.5" /></span>
        Humans take the rest
      </motion.span>
    </div>
  );
}

export default function AIIntegration() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const circleY = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="ai-human" aria-labelledby="ai-human-title" className={`${interTight.className} relative overflow-hidden bg-gradient-to-b from-white via-[#FFF8FA] to-white py-16 sm:py-20 lg:py-28`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.5] [background-image:radial-gradient(rgba(242,13,69,.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <motion.div className="relative order-2 lg:order-1" initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewOnce} transition={{ duration: 0.75, ease }}>
            <motion.div aria-hidden style={{ y: circleY }} className="pointer-events-none absolute -left-20 top-[30%] h-64 w-64 rounded-full bg-gradient-to-br from-[#FF9DB4] to-[#FF4F7B] opacity-80 sm:h-72 sm:w-72" />
            <div className="relative">
              <HandoverDemo />
            </div>
          </motion.div>

          <motion.div className="order-1 lg:order-2" variants={stagger(0.1, 0)} initial="hidden" whileInView="show" viewport={viewOnce}>
            <motion.div variants={fadeUp}>
              <Pill>AI + Human</Pill>
            </motion.div>
            <motion.h2 variants={fadeUp} id="ai-human-title" className={headingClass}>
              Automate the routine. <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">Escalate the important.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-lg text-[15.5px] leading-7 text-slate-500">
              OrmiTech IT&apos;s AI handles the repetitive conversations, while your team steps in for the ones that matter. Together, you get the best of both worlds.
            </motion.p>

            <motion.ul variants={stagger(0.1, 0.2)} className="mt-8 grid gap-3 sm:grid-cols-2">
              {checks.map(([text, Icon]) => (
                <motion.li key={text} variants={fadeUp} className="group flex items-start gap-3 rounded-2xl border border-white bg-white p-4 shadow-[0_1px_2px_rgba(13,27,61,.05),0_18px_38px_-28px_rgba(242,13,69,.35)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_28px_48px_-26px_rgba(242,13,69,.45)] motion-safe:hover:-translate-y-1">
                  <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color,transform] duration-300 group-hover:bg-brand group-hover:text-white motion-safe:group-hover:-rotate-6">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
                  </span>
                  <span className="pt-0.5 text-[14px] font-semibold leading-5 text-[#0B0D12]">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
