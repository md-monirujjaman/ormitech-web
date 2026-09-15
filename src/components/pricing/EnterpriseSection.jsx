import { Check } from "lucide-react";
import ButtonLink from "@/components/common/ButtonLink";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { enterprise, enterprisePlan } from "@/data/pricing";

export default function EnterpriseSection() {
  return (
    <section id="enterprise" aria-labelledby="enterprise-title" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-white shadow-[0_48px_90px_-48px_rgba(13,27,61,.8)] sm:px-10 lg:px-14 lg:py-16">
            <div aria-hidden className="red-glow pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-70 motion-safe:animate-drift" />
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl motion-safe:animate-drift [animation-delay:-6s]" />

            <div className="relative grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-white ring-1 ring-white/15">{enterprise.eyebrow}</span>
                <h2 id="enterprise-title" className="mt-4 text-3xl font-bold leading-[1.12] tracking-[-0.03em] [text-wrap:balance] sm:text-4xl lg:text-[42px]">
                  {enterprise.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">{enterprise.description}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {enterprise.scope.map(item => (
                    <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/[.06] px-3 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10">
                      <Check aria-hidden className="h-3.5 w-3.5 text-brand2" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={enterprisePlan.cta.href} arrow>
                    {enterprisePlan.cta.label}
                  </ButtonLink>
                  <ButtonLink href="#compare" variant="secondary">
                    Compare plans
                  </ButtonLink>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[.04] p-6 transition-colors duration-500 group-hover:bg-white/[.06] sm:p-7">
                <h3 className="text-lg font-semibold">How Enterprise pricing works</h3>
                <Stagger as="ol" stagger={0.12} className="mt-5 space-y-5">
                  {enterprise.steps.map((step, index) => (
                    <StaggerItem as="li" key={step.title} className="flex gap-4">
                      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block font-semibold">{step.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-white/70">{step.text}</span>
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
