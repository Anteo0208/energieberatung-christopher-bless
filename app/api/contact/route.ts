import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function row(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding: 0.6rem 0; color: #6B6B5A; font-size: 0.85rem; width: 160px; vertical-align: top;">${label}</td>
      <td style="padding: 0.6rem 0; color: #1C1C1C; font-weight: 500;">${value}</td>
    </tr>`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, anmerkung, leistung, gebaeudetyp, baujahr, heizung, ziel } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Website Kontaktformular <info@planungsbuero-bless.de>",
      to: "info@planungsbuero-bless.de",
      replyTo: email,
      subject: `Neue Anfrage von ${name}${leistung ? ` – ${leistung}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto; padding: 2rem; background: #FAF7F2; border-radius: 8px;">
          <h2 style="color: #2D5016; font-size: 1.4rem; margin-bottom: 0.25rem;">Neue Kontaktanfrage</h2>
          <p style="color: #6B6B5A; font-size: 0.85rem; margin-top: 0; margin-bottom: 1.75rem;">Eingegangen über das Kontaktformular auf planungsbuero-bless.de</p>

          <h3 style="color: #2D5016; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.5rem;">Kontakt</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            ${row("Name", name)}
            ${row("E-Mail", email)}
            ${row("Telefon", phone)}
          </table>

          <h3 style="color: #2D5016; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.5rem;">Gebäude & Projekt</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            ${row("Gewünschte Leistung", leistung)}
            ${row("Gebäudetyp", gebaeudetyp)}
            ${row("Baujahr", baujahr)}
            ${row("Aktuelle Heizung", heizung)}
            ${row("Hauptziel", ziel)}
          </table>

          ${anmerkung ? `
          <div style="padding: 1.25rem; background: #F0EBE1; border-radius: 6px; border-left: 3px solid #2D5016;">
            <div style="color: #6B6B5A; font-size: 0.8rem; margin-bottom: 0.5rem;">Anmerkungen</div>
            <div style="color: #1C1C1C; line-height: 1.6; white-space: pre-wrap;">${anmerkung}</div>
          </div>` : ""}
        </div>
      `,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend Fehler:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // PBHub webhook — fire & forget
  const pbhubUrl = process.env.PBHUB_API_URL;
  const pbhubSecret = process.env.PBHUB_WEBHOOK_SECRET;
  if (pbhubUrl && pbhubSecret) {
    fetch(`${pbhubUrl}/api/submissions/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-webhook-secret": pbhubSecret },
      body: JSON.stringify({ source: "KONTAKTFORMULAR", data: body }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
