import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Heizlastberechnung nach DIN EN 12831 – Mönchengladbach | Planungsbüro Bless",
  description:
    "Professionelle Heizlastberechnung nach DIN EN 12831 in Mönchengladbach. Pflichtnachweis für BEG-Förderung, raumweise Berechnung, Wärmepumpenauslegung. Jetzt anfragen.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/heizlastberechnung",
  },
};

const faqItems = [
  {
    question: "Was kostet eine Heizlastberechnung?",
    answer:
      "Für ein typisches Einfamilienhaus liegen die Kosten zwischen 300 und 600 €. Durch BAFA-Förderung können bis zu 80 % der Beratungskosten bezuschusst werden.",
  },
  {
    question: "Wann ist eine Heizlastberechnung Pflicht?",
    answer:
      "Bei der Beantragung von BEG-Fördermitteln (BAFA/KfW) ist die Heizlastberechnung nach DIN EN 12831 verpflichtend vorgeschrieben.",
  },
  {
    question: "Brauche ich eine Heizlastberechnung für eine Wärmepumpe?",
    answer:
      "Ja. Für die korrekte Auslegung einer Wärmepumpe ist die Heizlastberechnung unverzichtbar. Eine falsch dimensionierte Wärmepumpe arbeitet ineffizient und verursacht unnötige Kosten.",
  },
  {
    question: "Wie lange dauert eine Heizlastberechnung?",
    answer:
      "Nach Eingang aller Unterlagen (Grundrisse, Baujahr, Dämmstandard) erstellen wir die Berechnung in der Regel innerhalb von 3–5 Werktagen.",
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

export default function HeizlastberechnungPage() {
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
          <span style={{ color: "var(--color-text)" }}>Heizlastberechnung</span>
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
            DIN TS 12831
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
            Heizlastberechnung nach DIN EN 12831
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Die Basis für jede effiziente Heizungsanlage
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
              Die Heizlastberechnung nach DIN TS 12831 ist das Fundament einer korrekt ausgelegten
              Heizungsanlage. Sie ermittelt präzise, wie viel Wärme ein Gebäude unter
              Normbedingungen maximal benötigt – Raum für Raum.
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
                Verhindert Über- oder Unterdimensionierung der Heizung
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
                "Raumweise Berechnung des Wärmebedarfs",
                "Berücksichtigung von Gebäudehülle, Fensterqualität und Lüftung",
                "Grundlage für die korrekte Heizkörper- und Pumpendimensionierung",
                "Pflichtnachweis für Förderprogramme (BEG)",
                "Dokumentation nach aktuellem Normenstand",
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
          Jetzt Heizlastberechnung anfragen
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
