"use client";

import UnifiedWorkspace from "@/components/product/UnifiedWorkspace";
import BridgeCallout from "@/components/features/pages/BridgeCallout";
import CheckList from "@/components/features/pages/CheckList";
import FeaturePageHero from "@/components/features/pages/FeaturePageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { omnichannelInboxPage } from "@/data/productPages";
import { crumbsByPath } from "@/data/crumbs";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { answerBlocks } from "@/data/solutions";

export default function OmnichannelInboxContent() {
  const { hero, channelPoints, aiSupportBridge, leadOrderBridge, useCases } = omnichannelInboxPage;

  return (
    <>
      <FeaturePageHero breadcrumbs={crumbsByPath["/product/omnichannel-inbox"]} eyebrow={hero.eyebrow} title={hero.title} description={hero.description} secondaryHref="/how-it-works" secondaryLabel="See how it works" />

      <AnswerBlock id="answer" eyebrow="The short answer" heading={answerBlocks["/product/omnichannel-inbox"].heading} definition={answerBlocks["/product/omnichannel-inbox"].definition} facts={answerBlocks["/product/omnichannel-inbox"].facts} />

      <UnifiedWorkspace />

      <section id="every-channel" aria-labelledby="every-channel-title" className="scroll-mt-24 py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" id="every-channel-title" eyebrow="One inbox" title="Your customer doesn't think in channels. Neither should your team." description="Whichever channel a customer writes from, the conversation lands in the same workspace." />
          </Reveal>
          <CheckList items={channelPoints} className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-1" />
        </div>
      </section>

      <BridgeCallout {...aiSupportBridge} />
      <BridgeCallout {...leadOrderBridge} />

      <RelatedLinks paths={["/solutions/whatsapp-ai-chatbot", "/solutions/facebook-messenger-automation", "/solutions/instagram-dm-automation", "/ai-chatbot-bangladesh","/blog/omnichannel-vs-multichannel","/blog/why-unified-inbox-matters"]} eyebrow="Solutions" title="Related solutions" />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
