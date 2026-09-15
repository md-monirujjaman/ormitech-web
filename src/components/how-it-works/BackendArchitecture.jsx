"use client";

import { Database, LayoutDashboard, UsersRound } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import Reveal, { Stagger, StaggerItem, popIn } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { backend } from "@/data/howItWorks";
import { channels } from "@/data/site";
import FlowLine from "./FlowLine";

function Connector({ label, delay = 0 }) {
  return (
    <div aria-hidden className="relative flex h-16 items-center justify-center">
      <FlowLine className="absolute inset-y-0 left-1/2" delay={delay} />
      <span className="relative rounded-full border border-slate-200 bg-white px-3 py-1 text-[11.5px] font-semibold text-slate-600 shadow-sm">{label}</span>
    </div>
  );
}

function LayerLabel({ children }) {
  return <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[.14em] text-slate-500">{children}</p>;
}

export default function BackendArchitecture() {
  return (
    <section id="backend" aria-labelledby="backend-title" className="scroll-mt-36 border-y border-slate-100 bg-[#F7F9FC] py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="backend-title" align="center" eyebrow={backend.eyebrow} title={backend.title} description={backend.description} />
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl">
          <Reveal>
            <LayerLabel>Where messages come from</LayerLabel>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {channels.map(channel => (
                <li key={channel.name} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-3 text-sm font-semibold text-navy transition-[transform,border-color] duration-300 hover:border-brand/25 motion-safe:hover:-translate-y-0.5">
                  <ChannelLogo name={channel.name} className="h-6 w-6" />
                  {channel.name === "Website" ? "Website widget" : channel.name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Connector label="Webhooks & widget connection" />

          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.7)] sm:p-8">
              <div aria-hidden className="red-glow absolute -right-24 -top-24 h-72 w-72 opacity-60" />
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">OrmiTech backend</h3>
                  <p className="mt-1 text-sm text-white/70">The engine behind every conversation, built around your workspace.</p>
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[12px] text-white/80">api.ormitech</span>
              </div>
              <Stagger as="ul" stagger={0.06} className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {backend.services.map(({ title, text, icon: Icon }) => (
                  <StaggerItem
                    as="li"
                    variants={popIn}
                    key={title}
                    className="group rounded-2xl border border-white/10 bg-white/[.04] p-4 transition-[background-color,border-color,transform] duration-300 hover:border-brand/40 hover:bg-white/[.08] motion-safe:hover:-translate-y-1"
                  >
                    <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/20 text-brand2 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-[14.5px] font-semibold">{title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-white/70">{text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>

          <Connector label="Saved to your workspace" delay={0.8} />

          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 sm:flex-row sm:justify-between">
              <span className="flex items-center gap-3 text-[15px] font-semibold text-navy">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[.08] text-brand">
                  <Database className="h-5 w-5" />
                </span>
                Workspace data
              </span>
              <ul className="flex flex-wrap justify-center gap-1.5">
                {backend.data.map(item => (
                  <li key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-[12.5px] font-medium text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Connector label="Real-time updates" delay={1.6} />

          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Your OrmiTech dashboard", text: "Live inbox, customers, leads, orders and analytics", icon: LayoutDashboard },
                { title: "Your team", text: "Replies, takes over and follows up", icon: UsersRound }
              ].map(({ title, text, icon: Icon }) => (
                <div key={title} className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-brand/25 hover:shadow-[0_18px_36px_-24px_rgba(13,27,61,.35)] motion-safe:hover:-translate-y-1">
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-navy">{title}</p>
                    <p className="text-[13px] text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
