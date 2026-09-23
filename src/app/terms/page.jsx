import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { termsDocument } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms of Service", description: "Review the terms that govern your use of the OrmiTech website, platform and related services.", path: "/terms" });

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
