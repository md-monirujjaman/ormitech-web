import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsDocument } from "@/data/legalPolicies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms & Conditions", description: "Review the terms for using OrmiTech's AI-assisted customer communication, messaging and business automation software.", path: "/terms" });

export default function Terms() {
  return (
    <>
      <Navbar />
      <main>
        <LegalDocument document={termsDocument} />
      </main>
      <Footer />
    </>
  );
}
