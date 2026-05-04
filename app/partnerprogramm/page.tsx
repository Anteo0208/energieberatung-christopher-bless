"use client";

import { useState } from "react";

export default function PartnerprogrammPage() {
  const [form, setForm] = useState({
    // Partner (Heizungsbauer)
    partnerFirma: "",
    partnerAnsprechpartner: "",
    partnerEmail: "",
    partnerTelefon: "",
    // Kundendaten
    kundeVorname: "",
    kundeNachname: "",
    kundeStrasse: "",
    kundeHausnummer: "",
    kundePlz: "",
    kundeOrt: "",
    kundeEmail: "",
    kundeTelefon: "",
    // Objekt
    projektbezeichnung: "",
    objektStrasse: "",
    objektHausnummer: "",
    objektPlz: "",
    objektOrt: "",
    // Gebäude
    gebaeudetyp: "",
    baujahr: "",
    anzahlWohneinheiten: "",
    wohnflaeche: "",
    gewerbeflaeche: "",
    anzahlGewerbeeinheiten: "",
    wohnsitzAmObjekt: "",
    finanzierung: "",
    // Heizung
    bisherigHeizung: "",
    heizleistung: "",
    jahresverbrauch: "",
    abrechnungFachplanung: "",
    waermequellen: "",
    // Sonstiges
    anmerkungen: "",
  });

  const [dsgvo, setDsgvo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/partnerprogramm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@planungsbuero-bless.de");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background)", padding: "2rem" }}>
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", padding: "4rem 2.5rem", textAlign: "center", maxWidth: "480px", width: "100%" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FAF7F2" strokeWidth="2.5">
              <path d="M5 14l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
            Vielen Dank!
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            Die Kundenempfehlung wurde erfolgreich übermittelt. Wir melden uns zeitnah beim Kunden und bei Ihnen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section style={{ paddingTop: "140px", paddingBottom: "3rem", paddingLeft: "2rem", paddingRight: "2rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
            Partnerprogramm
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.15, marginBottom: "1rem" }}>
            Kundenempfehlung übermitteln
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "520px" }}>
            Bitte füllen Sie alle Pflichtfelder vollständig aus. Wir kontaktieren Ihren Kunden direkt und halten Sie über den Fortschritt auf dem Laufenden.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 2rem 7rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <form onSubmit={handleSubmit}>

            {/* Ihre Daten */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Ihre Daten (Heizungsbauer)</h2>

              <div style={gridTwo}>
                <Field label="Firmenname" required>
                  <input type="text" required placeholder="Mustermann Heizungsbau GmbH" value={form.partnerFirma} onChange={(e) => update("partnerFirma", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ansprechpartner" required>
                  <input type="text" required placeholder="Max Mustermann" value={form.partnerAnsprechpartner} onChange={(e) => update("partnerAnsprechpartner", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Ihre E-Mail" required>
                  <input type="email" required placeholder="ihre@firma.de" value={form.partnerEmail} onChange={(e) => update("partnerEmail", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ihr Telefon" required>
                  <input type="tel" required placeholder="+49 160 000 0000" value={form.partnerTelefon} onChange={(e) => update("partnerTelefon", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Kundendaten */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Kundendaten</h2>

              <div style={gridTwo}>
                <Field label="Vorname" required>
                  <input type="text" required placeholder="Christine" value={form.kundeVorname} onChange={(e) => update("kundeVorname", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Nachname" required>
                  <input type="text" required placeholder="Kellermann" value={form.kundeNachname} onChange={(e) => update("kundeNachname", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridThree}>
                <div style={{ gridColumn: "span 2" }}>
                  <Field label="Straße" required>
                    <input type="text" required placeholder="Musterstraße" value={form.kundeStrasse} onChange={(e) => update("kundeStrasse", e.target.value)} style={inputStyle} />
                  </Field>
                </div>
                <Field label="Hausnummer" required>
                  <input type="text" required placeholder="18" value={form.kundeHausnummer} onChange={(e) => update("kundeHausnummer", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Postleitzahl" required>
                  <input type="text" required placeholder="41844" value={form.kundePlz} onChange={(e) => update("kundePlz", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ort" required>
                  <input type="text" required placeholder="Wegberg" value={form.kundeOrt} onChange={(e) => update("kundeOrt", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="E-Mail des Kunden" required>
                  <input type="email" required placeholder="kunde@email.de" value={form.kundeEmail} onChange={(e) => update("kundeEmail", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Telefon des Kunden" required>
                  <input type="tel" required placeholder="+49 170 0000000" value={form.kundeTelefon} onChange={(e) => update("kundeTelefon", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Objekt */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Objekt</h2>

              <Field label="Projektbezeichnung">
                <input type="text" placeholder='z. B. „Kellermann, Wegberg"' value={form.projektbezeichnung} onChange={(e) => update("projektbezeichnung", e.target.value)} style={inputStyle} />
              </Field>

              <div style={gridThree}>
                <div style={{ gridColumn: "span 2" }}>
                  <Field label="Straße" required>
                    <input type="text" required placeholder="Objektstraße" value={form.objektStrasse} onChange={(e) => update("objektStrasse", e.target.value)} style={inputStyle} />
                  </Field>
                </div>
                <Field label="Hausnummer" required>
                  <input type="text" required placeholder="18" value={form.objektHausnummer} onChange={(e) => update("objektHausnummer", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Postleitzahl" required>
                  <input type="text" required placeholder="41844" value={form.objektPlz} onChange={(e) => update("objektPlz", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ort" required>
                  <input type="text" required placeholder="Wegberg" value={form.objektOrt} onChange={(e) => update("objektOrt", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Gebäude */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Gebäude</h2>

              <div style={gridTwo}>
                <Field label="Gebäudetyp" required>
                  <select required value={form.gebaeudetyp} onChange={(e) => update("gebaeudetyp", e.target.value)} style={selectStyle}>
                    <option value="">Bitte wählen …</option>
                    <option>Einfamilienhaus</option>
                    <option>Reihenhaus</option>
                    <option>Mehrfamilienhaus</option>
                    <option>Gewerbe</option>
                  </select>
                </Field>
                <Field label="Datum des Bauantrags / Baujahr" required>
                  <input type="text" required placeholder="1995" value={form.baujahr} onChange={(e) => update("baujahr", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Anzahl der Wohneinheiten" required>
                  <input type="number" required min="0" placeholder="1" value={form.anzahlWohneinheiten} onChange={(e) => update("anzahlWohneinheiten", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Beheizte Wohnfläche (m²)" required>
                  <input type="number" required min="0" placeholder="140" value={form.wohnflaeche} onChange={(e) => update("wohnflaeche", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Anzahl der Gewerbeeinheiten">
                  <input type="number" min="0" placeholder="0" value={form.anzahlGewerbeeinheiten} onChange={(e) => update("anzahlGewerbeeinheiten", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Beheizte Gewerbefläche (m²)">
                  <input type="number" min="0" placeholder="0" value={form.gewerbeflaeche} onChange={(e) => update("gewerbeflaeche", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <Field label="Wohnsitz des Eigentümers am Investitionsstandort?" hint="Wichtig: Ummeldung muss vor Antragsstellung erfolgt sein." required>
                <select required value={form.wohnsitzAmObjekt} onChange={(e) => update("wohnsitzAmObjekt", e.target.value)} style={selectStyle}>
                  <option value="">Bitte wählen …</option>
                  <option>Ja</option>
                  <option>Nein</option>
                </select>
              </Field>

              <Field label="Finanzierung gewünscht?" hint="ab 0,01 % über die KfW-Bank, nur bis 90.000 € Haushaltseinkommen" required>
                <select required value={form.finanzierung} onChange={(e) => update("finanzierung", e.target.value)} style={selectStyle}>
                  <option value="">Bitte wählen …</option>
                  <option>Ja</option>
                  <option>Nein</option>
                </select>
              </Field>
            </div>

            {/* Heizungsanlage */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Heizungsanlage</h2>

              <div style={gridTwo}>
                <Field label="Bisheriges Heizungssystem" required>
                  <select required value={form.bisherigHeizung} onChange={(e) => update("bisherigHeizung", e.target.value)} style={selectStyle}>
                    <option value="">Bitte wählen …</option>
                    <option>Gasheizung</option>
                    <option>Ölheizung</option>
                    <option>Wärmepumpe</option>
                    <option>Fernwärme</option>
                    <option>Pellets / Holz</option>
                    <option>Sonstiges</option>
                  </select>
                </Field>
                <Field label="Geschätzte Heizleistung (kW)" required>
                  <input type="number" required min="0" placeholder="7" value={form.heizleistung} onChange={(e) => update("heizleistung", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <Field label="Jährlicher Wärmebedarf (kWh)" required>
                <input type="number" required min="0" placeholder="16000" value={form.jahresverbrauch} onChange={(e) => update("jahresverbrauch", e.target.value)} style={inputStyle} />
              </Field>

              <Field label="Abrechnung der Fachplanung gemäß aktuellem LV" required>
                <select required value={form.abrechnungFachplanung} onChange={(e) => update("abrechnungFachplanung", e.target.value)} style={selectStyle}>
                  <option value="">Bitte wählen …</option>
                  <option>über Endkunden</option>
                  <option>über Heizungsbauer</option>
                </select>
              </Field>

              <Field label="Gewünschte Wärmequelle(n)" required>
                <select required value={form.waermequellen} onChange={(e) => update("waermequellen", e.target.value)} style={selectStyle}>
                  <option value="">Bitte wählen …</option>
                  <option>Luft (Luft-Wasser-Wärmepumpe)</option>
                  <option>Wasser (Wasser-Wasser-Wärmepumpe)</option>
                  <option>Erde / Sole (Sole-Wasser-Wärmepumpe)</option>
                  <option>Noch nicht festgelegt</option>
                </select>
              </Field>
            </div>

            {/* Weitere Informationen */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Weitere Informationen</h2>
              <Field label="Anmerkungen / Besonderheiten">
                <textarea
                  rows={4}
                  placeholder="z. B. BAFA-Antrag bereits gestellt, besondere Gegebenheiten am Objekt …"
                  value={form.anmerkungen}
                  onChange={(e) => update("anmerkungen", e.target.value)}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </Field>
            </div>

            {/* DSGVO */}
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
                <strong style={{ color: "var(--color-text)" }}>Hinweis zur Datenverarbeitung:</strong> Die übermittelten Kunden- und Objektdaten werden ausschließlich zur Durchführung der energetischen Fachplanung und Fördermittelbeantragung durch die <strong style={{ color: "var(--color-text)" }}>Planungsbüro Bless, Mülgaustraße 153a, 41199 Mönchengladbach</strong> verwendet. Eine Weitergabe an Dritte erfolgt nicht. Bitte stellen Sie sicher, dass Ihr Kunde der Übermittlung seiner Daten zugestimmt hat.
              </p>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  required
                  checked={dsgvo}
                  onChange={(e) => setDsgvo(e.target.checked)}
                  style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: "var(--color-primary)", flexShrink: 0, cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.6 }}>
                  Ich bestätige, dass mein Kunde der Weitergabe seiner Daten an das Planungsbüro Bless zugestimmt hat, und akzeptiere die{" "}
                  <a href="/datenschutz" target="_blank" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>Datenschutzerklärung</a>.{" "}
                  <span style={{ color: "var(--color-secondary)" }}>*</span>
                </span>
              </label>
            </div>

            {error && (
              <div style={{ marginBottom: "1.5rem", padding: "0.9rem 1.25rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "6px", color: "#B91C1C", fontSize: "0.9rem" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !dsgvo}
              style={{ background: "var(--color-primary)", color: "#FAF7F2", padding: "1rem 2.5rem", borderRadius: "6px", border: "none", cursor: (loading || !dsgvo) ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Source Sans 3', sans-serif", opacity: (loading || !dsgvo) ? 0.5 : 1, transition: "opacity 0.2s" }}
            >
              {loading ? "Wird übermittelt …" : (
                <>
                  Kundenempfehlung absenden
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              Pflichtfelder sind mit <span style={{ color: "var(--color-secondary)" }}>*</span> gekennzeichnet.
            </p>
          </form>
        </div>
      </section>

      <style>{`
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(45,80,22,0.1);
        }
        @media (max-width: 600px) {
          .grid-two { grid-template-columns: 1fr !important; }
          .grid-three { grid-template-columns: 1fr !important; }
          .grid-three > div[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text)", marginBottom: "0.5rem" }}>
        {label}
        {hint && <span style={{ fontWeight: 400, color: "var(--color-text-muted)", marginLeft: "0.3rem" }}>{hint}</span>}
        {required && <span style={{ color: "var(--color-secondary)", marginLeft: "0.25rem" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "16px",
  padding: "2rem 2rem 0.9rem",
  marginBottom: "1.5rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "var(--color-text)",
  marginBottom: "1.5rem",
};

const gridTwo: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const gridThree: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 0.5fr",
  gap: "1rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid var(--color-border)",
  borderRadius: "6px",
  background: "var(--color-background)",
  color: "var(--color-text)",
  fontSize: "0.95rem",
  fontFamily: "'Source Sans 3', sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6B5A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  paddingRight: "2.5rem",
  cursor: "pointer",
};
