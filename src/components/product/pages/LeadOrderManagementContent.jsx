"use client";

import AutomationShowcase from "@/components/product/AutomationShowcase";
import BridgeCallout from "@/components/features/pages/BridgeCallout";
import CheckList from "@/components/features/pages/CheckList";
import FeaturePageHero from "@/components/features/pages/FeaturePageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { leadOrderPage } from "@/data/productPages";
import { crumbsByPath } from "@/data/crumbs";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { answerBlocks } from "@/data/solutions";

export default function LeadOrderManagementContent() {
  const { hero, workflowPoints, aiSupportBridge, omnichannelBridge, useCases } = leadOrderPage;

  return (
    <>
      <FeaturePageHero breadcrumbs={crumbsByPath["/product/lead-order-management"]} eyebrow={hero.eyebrow} title={hero.title} description={hero.description} secondaryHref="/pricing" secondaryLabel="See pricing" />

      <AnswerBlock id="answer" eyebrow="The short answer" heading={answerBlocks["/product/lead-order-management"].heading} definition={answerBlocks["/product/lead-order-management"].definition} facts={answerBlocks["/product/lead-order-management"].facts} />

      <AutomationShowcase />

      <section id="conversation-to-outcome" aria-labelledby="conversation-to-outcome-title" className="scroll-mt-24 py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" id="conversation-to-outcome-title" eyebrow="From chat to outcome" title="Every message is a possible lead or order." description="OrmiTech reads intent, routes the conversation and keeps the record moving — without extra data entry." />
          </Reveal>
          <CheckList items={workflowPoints} className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2" />
        </div>
      </section>

      <BridgeCallout {...aiSupportBridge} />
      <BridgeCallout {...omnichannelBridge} />

      <RelatedLinks paths={["/solutions/ecommerce-chatbot", "/solutions/facebook-messenger-automation", "/features/automation", "/pricing","/blog/omnichannel-customer-support"]} eyebrow="Solutions" title="Related solutions" />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
