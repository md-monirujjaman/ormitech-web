"use client";

import { usePathname } from "next/navigation";

/** Hides OrmiTech's own chat widget and announcement popup on a business's product page (/p/...), which is not OrmiTech's page. */
export default function MarketingOnly({ children }) {
  const pathname = usePathname();
  return pathname?.startsWith("/p/") ? null : children;
}
