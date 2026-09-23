import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import AiCustomerSupportContent from "@/components/product/pages/AiCustomerSupportContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { aiCustomerSupportPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "AI Customer Support",
  description: "See how OrmiTech's AI customer support works inside every conversation — instant replies, drafted responses and a smooth handover to your team.",
  alternates: { canonical: "/product/ai-customer-support" },
  openGraph: {
    title: "OrmiTech AI Customer Support",
    description: "See how OrmiTech's AI customer support works inside every conversation — instant replies, drafted responses and a smooth handover to your team.",
    url: "/product/ai-customer-support",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function AiCustomerSupportPage() {
  return (
    <>
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
