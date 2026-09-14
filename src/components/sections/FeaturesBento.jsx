"use client";

import { useEffect, useRef, useState } from "react";

const channelTone = { web: "#2196F3", whatsapp: "#22A75D", instagram: "#E1306C", facebook: "#1877F2" };

function Avatar({ name, tone = "from-rose-400 to-red-600", size = "h-7 w-7 text-[10px]" }) {
  const initials = name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return <span aria-hidden className={`flex flex-none items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${tone} ${size}`}>{initials}</span>;
}

function PanelHead({ label, meta }) {
  return (
    <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
      <span className="text-brand">{label}</span>
      <span className="text-black/40">{meta}</span>
    </div>
  );
}

function Window({ children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[.08] bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,.28)]">
      <div className="flex items-center gap-1.5 border-b border-black/[.08] bg-black/[.02] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="mx-auto font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">ormitech · workspace</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-[11.5px]">
      <span className="text-black/40">{label}</span>
      <span className="text-right text-black/60">{value}</span>
    </div>
  );
}

function InboxGraphic() {
  const rows = [
    { name: "Nusrat J.", channel: "web", text: "Is this refundable if it doesn't fit?", time: "2m", unread: true, tone: "from-rose-400 to-red-600" },
    { name: "Tanvir H.", channel: "whatsapp", typing: true, time: "5m", tone: "from-emerald-400 to-emerald-700" },
    { name: "Sadia R.", channel: "instagram", text: "Do you have this in blue?", time: "12m", tone: "from-fuchsia-400 to-pink-600" },
    { name: "Rahim U.", channel: "facebook", text: "Can I get a wholesale price?", time: "18m", tone: "from-sky-400 to-blue-600" }
  ];
  return (
    <div>
      <PanelHead label="Unified inbox" meta="4 unread" />
      <div className="divide-y divide-black/[.08]">
        {rows.map(row => (
          <div key={row.name} className="flex items-center gap-2.5 py-2.5">
            <Avatar name={row.name} tone={row.tone} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline">
                <span className="text-[12px] font-medium text-[#0B0D12]">{row.name}</span>
                <span className="ml-2 rounded-full px-1.5 py-px font-mono text-[8.5px] uppercase tracking-[0.1em]" style={{ color: channelTone[row.channel], background: `${channelTone[row.channel]}1f` }}>{row.channel}</span>
              </div>
              {row.typing ? (
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="flex gap-0.5">
                    {[0, 0.2, 0.4].map(delay => <span key={delay} className="h-1 w-1 animate-pulse rounded-full bg-black/40" style={{ animationDelay: `${delay}s` }} />)}
                  </span>
                  <span className="text-[10px] italic text-black/40">typing…</span>
                </div>
              ) : (
                <div className="mt-0.5 truncate text-[11px] text-black/60">{row.text}</div>
              )}
            </div>
            <span className="flex-none font-mono text-[10px] text-black/40">{row.time}</span>
            {row.unread && <span className="h-1.5 w-1.5 flex-none animate-pulse rounded-full bg-brand" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactGraphic() {
  return (
    <div>
      <PanelHead label="Contact record" meta="auto-built" />
      <div className="mb-3 flex items-center gap-2.5">
        <Avatar name="Nusrat J." size="h-9 w-9 text-[11px]" />
        <div>
          <div className="text-[13px] font-semibold text-[#0B0D12]">Nusrat J.</div>
          <div className="text-[11px] text-black/60">nusrat@brightloom.co</div>
        </div>
      </div>
      <div className="divide-y divide-black/[.08]">
        <Row label="First seen" value="Live chat · Mar 2026" />
        <Row label="Conversations" value="7 across 3 channels" />
        <Row label="Last order" value="#4821 · swapped to M" />
        <Row label="Notes" value="Prefers WhatsApp follow-up" />
      </div>
    </div>
  );
}

function AssistantGraphic() {
  return (
    <div>
      <PanelHead label="AI assistant" meta="active" />
      <div className="space-y-2.5">
        <div className="flex items-end gap-2">
          <Avatar name="Sadia R." tone="from-fuchsia-400 to-pink-600" size="h-6 w-6 text-[9px]" />
          <div className="max-w-[75%] rounded-xl rounded-bl-sm border border-black/[.08] bg-black/[.02] px-3 py-2 text-[11.5px] text-black/60">Do you deliver to Khulna?</div>
        </div>
        <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm border border-brand/30 bg-brand/[.06] px-3 py-2 text-[11.5px] text-black/70">
          <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-brand">OrmiTech AI</div>
          Yes — delivery to Khulna takes 2–3 days. Want me to start your order?
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full border border-brand/30 bg-white px-2.5 py-1 text-[10px] font-semibold text-brand">Start order</span>
          <span className="rounded-full border border-black/[.08] bg-white px-2.5 py-1 text-[10px] font-semibold text-black/60">Talk to a human</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg border border-black/[.08] bg-black/[.02] px-3 py-2 text-[11px]">
        <span className="text-black/40">Handled by AI</span>
        <span className="font-mono text-[10px] text-black/60">no agent needed</span>
      </div>
    </div>
  );
}

function HandoverGraphic() {
  return (
    <div>
      <PanelHead label="Handover" meta="context intact" />
      <div className="mb-2.5 text-[13px] font-semibold text-[#0B0D12]">Wholesale pricing request</div>
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[.08] px-2 py-1 text-[10px] font-semibold text-black/60"><span className="h-1.5 w-1.5 rounded-full bg-black/40" />Rahim U.</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[.08] px-2 py-1 text-[10px] font-semibold text-black/60"><span className="h-1.5 w-1.5 rounded-full bg-brand" />Farhan A.</span>
        <span className="rounded-full border border-[#f7caca] bg-[#fde8e8] px-2 py-1 text-[10px] font-semibold text-[#b91c1c]">High intent</span>
      </div>
      <div className="mb-2 rounded-lg border border-black/[.08] bg-black/[.02] px-3 py-2 text-[11.5px] text-black/60">
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-black/40">AI summary · Facebook</div>
        Wants 50 units every month and asked about bulk discounts.
      </div>
      <div className="rounded-lg border border-brand/30 bg-brand/[.06] px-3 py-2 text-[11.5px] text-black/60">
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-brand">Farhan A. · reply</div>
        Hi Rahim — I’ll send you a custom quote within the hour.
      </div>
    </div>
  );
}

function PipelineGraphic() {
  const columns = [
    { title: "New", deals: [["Corner Studio", "৳12,000"], ["The Daily Co", "৳9,000"]] },
    { title: "Qualified", deals: [["Brightloom · Nusrat", "৳24,000", true], ["Bloom & Co", "৳16,000"]] },
    { title: "Won", deals: [["Harbour Studio", "৳25,000"]] }
  ];
  return (
    <div>
      <PanelHead label="Lead pipeline" meta="wholesale" />
      <div className="mb-2.5 flex items-center justify-between text-[11px]">
        <span className="text-black/40">Open value <b className="text-[#0B0D12]">৳86,000</b></span>
        <span className="text-black/40">6 open</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {columns.map(column => (
          <div key={column.title} className="rounded-lg border border-black/[.08] bg-black/[.02] p-2">
            <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-black/40">
              {column.title}
              <span className="rounded-full border border-black/[.08] bg-white px-1.5 text-[8px]">{column.deals.length}</span>
            </div>
            {column.deals.map(([name, value, highlight]) => (
              <div key={name} className={`mb-1.5 rounded-md border bg-white px-2 py-1.5 last:mb-0 ${highlight ? "border-brand/40 shadow-[0_8px_18px_-8px_rgba(242,13,69,.45)]" : "border-black/[.08]"}`}>
                <div className="text-[10px] font-semibold leading-tight text-[#0B0D12]">{name}</div>
                <div className="mt-0.5 text-[10px] font-bold text-brand">{value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsGraphic() {
  const stats = [["Avg first reply", "38s"], ["Handled by AI", "64%"], ["New leads", "142"]];
  const bars = [42, 58, 50, 72, 64, 88, 76];
  return (
    <div>
      <PanelHead label="Analytics" meta="this week" />
      <div className="mb-3 grid grid-cols-3 gap-2">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-black/[.08] bg-black/[.02] px-2.5 py-2">
            <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-black/40">{label}</div>
            <div className="mt-1 text-[15px] font-bold text-[#0B0D12]">{value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-black/[.08] bg-black/[.02] px-3 pb-2 pt-3">
        <div className="flex h-24 items-end justify-between gap-2">
          {bars.map((height, i) => (
            <div key={i} className={`w-full rounded-t-md ${i === 5 ? "bg-brand" : "bg-brand/25"}`} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-black/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => <span key={day} className="w-full text-center">{day}</span>)}
        </div>
      </div>
    </div>
  );
}

const steps = [
  { title: "Every conversation, one inbox", text: "You stop juggling apps just to keep up.", chips: ["Facebook", "Instagram", "WhatsApp", "Website"], caption: "inbox · every channel", Graphic: InboxGraphic },
  { title: "Conversations turn into contacts", text: "Talk to someone once, and their history sits on the contact for next time.", chips: ["Tags", "Notes", "History"], caption: "contact record · auto-built", Graphic: ContactGraphic },
  { title: "AI handles the routine", text: "Common questions get instant, accurate answers — day or night.", chips: ["Auto-reply", "Qualification", "24/7"], caption: "ai assistant · always on", Graphic: AssistantGraphic },
  { title: "Hand over when it matters", text: "Complex or high-value chats move to the right person with the full context.", chips: ["Assign", "Summary", "Takeover"], caption: "handover · context intact", Graphic: HandoverGraphic },
  { title: "Move leads through your stages", text: "Every enquiry becomes a lead you can follow from first message to won.", chips: ["Board view", "Totals", "Filters"], caption: "pipeline · every lead", Graphic: PipelineGraphic },
  { title: "See what’s working", text: "Response times, lead flow and automation results, all in one view.", chips: ["Response time", "Leads", "Automation"], caption: "analytics · what’s working", Graphic: AnalyticsGraphic }
];

export default function FeaturesBento() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features-bento" className="relative mx-auto max-w-6xl px-6 py-10 sm:py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2" style={{ background: "linear-gradient(to right, transparent, rgba(242,13,69,0.25), transparent)" }} />

      <div className="mx-auto hidden max-w-3xl text-center sm:block">
        <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">· 01 / Complete control</div>
        <h2 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#0B0D12] [text-wrap:balance] md:text-[40px]">Finally, everything’s connected</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.6] text-black/60 md:text-[14px]">Every conversation, lead and handover links back to one customer record. One workspace, start to finish.</p>
      </div>

      <div className="sm:mt-6 md:mt-14 md:grid md:grid-cols-[1fr_1.1fr] md:gap-14">
        <div className="relative md:pl-9">
          <div aria-hidden className="absolute bottom-24 left-[9px] top-24 hidden w-px bg-black/[.08] md:block">
            <div className="w-full bg-gradient-to-b from-brand/40 to-brand transition-[height] duration-300" style={{ height: `${((active + 0.5) / steps.length) * 100}%` }} />
          </div>

          {steps.map((step, i) => {
            const isActive = i === active;
            const { Graphic } = step;
            return (
              <div
                key={step.title}
                ref={el => { stepRefs.current[i] = el; }}
                data-index={i}
                className={`relative py-12 transition-opacity duration-300 md:py-24 ${isActive ? "md:opacity-100" : "md:opacity-30"}`}
              >
                <span
                  aria-hidden
                  className={`absolute -left-9 top-[104px] hidden h-5 w-5 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 md:flex ${isActive ? "border-brand shadow-[0_0_14px_rgba(242,13,69,.45)]" : "border-black/[.08]"}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isActive ? "bg-brand" : "bg-transparent"}`} />
                </span>
                <div className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-brand md:text-left">· {String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-2.5 text-center text-xl font-semibold tracking-[-0.015em] text-[#0B0D12] md:text-left md:text-[22px]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-[1.65] text-black/60 md:mx-0 md:text-left">{step.text}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5 md:justify-start">
                  {step.chips.map(chip => (
                    <span key={chip} className="rounded-full border border-black/[.08] bg-black/[.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-black/60">{chip}</span>
                  ))}
                </div>
                <div className="mt-6 hidden sm:block md:hidden">
                  <Window><div className="p-4"><Graphic /></div></Window>
                </div>
              </div>
            );
          })}
          <div className="mt-2 sm:hidden">
            <Window><div className="p-4"><InboxGraphic /></div></Window>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="sticky top-[max(6rem,calc(50vh-200px))]">
            <Window>
              <div className="relative h-[330px]">
                {steps.map((step, i) => {
                  const isActive = i === active;
                  const { Graphic } = step;
                  return (
                    <div
                      key={step.title}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 p-5 transition-all duration-300 ${isActive ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.985] opacity-0"}`}
                    >
                      <Graphic />
                    </div>
                  );
                })}
              </div>
            </Window>
            <div className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-black/40">{steps[active].caption}</div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-4 hidden max-w-xl text-center sm:block text-[15px] font-medium leading-[1.6] text-[#0B0D12] md:mt-8 md:text-[16px]">
        All the tools you need. <span className="text-[#0B0D12]">For every step of the customer journey.</span>
      </p>
    </section>
  );
}
