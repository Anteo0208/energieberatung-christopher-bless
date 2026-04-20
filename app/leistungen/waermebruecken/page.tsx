import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wärmebrückenberechnung nach DIN ISO 10211 – Planungsbüro Bless",
  description:
    "Detaillierte Wärmebrückenberechnung nach DIN ISO 10211. Ψ-Wert Ermittlung, Schimmelschutznachweis, Optimierung für Effizienzhaus. Mönchengladbach.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/waermebruecken",
  },
};

const faqItems = [
  {
    question: "Was ist eine Wärmebrücke?",
    answer:
      "Eine Wärmebrücke ist eine Stelle in der Gebäudehülle, an der Wärme schneller nach außen entweicht als in den angrenzenden Bereichen. Typische Wärmebrücken sind Fensterlaibungen, Balkone, Attiken und Gebäudeecken.",
  },
  {
    question: "Warum ist die Wärmebrückenberechnung wichtig?",
    answer:
      "Wärmebrücken erhöhen den Energieverbrauch und können zu Kondensation und Schimmelbildung führen. Eine genaue Berechnung zeigt, wo Optimierungspotenzial besteht.",
  },
  {
    question: "Was ist ein Ψ-Wert (Psi-Wert)?",
    answer:
      "Der Ψ-Wert (längenbezogener Wärmedurchgangskoeffizient) beschreibt den zusätzlichen Wärmeverlust durch eine Wärmebrücke pro Meter Länge. Ein niedriger Ψ-Wert bedeutet eine gut gedämmte Anschlusskonstruktion.",
  },
  {
    question: "Für wen ist die Wärmebrückenberechnung relevant?",
    answer:
      "Besonders für Neubauten und Sanierungen, die einen hohen Energieeffizienz-Standard (z. B. Effizienzhaus 40 oder 55) anstreben. Oft ist die Wärmebrückenoptimierung der entscheidende Schritt zur nächsten Effizienzhaus-Stufe.",
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
    { "@type": "ListItem", position: 3, name: "Wärmebrücken", item: "https://www.planungsbuero-bless.de/leistungen/waermebruecken" },
  ],
};

