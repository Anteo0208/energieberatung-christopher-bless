import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, leistung, nachricht } = await req.json();

  if (!name || !email || !nachricht) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Website Kontaktformular <info@planungsbuero-bless.de>",
      to: "info@planungsbuero-bless.de",
      replyTo: email,
      subject: `Neue Anfrage von ${name}${leistung ? ` – ${leistung}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #FAF7F2; border-radius: 8px;">
          <h2 style="color: #2D5016; font-size: 1.4rem; margin-bottom: 1.5rem;">
            Neue Kontaktanfrage
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.6rem 0; color: #6B6B5A; font-size: 0.85rem; width: 120px;">Name</td>
              <td style="padding: 0.6rem 0; color: #1C1C1C; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #6B6B5A; font-size: 0.85rem;">E-Mail</td>
              <td style="padding: 0.6rem 0; color: #1C1C1C; font-weight: 500;">${email}</td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 0.6rem 0; color: #6B6B5A; font-size: 0.85rem;">Telefon</td>
              <td style="padding: 0.6rem 0; color: #1C1C1C; font-weight: 500;">${phone}</td>
            </tr>` : ""}
            ${leistung ? `<tr>
              <td style="padding: 0.6rem 0; color: #6B6B5A; font-size: 0.85rem;">Leistung</td>
              <td style="padding: 0.6rem 0; color: #1C1C1C; font-weight: 500;">${leistung}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 1.5rem; padding: 1.25rem; background: #F0EBE1; border-radius: 6px; border-left: 3px solid #2D5016;">
            <div style="color: #6B6B5A; font-size: 0.8rem; margin-bottom: 0.5rem;">Nachricht</div>
            <div style="color: #1C1C1C; line-height: 1.6; white-space: pre-wrap;">${nachricht}</div>
          </div>
          <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #D4C9B8; color: #6B6B5A; font-size: 0.75rem;">
            Gesendet über das Kontaktformular auf planungsbuero-bless.de
          </div>
        </div>
      `,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend Fehler:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
