import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Individueller Sanierungsfahrplan (iSFP) Mönchengladbach | Planungsbüro Bless",
  description:
    "iSFP – Individueller Sanierungsfahrplan in Mönchengladbach. BAFA-gefördert bis zu 80 %, +5 % Förderbonus bei Umsetzung. Ihr zertifizierter Energieberater.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/sanierungsfahrplan",
  },
};

const faqItems = [
  {
    question: "Was kostet ein iSFP für ein Einfamilienhaus?",
    answer:
      "Die Kosten für einen iSFP liegen je nach Gebäudegröße zwischen 700 und 1.700 €. Die BAFA fördert 80 % der Beratungskosten – bei einem Einfamilienhaus also bis zu 1.300 €. In vielen Fällen ist der iSFP damit fast kostenneutral.",
  },
  {
    question: "Wie lange ist ein iSFP gültig?",
    answer:
      "Ein iSFP ist zeitlich nicht begrenzt. Er dient als langfristiger Leitfaden und kann bei Bedarf aktualisiert werden, z. B. wenn neue Förderprogramme in Kraft treten.",
  },
  {
    question: "Was ist der iSFP-Bonus?",
    answer:
      "Wer Sanierungsmaßnahmen in der im iSFP festgelegten Reihenfolge umsetzt, erhält 5 % zusätzliche Förderung (den sogenannten iSFP-Bonus) auf alle förderfähigen Einzelmaßnahmen.",
  },
  {
    question: "Wer erstellt einen iSFP?",
    answer:
      "Ein iSFP darf nur von Energieeffizienz-Experten erstellt werden, die auf der Expertenliste der dena (Deutsche Energie-Agentur) eingetragen sind. Christopher Bless ist als Energieeffizienz-Experte für Wohngebäude gelistet.",
  },
];

const faqLd = {
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

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: "https://www.planungsbuero-bless.de" },
    { "@type": "ListItem", position: 2, name: "Leistungen", item: "https://www.planungsbuero-bless.de/leistungen" },
    { "@type": "ListItem", position: 3, name: "Sanierungsfahrplan", item: "https://www.planungsbuero-bless.de/leistungen/sanierungsfahrplan" },
  ],
};

