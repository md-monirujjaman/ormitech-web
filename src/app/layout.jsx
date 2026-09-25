import "@/styles/globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import SmoothScroll from "@/components/common/SmoothScroll";
import OrganizationJsonLd from "@/components/ui/OrganizationJsonLd";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com"),
  title: {
    default: "OrmiTech — AI-Powered Customer Communication",
    template: "%s | OrmiTech"
  },
  description: "One workspace for customer conversations across Facebook, Instagram, WhatsApp and your website — powered by AI and backed by your team.",
  openGraph: {
    title: "OrmiTech — Every conversation. One powerful workspace.",
    description: "Unify conversations, automate with AI and hand over to humans when it matters.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com",
    siteName: "OrmiTech",
    type: "website",
    images: [{ url: "/images/ormitech-dashboard.webp", width: 1483, height: 1061, alt: "OrmiTech unified inbox showing customer conversations across channels" }]
  },
  twitter: { card: "summary_large_image", title: "OrmiTech: Every conversation. One powerful workspace.", images: ["/images/ormitech-dashboard.webp"] },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icons/icon0.svg", type: "image/svg+xml" },
      { url: "/icons/icon1.png", type: "image/png", sizes: "96x96" }
    ],
    apple: [{ url: "/icons/apple-icon.png" }]
  },
  appleWebApp: {
    title: "OrmiTech"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
        <OrganizationJsonLd />
        <GoogleAnalytics />
      </body>
    </html>
  );
}