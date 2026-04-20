"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Schritt-Daten ─────────────────────────────────────────── */

const STEPS = [
  {
    id: "leistung",
    title: "Was können wir für Sie tun?",
    subtitle: "Wählen Sie die Leistung, die Sie interessiert.",
    type: "cards",
    options: [
      { value: "Heizlastberechnung", label: "Heizlast­berechnung", icon: "🌡️", hint: "DIN TS 12831" },
      { value: "Hydraulischer Abgleich", label: "Hydraulischer Abgleich", icon: "⚙️", hint: "Verfahren B" },
      { value: "Sanierungsfahrplan", label: "Sanierungs­fahrplan", icon: "📋", hint: "Individueller iSFP" },
      { value: "Einzelmaßnahmen", label: "Einzel­maßnahmen", icon: "🔧", hint: "BAFA-Förderung" },
      { value: "Effizienzhaus", label: "Effizienzhaus", icon: "🏡", hint: "Sanierung & Neubau" },
      { value: "Wärmeschutznachweis", label: "Wärme­schutz­nachweis", icon: "📐", hint: "Gebäudeklassen 1 & 2" },
      { value: "Allgemeine Beratung", label: "Allgemeine Beratung", icon: "💬", hint: "Erstgespräch" },
    ],
  },
  {
    id: "gebaeudetyp",
    title: "Was für ein Gebäude haben Sie?",
    subtitle: "Damit wir die richtige Strategie vorbereiten können.",
    type: "cards",
    options: [
      { value: "Einfamilienhaus", label: "Einfamilienhaus", icon: "🏠", hint: "Freistehendes Haus" },
      { value: "Reihenhaus", label: "Reihen- / Doppelhaus", icon: "🏘️", hint: "Teil einer Zeile" },
      { value: "Mehrfamilienhaus", label: "Mehrfamilienhaus", icon: "🏢", hint: "Ab 3 Wohneinheiten" },
      { value: "Gewerbe", label: "Gewerbe / Sonstiges", icon: "🏭", hint: "Büro, Halle, Mischbau" },
    ],
  },
  {
    id: "baujahr",
    title: "Wann wurde das Gebäude gebaut?",
    subtitle: "Das Baujahr gibt uns wichtige Hinweise auf Dämmung und Technik.",
    type: "cards",
    options: [
      { value: "vor 1960", label: "vor 1960", icon: "🏛️", hint: "Altbau" },
      { value: "1960–1980", label: "1960 – 1980", icon: "🧱", hint: "Gründerzeit der Nachkriegsära" },
      { value: "1981–2000", label: "1981 – 2000", icon: "🪟", hint: "Erste Wärmeschutzverordnungen" },
      { value: "2001–2010", label: "2001 – 2010", icon: "📐", hint: "EnEV-Ära" },
      { value: "nach 2010", label: "nach 2010", icon: "✨", hint: "Moderner Standard" },
    ],
  },
  {
    id: "heizung",
    title: "Welche Heizung ist aktuell verbaut?",
    subtitle: "Wichtig für die Berechnung und Förderfähigkeit.",
    type: "cards",
    options: [
      { value: "Gasheizung", label: "Gasheizung", icon: "🔥", hint: "Kessel oder Therme" },
      { value: "Ölheizung", label: "Ölheizung", icon: "🛢️", hint: "Heizöl" },
      { value: "Wärmepumpe", label: "Wärmepumpe", icon: "♻️", hint: "Luft / Erde / Wasser" },
      { value: "Fernwärme", label: "Fernwärme", icon: "🌐", hint: "Nah- oder Fernwärme" },
      { value: "Pellets / Holz", label: "Pellets / Holz", icon: "🪵", hint: "Biomasse" },
      { value: "Sonstiges / unbekannt", label: "Sonstiges", icon: "❓", hint: "Andere oder unbekannt" },
    ],
  },
  {
    id: "ziel",
    title: "Was ist Ihr Hauptziel?",
    subtitle: "So können wir Ihnen den besten Weg zeigen.",
    type: "cards",
    options: [
      { value: "Energiekosten senken", label: "Energiekosten senken", icon: "💶", hint: "Langfristig sparen" },
      { value: "Förderung beantragen", label: "Förderung beantragen", icon: "📩", hint: "BAFA / KfW" },
      { value: "Pflicht erfüllen", label: "Pflicht erfüllen", icon: "✅", hint: "Verkauf / Vermietung" },
      { value: "Komfort verbessern", label: "Komfort verbessern", icon: "🌡️", hint: "Wärme & Behaglichkeit" },
      { value: "Klimaschutz", label: "Klimaschutz", icon: "🌿", hint: "Nachhaltigkeit" },
    ],
  },
  {
    id: "kontakt",
    title: "Fast geschafft!",
    subtitle: "Hinterlassen Sie Ihre Kontaktdaten – wir melden uns innerhalb von 24 Stunden.",
    type: "contact",
  },
];

