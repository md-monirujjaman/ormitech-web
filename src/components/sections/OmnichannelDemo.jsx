import ChannelLogo from "@/components/common/ChannelLogo";
import { channels } from "@/data/site";

export default function OmnichannelDemo() {
  return (
    <section className="border-y border-black/5 bg-[#F7F8FA] py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">Omnichannel</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">One inbox. Every channel.</h2>
          <p className="mt-5 max-w-xl text-black/50">Your customer does not care which channel they used. Your team should not have to switch between five tabs to answer them.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {channels.map(c => <div key={c.name} className="glass rounded-xl p-4"><ChannelLogo name={c.name} className="mb-3 h-9 w-9" /><p className="text-sm font-medium">{c.name}</p><p className="mt-1 text-xs text-black/35">Connected</p></div>)}
          </div>
        </div>
        <div className="glass rounded-3xl p-4">
          <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <span className="text-sm font-semibold">Live conversation</span>
              <span className="text-xs text-emerald-600">● Real-time</span>
            </div>
            <div className="space-y-3 py-6">
              <div className="max-w-[70%] rounded-xl bg-black/[.05] p-3 text-xs text-black/55">Is someone available to help with my order?</div>
              <div className="ml-auto max-w-[70%] rounded-xl bg-brand/15 p-3 text-xs text-red-900">Yes — I can help. Let me check your order details.</div>
              <div className="rounded-xl border border-dashed border-brand/25 p-3 text-xs text-black/45">AI → Human handover available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}