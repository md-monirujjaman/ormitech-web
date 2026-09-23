import SolutionPage from "@/components/solutions/SolutionPage";
import { banglaFacebookPage } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: banglaFacebookPage.meta.title,
  description: banglaFacebookPage.meta.description,
  path: banglaFacebookPage.path,
  languages: { en: banglaFacebookPage.enPath, bn: banglaFacebookPage.path, "x-default": banglaFacebookPage.enPath }
});

const crumbs = [
  { name: "হোম", path: "/" },
  { name: "ফেসবুক পেজ অটো রিপ্লাই", path: banglaFacebookPage.path }
];

export default function BanglaFacebookPageAutoReply() {
  return <SolutionPage page={banglaFacebookPage} crumbs={crumbs} language="bn" />;
}
