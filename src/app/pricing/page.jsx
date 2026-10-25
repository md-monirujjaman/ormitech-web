import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import BusinessImpact from "@/components/pricing/BusinessImpact";
import EnterpriseSection from "@/components/pricing/EnterpriseSection";
import PlanComparison from "@/components/pricing/PlanComparison";
import PlanFinder from "@/components/pricing/PlanFinder";
import PricingPlans from "@/components/pricing/PricingPlans";
import { PricingProvider } from "@/components/pricing/PricingProvider";
import PricingValue from "@/components/pricing/PricingValue";
import { ScrollProgress } from "@/components/ui/effects";
import FaqJsonLd from "@/components/ui/FaqJsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { MotionProvider } from "@/components/ui/Reveal";
import { buildFaq } from "@/data/pricing";
import { getLivePricing } from "@/lib/livePricing";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";

const title = "OrmiTech Pricing | Plans for Growing Businesses";
const description =
  "Explore OrmiTech pricing plans for customer conversations, AI assistance, automation and team collaboration. Start free and scale with your business.";

export const metadata = buildMetadata({ title, description, path: "/pricing", absoluteTitle: true });

// The plans and prices are managed in the admin panel and read from the API. The page is refreshed from it at most
// once a minute (see `lib/livePricing.js`).
export const revalidate = 60;

export default async function PricingPage() {
  const pricing = await getLivePricing();
  const { plans, enterprisePlan } = pricing;
  const freePlan = plans.find(plan => plan.id === "free") ?? plans[0];
  const faq = buildFaq(freePlan);

  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <PricingProvider value={pricing}>
          <ScrollProgress />
          <PricingPlans />
          <PlanComparison />
          <PricingValue />
          <BusinessImpact />
          <PlanFinder />
          <EnterpriseSection />
          <FaqSection eyebrow={faq.eyebrow} title={faq.title} description={faq.description} items={faq.items} contactText="Tell us about your business and we’ll help you choose." />
          <SimpleCTA
            title="Start with what you need. Scale when you’re ready."
            text="Explore OrmiTech for free and upgrade when your business is ready for more."
            primaryLabel={freePlan.cta.label}
            primaryHref={freePlan.cta.href}
            secondaryLabel={enterprisePlan.cta.label}
            secondaryHref={enterprisePlan.cta.href}
          />
          </PricingProvider>
        </MotionProvider>
      </main>
      <Footer />
      <FaqJsonLd items={faq.items} />
    </>
  );
}
