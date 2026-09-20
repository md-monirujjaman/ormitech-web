import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyDocument } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description: "Learn how OrmiTech collects, uses, and protects information.",
  alternates: { canonical: "/privacy" }
};

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
