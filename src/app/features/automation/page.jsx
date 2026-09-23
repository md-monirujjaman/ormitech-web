import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AutomationContent from "@/components/features/pages/AutomationContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { automationPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Customer Communication Automation", description: "Automate customer conversations with workflows that detect intent, route chats, send replies and schedule follow-ups, using rules your team approves.", path: "/features/automation" });

export default function AutomationPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/features/automation", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/features/automation"])]} />
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
