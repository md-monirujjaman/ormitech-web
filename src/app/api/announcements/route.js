import { NextResponse } from "next/server";
import { apiUrl } from "@/data/site";

// The pop-ups the OrmiTech team set for the website in the admin panel, passed on from the API.
//
// The browser asks this route rather than the API directly, so it never depends on the API's CORS list, and so
// the API is asked at most a few times a minute however many people are on the site. A failure answers "no
// pop-ups": an announcement is a bonus, and the site must read the same without it.
const NONE = { popups: [] };

export async function GET() {
  try {
    const response = await fetch(`${apiUrl}/api/v1/announcements/active?surface=website`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 20 },
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return NextResponse.json(NONE);
    const body = await response.json();
    const popups = Array.isArray(body?.data?.popups) ? body.data.popups : [];
    return NextResponse.json({ popups }, { headers: { "Cache-Control": "public, max-age=20, s-maxage=20" } });
  } catch {
    return NextResponse.json(NONE);
  }
}
