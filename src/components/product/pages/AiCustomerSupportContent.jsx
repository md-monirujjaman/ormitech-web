"use client";

import AIAssistant from "@/components/product/AIAssistant";
import BridgeCallout from "@/components/features/pages/BridgeCallout";
import FeaturePageHero from "@/components/features/pages/FeaturePageHero";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { aiCustomerSupportPage } from "@/data/productPages";
import { crumbsByPath } from "@/data/crumbs";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { answerBlocks } from "@/data/solutions";

export default function AiCustomerSupportContent() {
  const { hero, handoverBridge, omnichannelBridge, useCases } = aiCustomerSupportPage;

  return (
    <>
      <FeaturePageHero breadcrumbs={crumbsByPath["/product/ai-customer-support"]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        secondaryHref="/features/ai-chatbot"
        secondaryLabel="See the AI Chatbot feature"
      />

      <AnswerBlock id="answer" eyebrow="The short answer" heading={answerBlocks["/product/ai-customer-support"].heading} definition={answerBlocks["/product/ai-customer-support"].definition} facts={answerBlocks["/product/ai-customer-support"].facts} />

      <AIAssistant />

      <BridgeCallout {...handoverBridge} />
      <BridgeCallout {...omnichannelBridge} />

      <RelatedLinks paths={["/solutions/whatsapp-ai-chatbot", "/solutions/facebook-messenger-automation", "/solutions/instagram-dm-automation", "/features/ai-chatbot","/blog/ai-with-human-handover"]} eyebrow="Solutions" title="Related solutions" />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
