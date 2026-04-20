import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lebenszyklusanalyse (LCA) Gebäude – QNG & KfW | Planungsbüro Bless",
  description:
    "Lebenszyklusanalyse (LCA) für Gebäude nach DIN EN ISO 14040. Pflichtnachweis für QNG-Siegel und KfW-Klimabonus. Treibhausgasberechnung, ÖKOBAUDAT.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/lebenszyklusanalyse",
  },
};

const faqItems = [
  {
    question: "Was ist eine Lebenszyklusanalyse (LCA)?",
    answer:
      "Die LCA (Life Cycle Assessment) bewertet die Umweltwirkungen eines Gebäudes über seinen gesamten Lebenszyklus: von der Herstellung der Baustoffe über die Nutzungsphase bis zum Rückbau.",
  },
  {
    question: "Wann ist eine LCA Pflicht?",
    answer:
      "Die LCA ist Pflichtbestandteil für das Qualitätssiegel Nachhaltiges Gebäude (QNG) und für die KfW-Förderung klimafreundlicher Neubauten (KfW 297/298).",
  },
  {
    question: "Was ist der KfW-Klimabonus?",
    answer:
      "Der KfW-Klimabonus ist eine zusätzliche Förderung für besonders klimafreundliche Neubauten. Voraussetzung ist u. a. eine Lebenszyklusanalyse, die nachweist, dass das Gebäude geringe Treibhausgasemissionen über seinen Lebenszyklus aufweist.",
  },
  {
    question: "Wie lange dauert eine LCA?",
    answer:
      "Nach Eingang aller Planungsunterlagen und Baustoffangaben erstellen wir die LCA in der Regel innerhalb von 5–10 Werktagen.",
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
    { "@type": "ListItem", position: 3, name: "Lebenszyklusanalyse", item: "https://www.planungsbuero-bless.de/leistungen/lebenszyklusanalyse" },
  ],
};

export default function LebenszyklusanalysePage() {
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
          <span style={{ color: "var(--color-text)" }}>Lebenszyklusanalyse</span>
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
            DIN EN ISO 14040
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
            Lebenszyklusanalyse (LCA) für Gebäude
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Pflichtnachweis für QNG-Siegel und KfW-Klimabonus
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
              Die Lebenszyklusanalyse (LCA) bewertet die Umweltwirkungen eines Gebäudes über
              seinen gesamten Lebenszyklus nach DIN EN ISO 14040/14044. Christopher Bless erstellt
              die LCA in Mönchengladbach auf Basis der ÖKOBAUDAT-Datenbank – als Pflichtnachweis
              für das QNG-Siegel und die KfW-Klimabonus-Förderung mit belastbaren Kennzahlen zu
              Treibhausgasemissionen und Primärenergiebedarf.
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
                Pflichtnachweis für KfW 297/298 und QNG
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
                "Treibhausgasberechnung (GWP) über den Lebenszyklus",
                "Primärenergieanalyse (nicht erneuerbar) nach ÖKOBAUDAT",
                "Berechnung weiterer Umweltindikatoren (ODP, AP, EP, POCP)",
                "Pflichtnachweis für QNG-Siegel (BNK-Kriteriensteckbrief)",
                "Dokumentation für KfW 297/298 Klimafreundlicher Neubau",
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
            Was ist eine Lebenszyklusanalyse (LCA) für Gebäude?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Die Lebenszyklusanalyse (LCA, Life Cycle Assessment) ist eine Methode zur systematischen
            Bewertung aller Umweltwirkungen eines Gebäudes – von der Herstellung der Baumaterialien
            über die Nutzungsphase bis zum Rückbau und der Entsorgung. Sie basiert auf der
            internationalen Norm DIN EN ISO 14040/14044 und bewertet Indikatoren wie das globale
            Erwärmungspotenzial (GWP), den Primärenergiebedarf, das Ozonabbaupotenzial (ODP),
            das Versauerungspotenzial (AP), das Eutrophierungspotenzial (EP) und das
            Sommersmogpotenzial (POCP) über einen definierten Betrachtungszeitraum von 50 Jahren.
            Für Gebäude liefert die LCA damit eine belastbare Aussage darüber, ob ein Bau
            tatsächlich klimafreundlich ist – jenseits des reinen Energieverbrauchs in der
            Nutzungsphase.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wann ist eine Ökobilanz für Gebäude Pflicht?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Eine Lebenszyklusanalyse ist Pflichtbestandteil für zwei wichtige Förderwege: Erstens
            für das Qualitätssiegel Nachhaltiges Gebäude (QNG), das vom Bundesministerium vergeben
            wird und selbst wieder Voraussetzung für die KfW-Förderung klimafreundlicher Neubauten
            (KfW 297/298) ist. Zweitens ist die LCA Pflichtnachweis für den KfW-Klimabonus, eine
            zusätzliche Förderung von bis zu 5.000 €, die gewährt wird, wenn das Gebäude besonders
            geringe Treibhausgasemissionen über den Lebenszyklus nachweist. Ohne eine fachgerecht
            erstellte LCA nach ÖKOBAUDAT-Datenbank ist weder das QNG-Siegel noch der Klimabonus
            erreichbar. Christopher Bless erstellt die LCA in Mönchengladbach mit anerkannter
            Berechnungssoftware.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            ÖKOBAUDAT: Die Datenbank für Baumaterialien
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            ÖKOBAUDAT ist die offizielle Referenzdatenbank des Bundesministeriums für Wohnen,
            Stadtentwicklung und Bauwesen für Ökobilanzdaten von Bauprodukten. Sie enthält
            Umweltdeklarationen (Environmental Product Declarations, EPDs) für tausende
            Baumaterialien – von Beton und Ziegel über Dämmstoffe bis hin zu Fenstern und
            Haustechnikanlagen. Für die LCA eines Gebäudes werden die eingesetzten Materialmengen
            mit den jeweiligen ÖKOBAUDAT-Werten verknüpft, um die gesamten Umweltwirkungen über
            den Lebenszyklus zu berechnen. Planungsbüro Bless verwendet stets die aktuell gültige
            ÖKOBAUDAT-Version, die von der KfW und den QNG-Auditoren anerkannt wird.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            LCA für QNG-Siegel und KfW-Klimabonus
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Wer beim Neubau den maximalen KfW-Zuschuss erhalten möchte, kommt an der LCA nicht
            vorbei. Das KfW-Programm 297/298 „Klimafreundlicher Neubau" fördert Neubauten, die
            sowohl den{" "}
            <Link href="/leistungen/effizienzhaus" style={{ color: "var(--color-primary)" }}>
              Effizienzhaus-40-Standard
            </Link>{" "}
            als auch die QNG-Nachhaltigkeitszertifizierung erreichen – letzte Voraussetzung ist
            eine nachgewiesene LCA. Der KfW-Klimabonus von 5.000 € pro Wohneinheit gilt
            zusätzlich für Gebäude mit besonders niedrigem Treibhausgasausstoß über den
            Lebenszyklus (Treibhausgasemissionsklasse A). Christopher Bless koordiniert in
            Mönchengladbach die LCA-Erstellung mit der energetischen Planung und dem
            QNG-Zertifizierungsaudit, sodass alle Nachweise aus einer Hand kommen.
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
          LCA-Berechnung anfragen
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
