import "@/styles/globals.css";
import ChatWidget from "@/components/common/ChatWidget";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com"),
  title: {
    default: "OrmiTech — AI-Powered Customer Communication",
    template: "%s | OrmiTech"
  },
  description: "One workspace for customer conversations across Facebook, Instagram, WhatsApp and your website — powered by AI and backed by your team.",
  keywords: ["OrmiTech", "omnichannel inbox", "AI customer communication", "customer support", "lead management"],
  openGraph: {
    title: "OrmiTech — Every conversation. One powerful workspace.",
    description: "Unify conversations, automate with AI and hand over to humans when it matters.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com",
    siteName: "OrmiTech",
    type: "website"
  },
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
      <body>{children}<ChatWidget /></body>
    </html>
  );
}