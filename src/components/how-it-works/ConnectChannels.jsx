"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, CodeXml, LayoutTemplate } from "lucide-react";
import ChannelLogo from "@/components/common/ChannelLogo";
import { PulseDot, Spotlight } from "@/components/ui/effects";
import Reveal, { Stagger, StaggerItem, ease } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { connect } from "@/data/howItWorks";

const METHOD_ICONS = { cms: LayoutTemplate, custom: CodeXml };

function SocialCard({ channel }) {
  return (
    <Spotlight
      as="article"
      className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(13,27,61,.04)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_22px_44px_-26px_rgba(13,27,61,.32)] motion-safe:hover:-translate-y-1"
    >
      <ChannelLogo name={channel.name} className="h-10 w-10 transition-transform duration-300 motion-safe:group-hover:scale-110" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-navy">{channel.name}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <PulseDot className="bg-emerald-500" />
            Connected
          </span>
        </div>
        <p className="text-[12.5px] text-slate-500">{channel.account}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{channel.text}</p>
        <ol className="mt-3 flex flex-wrap items-center gap-1 text-[12px] font-medium text-slate-600">
          {channel.steps.map((step, index) => (
            <li key={step} className="flex items-center gap-1">
              {index > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-slate-300" />}
              <span className={`rounded-md px-1.5 py-0.5 ${index === channel.steps.length - 1 ? "bg-brand/[.08] text-brandInk" : "bg-slate-100"}`}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Spotlight>
  );
}

function CmsMockup() {
  return (
    <div
      role="img"
      aria-label="Example of a CMS site admin: the OrmiTech installation code pasted into the theme’s header code setting and saved, with the chat widget live on the website"
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgba(13,27,61,.45)]"
    >
      <div className="flex items-center gap-2 bg-[#1f2937] px-3 py-2 text-[10.5px] text-white/80">
        <span className="h-3 w-3 rounded-full border border-white/50" />
        northwind.example · Site admin
      </div>
      <div className="grid grid-cols-[84px_minmax(0,1fr)]">
        <ul className="space-y-0.5 bg-[#374151] py-2 text-[10.5px] text-white/75">
          {["Dashboard", "Posts", "Pages", "Appearance", "Plugins", "Settings"].map(item => (
            <li key={item} className={`px-2.5 py-1 ${item === "Appearance" ? "bg-brand font-semibold text-white" : ""}`}>
              {item}
            </li>
          ))}
        </ul>
        <div className="min-w-0 p-3">
          <p className="text-[12px] font-semibold text-navy">Theme settings · Header code</p>
          <p className="text-[10.5px] text-slate-500">Code added here loads on every page.</p>
          <pre className="mt-2 overflow-x-auto rounded-md bg-slate-900 p-2.5 font-mono text-[9.5px] leading-4 text-slate-300">
            <span className="text-slate-500">{"<!-- OrmiTech website chat -->"}</span>
            {"\n<script>\n  window.OrmiTechChat = {\n    workspaceId: "}
            <span className="text-emerald-300">{'"ws_…"'}</span>
            {"\n  };\n</script>\n<script async src="}
            <span className="text-emerald-300">{'"…/loader.js"'}</span>
            {"></script>"}
          </pre>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700">
              <Check className="h-3 w-3" strokeWidth={3} />
              Saved
            </span>
            <span className="rounded-md bg-brand px-2.5 py-1 text-[10.5px] font-semibold text-white">Save changes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const codeLines = [
  [["import ", "text-sky-300"], ["Script ", "text-slate-100"], ["from ", "text-sky-300"], ['"next/script"', "text-emerald-300"], [";", "text-slate-400"]],
  [],
  [["export default function ", "text-sky-300"], ["RootLayout", "text-amber-200"], ["({ children }) {", "text-slate-300"]],
  [["  return (", "text-slate-300"]],
  [["    <html ", "text-rose-300"], ["lang", "text-amber-200"], ['="en"', "text-emerald-300"], [">", "text-rose-300"]],
  [["      <body>", "text-rose-300"]],
  [["        {children}", "text-slate-300"]],
  [["        {/* OrmiTech installation code */}", "text-slate-500"]],
  [["        <Script ", "text-rose-300"], ["id", "text-amber-200"], ['="ormitech-chat" ', "text-emerald-300"], ["src", "text-amber-200"], ["={loaderUrl} ", "text-slate-300"], ["/>", "text-rose-300"]],
  [["      </body>", "text-rose-300"]],
  [["    </html>", "text-rose-300"]],
  [["  );", "text-slate-300"]],
  [["}", "text-slate-300"]]
];

function CodeMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a] shadow-[0_24px_48px_-28px_rgba(13,27,61,.6)]">
      <div className="flex items-center gap-1 border-b border-white/10 px-2 pt-2 text-[10.5px]">
        <span className="rounded-t-md bg-white/10 px-2.5 py-1 font-medium text-white">app/layout.jsx</span>
        <span className="px-2.5 py-1 text-white/50">index.html</span>
      </div>
      <pre aria-label="Example Next.js root layout with the OrmiTech installation code added through the Script component" className="overflow-x-auto p-3 font-mono text-[10.5px] leading-5">
        {codeLines.map((line, index) => (
          <span key={index} className="block min-h-5 whitespace-pre">
            {line.map(([text, tone], part) => (
              <span key={part} className={tone}>
                {text}
              </span>
            ))}
          </span>
        ))}
      </pre>
    </div>
  );
}

function WebsitePanel() {
  const { website } = connect;
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const baseId = useId();
  const method = website.methods[active];

  function handleKeyDown(event, index) {
    const count = website.methods.length;
    const moves = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: count - 1 - index };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (index + moves[event.key] + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-[#F7F9FC] p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <ChannelLogo name="Website" className="h-10 w-10" />
        <div>
          <h3 className="text-lg font-semibold text-navy">{website.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{website.description}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Widget settings you can customize">
        {website.options.map(option => (
          <li key={option} className="rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-slate-600 ring-1 ring-slate-200">
            {option}
          </li>
        ))}
      </ul>

      <div role="tablist" aria-label="Website type" className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/60 p-1">
        {website.methods.map((item, index) => {
          const Icon = METHOD_ICONS[item.id];
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={element => {
                tabRefs.current[index] = element;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={event => handleKeyDown(event, index)}
              className={`relative flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${selected ? "text-navy" : "text-slate-500 hover:text-navy"}`}
            >
              {selected && <motion.span layoutId={`${baseId}-tab-indicator`} className="absolute inset-0 rounded-lg bg-white shadow-sm" transition={{ duration: 0.3, ease }} />}
              <Icon aria-hidden className={`relative h-4 w-4 ${selected ? "text-brand" : ""}`} />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${method.id}`} className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={method.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="grid gap-5 xl:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] xl:items-start">
            <div>
              <p className="text-[15px] font-semibold text-navy">{method.title}</p>
              <ol className="mt-3 space-y-3">
                {method.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[12.5px] leading-5 text-slate-500">{method.note}</p>
            </div>
            {method.id === "cms" ? <CmsMockup /> : <CodeMockup />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ConnectChannels() {
  return (
    <section id="connect" aria-labelledby="connect-title" className="scroll-mt-36 border-y border-slate-100 bg-white py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="connect-title" eyebrow={connect.eyebrow} title={connect.title} description={connect.description} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-start">
          <Stagger as="ul" stagger={0.1} className="space-y-4" aria-label="Social and messaging channels">
            {connect.social.map(channel => (
              <StaggerItem as="li" key={channel.name}>
                <SocialCard channel={channel} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <WebsitePanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
