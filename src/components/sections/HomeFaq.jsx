"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircleQuestion, Plus } from "lucide-react";
import { ease } from "@/components/ui/Reveal";
import { faq } from "@/data/product";
import { interTight } from "@/styles/fonts";
import { Pill } from "./kit";

function Item({ item, index, open, onToggle, id }) {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05, ease }}
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${open ? "border-brand/30 shadow-[0_26px_50px_-30px_rgba(242,13,69,.45)]" : "border-slate-200/80 shadow-[0_1px_2px_rgba(13,27,61,.04)] hover:border-brand/20"}`}
    >
      <span aria-hidden className={`absolute bottom-0 left-0 top-0 w-1 origin-top bg-gradient-to-b from-brand to-[#C1093A] transition-transform duration-300 ${open ? "scale-y-100" : "scale-y-0"}`} />
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:px-6 sm:py-5"
        >
          <span aria-hidden className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12.5px] font-bold transition-[background-color,color] duration-300 sm:flex ${open ? "bg-brand text-white" : "bg-brand/[.08] text-brand"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`flex-1 text-[15.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${open ? "text-brandInk" : "text-[#0B0D12] group-hover:text-brandInk"}`}>{item.question}</span>
          <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ${open ? "rotate-[135deg] bg-brand text-white" : "bg-slate-100 text-slate-500 group-hover:bg-brand/10 group-hover:text-brand"}`}>
            <Plus className="h-4 w-4" strokeWidth={2.4} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-5 pr-6 text-[14.5px] leading-7 text-slate-600 sm:pl-[76px] sm:pr-16">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// Home page FAQ. Same questions as the product page; one answer is open at a time and the first starts open.
export default function HomeFaq() {
  const baseId = useId();
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // One answer is open at a time: opening another closes the one that was open.
  const toggle = index => setOpenIndex(current => (current === index ? -1 : index));

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="faq" aria-labelledby="home-faq-title" className={`${interTight.className} relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-[#FFF8FA] to-white py-16 sm:py-20 lg:py-28`}>
        <motion.div aria-hidden style={{ y: blobY }} className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFD9E1] to-transparent opacity-70 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#FFC9D5] opacity-30 blur-3xl" />

        <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="lg:sticky lg:top-28 lg:self-start">
            <Pill>FAQ</Pill>
            <h2 id="home-faq-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[44px]">
              Questions? <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">We have answers.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-7 text-slate-500">Everything you need to know about OrmiTech IT. Can&apos;t find an answer? Our team is happy to help.</p>

            <div className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-[#E00B3F] to-[#B3082F] p-6 text-white shadow-[0_36px_70px_-36px_rgba(242,13,69,.7)]">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_16px_30px_-14px_rgba(80,0,20,.6)]">
                <MessageCircleQuestion className="h-6 w-6" />
              </span>
              <p className="relative mt-4 text-[18px] font-semibold">Still have questions?</p>
              <p className="relative mt-1 text-[13.5px] leading-6 text-white/85">Tell us what you want to connect and automate.</p>
              <Link href="/contact" className="group relative mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-brand transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(80,0,20,.6)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40">
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <ul className="space-y-3">
            {faq.items.map((item, index) => (
              <Item key={item.question} id={`${baseId}-${index}`} item={item} index={index} open={openIndex === index} onToggle={() => toggle(index)} />
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
