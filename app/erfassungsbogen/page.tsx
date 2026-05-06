"use client";

import { useState } from "react";

export default function ErfassungsbogenPage() {
  const [form, setForm] = useState({
    // Persönliche Daten
    vorname: "",
    nachname: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    geburtsdatum: "",
    geburtsort: "",
    // Bankdaten
    iban: "",
    bic: "",
    steuerIdNr: "",
    // Kontakt
    telefon: "",
    email: "",
    // Gebäude
    gebaeudeStrasse: "",
    gebaeudeHausnummer: "",
    gebaeudePlz: "",
    gebaeudeOrt: "",
    baujahr: "",
    wohneinheiten: "",
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
      const res = await fetch("/api/erfassungsbogen", {
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
            Ihr Erfassungsbogen wurde erfolgreich übermittelt. Wir werden uns zeitnah bei Ihnen melden.
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
            Intern
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.15, marginBottom: "1rem" }}>
            Erfassungsbogen
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "480px" }}>
            Bitte füllen Sie alle Pflichtfelder vollständig aus. Ihre Angaben werden vertraulich behandelt.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 2rem 7rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <form onSubmit={handleSubmit}>

            {/* Persönliche Daten */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Persönliche Daten</h2>

              <div style={gridTwo}>
                <Field label="Vorname" hint="(wie im Personalausweis)" required>
                  <input type="text" required value={form.vorname} onChange={(e) => update("vorname", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Nachname" hint="(wie im Personalausweis)" required>
                  <input type="text" required value={form.nachname} onChange={(e) => update("nachname", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridThree}>
                <div style={{ gridColumn: "span 2" }}>
                  <Field label="Straße" required>
                    <input type="text" required value={form.strasse} onChange={(e) => update("strasse", e.target.value)} style={inputStyle} />
                  </Field>
                </div>
                <Field label="Hausnummer" required>
                  <input type="text" required value={form.hausnummer} onChange={(e) => update("hausnummer", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Postleitzahl" required>
                  <input type="text" required value={form.plz} onChange={(e) => update("plz", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ort" required>
                  <input type="text" required value={form.ort} onChange={(e) => update("ort", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Geburtsdatum" required>
                  <input type="text" required value={form.geburtsdatum} onChange={(e) => update("geburtsdatum", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Geburtsort" required>
                  <input type="text" required value={form.geburtsort} onChange={(e) => update("geburtsort", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Bankdaten */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Bankdaten & Steuer</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "-0.75rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Für die Auszahlung der Fördermittel
              </p>

              <Field label="IBAN" required>
                <input type="text" required value={form.iban} onChange={(e) => update("iban", e.target.value)} style={inputStyle} />
              </Field>

              <div style={gridTwo}>
                <Field label="BIC" required>
                  <input type="text" required value={form.bic} onChange={(e) => update("bic", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Steueridentifikationsnummer" required>
                  <input type="text" required value={form.steuerIdNr} onChange={(e) => update("steuerIdNr", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Kontakt */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Kontakt</h2>

              <div style={gridTwo}>
                <Field label="Telefon" required>
                  <input type="tel" required value={form.telefon} onChange={(e) => update("telefon", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="E-Mail" required>
                  <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Gebäude */}
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Gebäude / Objekt</h2>

              <div style={gridThree}>
                <div style={{ gridColumn: "span 2" }}>
                  <Field label="Straße" required>
                    <input type="text" required value={form.gebaeudeStrasse} onChange={(e) => update("gebaeudeStrasse", e.target.value)} style={inputStyle} />
                  </Field>
                </div>
                <Field label="Hausnummer" required>
                  <input type="text" required value={form.gebaeudeHausnummer} onChange={(e) => update("gebaeudeHausnummer", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Postleitzahl" required>
                  <input type="text" required value={form.gebaeudePlz} onChange={(e) => update("gebaeudePlz", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Ort" required>
                  <input type="text" required value={form.gebaeudeOrt} onChange={(e) => update("gebaeudeOrt", e.target.value)} style={inputStyle} />
                </Field>
              </div>

              <div style={gridTwo}>
                <Field label="Datum des Bauantrags / Baujahr" required>
                  <input type="text" required value={form.baujahr} onChange={(e) => update("baujahr", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Anzahl Wohneinheiten / Gewerbeeinheiten" required>
                  <input type="text" required value={form.wohneinheiten} onChange={(e) => update("wohneinheiten", e.target.value)} style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* DSGVO Hinweis */}
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
                <strong style={{ color: "var(--color-text)" }}>Hinweis zur Datenverarbeitung:</strong> Ihre Angaben werden ausschließlich zur Beantragung von Fördermitteln (BAFA/KfW) durch die <strong style={{ color: "var(--color-text)" }}>Planungsbüro Bless, Mülgaustraße 153a, 41199 Mönchengladbach</strong> verwendet. Die Daten werden nach Abschluss des Auftrags gemäß gesetzlicher Aufbewahrungsfristen gelöscht und nicht an Dritte weitergegeben.
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
                  Ich stimme der Verarbeitung meiner personenbezogenen Daten (inkl. Bankdaten und Steueridentifikationsnummer) zum Zweck der Fördermittelbeantragung gemäß der{" "}
                  <a href="/datenschutz" target="_blank" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>Datenschutzerklärung</a>{" "}
                  zu. <span style={{ color: "var(--color-secondary)" }}>*</span>
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
                  Erfassungsbogen absenden
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
        input:focus, textarea:focus {
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
