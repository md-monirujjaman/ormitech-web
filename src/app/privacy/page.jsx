import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyDocument } from "@/data/legalPolicies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "See what the OrmiTech website does with information and what still needs confirmation for its separate AI-assisted platform.", path: "/privacy" });

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main>
        <LegalDocument document={privacyDocument} />
      </main>
      <Footer />
    </>
  );
}
