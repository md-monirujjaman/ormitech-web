import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AiChatbotContent from "@/components/features/pages/AiChatbotContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { aiChatbotPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "AI Chatbot",
  description: "OrmiTech's AI chatbot answers customer questions instantly, detects intent and hands over to your team when it matters.",
  alternates: { canonical: "/features/ai-chatbot" },
  openGraph: {
    title: "OrmiTech AI Chatbot — Automated customer conversations",
    description: "OrmiTech's AI chatbot answers customer questions instantly, detects intent and hands over to your team when it matters.",
    url: "/features/ai-chatbot",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function AiChatbotPage() {
  return (
    <>
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
