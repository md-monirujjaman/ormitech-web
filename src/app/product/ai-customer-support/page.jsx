import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AiCustomerSupportContent from "@/components/product/pages/AiCustomerSupportContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { aiCustomerSupportPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "AI Customer Support Software", description: "AI customer support that answers routine questions instantly, drafts replies for your team and hands over to a person with full context.", path: "/product/ai-customer-support" });

export default function AiCustomerSupportPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/product/ai-customer-support", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/product/ai-customer-support"])]} />
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <AiCustomerSupportContent />
          <SimpleCTA
            title="Give every customer an instant response."
            text="Connect your channels and let OrmiTech AI handle the first reply, with your team always in control."
            secondaryLabel={aiCustomerSupportPage.omnichannelBridge.linkLabel}
            secondaryHref={aiCustomerSupportPage.omnichannelBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
