"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Camera, MessagesSquare, Moon, PackageCheck, Star, Truck } from "lucide-react";
import { ease } from "@/components/ui/Reveal";
import { interTight } from "@/styles/fonts";
import { TypingDots } from "@/components/ui/effects";
import { AiReply, Avatar, glide, pop, CourierCard, Incoming, OrderCard, PhoneShell, PhotoMessage, ProductCard, Stars, Typing, photos } from "./ChatParts";

// The five jobs the AI does. This list is information only; the chat on the phone plays on its own.
const jobs = [
  { title: "Answers day and night", text: "Customers get a reply in seconds, at 3 a.m. too.", icon: Moon },
  { title: "Recognises products from photos", text: "A customer sends a picture and the AI finds the item.", icon: Camera },
  { title: "Takes the order", text: "Name, address and quantity are collected right in the chat.", icon: PackageCheck },
  { title: "Sends courier updates", text: "Delivery progress reaches the customer without you typing.", icon: Truck },
  { title: "Asks for a review", text: "After delivery the AI asks how it went and records the rating.", icon: Star }
];

// The chat is a script. For each message, `side` says who is typing first and `typing` how long (ms) before it arrives.
const script = [
  { kind: "in", side: "in", typing: 1200, text: "Hi, are you open? I need help with an order.", time: "10:24" },
  { kind: "ai", side: "ai", typing: 1000, text: "Hello! Yes, we are always here. How can I help?", time: "10:24" },
  { kind: "photo", side: "in", typing: 1500, text: "Do you have this one?", time: "10:26" },
  { kind: "match", side: "ai", typing: 1300, text: "Found it! Size 40 is in stock.", time: "10:26" },
  { kind: "in", side: "in", typing: 1100, text: "I'll take it. Size 40.", time: "10:27" },
  { kind: "order", side: "ai", typing: 1400, text: "Done! Your order is confirmed.", time: "10:27" },
  { kind: "courier", side: null, typing: 0, hold: 2200 },
  { kind: "ask", side: "ai", typing: 1000, text: "How was your order? Please rate us.", time: "10:31" },
  { kind: "review", side: "in", typing: 1300, text: "Loved it, thank you!", time: "10:32", hold: 2200 }
];

// What the floating note beside the phone says for the latest message.
const notes = {
  in: [Moon, "Customer is waiting", "AI replies in seconds"],
  ai: [Moon, "AI answered", "No agent needed"],
  photo: [Camera, "Photo received", "Matching the product"],
  match: [Camera, "Product matched", "Navy blue suit found"],
  order: [PackageCheck, "Order created", "#4821 added to Orders"],
  courier: [Truck, "Courier updated", "Out for delivery today"],
  ask: [Star, "Review requested", "Sent after delivery"],
  review: [Star, "Review collected", "5 stars from the customer"]
};

function CustomerTyping() {
  return (
    <motion.span layout="position" transition={glide} variants={pop} initial="hidden" animate="show" exit="exit" className="self-start rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-[0_6px_14px_-10px_rgba(13,27,61,.4)]">
      <TypingDots dotClassName="bg-slate-400" />
    </motion.span>
  );
}

function Message({ event }) {
  switch (event.kind) {
    case "in":
      return <Incoming time={event.time}>{event.text}</Incoming>;
    case "photo":
      return <PhotoMessage photo={photos.blue} caption={event.text} time={event.time} />;
    case "match":
      return <AiReply time={event.time} card={<ProductCard photo={photos.blue} />}>{event.text}</AiReply>;
    case "order":
      return <AiReply time={event.time} card={<OrderCard />}>{event.text}</AiReply>;
    case "courier":
      return <CourierCard />;
    case "review":
      return (
        <Incoming time={event.time}>
          <Stars />
          <span className="mt-1 block">{event.text}</span>
        </Incoming>
      );
    default:
      return <AiReply time={event.time}>{event.text}</AiReply>;
  }
}

