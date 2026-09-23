import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import OmnichannelInboxContent from "@/components/product/pages/OmnichannelInboxContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { omnichannelInboxPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Omnichannel Inbox",
  description: "Bring Facebook, Instagram, WhatsApp and website chat into one omnichannel inbox for your team, with full customer context on every conversation.",
  alternates: { canonical: "/product/omnichannel-inbox" },
  openGraph: {
    title: "OrmiTech Omnichannel Inbox",
    description: "Bring Facebook, Instagram, WhatsApp and website chat into one omnichannel inbox for your team, with full customer context on every conversation.",
    url: "/product/omnichannel-inbox",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function OmnichannelInboxPage() {
  return (
    <>
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <OmnichannelInboxContent />
          <SimpleCTA
            title="Bring every channel into one inbox."
            text="Connect Facebook, Instagram, WhatsApp and website chat, and give your team one place to work from."
            secondaryLabel={omnichannelInboxPage.leadOrderBridge.linkLabel}
            secondaryHref={omnichannelInboxPage.leadOrderBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
