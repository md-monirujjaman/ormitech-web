"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import ChannelLogo from "@/components/common/ChannelLogo";
import Initials from "@/components/ui/Initials";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { retain } from "@/data/howItWorks";

// Timeline line fills as the visitor scrolls through the customer's history.
export default function Retention() {
  const listRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <section id="retain" aria-labelledby="retain-title" className="scroll-mt-36 py-20 lg:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal className="lg:sticky lg:top-40">
          <SectionHeading id="retain-title" eyebrow={retain.eyebrow} title={retain.title} description={retain.description} />
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_24px_48px_-36px_rgba(13,27,61,.4)]">
            <div className="flex items-center gap-3">
              <Initials name="Nusrat J." className="h-11 w-11 text-xs" />
              <div>
                <p className="font-semibold text-navy">Nusrat J.</p>
                <p className="text-[13px] text-slate-500">Customer since March · 3 orders</p>
              </div>
              <span className="ml-auto rounded-full bg-brand/10 px-2 py-0.5 text-[11.5px] font-semibold text-brandInk">VIP</span>
            </div>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[.12em] text-slate-500">Context your team always has</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {retain.context.map(item => (
                <li key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-[13px] font-medium text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="relative pl-10 sm:pl-12">
          <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-0.5 rounded-full bg-slate-200 sm:left-[19px]">
            <motion.span className="absolute inset-0 origin-top rounded-full bg-brand" style={{ scaleY: reduceMotion ? 1 : fill }} />
          </span>
          <ol ref={listRef} className="space-y-4">
            {retain.events.map((event, index) => (
              <motion.li
                key={event.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease }}
                className="group relative"
              >
                <span aria-hidden className="absolute -left-10 top-5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-brand text-[11px] font-bold text-white shadow-[0_8px_18px_-8px_rgba(242,13,69,.7)] sm:-left-12 sm:h-10 sm:w-10">
                  {index + 1}
                </span>
                <article className="rounded-2xl border border-slate-200/80 bg-white p-4 transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.35)] motion-safe:hover:-translate-y-1 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-slate-500">
                    <time>{event.date}</time>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1">
                      <ChannelLogo name={event.channel} className="h-3.5 w-3.5" />
                      {event.channel === "Website" ? "Website chat" : event.channel}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-navy">{event.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{event.text}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
