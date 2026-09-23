import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body || {};
    if (!name || !(email || phone) || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Production handoff point: connect this route to the chosen email/CRM provider.
    // No secret or provider-specific credential is hard-coded here.
    //
    // Nothing about the submitter is logged. Names, email addresses, phone numbers, company names and message
    // bodies are personal data; writing them to the platform's server logs stores them somewhere the privacy
    // policy does not describe, keeps them for the log provider's retention period and exposes them to anyone
    // who can read deployment logs. Only the fact that a submission arrived is recorded.
    console.info("OrmiTech contact: submission received", { topic: body.topic || "none", hasEmail: Boolean(email), hasPhone: Boolean(phone) });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}