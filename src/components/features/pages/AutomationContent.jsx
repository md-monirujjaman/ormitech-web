"use client";

import AutomationShowcase from "@/components/product/AutomationShowcase";
import { automationPage } from "@/data/featurePages";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import BridgeCallout from "./BridgeCallout";
import CheckList from "./CheckList";
import FeaturePageHero from "./FeaturePageHero";
import { crumbsByPath } from "@/data/crumbs";

export default function AutomationContent() {
  const { hero, fitPoints, chatbotBridge, useCases } = automationPage;

  return (
    <>
      <FeaturePageHero breadcrumbs={crumbsByPath["/features/automation"]} eyebrow={hero.eyebrow} title={hero.title} description={hero.description} secondaryHref="/how-it-works" secondaryLabel="See how it works" />

      <AutomationShowcase />

      <section id="workflow-fit" aria-labelledby="workflow-fit-title" className="scroll-mt-24 py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" id="workflow-fit-title" eyebrow="Where it fits" title="Automation that works alongside your team." description="Automation is not a replacement for judgment — it is the layer that removes the repetitive work around it." />
          </Reveal>
          <CheckList items={fitPoints} className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2" />
        </div>
      </section>

      <BridgeCallout {...chatbotBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
