import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRIMARY = rgb(0.176, 0.314, 0.086); // #2D5016
const MUTED = rgb(0.42, 0.42, 0.353);     // #6B6B5A
const DARK = rgb(0.11, 0.11, 0.11);       // #1C1C1C
const LIGHT_BG = rgb(0.98, 0.97, 0.949);  // #FAF7F2
const BORDER = rgb(0.91, 0.894, 0.863);   // #E8E4DC

async function generatePDF(data: Record<string, string>): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;

  // Header bar
  page.drawRectangle({ x: 0, y: height - 70, width: 595, height: 70, color: PRIMARY });
  page.drawText("Erfassungsbogen", { x: 50, y: height - 35, size: 20, font: fontBold, color: rgb(0.98, 0.97, 0.949) });
  page.drawText("Planungsbüro Bless – Energieberatung", { x: 50, y: height - 55, size: 9, font: fontRegular, color: rgb(0.98, 0.97, 0.949) });

  y = height - 100;

  function sectionTitle(title: string) {
    y -= 14;
    page.drawText(title.toUpperCase(), { x: 50, y, size: 9, font: fontBold, color: PRIMARY, opacity: 0.9 });
    y -= 8;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 0.5, color: BORDER });
    y -= 14;
  }

  function field(label: string, value: string) {
    if (!value) return;
    page.drawText(label, { x: 50, y, size: 8.5, font: fontRegular, color: MUTED });
    page.drawText(value, { x: 230, y, size: 9, font: fontRegular, color: DARK });
    y -= 16;
  }

  // Persönliche Daten
  sectionTitle("Persönliche Daten");
  field("Vorname", data.vorname);
  field("Nachname", data.nachname);
  field("Straße / Hausnummer", `${data.strasse} ${data.hausnummer}`);
  field("PLZ / Ort", `${data.plz} ${data.ort}`);
  field("Geburtsdatum", data.geburtsdatum);
  field("Geburtsort", data.geburtsort);

  // Bankdaten
  sectionTitle("Bankdaten & Steuer");
  field("IBAN", data.iban);
  field("BIC", data.bic);
  field("Steueridentifikationsnummer", data.steuerIdNr);

  // Kontakt
  sectionTitle("Kontakt");
  field("Telefon", data.telefon);
  field("E-Mail", data.email);

  // Gebäude
  sectionTitle("Gebäude / Objekt");
  field("Straße / Hausnummer", `${data.gebaeudeStrasse} ${data.gebaeudeHausnummer}`);
  field("PLZ / Ort", `${data.gebaeudePlz} ${data.gebaeudeOrt}`);
  field("Datum Bauantrag / Baujahr", data.baujahr);
  field("Wohn- / Gewerbeeinheiten", data.wohneinheiten);

  // Footer
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 36, color: LIGHT_BG });
  page.drawLine({ start: { x: 50, y: 36 }, end: { x: 545, y: 36 }, thickness: 0.5, color: BORDER });
  page.drawText(
    "Planungsbüro Bless · Mülgaustraße 153a · 41199 Mönchengladbach · info@planungsbuero-bless.de",
    { x: 50, y: 14, size: 7.5, font: fontRegular, color: MUTED }
  );

  return pdfDoc.save();
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.vorname || !body.nachname || !body.email) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  try {
    const pdfBytes = await generatePDF(body);

    await resend.emails.send({
      from: "Erfassungsbogen <info@planungsbuero-bless.de>",
      to: "info@planungsbuero-bless.de",
      replyTo: body.email,
      subject: `Erfassungsbogen – ${body.vorname} ${body.nachname}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 2rem; background: #FAF7F2; border-radius: 8px;">
          <h2 style="color: #2D5016; font-size: 1.3rem; margin-bottom: 0.25rem;">Neuer Erfassungsbogen</h2>
          <p style="color: #6B6B5A; font-size: 0.875rem; margin-top: 0; margin-bottom: 1.5rem;">
            Von <strong style="color: #1C1C1C;">${body.vorname} ${body.nachname}</strong> (${body.email})
          </p>
          <p style="color: #6B6B5A; font-size: 0.875rem; line-height: 1.6;">
            Der vollständige Erfassungsbogen ist als PDF-Anhang beigefügt.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `Erfassungsbogen_${body.nachname}_${body.vorname}.pdf`,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Erfassungsbogen Fehler:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
