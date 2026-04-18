import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hydraulischer Abgleich Verfahren B – Mönchengladbach | Planungsbüro Bless",
  description:
    "Hydraulischer Abgleich nach Verfahren B in Mönchengladbach. Pflicht bei BEG-Förderung, bis zu 15 % Heizkostenersparnis. Inkl. BAFA-Antragstellung.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/hydraulischer-abgleich",
  },
};

const faqItems = [
  {
    question: "Was ist der Unterschied zwischen Verfahren A und Verfahren B?",
    answer:
      "Verfahren A ist eine vereinfachte Methode. Verfahren B hingegen basiert auf einer raumweisen Heizlastberechnung und ist deutlich präziser. Für die BEG-Förderung ist ausschließlich Verfahren B anerkannt.",
  },
  {
    question: "Ist der hydraulische Abgleich Pflicht?",
    answer:
      "Seit 2023 ist der hydraulische Abgleich nach Verfahren B Pflicht für Gebäude mit zentraler Heizung ab 6 Wohneinheiten. Für die BAFA-Förderung ist er generell Pflichtbestandteil.",
  },
  {
    question: "Was kostet ein hydraulischer Abgleich?",
    answer:
      "Die Kosten hängen von der Größe der Heizungsanlage ab. Für ein Einfamilienhaus rechnen Sie mit 300–800 €. Durch BAFA-Förderung werden bis zu 15 % der förderfähigen Kosten bezuschusst.",
  },
  {
    question: "Wie lange dauert ein hydraulischer Abgleich?",
    answer:
      "Die Berechnung erstellen wir in 3–5 Werktagen. Die praktische Einstellung vor Ort dauert je nach Anlagengröße 2–4 Stunden.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HydraulischerAbgleichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        style={{
          paddingTop: "120px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "0",
          background: "var(--color-background)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>
            Start
          </Link>
          <span>›</span>
          <Link
            href="/leistungen"
            style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
          >
            Leistungen
          </Link>
          <span>›</span>
          <span style={{ color: "var(--color-text)" }}>Hydraulischer Abgleich</span>
        </div>
      </nav>

      <section
        style={{
          padding: "2rem 2rem 4rem",
          background: "var(--color-background)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "var(--color-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Verfahren B
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.15,
              marginTop: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            Hydraulischer Abgleich nach Verfahren B
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Gleichmäßige Wärme in jedem Raum – bis zu 15 % Heizkosten sparen
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "0 2rem 5rem",
          background: "var(--color-background)",
        }}
      >
        <div
          className="leistung-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Der hydraulische Abgleich nach Verfahren B sorgt dafür, dass jeder Heizkörper im
              System genau die richtige Wassermenge erhält. Das Ergebnis: gleiche Raumtemperaturen
              überall, weniger Energieverbrauch und ein deutlich leistungsfähigeres Heizsystem.
            </p>
            <div
              style={{
                display: "inline-block",
                border: "1px solid var(--color-primary)",
                padding: "0.75rem 1.25rem",
                borderRadius: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--color-primary)",
                  letterSpacing: "0.03em",
                }}
              >
                Reduziert Heizkosten um bis zu 15 %
              </span>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text)",
                marginBottom: "1.25rem",
              }}
            >
              Leistungsumfang
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Raumweise Berechnung der erforderlichen Volumenströme",
                "Einstellung aller Thermostatventile nach Berechnung",
                "Optimierung der Heizungspumpe (Effizienzpumpe)",
                "Pflichtmaßnahme bei Heizungsförderung (BEG)",
                "Nachweis und Protokollierung für den Fördermittelantrag",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    paddingBottom: "0.875rem",
                    marginBottom: "0.875rem",
                    borderBottom: "1px solid var(--color-border)",
                    fontSize: "0.95rem",
                    color: "var(--color-text)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "4rem 2rem",
          background: "var(--color-surface)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "2.5rem",
            }}
          >
            Häufige Fragen
          </h2>
          <div style={{ maxWidth: "760px" }}>
            {faqItems.map((item) => (
              <details
                key={item.question}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  padding: "0",
                }}
              >
                <summary
                  style={{
                    padding: "1.25rem 0",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.question}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1rem",
                      color: "var(--color-primary)",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    padding: "0 0 1.25rem",
                    fontSize: "0.95rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "5rem 2rem",
          background: "var(--color-primary)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Planungsbüro Bless · Mönchengladbach
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.75rem",
          }}
        >
          Hydraulischen Abgleich anfragen
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "2rem",
            maxWidth: "480px",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          Kostenlose Erstberatung – wir klären gemeinsam den Umfang und die Förderoptionen.
        </p>
        <Link
          href="/kontakt"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "var(--color-primary)",
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 600,
            fontSize: "0.95rem",
            padding: "0.875rem 2rem",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Jetzt kostenlos anfragen
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .leistung-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}