/* ─── Hook ──────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Hauptkomponente ───────────────────────────────────────── */
export default function KontaktPage() {
  const { ref: heroRef, inView: heroInView } = useInView();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", anmerkung: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animDir, setAnimDir] = useState<"in" | "out">("in");
  const [visible, setVisible] = useState(true);

  const current = STEPS[step];
  const progress = Math.round((step / (STEPS.length - 1)) * 100);

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    goNext();
  }

  function goNext() {
    if (step >= STEPS.length - 1) return;
    transition(() => setStep((s) => s + 1));
  }

  function goBack() {
    if (step === 0) return;
    transition(() => setStep((s) => s - 1));
  }

  function transition(fn: () => void) {
    setAnimDir("out");
    setVisible(false);
    setTimeout(() => {
      fn();
      setAnimDir("in");
      setVisible(true);
    }, 220);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...answers, ...contact, leistung: answers["leistung"] };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte schreiben Sie direkt an info@planungsbuero-bless.de");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: "140px", paddingBottom: "60px", paddingLeft: "2rem", paddingRight: "2rem", background: "var(--color-background)" }}>
        <div
          ref={heroRef}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
            Kontakt
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.15, marginBottom: "1rem" }}>
            Sprechen wir über
            <br />
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>Ihr Gebäude</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "2rem" }}>
            Beantworten Sie ein paar kurze Fragen – damit wir uns optimal auf Sie vorbereiten können.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
            <a href="tel:+4917253777010" style={{ color: "var(--color-primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9.5c-.8-.1-1.6-.3-2.3-.6-.3-.1-.7 0-.9.2l-1 1c-1.4-.8-2.6-2-3.4-3.4l1-1c.2-.2.3-.6.2-.9C5.3 4.1 5.1 3.3 5 2.5c-.1-.6-.6-1-1.2-1H2.5C1.8 1.5 1 2 1 2.8 1 9 6 14 12.2 14c.8 0 1.3-.8 1.3-1.5v-1.8c0-.6-.4-1.1-1-.9" strokeLinecap="round"/></svg>
              +49 172 5377710
            </a>
            <a href="mailto:info@planungsbuero-bless.de" style={{ color: "var(--color-primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 500 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="13" height="9" rx="1.5"/><path d="M1 3l6.5 5.5L14 3" strokeLinecap="round"/></svg>
              info@planungsbuero-bless.de
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7.5 1C5 1 3 3 3 5.5c0 3.5 4.5 8.5 4.5 8.5S12 9 12 5.5C12 3 10 1 7.5 1z"/><circle cx="7.5" cy="5.5" r="1.5"/></svg>
              Mülgaustraße 153a, 41199 Mönchengladbach
            </span>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section style={{ padding: "0 2rem 7rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          {submitted ? (
            /* Success */
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", padding: "4rem 2.5rem", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FAF7F2" strokeWidth="2.5">
                  <path d="M5 14l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
                Vielen Dank!
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto" }}>
                Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.
              </p>
            </div>
          ) : (
            <>
              {/* Progress bar */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                    Schritt {step + 1} von {STEPS.length}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{progress} %</span>
                </div>
                <div style={{ height: "4px", background: "var(--color-surface-dark)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "var(--color-primary)", borderRadius: "2px", transition: "width 0.4s ease" }} />
                </div>
                {/* Step dots */}
                <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem" }}>
                  {STEPS.map((s, i) => (
                    <div key={s.id} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= step ? "var(--color-primary)" : "var(--color-surface-dark)", transition: "background 0.3s ease" }} />
                  ))}
                </div>
              </div>

              {/* Card */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "2.5rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : animDir === "out" ? "translateY(-12px)" : "translateY(12px)",
                  transition: "opacity 0.22s ease, transform 0.22s ease",
                }}
              >
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>
                  {current.title}
                </h2>
                <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
                  {current.subtitle}
                </p>

                {/* Options grid */}
                {current.type === "cards" && current.options && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.9rem" }}>
                    {current.options.map((opt) => {
                      const selected = answers[current.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => selectOption(opt.value)}
                          style={{
                            background: selected ? "var(--color-primary)" : "var(--color-background)",
                            border: selected ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                            borderRadius: "10px",
                            padding: "1.1rem 1rem",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "all 0.18s ease",
                            color: selected ? "#FAF7F2" : "var(--color-text)",
                          }}
                        >
                          <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{opt.icon}</div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.3, marginBottom: "0.2rem" }}>{opt.label}</div>
                          <div style={{ fontSize: "0.75rem", opacity: selected ? 0.75 : 0.6, lineHeight: 1.3 }}>{opt.hint}</div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Contact step */}
                {current.type === "contact" && (
                  <form onSubmit={handleSubmit}>
                    {/* Summary chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                      {Object.entries(answers).map(([key, val]) => (
                        <span key={key} style={{ background: "var(--color-primary)", color: "#FAF7F2", fontSize: "0.75rem", fontWeight: 500, padding: "0.25rem 0.75rem", borderRadius: "20px" }}>
                          {val}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem", marginBottom: "1.1rem" }} className="form-row">
                      <div>
                        <label style={labelStyle} htmlFor="name">Name <span style={{ color: "var(--color-secondary)" }}>*</span></label>
                        <input id="name" type="text" required placeholder="Ihr Name" value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="email">E-Mail <span style={{ color: "var(--color-secondary)" }}>*</span></label>
                        <input id="email" type="email" required placeholder="ihre@email.de" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.1rem" }}>
                      <label style={labelStyle} htmlFor="phone">Telefon <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span></label>
                      <input id="phone" type="tel" placeholder="+49 ..." value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} style={inputStyle} />
                    </div>

                    <div style={{ marginBottom: "1.75rem" }}>
                      <label style={labelStyle} htmlFor="anmerkung">Anmerkungen <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span></label>
                      <textarea id="anmerkung" rows={4} placeholder="Haben Sie noch etwas, das wir wissen sollten?" value={contact.anmerkung} onChange={(e) => setContact((p) => ({ ...p, anmerkung: e.target.value }))} style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }} />
                    </div>

                    {error && (
                      <div style={{ marginBottom: "1.25rem", padding: "0.9rem 1.25rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "6px", color: "#B91C1C", fontSize: "0.9rem" }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ background: "var(--color-primary)", color: "#FAF7F2", padding: "0.9rem 2.25rem", borderRadius: "6px", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Source Sans 3', sans-serif", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}
                    >
                      {loading ? "Wird gesendet …" : (
                        <>
                          Anfrage absenden
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                      Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{" "}
                      <a href="/datenschutz" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                        Datenschutzerklärung
                      </a>{" "}
                      zu. Kein Spam, keine Weitergabe an Dritte.
                    </p>
                  </form>
                )}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={goBack}
                  style={{ marginTop: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: 0, fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 7H2M5 4L2 7l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Zurück
                </button>
              )}

              {/* Info bar */}
              <div style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "10px", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ color: "var(--color-primary)", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 9v5M10 7h.01" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                  Ihre Angaben werden vertraulich behandelt und ausschließlich zur Vorbereitung Ihres Beratungsgesprächs verwendet.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(45,80,22,0.1);
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "var(--color-text)",
  marginBottom: "0.5rem",
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
