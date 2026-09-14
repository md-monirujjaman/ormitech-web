import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body || {};
    if (!name || !(email || phone) || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Production handoff point:
    // connect this route to your chosen email/CRM provider later.
    // No secret or provider-specific credential is hard-coded here.
    console.log("OrmiTech contact:", {
      name,
      email: email || "",
      phone: phone || "",
      company: body.company || "",
      message
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}