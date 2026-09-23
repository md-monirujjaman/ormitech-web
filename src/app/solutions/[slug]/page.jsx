import { notFound } from "next/navigation";
import SolutionPage from "@/components/solutions/SolutionPage";
import { banglaFacebookPage, solutionPages } from "@/data/solutions";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = solutionPages.find(item => item.slug === slug);
  if (!page) return {};
  // The Facebook page has a Bangla counterpart, so the two are linked with hreflang.
  const languages = page.path === banglaFacebookPage.enPath ? { en: page.path, bn: banglaFacebookPage.path, "x-default": page.path } : undefined;
  return buildMetadata({ title: page.meta.title, description: page.meta.description, path: page.path, languages });
}

export default async function Solution({ params }) {
  const { slug } = await params;
  const page = solutionPages.find(item => item.slug === slug);
  if (!page) notFound();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.hero.eyebrow, path: page.path }
  ];
  return <SolutionPage page={page} crumbs={crumbs} />;
}
