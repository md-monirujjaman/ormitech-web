import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SimpleCTA from "@/components/common/SimpleCTA";
import LeadOrderManagementContent from "@/components/product/pages/LeadOrderManagementContent";
import { ScrollProgress } from "@/components/ui/effects";
import { MotionProvider } from "@/components/ui/Reveal";
import { leadOrderPage } from "@/data/productPages";
import { interTight } from "@/styles/fonts";

export const metadata = {
  title: "Lead & Order Management",
  description: "Turn customer conversations into tagged leads and tracked orders with OrmiTech's lead and order management workflow.",
  alternates: { canonical: "/product/lead-order-management" },
  openGraph: {
    title: "OrmiTech Lead & Order Management",
    description: "Turn customer conversations into tagged leads and tracked orders with OrmiTech's lead and order management workflow.",
    url: "/product/lead-order-management",
    siteName: "OrmiTech",
    type: "website"
  }
};

export default function LeadOrderManagementPage() {
  return (
    <>
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
