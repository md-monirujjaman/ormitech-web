"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { workflowSteps } from "@/data/features";
import { channels } from "@/data/site";
import { PulseDot, Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease, fadeRight, popIn } from "@/components/ui/Reveal";
import SectionHeading, { IconTile } from "@/components/ui/SectionHeading";

function ConnectPreview() {
  return (
    <Stagger as="ul" stagger={0.1} delay={0.2} className="space-y-1.5">
      {channels.map((channel, index) => (
        <StaggerItem as="li" variants={fadeRight} key={channel.name} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-100">
          <ChannelLogo name={channel.name} className="h-4 w-4" />
          <span className="flex-1 text-[11px] font-medium text-slate-600">{channel.name}</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" style={{ animationDelay: `${index * 350}ms` }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function ConfigurePreview() {
  return (
    <Stagger stagger={0.08} delay={0.25} className="flex flex-wrap gap-1.5">
      {["Roles", "Routing", "Tags", "Business context", "Automation rules"].map((chip, index) => (
        <StaggerItem
          as="span"
          variants={popIn}
          key={chip}
          className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${index < 2 ? "bg-brand/10 text-brandInk" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
        >
          {chip}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function AutomatePreview() {
  return (
    <Stagger stagger={0.55} delay={0.3} className="space-y-2">
      <StaggerItem as="p" className="max-w-[85%] rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 text-[11px] text-slate-600 ring-1 ring-slate-100">
        Do you deliver to Khulna?
      </StaggerItem>
      <StaggerItem className="ml-auto max-w-[90%] rounded-xl rounded-br-sm bg-brand/[.07] px-2.5 py-1.5 text-[11px] text-slate-700 ring-1 ring-brand/20">
        <span className="block text-[9px] font-semibold uppercase tracking-[.1em] text-brandInk">OrmiTech AI</span>
        Yes — delivery to Khulna takes 2–3 days.
      </StaggerItem>
    </Stagger>
  );
}

function TakeoverPreview() {
  return (
    <Stagger stagger={0.35} delay={0.3} className="space-y-2">
      <StaggerItem className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 ring-1 ring-slate-100">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-[9px] font-semibold text-white">FA</span>
        <span className="flex-1 text-[11px] font-medium text-slate-600">Farhan A.</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-semibold text-red-700">
          <PulseDot className="bg-red-500" />
          High intent
        </span>
      </StaggerItem>
      <StaggerItem as="p" className="rounded-lg bg-white px-2.5 py-1.5 text-[10.5px] text-slate-500 ring-1 ring-slate-100">
        AI summary shared with the agent
      </StaggerItem>
    </Stagger>
  );
}

function ImprovePreview() {
  const bars = [42, 58, 50, 72, 64, 88, 76];
  return (
    <div className="rounded-lg bg-white px-2.5 pb-2 pt-3 ring-1 ring-slate-100">
      {/* Bars start at zero height, which intersection observers can miss, so the row triggers them together. */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} className="flex h-14 items-end gap-1.5">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.6, delay: 0.25 + index * 0.07, ease } } }}
            className={`w-full origin-bottom rounded-t ${index === 5 ? "bg-brand" : "bg-brand/20"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </motion.div>
      <p className="mt-2 text-[9.5px] font-medium text-slate-400">Response time · Leads · Automation</p>
    </div>
  );
}

const previews = {
  connect: ConnectPreview,
  configure: ConfigurePreview,
  automate: AutomatePreview,
  takeover: TakeoverPreview,
  improve: ImprovePreview
};

export default function WorkflowSteps() {
  const lastIndex = workflowSteps.length - 1;

  return (
    <section id="workflow" aria-labelledby="workflow-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="workflow-title"
            eyebrow="How it works"
            title="From connection to conversion."
            description="Five phases, one continuous customer journey — from the first message to the final outcome."
          />
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {workflowSteps.map((step, index) => {
            const Preview = previews[step.preview];
            return (
              <Reveal as="li" key={step.number} delay={index * 0.08} className="relative">
                <Spotlight
                  as="article"
                  className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.3)] motion-safe:hover:-translate-y-1.5"
                >
                  <div className="flex items-center gap-3">
                    <IconTile icon={step.icon} size="sm" interactive />
                    <span className="text-sm font-bold text-brandInk transition-transform duration-300 motion-safe:group-hover:translate-x-0.5">{step.number}.</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{step.text}</p>
                  <div aria-hidden className="mt-5 flex flex-1 flex-col justify-end">
                    <div className="rounded-xl bg-slate-50 p-2.5 transition-colors duration-300 group-hover:bg-brand/[.04]">
                      <Preview />
                    </div>
                  </div>
                </Spotlight>
                {index < lastIndex && (
                  <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-sm xl:flex">
                    <ArrowRight className="h-3 w-3 motion-safe:animate-nudge" style={{ animationDelay: `${index * 200}ms` }} />
                  </span>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
