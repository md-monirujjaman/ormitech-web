// Renders one JSON-LD @graph. Nodes must describe content that is visible on the page.
export default function JsonLd({ nodes }) {
  const data = { "@context": "https://schema.org", "@graph": nodes };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
