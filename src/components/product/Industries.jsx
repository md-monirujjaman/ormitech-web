"use client";

import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { industries } from "@/data/product";

// Client wrapper: the items carry icon components, which a server page cannot pass to a client component.
export default function Industries() {
  return <UseCaseGrid eyebrow={industries.eyebrow} title={industries.title} description={industries.description} items={industries.items} columns={5} />;
}
