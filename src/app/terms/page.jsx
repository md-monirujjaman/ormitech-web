import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsDocument } from "@/data/legal";

export const metadata = {
  title: "Terms of Service",
  description: "Review the terms governing the use of OrmiTech services.",
  alternates: { canonical: "/terms" }
};

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
