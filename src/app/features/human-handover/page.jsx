import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import HumanHandoverContent from "@/components/features/pages/HumanHandoverContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { humanHandoverPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Human Handover",
  description: "Move a conversation from OrmiTech AI to a human agent without losing context — for the moments that need a person.",
  alternates: { canonical: "/features/human-handover" },
  openGraph: {
    title: "OrmiTech Human Handover — AI to human customer support",
    description: "Move a conversation from OrmiTech AI to a human agent without losing context — for the moments that need a person.",
    url: "/features/human-handover",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function HumanHandoverPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <HumanHandoverContent />
          <SimpleCTA
            title="Give your team the context they need."
            text="Set up OrmiTech so the right conversations reach the right person, with nothing lost in the handoff."
            secondaryLabel={humanHandoverPage.teamBridge.linkLabel}
            secondaryHref={humanHandoverPage.teamBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
