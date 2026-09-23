import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AIRecommendation from "@/components/how-it-works/AIRecommendation";
import AIUnderstanding from "@/components/how-it-works/AIUnderstanding";
import AutomationWorkflow from "@/components/how-it-works/AutomationWorkflow";
import BackendArchitecture from "@/components/how-it-works/BackendArchitecture";
import BigPicture from "@/components/how-it-works/BigPicture";
import ChapterNav from "@/components/how-it-works/ChapterNav";
import ConnectChannels from "@/components/how-it-works/ConnectChannels";
import HowHero from "@/components/how-it-works/HowHero";
import HumanHandover from "@/components/how-it-works/HumanHandover";
import LeadConversion from "@/components/how-it-works/LeadConversion";
import MessageInbox from "@/components/how-it-works/MessageInbox";
import OrderFlow from "@/components/how-it-works/OrderFlow";
import Retention from "@/components/how-it-works/Retention";
import SystemOverview from "@/components/how-it-works/SystemOverview";
import UseCases from "@/components/how-it-works/UseCases";
import WorkspaceTour from "@/components/how-it-works/WorkspaceTour";
import { ScrollProgress } from "@/components/ui/effects";
import FaqJsonLd from "@/components/ui/FaqJsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { MotionProvider } from "@/components/ui/Reveal";
import { faq, howMeta } from "@/data/howItWorks";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: howMeta.title, description: howMeta.description, path: "/how-it-works", absoluteTitle: true });

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <HowHero />
          <ChapterNav />
          <BigPicture />
          <ConnectChannels />
          <MessageInbox />
          <AIUnderstanding />
          <AIRecommendation />
          <AutomationWorkflow />
          <BackendArchitecture />
          <HumanHandover />
          <WorkspaceTour />
          <LeadConversion />
          <OrderFlow />
          <Retention />
          <SystemOverview />
          <UseCases />
          <SimpleCTA
            title="Connect your business. Let OrmiTech do the rest."
            text="Connect your channels, configure your AI and start turning customer conversations into business growth."
            primaryLabel="Get started"
            secondaryLabel="Explore features"
            secondaryHref="/features/ai-chatbot"
          />
          <FaqSection eyebrow={faq.eyebrow} title={faq.title} description={faq.description} items={faq.items} contactText="Tell us about your channels and we’ll walk you through setup." />
        </MotionProvider>
      </main>
      <Footer />
      <FaqJsonLd items={faq.items} />
    </>
  );
}
