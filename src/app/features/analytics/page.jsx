import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AnalyticsContent from "@/components/features/pages/AnalyticsContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { analyticsPage } from "@/data/featurePages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Analytics",
  description: "Conversation analytics for response time, lead flow, automation results and team performance in one dashboard.",
  alternates: { canonical: "/features/analytics" },
  openGraph: {
    title: "OrmiTech Analytics — Conversation & business insights",
    description: "Conversation analytics for response time, lead flow, automation results and team performance in one dashboard.",
    url: "/features/analytics",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function AnalyticsPage() {
  return (
    <>
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
