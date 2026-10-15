import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { dataDeletionDocument } from "@/data/legalPolicies";
import { buildMetadata } from "@/lib/seo";

// Deletion instructions link to the existing contact page; this site has no dedicated deletion endpoint.

export const metadata = buildMetadata({ title: "Data Deletion Instructions", description: "Review OrmiTech's current deletion-request options and the privacy workflows that remain unavailable.", path: "/data-deletion" });

export default function DataDeletion() {
  return (
    <>
      <Navbar />
      <main>
        <LegalDocument document={dataDeletionDocument} />
      </main>
      <Footer />
    </>
  );
}
