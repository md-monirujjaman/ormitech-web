import { ImageResponse } from "next/og";

export const alt = "OrmiTech: AI customer communication platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded 1200x630 social card using the site's brand red and navy.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: "72px 80px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: "100%", background: "#F20D45", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800, color: "#0D1B3D", letterSpacing: "-0.03em" }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: "#F20D45", marginRight: 16, display: "flex" }} />
          OrmiTech
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#0D1B3D", lineHeight: 1.05, letterSpacing: "-0.04em", display: "flex" }}>Every conversation.</div>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#F20D45", lineHeight: 1.05, letterSpacing: "-0.04em", display: "flex" }}>One powerful workspace.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#475569", display: "flex" }}>AI customer communication for Facebook, Instagram, WhatsApp and website chat</div>
        </div>
        <div style={{ fontSize: 26, color: "#64748b", display: "flex" }}>www.ormitechit.com</div>
      </div>
    ),
    size
  );
}
