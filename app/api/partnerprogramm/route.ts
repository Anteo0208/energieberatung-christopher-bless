import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRIMARY = rgb(0.176, 0.314, 0.086);
const MUTED = rgb(0.42, 0.42, 0.353);
const DARK = rgb(0.11, 0.11, 0.11);
const LIGHT_BG = rgb(0.98, 0.97, 0.949);
const BORDER = rgb(0.91, 0.894, 0.863);

async function generatePDF(data: Record<string, string>): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;

  page.drawRectangle({ x: 0, y: height - 70, width: 595, height: 70, color: PRIMARY });
  page.drawText("Partnerempfehlung", { x: 50, y: height - 35, size: 20, font: fontBold, color: rgb(0.98, 0.97, 0.949) });
  page.drawText("Planungsbüro Bless – Partnerprogramm Heizungsbauer", { x: 50, y: height - 55, size: 9, font: fontRegular, color: rgb(0.98, 0.97, 0.949) });

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

  sectionTitle("Partner (Heizungsbauer)");
  field("Firma", data.partnerFirma);
  field("Ansprechpartner", data.partnerAnsprechpartner);
  field("E-Mail", data.partnerEmail);
  field("Telefon", data.partnerTelefon);

  sectionTitle("Kundendaten");
  field("Vorname", data.kundeVorname);
  field("Nachname", data.kundeNachname);
  field("Straße / Hausnummer", `${data.kundeStrasse} ${data.kundeHausnummer}`);
  field("PLZ / Ort", `${data.kundePlz} ${data.kundeOrt}`);
  field("E-Mail", data.kundeEmail);
  field("Telefon", data.kundeTelefon);

  sectionTitle("Objekt");
  if (data.projektbezeichnung) field("Projektbezeichnung", data.projektbezeichnung);
  field("Straße / Hausnummer", `${data.objektStrasse} ${data.objektHausnummer}`);
  field("PLZ / Ort", `${data.objektPlz} ${data.objektOrt}`);

  sectionTitle("Gebäude");
  field("Gebäudetyp", data.gebaeudetyp);
  field("Baujahr / Datum Bauantrag", data.baujahr);
  field("Anzahl Wohneinheiten", data.anzahlWohneinheiten);
  field("Beheizte Wohnfläche", data.wohnflaeche ? `${data.wohnflaeche} m²` : "");
  if (data.anzahlGewerbeeinheiten) field("Anzahl Gewerbeeinheiten", data.anzahlGewerbeeinheiten);
  if (data.gewerbeflaeche) field("Beheizte Gewerbefläche", `${data.gewerbeflaeche} m²`);
  field("Wohnsitz am Investitionsstandort", data.wohnsitzAmObjekt);
  field("Finanzierung gewünscht", data.finanzierung);

  sectionTitle("Heizungsanlage");
  field("Bisheriges Heizungssystem", data.bisherigHeizung);
  field("Baujahr der Heizung", data.baujahrHeizung);
  field("Geschätzte Heizleistung", data.heizleistung ? `${data.heizleistung} kW` : "");
  field("Jährlicher Wärmebedarf", data.jahresverbrauch ? `${data.jahresverbrauch} kWh` : "");
  field("Abrechnung Fachplanung", data.abrechnungFachplanung);
  field("Gewünschte Wärmequelle", data.waermequellen);

  if (data.anmerkungen) {
    sectionTitle("Weitere Informationen");
    // Wrap long text manually
    const words = data.anmerkungen.split(" ");
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (test.length > 75) {
        page.drawText(line, { x: 50, y, size: 9, font: fontRegular, color: DARK });
        y -= 14;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x: 50, y, size: 9, font: fontRegular, color: DARK });
      y -= 14;
    }
  }

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

  if (!body.partnerFirma || !body.kundeVorname || !body.kundeNachname || !body.kundeEmail) {
    return NextResponse.json({ error: "Pflichtfelder fehlen." }, { status: 400 });
  }

  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await generatePDF(body);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("PDF Generierung fehlgeschlagen:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

  try {
    await resend.emails.send({
      from: "Partnerprogramm <info@planungsbuero-bless.de>",
      to: "info@planungsbuero-bless.de",
      replyTo: body.partnerEmail,
      subject: `Partnerempfehlung – ${body.kundeVorname} ${body.kundeNachname} – ${body.partnerFirma}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 2rem; background: #FAF7F2; border-radius: 8px;">
          <h2 style="color: #2D5016; font-size: 1.3rem; margin-bottom: 0.25rem;">Neue Partnerempfehlung</h2>
          <p style="color: #6B6B5A; font-size: 0.875rem; margin-top: 0; margin-bottom: 1.5rem;">
            Von <strong style="color: #1C1C1C;">${body.partnerFirma}</strong> (${body.partnerAnsprechpartner} · ${body.partnerEmail})
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <tr><td style="padding: 6px 0; color: #6B6B5A; width: 45%;">Kunde</td><td style="color: #1C1C1C; font-weight: 600;">${body.kundeVorname} ${body.kundeNachname}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">E-Mail Kunde</td><td style="color: #1C1C1C;">${body.kundeEmail}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Telefon Kunde</td><td style="color: #1C1C1C;">${body.kundeTelefon}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Objekt</td><td style="color: #1C1C1C;">${body.objektStrasse} ${body.objektHausnummer}, ${body.objektPlz} ${body.objektOrt}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Gebäudetyp</td><td style="color: #1C1C1C;">${body.gebaeudetyp}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Heizungssystem</td><td style="color: #1C1C1C;">${body.bisherigHeizung}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Wärmequelle</td><td style="color: #1C1C1C;">${body.waermequellen}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B6B5A;">Abrechnung</td><td style="color: #1C1C1C;">${body.abrechnungFachplanung}</td></tr>
          </table>
          <p style="color: #6B6B5A; font-size: 0.8rem; margin-top: 1.5rem; line-height: 1.6;">
            Der vollständige Erfassungsbogen ist als PDF-Anhang beigefügt.
          </p>
        </div>
      `,
      attachments: [
        { filename: `Partnerempfehlung_${body.kundeNachname}_${body.kundeVorname}.pdf`, content: pdfBase64 },
      ],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Partnerprogramm Fehler:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // PBHub webhook — fire & forget
  const pbhubUrl = process.env.PBHUB_API_URL;
  const pbhubSecret = process.env.PBHUB_WEBHOOK_SECRET;
  if (pbhubUrl && pbhubSecret) {
    fetch(`${pbhubUrl}/api/submissions/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-webhook-secret": pbhubSecret },
      body: JSON.stringify({ source: "PARTNERPROGRAMM", data: body, pdfBase64 }),
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
