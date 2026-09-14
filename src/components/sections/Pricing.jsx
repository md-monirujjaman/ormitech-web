const plans = [
  ["Starter", "For small teams getting organized", ["Unified inbox", "Core channel connections", "Basic automation", "Team workspace"]],
  ["Growth", "For teams scaling customer conversations", ["Everything in Starter", "Advanced AI workflows", "Lead management", "Analytics"]],
  ["Enterprise", "For larger or custom deployments", ["Custom architecture", "Advanced controls", "Dedicated support", "Custom integrations"]]
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">Pricing</p><h2 className="mt-4 text-4xl font-bold sm:text-5xl">A plan that grows with your conversations.</h2><p className="mt-5 text-black/50">Plans can be configured around channels, usage, team size and automation requirements.</p></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map(([name,desc,items], i) => <div key={name} className={`glass rounded-3xl p-7 ${i===1 ? "border-brand/35 shadow-glow" : ""}`}><div className="flex items-center justify-between"><h3 className="text-xl font-semibold">{name}</h3>{i===1 && <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-semibold text-red-700">POPULAR</span>}</div><p className="mt-3 min-h-12 text-sm text-black/45">{desc}</p><div className="my-7 border-t border-black/10"/><div className="space-y-3 text-sm text-black/65">{items.map(x => <div key={x} className="flex gap-2"><span className="text-brand">✓</span>{x}</div>)}</div><a href="#contact" className="mt-8 block rounded-full border border-black/10 px-5 py-3 text-center text-sm font-semibold hover:border-brand/40 hover:bg-brand/10">Talk to sales</a></div>)}
        </div>
      </div>
    </section>
  );
}