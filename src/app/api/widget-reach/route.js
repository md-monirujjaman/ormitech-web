import { NextResponse } from "next/server";
import { getWidgetReach, REACH_REVALIDATE_SECONDS } from "@/lib/widgetReach";

// The counter on the home page asks this (same origin, no CORS) every little while. It is cached for a few seconds on the server, so any
// number of visitors is one request to the API per cache lifetime, and it answers 503 with nothing in it when there is no honest number.
// Next reads this value as written, so it cannot be the shared constant: keep the two the same.
export const revalidate = 30;

export async function GET() {
  const reach = await getWidgetReach();
  if (!reach) return NextResponse.json({}, { status: 503, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(reach, { headers: { "Cache-Control": `public, s-maxage=${REACH_REVALIDATE_SECONDS}, stale-while-revalidate=60` } });
}
