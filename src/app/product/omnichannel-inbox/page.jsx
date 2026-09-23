import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import OmnichannelInboxContent from "@/components/product/pages/OmnichannelInboxContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { omnichannelInboxPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Omnichannel Inbox for Social Media and Website Chat", description: "One unified inbox for Facebook, Instagram, WhatsApp and website chat. Share conversations with your team and keep full customer context on every chat.", path: "/product/omnichannel-inbox" });

export default function OmnichannelInboxPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/product/omnichannel-inbox", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/product/omnichannel-inbox"])]} />
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
