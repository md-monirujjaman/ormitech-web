import SolutionPage from "@/components/solutions/SolutionPage";
import { bangladeshPage } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: bangladeshPage.meta.title, description: bangladeshPage.meta.description, path: bangladeshPage.path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "AI chatbot Bangladesh", path: bangladeshPage.path }
];

export default function AiChatbotBangladeshPage() {
  return <SolutionPage page={bangladeshPage} crumbs={crumbs} />;
}
