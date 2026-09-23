import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import TeamCollaborationContent from "@/components/features/pages/TeamCollaborationContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { teamCollaborationPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Team Collaboration and Shared Inbox", description: "A shared inbox for your whole team: assign conversations, set roles and routing, leave notes and hand off chats with full context.", path: "/features/team-collaboration" });

export default function TeamCollaborationPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/features/team-collaboration", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/features/team-collaboration"])]} />
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
