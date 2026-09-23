import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AnalyticsShowcase from "@/components/product/AnalyticsShowcase";
import CoreFeatures from "@/components/product/CoreFeatures";
import HowItWorks from "@/components/product/HowItWorks";
import Industries from "@/components/product/Industries";
import ProductEcosystem from "@/components/product/ProductEcosystem";
import ProductHero from "@/components/product/ProductHero";
import ProductOverview from "@/components/product/ProductOverview";
import Testimonials from "@/components/product/Testimonials";
import TrustPrinciples from "@/components/product/TrustPrinciples";
import { ScrollProgress } from "@/components/ui/effects";
import FaqJsonLd from "@/components/ui/FaqJsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { MotionProvider } from "@/components/ui/Reveal";
import { faq } from "@/data/product";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { answerBlocks } from "@/data/solutions";

export const metadata = buildMetadata({ title: "Product: AI Customer Communication Platform", description: "OrmiTech is an AI customer communication platform. Manage Facebook, Instagram, WhatsApp and website chat in one inbox and automate routine replies.", path: "/product", ogTitle: "OrmiTech Product: AI customer communication platform" });

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <ProductHero />
          <ProductOverview />
          <AnswerBlock id="platform" eyebrow="The short answer" heading={answerBlocks.product.heading} definition={answerBlocks.product.definition} facts={answerBlocks.product.facts} />
          <CoreFeatures />
          <HowItWorks />
          <ProductEcosystem />
          <RelatedLinks paths={["/solutions/whatsapp-ai-chatbot", "/solutions/facebook-messenger-automation", "/solutions/instagram-dm-automation", "/solutions/ecommerce-chatbot"]} eyebrow="Solutions" title="Solutions by channel and use case" />
          <Industries />
          <AnalyticsShowcase />
          <TrustPrinciples />
          <Testimonials />
          <FaqSection eyebrow={faq.eyebrow} title={faq.title} description={faq.description} items={faq.items} />
          <SimpleCTA
            title="Turn your conversations into real business growth."
            text="Start with the channels you use today and give every customer a faster, more personal experience with OrmiTech."
            primaryLabel="Get started"
            secondaryLabel="See pricing"
            secondaryHref="/pricing"
          />
        </MotionProvider>
      </main>
      <Footer />
      <FaqJsonLd items={faq.items} />
    </>
  );
}
