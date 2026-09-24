import { Caveat, Inter_Tight } from "next/font/google";

// Shared UI typeface for the navbar, footer and redesigned pages.
export const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], display: "swap" });

// Handwritten accent used for small annotations.
export const caveat = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" });
