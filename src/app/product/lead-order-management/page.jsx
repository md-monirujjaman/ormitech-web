import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import LeadOrderManagementContent from "@/components/product/pages/LeadOrderManagementContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { leadOrderPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { crumbsByPath } from "@/data/crumbs";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Lead and Order Management from Customer Chats", description: "Capture leads and orders from customer conversations. OrmiTech detects intent, tags leads, routes them to your team and keeps orders next to the chat.", path: "/product/lead-order-management" });

export default function LeadOrderManagementPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/product/lead-order-management", name: metadata.title.absolute ?? metadata.title, description: metadata.description }), breadcrumbSchema(crumbsByPath["/product/lead-order-management"])]} />
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <MotionProvider>
          <ScrollProgress />
          <LeadOrderManagementContent />
          <SimpleCTA
            title="Don't let a good lead go cold."
            text="Set up OrmiTech to detect intent, route the conversation and keep every lead and order moving."
            secondaryLabel={leadOrderPage.aiSupportBridge.linkLabel}
            secondaryHref={leadOrderPage.aiSupportBridge.linkHref}
          />
        </MotionProvider>
      </main>
      <Footer />
    </>
  );
}
