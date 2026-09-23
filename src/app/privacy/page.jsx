import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyDocument } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "Learn how OrmiTech collects, uses and protects personal information when you use our website and services.", path: "/privacy" });

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
