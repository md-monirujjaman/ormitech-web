import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AIShowcase from "@/components/features/AIShowcase";
import { ScrollProgress } from "@/components/ui/effects";
import FeatureGrid from "@/components/features/FeatureGrid";
import FeaturesHero from "@/components/features/FeaturesHero";
import InboxHighlight from "@/components/features/InboxHighlight";
import { MotionProvider } from "@/components/ui/Reveal";
import SolutionsGrid from "@/components/features/SolutionsGrid";
import WorkflowSteps from "@/components/features/WorkflowSteps";
import { featuresHero } from "@/data/features";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Features",
  description: featuresHero.description
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <FeaturesHero />
          <FeatureGrid />
          <InboxHighlight />
          <WorkflowSteps />
          <AIShowcase />
          <SolutionsGrid />
          <SimpleCTA secondaryLabel="See pricing" secondaryHref="/pricing" />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
