import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AnalyticsContent from "@/components/features/pages/AnalyticsContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { analyticsPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Conversation Analytics", description: "Conversation analytics for response time, lead flow, automation results and team performance in one dashboard.", path: "/features/analytics" });

export default function AnalyticsPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/features/analytics", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/features/analytics"])]} />
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <AnalyticsContent />
          <SimpleCTA
            title="Turn conversations into measurable growth."
            text="See response time, automation results and lead flow in one dashboard."
            secondaryLabel={analyticsPage.teamBridge.linkLabel}
            secondaryHref={analyticsPage.teamBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
