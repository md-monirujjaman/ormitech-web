import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AutomationContent from "@/components/features/pages/AutomationContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { automationPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Automation",
  description: "Automate customer communication with workflows that detect intent, route conversations, reply instantly and follow up — approved by your team.",
  alternates: { canonical: "/features/automation" },
  openGraph: {
    title: "OrmiTech Automation — Chat & workflow automation",
    description: "Automate customer communication with workflows that detect intent, route conversations, reply instantly and follow up — approved by your team.",
    url: "/features/automation",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function AutomationPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <AutomationContent />
          <SimpleCTA
            title="Put the repetitive work on autopilot."
            text="Build workflows that react to what customers say, while your team stays in control of every rule."
            secondaryLabel={automationPage.chatbotBridge.linkLabel}
            secondaryHref={automationPage.chatbotBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