export default function SanierungsfahrplanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

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
          <span style={{ color: "var(--color-text)" }}>Sanierungsfahrplan</span>
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
            iSFP nach GEG
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
            Individueller Sanierungsfahrplan (iSFP)
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Ihr persönlicher Weg zur Energieeffizienz – mit +5 % Förderbonus
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
              Der individuelle Sanierungsfahrplan (iSFP) ist Ihr maßgeschneiderter Leitfaden für
              die schrittweise energetische Sanierung Ihres Gebäudes. Christopher Bless erstellt
              den iSFP in Mönchengladbach als eingetragener Energieeffizienz-Experte – er zeigt
              Ihnen, welche Maßnahmen in welcher Reihenfolge den größten Nutzen bringen und welche
              Förderungen Ihnen zustehen.
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
                +5 % Förderbonus bei stufenweiser Sanierung
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
                "Vollständige Bestandsaufnahme und Energieanalyse",
                "Entwicklung eines individuellen Maßnahmenpakets in Stufen",
                "Wirtschaftlichkeitsberechnung für jede Maßnahme",
                "Übersicht aller aktuellen Förderprogramme (BAFA, KfW)",
                "5 % zusätzliche Förderung bei Umsetzung nach iSFP-Stufen",
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

      {/* Erweiterter Inhalt */}
      <section style={{ padding: "4rem 2rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem", marginTop: "0" }}>
            Was ist ein Individueller Sanierungsfahrplan (iSFP)?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Der individuelle Sanierungsfahrplan (iSFP) ist ein staatlich gefördertes Beratungsdokument,
            das die energetischen Schwachstellen Ihres Gebäudes analysiert und einen maßgeschneiderten
            Sanierungsfahrplan für die nächsten 10–15 Jahre entwickelt. Anders als eine einfache
            Energieberatung zeigt der iSFP nicht nur einzelne Maßnahmen, sondern ordnet diese in
            sinnvolle Umsetzungsstufen ein – so dass jede Maßnahme auf die folgende aufbaut und das
            Gebäude schrittweise in Richtung Effizienzhaus entwickelt wird. Der iSFP deckt alle
            Gebäudetypen ab: Einfamilienhäuser, Reihenhäuser, Mehrfamilienhäuser und
            Nichtwohngebäude. Er ist die Grundlage für den wertvollen{" "}
            <Link href="/leistungen/einzelmassnahmen" style={{ color: "var(--color-primary)" }}>
              iSFP-Bonus bei Einzelmaßnahmen
            </Link>.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Welche Förderung gibt es für den iSFP?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Die BAFA (Bundesamt für Wirtschaft und Ausfuhrkontrolle) bezuschusst die Erstellung
            eines iSFP mit bis zu 80 % der anerkannten Beratungskosten. Für ein Einfamilienhaus
            bedeutet das: Bei Gesamtkosten von 1.000 € übernimmt die BAFA bis zu 800 €, sodass
            für den Eigentümer nur 200 € Eigenanteil verbleiben. Der iSFP ist damit in vielen
            Fällen nahezu kostenneutral. Die Beantragung der Förderung erfolgt durch den
            Energieberater – Christopher Bless übernimmt die gesamte Antragstellung für Sie.
            Förderfähig sind Beratungskosten zwischen 400 und 1.000 € netto, je nach Gebäudegröße
            und Aufwand.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            iSFP-Bonus: 5 % mehr Förderung bei stufenweiser Sanierung
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Der größte finanzielle Vorteil des iSFP liegt im sogenannten iSFP-Bonus: Wer
            Sanierungsmaßnahmen in der im iSFP festgelegten Reihenfolge umsetzt, erhält auf jede
            einzelne Maßnahme 5 % zusätzliche Förderung aus der BEG-Einzelmaßnahmenförderung
            (BAFA). Statt 15 % Grundförderung gibt es dann 20 % – und bei Heizungsmaßnahmen
            können sich daraus durch Kombinationsboni noch höhere Gesamtquoten ergeben. Der Bonus
            gilt für alle im{" "}
            <Link href="/leistungen/einzelmassnahmen" style={{ color: "var(--color-primary)" }}>
              BEG EM förderfähigen Maßnahmen
            </Link>{" "}
            und läuft so lange, wie der iSFP gültig und der Förderrahmen aktiv ist.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            So erstellen wir Ihren iSFP in Mönchengladbach
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Planungsbüro Bless erstellt den iSFP in Mönchengladbach und der gesamten Region
            Niederrhein nach dem standardisierten Verfahren des Bundesministeriums für Wirtschaft
            und Klimaschutz. Zunächst findet eine Vor-Ort-Begehung statt, bei der alle relevanten
            Bauteile aufgenommen werden. Anschließend erfolgt die energetische Bilanzierung und
            die Entwicklung eines individuellen Maßnahmenpakets mit Wirtschaftlichkeitsberechnung.
            Das Ergebnis ist ein 20–30-seitiges Dokument mit konkreten Empfehlungen, Kostenschätzungen
            und einer Übersicht aller erreichbaren{" "}
            <Link href="/leistungen/effizienzhaus" style={{ color: "var(--color-primary)" }}>
              Effizienzhaus-Standards
            </Link>.
          </p>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF7F2", fontWeight: 700, fontSize: "1.1rem" }}>CB</div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text)" }}>Christopher Bless</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                Gebäudeenergieberater (HWK) · Eingetragener Energieeffizienz-Experte (dena) ·{" "}
                <Link href="/ueber-uns" style={{ color: "var(--color-primary)" }}>Über mich</Link>
              </div>
            </div>
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
          Jetzt iSFP anfragen
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
