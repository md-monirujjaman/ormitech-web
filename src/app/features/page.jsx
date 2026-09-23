import { redirect } from "next/navigation";

// The single Features page was split into five dedicated feature pages (see the Features dropdown
// in the navbar). This route stays only so old links and search results land somewhere useful.
export default function FeaturesPage() {
  redirect("/features/ai-chatbot");
}