export default function WaermebrueckenPage() {
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
          <span style={{ color: "var(--color-text)" }}>Wärmebrücken</span>
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
            DIN ISO 10211
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
            Detaillierte Wärmebrückenberechnung
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Präzise Analyse für optimale Dämmung und dauerhaften Schimmelschutz
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
              Wärmebrücken sind oft der entscheidende Faktor, der einen hohen Energieeffizienz-
              Standard verhindert oder zu Schimmel führt. Christopher Bless ermittelt in
              Mönchengladbach mit der numerischen Wärmebrückenberechnung nach DIN ISO 10211
              präzise Ψ-Werte für jeden kritischen Anschlussdetail – und optimiert die
              Konstruktion gezielt.
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
                Schimmelschutznachweis und Ψ-Wert-Ermittlung
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
                "2D-Wärmebrückenberechnung kritischer Anschlussdetails",
                "Ermittlung der Ψ-Werte (Psi-Werte) nach DIN ISO 10211",
                "Schimmelschutznachweis (Temperaturfaktor fRsi)",
                "Optimierungsempfehlungen für die Konstruktion",
                "Einpflege der Ψ-Werte in den Energieausweis/Wärmeschutznachweis",
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
            Was ist eine Wärmebrücke am Gebäude?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Eine Wärmebrücke ist ein Bereich in der Gebäudehülle, an dem die Wärmedämmung
            unterbrochen oder geschwächt ist und Wärme daher schneller nach außen entweicht als
            in den angrenzenden Flächen. Typische Wärmebrücken entstehen an Fensterlaibungen,
            Balkonplatten, Gebäudeecken, Rollladenkästen, Attiken und Deckenrändern. Man
            unterscheidet lineare Wärmebrücken (z. B. entlang einer Attikakante, beschrieben durch
            den Ψ-Wert) und punktförmige Wärmebrücken (z. B. Ankerschienen, beschrieben durch den
            χ-Wert). Wärmebrücken erhöhen den Heizwärmebedarf eines Gebäudes und können – bei
            unzureichendem Mindestwärmeschutz – zu Kondensation und Schimmelbildung an den
            Innenoberflächen führen, was sowohl Bauschäden als auch Gesundheitsrisiken für die
            Bewohner verursacht.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wärmebrückenberechnung nach DIN ISO 10211 – warum ist sie wichtig?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Die numerische Wärmebrückenberechnung nach DIN ISO 10211 simuliert den
            zweidimensionalen (und bei Bedarf dreidimensionalen) stationären Wärmedurchgang durch
            kritische Anschlussdetails mittels Finite-Elemente-Methode. Das Ergebnis ist der
            Ψ-Wert (Psi-Wert, längenbezogener Wärmedurchgangskoeffizient in W/(m·K)), der den
            zusätzlichen Wärmeverlust durch die Wärmebrücke pro Meter Länge quantifiziert. Mit
            diesen exakten Ψ-Werten kann Planungsbüro Bless in Mönchengladbach den
            Wärmeverlust durch Wärmebrücken präzise in die{" "}
            <Link href="/leistungen/heizlastberechnung" style={{ color: "var(--color-primary)" }}>
              Heizlastberechnung
            </Link>{" "}
            und den{" "}
            <Link href="/leistungen/waermeschutznachweis" style={{ color: "var(--color-primary)" }}>
              Wärmeschutznachweis
            </Link>{" "}
            einrechnen – statt pauschaler Zuschlagswerte, die oft zu einer Verschlechterung der
            Energiebilanz um 10–15 % führen.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Schimmelschutz durch den fRsi-Nachweis
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Neben dem Ψ-Wert liefert die Wärmebrückenberechnung nach DIN ISO 10211 den
            Temperaturfaktor fRsi an der kritischsten Stelle der Konstruktion. Dieser Wert gibt
            an, wie nahe die Innenoberflächentemperatur an die Raumlufttemperatur herankommt: Ein
            fRsi von mindestens 0,70 ist die Mindestanforderung nach GEG, um Schimmelbildung unter
            normalen Nutzungsbedingungen (20 °C Raumtemperatur, 50 % relative Luftfeuchte)
            auszuschließen. Christopher Bless dokumentiert den fRsi-Nachweis für jeden
            analysierten Anschlussdetail und gibt konkrete Optimierungsempfehlungen, wenn die
            Mindestanforderung nicht erfüllt wird – bevor die Konstruktion ausgeführt wird und
            teure Nachbesserungen notwendig werden.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wärmebrückenberechnung für Förderanträge und Energieausweis
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Für die KfW-Effizienzhaus-Förderung auf dem anspruchsvollen EH-40-Standard ist der
            Nachweis detaillierter Ψ-Werte für alle wesentlichen Wärmebrücken obligatorisch – der
            pauschale Wärmebrückenzuschlag nach DIN 4108 Beiblatt 2 reicht für diesen Standard
            nicht aus. Nur mit nachgewiesenen, berechneten Ψ-Werten lässt sich der
            Transmissionswärmeverlust (H'T) so weit reduzieren, dass das EH-40-Niveau erreicht
            wird. Planungsbüro Bless pflegt die ermittelten Ψ-Werte direkt in den
            Energieausweis und den Wärmeschutznachweis ein, sodass alle Dokumente konsistent
            sind und bei BAFA und KfW anerkannt werden. Die Bearbeitungszeit beträgt je nach
            Anzahl der Details 5–10 Werktage.
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
          Wärmebrückenberechnung anfragen
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
          Senden Sie uns Ihre Konstruktionsdetails – wir erstellen ein unverbindliches Angebot.
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
