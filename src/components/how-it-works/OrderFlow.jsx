"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, ShoppingBag, Wallet } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { useTimeline } from "@/components/ui/effects";
import Reveal, { ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { orders } from "@/data/howItWorks";

const STATUS_BY_STEP = ["Recommended", "Ready to buy", "Collecting details", "Awaiting confirmation", "Order recorded", "Follow-up sent"];

// Each checklist item ticks when the matching step (1-based) is reached.
const CHECKLIST = [
  ["Details confirmed in chat", 3],
  ["Saved to customer profile", 5],
  ["Confirmation message sent", 6]
];

export default function OrderFlow() {
  const ref = useRef(null);
  const step = useTimeline(ref, [400, 1100, 1800, 2500, 3200, 3900]);
  const current = Math.max(step - 1, 0);

  return (
    <section id="orders" aria-labelledby="orders-title" className="scroll-mt-36 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="orders-title" eyebrow={orders.eyebrow} title={orders.title} description={orders.description} />
        </Reveal>

        <div ref={ref} className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {orders.steps.map((item, index) => {
              const reached = step >= index + 1;
              return (
                <li
                  key={item.title}
                  className={`group relative rounded-2xl border bg-white p-4 transition-[border-color,box-shadow,transform] duration-500 motion-safe:hover:-translate-y-1 ${reached ? "border-brand/30 shadow-[0_18px_36px_-26px_rgba(242,13,69,.55)]" : "border-slate-200/80"}`}
                >
                  <span className="flex items-center justify-between">
                    <span aria-hidden className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-500 ${reached ? "bg-brand text-white" : "bg-slate-100 text-slate-500"}`}>
                      {reached ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
                    </span>
                    <span aria-hidden className="h-1 w-12 overflow-hidden rounded-full bg-slate-100">
                      <span className={`block h-full origin-left bg-brand transition-transform duration-700 ${reached ? "scale-x-100" : "scale-x-0"}`} />
                    </span>
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-5 text-slate-600">{item.text}</p>
                </li>
              );
            })}
          </ol>

          <Reveal delay={0.1} className="lg:sticky lg:top-40">
            <div
              role="img"
              aria-label={`Example order card for Sadia R. on Instagram: 2 linen shirts, delivery in Dhaka, cash on delivery. Status: ${STATUS_BY_STEP[current]}.`}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.45)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <ShoppingBag className="h-4 w-4 text-brand" />
                  Order #4822
                </span>
                <motion.span key={current} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease }} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${current >= 4 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {STATUS_BY_STEP[current]}
                </motion.span>
              </div>
              <div className="space-y-3 p-4">
                <p className="flex items-center gap-2 text-[13px] text-slate-600">
                  <ChannelLogo name="Instagram" className="h-5 w-5" />
                  Sadia R. · from an Instagram conversation
                </p>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-[13px]">
                  <span className="font-medium text-navy">2 × Linen shirt (Blue, M)</span>
                  <span className="text-slate-500">Qty 2</span>
                </div>
                <dl className="grid grid-cols-2 gap-2 text-[12.5px]">
                  <div className="rounded-xl border border-slate-100 px-3 py-2">
                    <dt className="flex items-center gap-1 text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      Delivery
                    </dt>
                    <dd className="font-semibold text-navy">Dhaka</dd>
                  </div>
                  <div className="rounded-xl border border-slate-100 px-3 py-2">
                    <dt className="flex items-center gap-1 text-slate-500">
                      <Wallet className="h-3.5 w-3.5" />
                      Payment
                    </dt>
                    <dd className="font-semibold text-navy">Cash on delivery</dd>
                  </div>
                </dl>
                <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-[12.5px]">
                  {CHECKLIST.map(([label, doneAtStep]) => {
                    const done = step >= doneAtStep;
                    return (
                      <li key={label} className={`flex items-center gap-2 transition-colors duration-500 ${done ? "text-navy" : "text-slate-400"}`}>
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-500 ${done ? "bg-emerald-500 text-white" : "bg-slate-200 text-transparent"}`}>
                          <Check className="h-2.5 w-2.5" strokeWidth={4} />
                        </span>
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
