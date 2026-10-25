"use client";

import { createContext, useContext } from "react";
import { billing, enterprisePlan, plans } from "@/data/pricing";

// The plans and billing settings the pricing components draw from. The page puts the live ones (from the admin
// panel, via the API) here; without a provider the built-in config is used.
const PricingContext = createContext({ billing, plans, enterprisePlan });

export function PricingProvider({ value, children }) {
  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  return useContext(PricingContext);
}
