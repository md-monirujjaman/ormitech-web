"use client";

import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, Building2, Check, Headset, Plug, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buttonClasses, ButtonShine } from "@/components/common/ButtonLink";
import { ease } from "@/components/ui/Reveal";

// Enterprise call-out under the plan cards. Copy, features and the "Talk to Sales" link all come from the
// pricing config, so an admin-managed Enterprise plan changes them without touching this component.
export default function EnterpriseBanner({ enterprisePlan, features }) {
  const half = Math.ceil(features.length / 2);
  const columns = [features.slice(0, half), features.slice(half)];

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        id="enterprise-banner"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="relative overflow-hidden rounded-[22px] border border-brand/20 bg-gradient-to-r from-[#FFF6F8] via-white to-[#FFF3F6] px-6 py-7 shadow-[0_24px_50px_-38px_rgba(242,13,69,.45)] sm:px-8"
      >
        <div className="relative grid items-center gap-8 lg:grid-cols-[210px_minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:gap-6">
          <div aria-hidden className="relative mx-auto flex h-[150px] w-[190px] items-center justify-center">
            <span className="absolute inset-x-0 top-4 bottom-4 rounded-[50%] border border-brand/20" />
            <span className="absolute inset-x-6 top-8 bottom-6 rounded-[50%] border border-dashed border-brand/25 motion-safe:animate-[spin_50s_linear_infinite]" />
            <span className="relative flex h-[76px] w-[86px] items-center justify-center rounded-[22px] bg-gradient-to-b from-[#FF5E86] to-brand text-white shadow-[0_22px_34px_-14px_rgba(242,13,69,.8)] ring-4 ring-white motion-safe:animate-float">
              <Building2 className="h-9 w-9" strokeWidth={1.9} />
            </span>
            {[
              { icon: Headset, className: "left-1 top-4" },
              { icon: Plug, className: "-left-1 bottom-6" },
              { icon: ShieldCheck, className: "right-0 top-9" }
            ].map(({ icon: Icon, className }, index) => (
              <span key={index} className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand shadow-[0_10px_22px_-10px_rgba(242,13,69,.55)] ring-1 ring-brand/10 motion-safe:animate-float ${className}`} style={{ animationDelay: `${-index * 1.4}s` }}>
                <Icon className="h-4 w-4" strokeWidth={2.1} />
              </span>
            ))}
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-white px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[.14em] text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
              Enterprise
            </span>
            <h2 className="mt-3 text-[26px] font-bold leading-[1.1] tracking-[-0.025em] text-[#0B0D12] sm:text-[28px]">
              Enterprise, custom
              <br />
              <span className="text-brand">built around you.</span>
            </h2>
            <p className="mt-3 max-w-[300px] text-[12.5px] leading-5 text-slate-500">Enterprise pricing is shaped around your requirements — conversation volume, team size, integrations and how your operations run.</p>
          </div>

          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:border-l lg:border-slate-200 lg:pl-8">
            {columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="space-y-[9px]">
                {column.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + (columnIndex * column.length + index) * 0.05, ease }}
                    className="group flex items-center gap-2.5 text-[12px] text-slate-600"
                  >
                    <span aria-hidden className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-125">
                      <Check className="h-2 w-2" strokeWidth={4} />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            ))}
          </div>

          <Link href={enterprisePlan.cta.href} className={buttonClasses({ variant: "secondary", size: "sm", className: "!border-brand !text-brand hover:!bg-brand hover:!text-white" })}>
            <ButtonShine />
            Talk to Sales
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
