import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, company, topic } = body || {};
    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof subject !== "string" || !subject.trim() ||
      typeof message !== "string" || !message.trim()
    ) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 254 || subject.length > 100 || message.length > 3000 || (phone && phone.length > 30)) {
      return NextResponse.json({ ok: false, error: "One or more fields are too long" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address" }, { status: 400 });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone?.trim() || "", subject: subject.trim(), message: message.trim(), company: typeof company === "string" ? company.trim() : "", topic: typeof topic === "string" ? topic : "" }),
        signal: AbortSignal.timeout(10000)
      });
      if (!webhookResponse.ok) {
        return NextResponse.json({ ok: false, error: "Contact service is temporarily unavailable" }, { status: 502 });
      }
    }

    // Do not log names, contact details, company names or message bodies.
    console.info("OrmiTech contact: submission received", { delivered: Boolean(webhookUrl), topic: typeof topic === "string" ? topic : "none" });

    return NextResponse.json({ ok: true, delivered: Boolean(webhookUrl) });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process contact request" }, { status: 400 });
  }
}