import localFont from "next/font/local";

// The fonts are self-hosted rather than loaded through `next/font/google`.
//
// `next/font/google` downloads the font files during `next build`, and in a production build that
// request has no timeout (next/dist/compiled/@next/font/dist/google/fetch-resource.js sets one only
// when `isDev`). If the build machine cannot reach fonts.googleapis.com, or reaches it and gets no
// answer, the build stops at "Creating an optimized production build ..." and waits forever. The
// files below are the exact latin-subset woff2 files Google serves for these families (Inter Tight
// v9, Sora v17, Caveat v23, all SIL Open Font License), so the rendering is unchanged and the build
// no longer depends on the network.
//
// Each file is the variable-weight source, which is what Google itself serves for every weight of
// these families; the ranges below are the weights the site uses.

// Shared UI typeface for the navbar, footer and redesigned pages.
export const interTight = localFont({
  src: "./fonts/inter-tight-latin.woff2",
  weight: "300 800",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "arial"]
});

// Display weight for the animated footer wordmark.
export const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "arial"]
});

// Handwritten accent used for small annotations.
export const caveat = localFont({
  src: "./fonts/caveat-latin.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  fallback: ["cursive"]
});
