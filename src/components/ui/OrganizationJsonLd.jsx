import { siteUrl, socialProfiles } from "@/data/site";

// Site-wide Organization + WebSite structured data, rendered once in the root layout.
export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "OrmiTech",
        alternateName: "OrmiTech IT",
        url: `${siteUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/ormitech-logo.webp`
        },
        sameAs: socialProfiles
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "OrmiTech",
        alternateName: "OrmiTech IT",
        publisher: { "@id": `${siteUrl}/#organization` }
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "OrmiTech",
        url: `${siteUrl}/`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "AI-powered customer communication platform that brings Facebook, Instagram, WhatsApp and website chat into one shared inbox, answers routine questions with AI and hands conversations to a team.",
        publisher: { "@id": `${siteUrl}/#organization` }
      }
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
