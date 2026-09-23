import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import HumanHandoverContent from "@/components/features/pages/HumanHandoverContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { humanHandoverPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Human Handover: AI to Human Support", description: "Move a conversation from OrmiTech AI to a human agent without losing context, so customers never repeat themselves.", path: "/features/human-handover" });

export default function HumanHandoverPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/features/human-handover", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/features/human-handover"])]} />
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
