"use client";

import AIAssistant from "@/components/product/AIAssistant";
import BridgeCallout from "@/components/features/pages/BridgeCallout";
import FeaturePageHero from "@/components/features/pages/FeaturePageHero";
import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { aiCustomerSupportPage } from "@/data/productPages";

export default function AiCustomerSupportContent() {
  const { hero, handoverBridge, omnichannelBridge, useCases } = aiCustomerSupportPage;

  return (
    <>
      <FeaturePageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        secondaryHref="/features/ai-chatbot"
        secondaryLabel="See the AI Chatbot feature"
      />

      <AIAssistant />

      <BridgeCallout {...handoverBridge} />
      <BridgeCallout {...omnichannelBridge} />

      <UseCaseGrid id={useCases.id} eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={useCases.columns} />
    </>
  );
}
