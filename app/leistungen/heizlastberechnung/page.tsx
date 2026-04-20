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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: "https://www.planungsbuero-bless.de" },
    { "@type": "ListItem", position: 2, name: "Leistungen", item: "https://www.planungsbuero-bless.de/leistungen" },
    { "@type": "ListItem", position: 3, name: "Heizlastberechnung", item: "https://www.planungsbuero-bless.de/leistungen/heizlastberechnung" },
  ],
};

export default function HeizlastberechnungPage() {
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
              Die Heizlastberechnung nach DIN EN 12831 ist das Fundament einer korrekt ausgelegten
              Heizungsanlage. Als zertifizierter Energieberater in Mönchengladbach ermittelt
              Christopher Bless präzise, wie viel Wärme Ihr Gebäude unter Normbedingungen
              maximal benötigt – Raum für Raum, normgerecht und förderkonform.
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

      {/* Erweiterter Inhalt */}
      <section style={{ padding: "4rem 2rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem", marginTop: "0" }}>
            Was ist eine Heizlastberechnung nach DIN EN 12831?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Eine Heizlastberechnung nach DIN EN 12831 ist eine normierte Berechnung, die den maximalen
            Wärmebedarf eines Gebäudes unter definierten Außentemperaturbedingungen (Normauslegungstemperatur)
            ermittelt. Sie bildet die Grundlage für die korrekte Dimensionierung von Heizkörpern,
            Wärmepumpen, Heizkreisverteilern und Pumpen. Ohne eine präzise Heizlastberechnung riskieren
            Eigentümer eine überdimensionierte Anlage mit erhöhtem Energieverbrauch oder eine
            unterdimensionierte Anlage, die an kalten Tagen nicht ausreichend heizt. Planungsbüro Bless
            führt die Berechnung raumweise durch – für jedes Zimmer separat, damit die gesamte Anlage
            optimal aufeinander abgestimmt ist.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wann ist eine Heizlastberechnung Pflicht?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Seit der Novellierung des Gebäudeenergiegesetzes (GEG 2024) ist die Heizlastberechnung
            nach DIN EN 12831 bei Beantragung von Bundesförderung für effiziente Gebäude (BEG) beim
            BAFA oder der KfW verpflichtend. Wer eine neue Wärmepumpe, einen Heizkessel oder eine
            Fernwärmeanbindung förderfähig installieren möchte, muss den Nachweis durch einen
            eingetragenen Energieeffizienz-Experten erbringen lassen. Auch beim Hydraulischen
            Abgleich nach Verfahren B ist die Heizlastberechnung Pflichtvoraussetzung. Ohne diesen
            Nachweis werden Förderanträge abgelehnt.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Heizlastberechnung für Wärmepumpe – worauf kommt es an?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Eine Wärmepumpe arbeitet nur dann effizient, wenn sie exakt auf den tatsächlichen
            Wärmebedarf des Gebäudes ausgelegt ist. Eine zu große Wärmepumpe taktet häufig (schaltet
            sich ständig ein und aus), was den Wirkungsgrad drastisch senkt und die Lebensdauer
            verkürzt. Eine zu kleine Anlage kann den Heizbedarf an kalten Tagen nicht decken.
            Die Heizlastberechnung liefert die Grundlage für die Auswahl der richtigen Wärmepumpengröße
            (kW) und den korrekten COP-Betriebspunkt. In Kombination mit dem{" "}
            <Link href="/leistungen/hydraulischer-abgleich" style={{ color: "var(--color-primary)" }}>
              Hydraulischen Abgleich
            </Link>{" "}
            wird sichergestellt, dass die Wärme gleichmäßig im Gebäude verteilt wird.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            So läuft die Heizlastberechnung bei Planungsbüro Bless ab
          </h2>
          <ol style={{ paddingLeft: "1.5rem", color: "var(--color-text-muted)", lineHeight: 2, fontSize: "1rem", marginBottom: "2.5rem" }}>
            <li><strong style={{ color: "var(--color-text)" }}>Unterlagencheck:</strong> Sie übermitteln uns Grundrisse, Baujahr, Dämmstandard und aktuelle Heizung.</li>
            <li><strong style={{ color: "var(--color-text)" }}>Raumweise Berechnung:</strong> Wir berechnen den Heizwärmebedarf für jeden Raum nach DIN EN 12831.</li>
            <li><strong style={{ color: "var(--color-text)" }}>Normgerechte Dokumentation:</strong> Sie erhalten einen vollständigen Nachweis, der bei BAFA und KfW anerkannt wird.</li>
            <li><strong style={{ color: "var(--color-text)" }}>Übergabe in 3–5 Werktagen:</strong> Nach Eingang aller Unterlagen ist das Ergebnis in der Regel innerhalb einer Woche fertig.</li>
          </ol>

          {/* Autorenhinweis */}
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
