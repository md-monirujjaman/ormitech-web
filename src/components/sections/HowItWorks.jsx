"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, Link2, Settings2 } from "lucide-react";

const steps = [
  ["01", "Connect", "Connect your customer channels and bring conversations into one workspace.", Link2],
  ["02", "Configure", "Define routing, team access, tags, workflows and AI behavior.", Settings2],
  ["03", "Automate", "Let AI handle repeatable questions and qualify incoming demand.", Bot],
  ["04", "Grow", "Measure conversations, leads and team performance and improve over time.", BarChart3]
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden border-y border-slate-100 bg-white py-20 lg:py-24">
      <div className="container-x">
        <div className="text-center">
          <p className="mx-auto inline-flex rounded-full bg-brand/[.06] px-6 py-2 text-sm font-bold uppercase tracking-[.18em] text-brand">How it works</p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-.035em] text-navy sm:text-5xl">From connection to <span className="text-brand">conversion.</span></h2>
        </div>
        <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map(([num, title, text, Icon], index) => (
            <motion.article
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_34px_-28px_rgba(13,27,61,.4)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_24px_44px_-26px_rgba(242,13,69,.25)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/[.07] text-base font-bold text-brand">{num}</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/[.07] text-brand transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <Icon aria-hidden className="h-7 w-7" strokeWidth={2.2} />
                </span>
              </div>
              <span aria-hidden className="mt-[-24px] ml-[72px] h-1 w-14 rounded-full bg-brand/20" />
              <h3 className="mt-7 text-[28px] font-bold tracking-[-.035em] text-navy">{title}</h3>
              <p className="mt-3 text-[16px] leading-7 text-slate-500">{text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-1.5 w-24 rounded-r-full bg-brand transition-all duration-300 group-hover:w-36" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}