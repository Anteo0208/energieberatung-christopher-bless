import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BAFA Einzelmaßnahmen Förderung – Mönchengladbach | Planungsbüro Bless",
  description:
    "Begleitung von Einzelmaßnahmen nach BEG EM in Mönchengladbach. BAFA-Antragstellung, technische Nachweise, bis zu 20 % Zuschuss. Jetzt Beratung anfragen.",
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen/einzelmassnahmen",
  },
};

const faqItems = [
  {
    question: "Welche Maßnahmen werden durch BAFA gefördert?",
    answer:
      "Gefördert werden u. a.: Dachdämmung, Fassadendämmung, Kellerdeckendämmung, Fenstererneuerung, Heizungstausch (Wärmepumpe, Pellets), Lüftungsanlage mit Wärmerückgewinnung und Heizungsoptimierung (hydraulischer Abgleich).",
  },
  {
    question: "Wie hoch ist die BAFA-Förderung für Einzelmaßnahmen?",
    answer:
      "Der Grundfördersatz beträgt 15 %. Mit einem gültigen iSFP erhalten Sie zusätzlich 5 % iSFP-Bonus, also insgesamt 20 % Zuschuss.",
  },
  {
    question: "Muss ich den Antrag vor Auftragserteilung stellen?",
    answer:
      "Ja, unbedingt. Der BAFA-Antrag muss vor der Beauftragung des Handwerkers gestellt werden. Wir übernehmen die Antragstellung für Sie.",
  },
  {
    question: "Was ist ein Energieeffizienz-Experte und warum brauche ich einen?",
    answer:
      "Für die meisten BEG-Fördermaßnahmen ist die Einbindung eines Energieeffizienz-Experten (EEE) gesetzlich vorgeschrieben. Wir übernehmen diese Rolle und erstellen alle erforderlichen Nachweise.",
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
    { "@type": "ListItem", position: 3, name: "Einzelmaßnahmen", item: "https://www.planungsbuero-bless.de/leistungen/einzelmassnahmen" },
  ],
};

export default function EinzelmassnahmenPage() {
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
          <span style={{ color: "var(--color-text)" }}>Einzelmaßnahmen</span>
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
            BAFA BEG EM
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
            Begleitung von Einzelmaßnahmen (BEG EM)
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "640px",
            }}
          >
            Vom Angebot bis zur Abrechnung – inkl. BAFA-Antragstellung
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
              Einzelmaßnahmen nach dem Bundesförderungsprogramm für effiziente Gebäude (BEG EM)
              bieten attraktive Zuschüsse für gezielte Sanierungsschritte. In Mönchengladbach
              begleitet Christopher Bless Eigentümer durch den gesamten Prozess – von der
              Antragstellung bis zur Verwendungsnachweis-Erstellung.
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
                Bis zu 20 % BAFA-Zuschuss inkl. iSFP-Bonus
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
                "Technische Beratung zur förderfähigen Maßnahme",
                "BAFA-Antragstellung vor Auftragserteilung",
                "Erstellung aller technischen Nachweise (Fachunternehmerbestätigung)",
                "Begleitung bis zur Auszahlung des Zuschusses",
                "Kombination mit iSFP für +5 % Förderbonus",
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
            Was sind BAFA Einzelmaßnahmen (BEG EM)?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Die Bundesförderung für effiziente Gebäude – Einzelmaßnahmen (BEG EM) ist das zentrale
            Förderprogramm der BAFA für gezielte Sanierungsmaßnahmen an bestehenden Wohn- und
            Nichtwohngebäuden. Anders als die KfW-Effizienzhaus-Förderung, die ein Gesamtpaket
            voraussetzt, können beim BEG EM einzelne Maßnahmen wie Dämmung, Fenster, Heizung oder
            Lüftung separat gefördert werden. Voraussetzung ist die Einbindung eines eingetragenen
            Energieeffizienz-Experten, der den Antrag stellt und die technischen Nachweise erbringt.
            Wichtig: Der Antrag muss zwingend vor der Beauftragung des ausführenden Handwerksbetriebs
            gestellt werden – ein nachträglicher Antrag wird von der BAFA nicht akzeptiert.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Welche Maßnahmen werden gefördert?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Das BEG EM fördert ein breites Spektrum an Sanierungsmaßnahmen: Gebäudehüllenmaßnahmen
            wie Dach-, Fassaden- und Kellerdeckendämmung sowie Fenstererneuerung, Anlagentechnik
            wie der Austausch von Heizkesseln gegen Wärmepumpen, Pelletheizungen oder
            Fernwärmeanschlüsse, Lüftungsanlagen mit Wärmerückgewinnung sowie die
            Heizungsoptimierung durch{" "}
            <Link href="/leistungen/hydraulischer-abgleich" style={{ color: "var(--color-primary)" }}>
              hydraulischen Abgleich
            </Link>.
            Auch Planungs- und Begleitkosten durch Energieeffizienz-Experten sind förderfähig.
            Nicht gefördert werden reine Instandhaltungsmaßnahmen ohne energetischen Mehrwert.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Wie hoch ist die BAFA-Förderung 2024?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Der Grundfördersatz im BEG EM beträgt 15 % der förderfähigen Nettoinvestitionskosten.
            Mit einem gültigen{" "}
            <Link href="/leistungen/sanierungsfahrplan" style={{ color: "var(--color-primary)" }}>
              Individuellen Sanierungsfahrplan (iSFP)
            </Link>{" "}
            erhöht sich die Förderung um 5 % auf insgesamt 20 % (iSFP-Bonus). Bei
            Heizungsmaßnahmen können durch den Heizungstausch-Bonus, den Einkommensbonus und den
            Klimageschwindigkeits-Bonus zusätzliche Prozentpunkte hinzukommen. Die maximale
            förderfähige Investitionssumme liegt bei 60.000 € pro Wohneinheit für Gebäudehülle und
            Anlagentechnik. Der Zuschuss wird direkt nach Einreichung des Verwendungsnachweises
            auf das Konto des Antragstellers überwiesen.
          </p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Ablauf der Förderbegleitung durch Planungsbüro Bless
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Christopher Bless übernimmt in Mönchengladbach die vollständige Förderbegleitung für
            BEG-Einzelmaßnahmen: Zunächst wird die geplante Maßnahme technisch bewertet und auf
            Förderfähigkeit geprüft. Danach stellt Planungsbüro Bless den Antrag im BAFA-Portal
            – bevor Sie einen Handwerker beauftragen. Nach Abschluss der Baumaßnahme erstellen wir
            alle erforderlichen technischen Bestätigungen (Fachunternehmerbestätigung,
            Energieberaterbestätigung) und reichen den Verwendungsnachweis ein. Die Auszahlung des
            Zuschusses erfolgt typischerweise innerhalb von 6–8 Wochen nach Nachweis.
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
          Jetzt Förderberatung anfragen
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
          Wir prüfen kostenlos Ihre Fördermöglichkeiten und übernehmen die Antragstellung.
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
