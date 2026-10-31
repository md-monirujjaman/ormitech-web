import Link from "next/link";

// The article body, drawn from the editor document the API stores. Only the node types the API accepts are drawn,
// and everything is built as React elements, so nothing in an article can add markup or script to the page.
const linkClass = "font-medium text-brandInk underline decoration-brand/30 underline-offset-4 transition-colors hover:text-navy";

function Inline({ node }) {
  let content = node.text;
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") content = <strong className="font-semibold text-navy">{content}</strong>;
    else if (mark.type === "italic") content = <em>{content}</em>;
    else if (mark.type === "underline") content = <u>{content}</u>;
    else if (mark.type === "strike") content = <s>{content}</s>;
    else if (mark.type === "code") content = <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-navy">{content}</code>;
    else if (mark.type === "link") {
      const href = String(mark.attrs?.href ?? "");
      if (href.startsWith("/")) content = <Link href={href} className={linkClass}>{content}</Link>;
      else if (href.startsWith("#") || href.startsWith("mailto:")) content = <a href={href} className={linkClass}>{content}</a>;
      else if (/^https?:\/\//i.test(href)) content = <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{content}</a>;
    }
  }
  return content;
}

function Children({ node }) {
  return (node.content ?? []).map((child, index) => <Node key={index} node={child} />);
}

function Table({ node }) {
  const rows = node.content ?? [];
  const headerRow = rows[0]?.content?.length > 0 && rows[0].content.every(cell => cell.type === "tableHeader");
  const bodyRows = headerRow ? rows.slice(1) : rows;
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200/80">
      <table className="w-full min-w-[340px] border-collapse text-left text-[14px] sm:text-[15px]">
        {headerRow && (
          <thead className="bg-slate-50">
            <tr>{rows[0].content.map((cell, index) => <th key={index} scope="col" className="px-3 py-3 font-semibold text-navy sm:px-4 [&>p]:mt-0"><Children node={cell} /></th>)}</tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-100">
          {bodyRows.map((row, index) => (
            <tr key={index}>
              {(row.content ?? []).map((cell, at) =>
                cell.type === "tableHeader" ? (
                  <th key={at} scope="row" className="px-3 py-3 font-semibold text-navy sm:px-4 [&>p]:mt-0"><Children node={cell} /></th>
                ) : (
                  <td key={at} className="px-3 py-3 sm:px-4 [&>p]:mt-0"><Children node={cell} /></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Node({ node, headingIds }) {
  switch (node.type) {
    case "text":
      return <Inline node={node} />;
    case "hardBreak":
      return <br />;
    case "paragraph":
      return (node.content?.length ?? 0) === 0 ? null : <p className="mt-4"><Children node={node} /></p>;
    case "bulletList":
      return <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-brand"><Children node={node} /></ul>;
    case "orderedList":
      return <ol start={node.attrs?.start ?? 1} className="mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand"><Children node={node} /></ol>;
    case "listItem":
      return <li className="[&>p]:mt-0"><Children node={node} /></li>;
    case "blockquote":
      return <blockquote className="mt-6 border-l-4 border-brand/40 pl-5 italic text-black/60"><Children node={node} /></blockquote>;
    case "codeBlock":
      return <pre className="mt-4 overflow-x-auto rounded-2xl bg-navy p-5 font-mono text-sm leading-6 text-white/90"><code>{(node.content ?? []).map(child => child.text).join("")}</code></pre>;
    case "horizontalRule":
      return <hr className="my-10 border-slate-200" />;
    case "image":
      return (
        <figure className="my-8">
          {/* Pictures come from the blog's own storage (or an address the writer pasted); lazy-loaded, full width. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.attrs.src} alt={node.attrs.alt ?? ""} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border border-slate-200/70" />
          {node.attrs.title && <figcaption className="mt-3 text-center text-sm text-black/45">{node.attrs.title}</figcaption>}
        </figure>
      );
    case "table":
      return <Table node={node} />;
    default:
      return null;
  }
}

/** `headings` is the list the API sends (level 2 and 3 with ids), so the ids match the table of contents. */
export default function PostBody({ doc, headings = [] }) {
  let next = 0;
  return (doc.content ?? []).map((node, index) => {
    if (node.type === "heading") {
      const level = node.attrs?.level ?? 2;
      // The API leaves empty headings out of its list, so they take no id here either.
      const hasText = (node.content ?? []).some(child => child.text?.trim());
      const id = level <= 3 && hasText ? headings[next++]?.id : undefined;
      const children = <Children node={node} />;
      if (level === 2) return <h2 key={index} id={id} className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight text-navy">{children}</h2>;
      if (level === 3) return <h3 key={index} id={id} className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-navy">{children}</h3>;
      return <h4 key={index} className="mt-6 text-lg font-semibold text-navy">{children}</h4>;
    }
    return <Node key={index} node={node} />;
  });
}
