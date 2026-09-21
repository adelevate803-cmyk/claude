import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";

function enquiryToText(data: EnquiryInput) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Event type: ${data.eventType}`,
    `Date: ${data.date || "Not specified"}`,
    `Venue / town: ${data.venue || "Not specified"}`,
    `Guest count: ${data.guestCount || "Not specified"}`,
    `Rolls wanted: ${data.rollsWanted.length ? data.rollsWanted.join(", ") : "Not specified"}`,
    `Budget range: ${data.budgetRange || "Not specified"}`,
    "",
    "Notes:",
    data.notes || "—",
  ].join("\n");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently accept but never send.
  if (data.company) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL ?? "hello@velvetrollco.com";
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL ?? "Velvet Roll Co. <enquiries@velvetrollco.com>";

  if (!apiKey) {
    console.warn(
      "[enquiry] RESEND_API_KEY is not set. Enquiry received but no email was sent:\n" +
        enquiryToText(data),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `New enquiry — ${data.eventType} — ${data.name}`,
      text: enquiryToText(data),
    });

    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: "We've received your enquiry — Velvet Roll Co.",
      text: `Hi ${data.name},\n\nThank you for your enquiry — we'll reply within 24 hours.\n\nIn the meantime, feel free to browse our menu or message us on Instagram @velvet_roll_co.\n\nWarmly,\nVelvet Roll Co.`,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[enquiry] Failed to send email", error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
