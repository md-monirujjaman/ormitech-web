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
import { faq, productMeta } from "@/data/product";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: productMeta.title,
  description: productMeta.description,
  alternates: { canonical: "/product" },
  openGraph: {
    title: "OrmiTech Product — Every conversation. One powerful workspace.",
    description: productMeta.description,
    url: "/product",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <ProductHero />
          <ProductOverview />
          <CoreFeatures />
          <HowItWorks />
          <ProductEcosystem />
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
