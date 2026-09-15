"use client";

import UseCaseGrid from "@/components/ui/UseCaseGrid";
import { useCases } from "@/data/howItWorks";

// Client wrapper: the items carry icon components, which a server page cannot pass to a client component.
export default function UseCases() {
  return <UseCaseGrid eyebrow={useCases.eyebrow} title={useCases.title} description={useCases.description} items={useCases.items} columns={3} />;
}
