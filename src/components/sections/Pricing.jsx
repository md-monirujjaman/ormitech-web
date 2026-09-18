import { Check } from "lucide-react";
import Link from "next/link";
import { getPriceLabel, plans } from "@/data/pricing";

// Homepage pricing summary. Plans, prices and features come from the shared pricing config.
export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-brand">Pricing</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">A plan that grows with your conversations.</h2>
          <p className="mt-5 text-black/50">Start free, upgrade as your conversations grow, or talk to us about a custom Enterprise setup.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <div key={plan.id} className={`glass flex flex-col rounded-3xl p-7 ${plan.popular ? "border-brand/35 shadow-glow" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.popular && <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-semibold text-red-700">POPULAR</span>}
              </div>
              <p className="mt-3 min-h-12 text-sm text-black/55">{plan.tagline}</p>
              <p className="mt-4 text-2xl font-bold">{getPriceLabel(plan)}</p>
              <div className="my-6 border-t border-black/10" />
              <div className="flex-1 space-y-3 text-sm text-black/65">
                {plan.features.slice(0, 4).map(feature => (
                  <div key={feature} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link href={plan.cta.href} className="mt-8 block rounded-full border border-black/10 px-5 py-3 text-center text-sm font-semibold hover:border-brand/40 hover:bg-brand/10">
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-red-700 hover:underline">
            Compare every plan →
          </Link>
        </p>
      </div>
    </section>
  );
}
