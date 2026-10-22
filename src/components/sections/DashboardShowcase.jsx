"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import DashboardMock from "@/components/sections/DashboardMock";
import ChannelLogo from "@/components/common/ChannelLogo";
const LaserFlow = dynamic(() => import("@/components/ui/LaserFlow"), { ssr: false });
import { interTight } from "@/styles/fonts";

// Soft side edges so the canvas never shows a hard box where the light stops.
const fadeMask = {
  maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)"
};

const channels = ["Facebook", "Instagram", "WhatsApp"];

export default function DashboardShowcase() {
  const cardRef = useRef(null);

  return (
    <section aria-labelledby="dashboard-showcase-title" className={`${interTight.className} relative overflow-hidden`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-2/3 max-w-5xl -translate-y-1/2 rounded-full bg-brand/[.06] blur-3xl" />

      {/* One beam for the whole section: it starts at the top edge, drops down beside the title and pours over the dashboard card. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={fadeMask}>
        <LaserFlow
          surfaceRef={cardRef}
          beamPosition={0.82}
          theme="light"
          color="#F20D45"
          hueSpread={0.12}
          intensity={2}
          flare={1.4}
          spread={1.4}
          spill={1}
          fog={0.3}
          dust={1.6}
          beamWidth={1.7}
          streaks={1.5}
          dots={1.4}
          pulse={1.3}
          speed={1.3}
          seed={3}
          dpr={1}
          mouseInteraction
          intro
        />
      </div>

      <div className="container-x relative z-10 flex min-w-0 flex-col py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand shadow-[0_8px_20px_-14px_rgba(242,13,69,.5)] backdrop-blur">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            OrmiTech IT workspace
          </span>
          <h2 id="dashboard-showcase-title" className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] sm:text-[46px] lg:text-[54px]">
            Every customer chat, <span className="bg-gradient-to-r from-brand to-[#C1093A] bg-clip-text text-transparent">one clean dashboard</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-500 sm:text-base">
            Contacts, orders and AI replies from every channel — all in one place, so your team always has the full picture.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {channels.map(name => (
              <span key={name} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_12px_26px_-14px_rgba(13,27,61,.35)] ring-1 ring-slate-100">
                <ChannelLogo name={name} className="h-5 w-5" />
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1180px] sm:mt-14 lg:mt-16">
          <div ref={cardRef} className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-black/[.08] bg-white shadow-[0_40px_90px_-40px_rgba(15,23,42,.35)] sm:rounded-3xl">
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}
