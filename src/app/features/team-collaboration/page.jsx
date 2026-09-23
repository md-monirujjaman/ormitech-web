import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import TeamCollaborationContent from "@/components/features/pages/TeamCollaborationContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { teamCollaborationPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Team Collaboration",
  description: "A shared inbox for your whole team — assign conversations, set roles and routing, and hand off with full context.",
  alternates: { canonical: "/features/team-collaboration" },
  openGraph: {
    title: "OrmiTech Team Collaboration — Shared inbox for support teams",
    description: "A shared inbox for your whole team — assign conversations, set roles and routing, and hand off with full context.",
    url: "/features/team-collaboration",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function TeamCollaborationPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <TeamCollaborationContent />
          <SimpleCTA
            title="Bring your team into one workspace."
            text="Set roles, routing and tags so every conversation reaches the right teammate."
            secondaryLabel={teamCollaborationPage.handoverBridge.linkLabel}
            secondaryHref={teamCollaborationPage.handoverBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
