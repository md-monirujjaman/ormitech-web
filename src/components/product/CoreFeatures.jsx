"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { coreFeatures } from "@/data/product";

export default function CoreFeatures() {
  return (
    <section id="core-features" aria-labelledby="core-features-title" className="scroll-mt-24 py-16 lg:py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="core-features-title" align="center" eyebrow={coreFeatures.eyebrow} title={coreFeatures.title} description={coreFeatures.description} />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.items.map((feature, index) => (
            <Reveal as="li" key={feature.title} delay={(index % 4) * 0.07}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <Link
            href="/features"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors duration-200 hover:border-brand/30 hover:text-brandInk focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
          >
            Explore every feature
            <ArrowRight className="h-4 w-4 text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
