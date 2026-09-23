import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AiChatbotContent from "@/components/features/pages/AiChatbotContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { aiChatbotPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "AI Chatbot for Business", description: "OrmiTech's AI chatbot for business answers customer questions instantly, detects intent and hands over to your team when it matters.", path: "/features/ai-chatbot" });

export default function AiChatbotPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/features/ai-chatbot", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/features/ai-chatbot"])]} />
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <AiChatbotContent />
          <SimpleCTA
            title="Let AI answer the first message."
            text="Connect your channels and let OrmiTech AI handle the questions that come up every day."
            secondaryLabel={aiChatbotPage.handoverBridge.linkLabel}
            secondaryHref={aiChatbotPage.handoverBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
