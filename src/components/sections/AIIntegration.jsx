 "use client";

import { motion } from "framer-motion";
import { Bot, UserRound, ArrowRight } from "lucide-react";

export default function AIIntegration() {
  return (
    <section className="py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="glass rounded-3xl p-5">
          <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3"><Bot className="text-brand" size={20}/><span className="text-sm font-semibold">AI conversation</span><span className="ml-auto text-[10px] text-emerald-600">ACTIVE</span></div>
            <div className="mt-6 space-y-4 text-xs leading-5">
              <div className="max-w-[75%] rounded-xl bg-black/[.05] p-3 text-black/55">Do you offer delivery in Khulna?</div>
              <div className="ml-auto max-w-[75%] rounded-xl bg-brand/15 p-3 text-red-900">Yes. We currently support delivery in Khulna. Would you like me to help with an order?</div>
              <div className="flex items-center gap-2 rounded-xl border border-black/10 p-3 text-black/45"><UserRound size={14}/> Customer asks for a human agent <ArrowRight size={13} className="ml-auto"/></div>
            </div>
          </div>
        </motion.div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">AI + Human</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Automate the routine. Escalate the important.</h2>
          <p className="mt-5 text-black/50">OrmiTech is designed so AI can handle repetitive conversations while your team keeps control of high-value, sensitive or complex interactions.</p>
          <div className="mt-7 space-y-3 text-sm text-black/65">
            {["Context stays with the conversation", "Human agents can take over instantly", "Lead intent can trigger workflows", "Every action can be measured"].map(x => <div key={x} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-brand"/>{x}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}