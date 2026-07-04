import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "omar.chouman0@gmail.com";
const FROM_EMAIL = "no-reply@omarchouman.com";
const MAX_FIELD_LENGTH = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, company } = body ?? {};

    // Honeypot: real users never fill this field in.
    if (typeof company === "string" && company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (name.length > MAX_FIELD_LENGTH || email.length > MAX_FIELD_LENGTH || message.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
