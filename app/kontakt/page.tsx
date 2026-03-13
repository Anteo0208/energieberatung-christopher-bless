"use client";

import { useEffect, useRef, useState } from "react";

const leistungsOptionen = [
  "Heizlastberechnung nach DIN TS 12831:2020",
  "Hydraulischer Abgleich Verfahren B",
  "Individueller Sanierungsfahrplan (iSFP)",
  "Begleitung von Einzelmaßnahmen",
  "Effizienzhaus-Sanierung / Neubau",
  "Allgemeine Energieberatung",
];

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

export default function KontaktPage() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: formRef, inView: formInView } = useInView();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    leistung: "",
    nachricht: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Fehler beim Senden.");
      setSubmitted(true);
    } catch {
      setError("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@planungsbuero-bless.de");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "60px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          background: "var(--color-background)",
        }}
      >
        <div
          ref={heroRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
            Kontakt
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.15,
              maxWidth: "540px",
              marginBottom: "1.25rem",
            }}
          >
            Sprechen wir über
            <br />
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>Ihr Gebäude</em>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "500px" }}>
            Kontaktieren Sie mich für ein erstes, kostenloses Beratungsgespräch.
            Ich melde mich innerhalb von 24 Stunden bei Ihnen.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section
        ref={formRef}
        style={{ padding: "2rem 2rem 7rem", background: "var(--color-background)" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "4rem",
            alignItems: "start",
            opacity: formInView ? 1 : 0,
            transform: formInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "3rem 2.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FAF7F2" strokeWidth="2">
                    <path d="M5 14l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
                  Nachricht gesendet!
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Vielen Dank für Ihre Anfrage. Ich melde mich innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }} className="form-row">
                  <div>
                    <label style={labelStyle} htmlFor="name">
                      Name <span style={{ color: "var(--color-secondary)" }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr vollständiger Name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">
                      E-Mail <span style={{ color: "var(--color-secondary)" }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }} className="form-row">
                  <div>
                    <label style={labelStyle} htmlFor="phone">
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 ..."
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="leistung">
                      Leistung
                    </label>
                    <select
                      id="leistung"
                      name="leistung"
                      value={formData.leistung}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Bitte wählen …</option>
                      {leistungsOptionen.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={labelStyle} htmlFor="nachricht">
                    Ihre Nachricht <span style={{ color: "var(--color-secondary)" }}>*</span>
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    required
                    rows={6}
                    value={formData.nachricht}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie Ihr Projekt oder Ihr Anliegen …"
                    style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
                  />
                </div>

                {error && (
                  <div style={{ marginBottom: "1.25rem", padding: "0.9rem 1.25rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "6px", color: "#B91C1C", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "var(--color-primary-light, #3D6B1F)" : "var(--color-primary)",
                    color: "#FAF7F2",
                    padding: "0.9rem 2.5rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "1rem",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "background 0.2s",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                        <circle cx="8" cy="8" r="6" strokeDasharray="20" strokeDashoffset="5" />
                      </svg>
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      Anfrage senden
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
                Kontaktdaten
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 3h12l-6 7V17l-3-2V10L3 3z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    label: "E-Mail",
                    value: "info@planungsbuero-bless.de",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 3a1 1 0 011-1h2.6a1 1 0 01.97.76L8.5 6.5a1 1 0 01-.23.99L7 8.76a10 10 0 004.24 4.24l1.27-1.27a1 1 0 01.99-.23l3.74.9A1 1 0 0118 13.4V16a1 1 0 01-1 1C7.16 17 1 10.84 1 3z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    label: "Telefon",
                    value: "+49 (0) ... ...",
                  },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ color: "var(--color-primary)", marginTop: "2px", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "2px" }}>{item.label}</div>
                      <div style={{ fontSize: "0.9rem", color: "var(--color-text)", fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "var(--color-primary)",
                borderRadius: "12px",
                padding: "2rem",
                color: "#FAF7F2",
              }}
            >
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.65, marginBottom: "1rem" }}>
                Versprechen
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.4 }}>
                Antwort innerhalb von 24 Stunden
              </div>
              <p style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: 1.6 }}>
                Jede Anfrage wird von mir persönlich beantwortet – kein Callcenter, keine automatisierten Antworten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(45,80,22,0.1);
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
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: "0.95rem",
  fontFamily: "'Source Sans 3', sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
};
