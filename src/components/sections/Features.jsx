 "use client";

import { Bot, ChartNoAxesColumnIncreasing, Inbox, Radio, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import { features } from "@/data/site";

const icons = { Inbox, Bot, Users, Target, Radio, Chart: ChartNoAxesColumnIncreasing };

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">Platform</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Everything your customer conversations need.</h2>
          <p className="mt-5 text-black/50">A single operational layer designed around channels, AI automation, human teams and measurable outcomes.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <motion.article key={f.title} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.04 }} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-brand/25">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon size={20} /></div>
                <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/45">{f.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}