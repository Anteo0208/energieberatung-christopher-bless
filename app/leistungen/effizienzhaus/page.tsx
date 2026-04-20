import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Effizienzhaus Sanierung & Neubau KfW – Mönchengladbach | Planungsbüro Bless",
  description:
    "Effizienzhaus-Begleitung nach KfW-Standard in Mönchengladbach. Bis zu 45.000 € Zuschuss pro Wohneinheit. Energieausweis, Baubegleitung, BEG WG Antrag.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/effizienzhaus",
  },
};

const faqItems = [
  {
    question: "Was ist ein KfW-Effizienzhaus?",
    answer:
      "Ein KfW-Effizienzhaus ist ein Gebäude, das einen bestimmten energetischen Standard erreicht (z. B. EH 40, EH 55, EH 85). Je besser der Standard, desto höher die Förderung durch die KfW-Bank.",
  },
  {
    question: "Wie viel Förderung gibt es für ein Effizienzhaus?",
    answer:
      "Die KfW fördert Effizienzhäuser mit Zuschüssen von bis zu 45.000 € pro Wohneinheit (bei EH 40 Klimafreundlich Plus). Der genaue Betrag hängt vom erreichten Effizienzhaus-Standard ab.",
  },
  {
    question: "Was ist eine Bestätigung nach Durchführung (BnD)?",
    answer:
      "Die BnD ist eine Pflichtdokumentation, die nach Abschluss der Baumaßnahmen erstellt wird. Sie bestätigt, dass der geplante Effizienzhaus-Standard tatsächlich erreicht wurde.",
  },
  {
    question: "Benötige ich einen Energieeffizienz-Experten für die KfW-Förderung?",
    answer:
      "Ja. Die KfW schreibt die Einbindung eines zugelassenen Energieeffizienz-Experten für alle BEG-Förderprogramme vor. Wir begleiten Sie von der Planung bis zur Abschlussdokumentation.",
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
    { "@type": "ListItem", position: 3, name: "Effizienzhaus", item: "https://www.planungsbuero-bless.de/leistungen/effizienzhaus" },
  ],
};

export default function EffizienzhausPage() {
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
          <span style={{ color: "var(--color-text)" }}>Effizienzhaus</span>
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
            KfW-Effizienzhaus
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
            Effizienzhaus-Sanierung &amp; Neubau
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Ganzheitlich sanieren – bis zu 45.000 € KfW-Förderung pro Wohneinheit
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
              Die Sanierung oder der Neubau auf Effizienzhaus-Niveau ist die umfangreichste Form
              der energetischen Gebäudeoptimierung. Christopher Bless begleitet Bauherren und
              Eigentümer in Mönchengladbach als zugelassener Energieeffizienz-Experte – von der
              Planung bis zur Abschlussdokumentation für maximale KfW-Förderung.
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
                Bis zu 45.000 € KfW-Zuschuss pro Wohneinheit
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
                "Energetische Analyse und Effizienzhaus-Zielstandard-Ermittlung",
                "Bestätigung zum Antrag (BzA) für KfW-Förderantrag",
                "Baubegleitung und Qualitätssicherung während der Maßnahmen",
                "Bestätigung nach Durchführung (BnD) zum Fördernachweis",
                "Energieausweis nach Fertigstellung",
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
            Was ist ein KfW Effizienzhaus?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Ein KfW-Effizienzhaus ist ein Gebäude, das definierte energetische Standards hinsichtlich
            Primärenergiebedarf und Transmissionswärmeverlust erreicht. Die Ziffer im Namen (z. B.
            EH 40, EH 55, EH 85) gibt an, wie viel Prozent des Primärenergiebedarfs ein
            Referenzgebäude nach GEG verbraucht: Ein Effizienzhaus 40 verbraucht also nur 40 %
            der Energie des Referenzgebäudes. Die KfW fördert sowohl Sanierungen bestehender
            Gebäude als auch klimafreundliche Neubauten, die den jeweiligen Standard nachweislich
            erreichen. Für alle Förderanträge ist die Einbindung eines zugelassenen
            Energieeffizienz-Experten als Sachverständiger verpflichtend.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Effizienzhaus-Standard: EH 40, EH 55, EH 85 – welcher ist richtig?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Der Effizienzhaus-Standard 40 ist der ambitionierteste und am höchsten geförderte
            Standard – er ist Pflichtvoraussetzung für den KfW-Klimabonus und maximiert die
            Fördersumme pro Wohneinheit. Effizienzhaus 55 ist der am häufigsten angestrebte
            Sanierungsstandard, da er für die meisten Bestandsgebäude wirtschaftlich erreichbar ist
            und bereits hohe Förderungen auslöst. Effizienzhaus 85 ist ein Einstiegsstandard, der
            für Gebäude mit schlechtem Ausgangszustand als erste Stufe sinnvoll sein kann. Welcher
            Standard für Ihr Gebäude sinnvoll und wirtschaftlich ist, ermittelt Christopher Bless
            in einer Vorabanalyse – als Grundlage für einen möglichen{" "}
            <Link href="/leistungen/sanierungsfahrplan" style={{ color: "var(--color-primary)" }}>
              Sanierungsfahrplan (iSFP)
            </Link>.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wie hoch ist die KfW-Förderung 2024 für Effizienzhaus-Sanierung?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Im Rahmen des BEG Wohngebäude (BEG WG) fördert die KfW die Sanierung auf
            Effizienzhaus-Niveau mit Zuschüssen von bis zu 45.000 € pro Wohneinheit bei EH 40
            Klimafreundlich Plus. Die Förderquote beträgt je nach Standard zwischen 15 % und 45 %
            der förderfähigen Kosten (maximal 150.000 € pro Wohneinheit). Zusätzlich kann ein
            Klimabonus von weiteren 5.000 € gewährt werden, wenn eine{" "}
            <Link href="/leistungen/lebenszyklusanalyse" style={{ color: "var(--color-primary)" }}>
              Lebenszyklusanalyse (LCA)
            </Link>{" "}
            nachweist, dass das Gebäude besonders geringe Treibhausgasemissionen aufweist. Der
            Antrag muss vor Baubeginn gestellt werden.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Energetische Baubegleitung – was macht der Sachverständige?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Als Energetischer Sachverständiger (auch: Energieeffizienz-Experte für Bundesförderung)
            übernimmt Christopher Bless in Mönchengladbach die gesamte KfW-Pflichtbegleitung: die
            Bestätigung zum Antrag (BzA) vor Baubeginn, regelmäßige Baubesuche zur
            Qualitätssicherung kritischer Details wie{" "}
            <Link href="/leistungen/waermeschutznachweis" style={{ color: "var(--color-primary)" }}>
              Wärmeschutz
            </Link>{" "}
            und Luftdichtheit sowie die Bestätigung nach Durchführung (BnD) zum Abschluss der
            Maßnahmen. Ohne diese Bestätigungen wird die KfW-Förderung nicht ausgezahlt. Die
            energetische Baubegleitung ist ihrerseits durch die BAFA mit bis zu 50 % der Kosten
            förderfähig.
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
          Effizienzhaus-Begleitung anfragen
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
          Kostenlose Erstberatung – wir ermitteln Ihren möglichen Effizienzhaus-Standard und die
          maximale Förderung.
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
