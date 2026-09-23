import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LegalDocument from "@/components/legal/LegalDocument";
import { dataDeletionDocument } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

// Deletion requests are handled by email today: ormitech-api has no account-deletion endpoint, so this page
// documents the manual process rather than implying an automatic one.
// TODO: when the API exposes a deletion request endpoint, add a form here that posts to it and keep the
// email route as the fallback.

export const metadata = buildMetadata({ title: "Data Deletion Instructions", description: "Learn how to request deletion of your personal information from OrmiTech.", path: "/data-deletion" });

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