// Plays the script on a loop while the phone is on screen: typing dots, then the message, with a pause between messages.
function usePlayback(active) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    let cancelled = false;
    const timers = [];
    const wait = ms => new Promise(resolve => timers.push(setTimeout(resolve, ms)));

    (async () => {
      while (!cancelled) {
        setShown(0);
        setTyping(null);
        await wait(800);
        for (let index = 0; index < script.length && !cancelled; index += 1) {
          const event = script[index];
          if (event.typing) {
            setTyping(event.side);
            await wait(event.typing);
          }
          if (cancelled) return;
          setTyping(null);
          setShown(index + 1);
          await wait(event.hold ?? 1400);
        }
        await wait(3500);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return { shown, typing };
}

function AssistantPhone({ shown, typing }) {
  return (
    <PhoneShell
      height={540}
      headerClass="bg-white"
      header={
        <div className="flex items-center gap-2.5">
          <Avatar name="Sarah Johnson" tone="from-rose-400 to-rose-600" size={38} />
          <span className="leading-tight">
            <span className="block text-[13.5px] font-semibold text-[#0B0D12]">Sarah Johnson</span>
            <span className={`flex items-center gap-1 text-[10.5px] ${typing === "in" ? "text-brand" : "text-emerald-600"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${typing === "in" ? "bg-brand motion-safe:animate-pulse" : "bg-emerald-500"}`} /> {typing === "in" ? "typing…" : "Active now"}
            </span>
          </span>
          <span className="ml-auto rounded-full bg-brand/10 px-2 py-1 text-[9.5px] font-bold uppercase tracking-wide text-brand">AI on</span>
        </div>
      }
      footer={
        <div className="flex items-center gap-2 border-t border-slate-200/70 bg-white px-3 py-2.5">
          <span className="flex h-9 flex-1 items-center rounded-full bg-slate-100 px-3.5 text-[11.5px] text-slate-400">{typing === "ai" ? "OrmiTech AI is typing…" : "Message..."}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_20px_-10px_rgba(242,13,69,.9)]">
            <MessagesSquare className="h-4 w-4" />
          </span>
        </div>
      }
    >
      <AnimatePresence initial={false}>
        {script.slice(0, shown).map((event, index) => (
          <Message key={index} event={event} />
        ))}
        {typing === "in" && <CustomerTyping key="typing-in" />}
        {typing === "ai" && <Typing key="typing-ai" />}
      </AnimatePresence>
    </PhoneShell>
  );
}

function Happening({ latest }) {
  const [Icon, title, text] = notes[latest];
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={latest} initial={{ opacity: 0, x: -14, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3, ease }} className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_22px_44px_-22px_rgba(13,27,61,.45)] backdrop-blur">
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
  const inView = useInView(sectionRef, { margin: "-120px" });
  const { shown, typing } = usePlayback(inView);
  const latest = shown > 0 ? script[shown - 1].kind : "in";

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const circleY = useTransform(scrollYProgress, [0, 1], [-30, 60]);

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

              <ul className="mt-8 space-y-2.5">
                {jobs.map((job, index) => {
                  const Icon = job.icon;
                  return (
                    <motion.li key={job.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.08, ease }} className="group flex items-center gap-4 rounded-2xl border border-transparent bg-white/80 px-4 py-3.5 shadow-[0_1px_2px_rgba(13,27,61,.05)] transition-[transform,background-color,border-color,box-shadow] duration-300 hover:border-brand/25 hover:bg-white hover:shadow-[0_22px_44px_-28px_rgba(242,13,69,.45)] motion-safe:hover:translate-x-1.5">
                      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold text-[#0B0D12]">{job.title}</span>
                        <span className="mt-0.5 block text-[12.5px] leading-5 text-slate-500">{job.text}</span>
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div className="relative min-w-0" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.1, ease }}>
              <div aria-hidden className="pointer-events-none absolute -top-10 left-[28%] h-48 w-48 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -right-14 top-[36%] h-44 w-44 rounded-full bg-gradient-to-br from-brand to-[#C1093A] opacity-90" />
              <div aria-hidden className="pointer-events-none absolute -bottom-6 left-1/4 h-56 w-56 rounded-full bg-[#FFC9D5] opacity-50 blur-3xl" />

              <div className="relative motion-safe:animate-float">
                <AssistantPhone shown={shown} typing={typing} />
                <motion.div aria-hidden animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-2 top-[14%] hidden w-[200px] lg:block xl:-left-14">
                  <Happening latest={latest} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
