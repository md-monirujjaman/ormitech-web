import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import PageHero from "@/components/common/PageHero";
import FaqSection from "@/components/ui/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { generalFaq } from "@/data/solutions";
import { breadcrumbSchema, buildMetadata, faqSchema, webPageSchema } from "@/lib/seo";
import { interTight } from "@/styles/fonts";

const description = "Answers about OrmiTech: AI chatbots, omnichannel inbox, WhatsApp, Facebook and Instagram automation, human handover and leads.";

export const metadata = buildMetadata({ title: "FAQ: AI Chatbot, Inbox and Automation Questions", description, path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd nodes={[webPageSchema({ path: "/faq", name: "OrmiTech FAQ", description }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqSchema(generalFaq)]} />
      <Navbar />
      <main className={`${interTight.className} overflow-x-clip bg-white text-navy antialiased`}>
        <PageHero eyebrow="Resources" title="Frequently asked questions" description="Short, direct answers about what OrmiTech does and how it works." />
        <FaqSection eyebrow="FAQ" title="Common questions" items={generalFaq} />
      </main>
      <Footer />
    </>
  );
}
