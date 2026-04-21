import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wärmeschutznachweis nach GEG – Mönchengladbach | Planungsbüro Bless",
  description:
    "Wärmeschutznachweis für Neubau und Sanierung in Mönchengladbach. Pflichtnachweis für Baugenehmigung und Förderanträge. GEG-konform, rechtssicher.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/waermeschutznachweis",
  },
};

const faqItems = [
  {
    question: "Wann brauche ich einen Wärmeschutznachweis?",
    answer:
      "Ein Wärmeschutznachweis ist bei Neubauten und wesentlichen Änderungen an Bestandsgebäuden gesetzlich vorgeschrieben. Er ist Teil des Baugenehmigungsverfahrens und wird auch für viele Förderprogramme benötigt.",
  },
  {
    question: "Was kostet ein Wärmeschutznachweis?",
    answer:
      "Je nach Gebäudegröße und Komplexität liegen die Kosten für ein Einfamilienhaus zwischen 400 und 900 €.",
  },
  {
    question: "Was ist der Unterschied zwischen Wärmeschutznachweis und Energieausweis?",
    answer:
      "Der Wärmeschutznachweis ist ein Pflichtdokument für die Baugenehmigung und belegt die Einhaltung der GEG-Anforderungen. Der Energieausweis ist ein Informationsdokument für Käufer und Mieter.",
  },
  {
    question: "Welche Gebäudeklassen decken Sie ab?",
    answer:
      "Wir erstellen Wärmeschutznachweise für Wohn- und Nichtwohngebäude der Gebäudeklassen 1 und 2 (bis zu zwei Vollgeschosse).",
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
    { "@type": "ListItem", position: 3, name: "Wärmeschutznachweis", item: "https://www.planungsbuero-bless.de/leistungen/waermeschutznachweis" },
  ],
};

export default function WaermeschutznachweisSeitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav
        style={{
          paddingTop: "200px",
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
          <span style={{ color: "var(--color-text)" }}>Wärmeschutznachweis</span>
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
            § 68 BauO NRW
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
            Wärmeschutznachweis nach GEG
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Rechtssicherer Pflichtnachweis für Baugenehmigung und Förderanträge
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
              Der Wärmeschutznachweis gemäß Gebäudeenergiegesetz (GEG) ist bei jedem Neubau und
              bei wesentlichen Änderungen am Bestand gesetzlich vorgeschrieben. Wir erstellen den
              Nachweis in Mönchengladbach rechtssicher und prüffähig – als Grundlage für die
              Baugenehmigung und für Förderanträge bei BAFA und KfW.
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
                GEG-konform und rechtssicher
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
                "Berechnung des Jahres-Primärenergiebedarfs (GEG § 15 / § 48)",
                "Nachweis der Mindest-Wärmedurchgangskoeffizienten (U-Werte)",
                "Sommerlicher Wärmeschutz nach GEG § 14",
                "Prüffähige Dokumentation für die Baubehörde",
                "Grundlage für KfW/BAFA-Förderanträge",
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
            Was ist ein Wärmeschutznachweis nach GEG?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Der Wärmeschutznachweis ist ein rechnerischer Nachweis, der belegt, dass ein Gebäude
            die energetischen Mindestanforderungen des Gebäudeenergiegesetzes (GEG) einhält. Er
            umfasst die Berechnung des Jahresprimärenergiebedarfs, die Einhaltung der
            Mindest-Wärmedurchgangskoeffizienten (U-Werte) für alle Bauteile der Gebäudehülle sowie
            den Nachweis des sommerlichen Wärmeschutzes. Der Nachweis ist Bestandteil der
            Bauvorlageberechtigung und muss der Baubehörde in prüffähiger Form vorgelegt werden.
            Er unterscheidet sich grundlegend vom Energieausweis: Während der Energieausweis ein
            Informationsdokument für Käufer und Mieter ist, ist der Wärmeschutznachweis ein
            behördlich geforderter Pflichtnachweis.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wann brauche ich einen Wärmeschutznachweis?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Ein Wärmeschutznachweis ist grundsätzlich bei Neubauten erforderlich – für Wohngebäude
            ebenso wie für Nichtwohngebäude. Darüber hinaus ist er bei wesentlichen Änderungen an
            Bestandsgebäuden notwendig: Dazu zählen Anbauten, Aufstockungen, Dachgeschossausbauten
            und umfangreiche Fassadensanierungen, bei denen mehr als 10 % der Bauteilfläche
            betroffen sind. Auch für die Beantragung von KfW-Effizienzhaus-Förderungen und
            BAFA-BEG-Mitteln ist der Wärmeschutznachweis als rechnerische Grundlage
            unverzichtbar – er bildet die Basis für die Bestätigung zum Antrag (BzA), ohne die
            kein{" "}
            <Link href="/leistungen/effizienzhaus" style={{ color: "var(--color-primary)" }}>
              Effizienzhaus-Förderantrag
            </Link>{" "}
            gestellt werden kann.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wärmeschutznachweis und Baugenehmigung in NRW
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            In Nordrhein-Westfalen regelt § 68 BauO NRW die Pflicht zur Vorlage bauordnungsrechtlicher
            Nachweise. Der Wärmeschutznachweis nach GEG gehört zu den prüfpflichtigen Standsicherheits-
            und Wärmeschutznachweisen, die spätestens mit dem Bauantrag bei der zuständigen Baubehörde
            eingereicht werden müssen. In Mönchengladbach ist das die Untere Bauaufsichtsbehörde.
            Planungsbüro Bless erstellt den Nachweis in einem Format, das die Anforderungen der
            nordrhein-westfälischen Bauaufsicht erfüllt und direkt als Anlage zum Bauantrag verwendet
            werden kann – rechtssicher und ohne Nachbesserungsbedarf.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Kosten und Ablauf des Wärmeschutznachweises
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Die Kosten für einen Wärmeschutznachweis liegen je nach Gebäudegröße und Komplexität
            zwischen 400 und 900 € netto für ein Einfamilienhaus. Der Ablauf bei Planungsbüro Bless:
            Zunächst werden alle Planungsunterlagen übermittelt (Grundrisse, Schnitte, Ansichten,
            Bauteilaufbauten). Christopher Bless erstellt daraus die vollständige Energiebilanz,
            prüft die GEG-Konformität und erstellt die prüffähige Dokumentation. Nach Freigabe
            durch den Auftraggeber wird der Nachweis dem Architekten oder direkt der Baubehörde
            zur Verfügung gestellt. Die Bearbeitungszeit beträgt in der Regel 5–10 Werktage nach
            Eingang aller vollständigen Unterlagen.
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
          Wärmeschutznachweis anfragen
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
          Senden Sie uns Ihre Planungsunterlagen – wir erstellen ein unverbindliches Angebot.
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
