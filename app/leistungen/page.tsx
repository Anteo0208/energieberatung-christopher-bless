"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    id: "heizlast",
    number: "01",
    title: "Heizlastberechnung",
    norm: "nach DIN TS 12831",
    tagline: "Die Basis für jede effiziente Heizungsanlage",
    description: `Die Heizlastberechnung nach DIN TS 12831 ist das Fundament einer korrekt ausgelegten Heizungsanlage.
    Sie ermittelt präzise, wie viel Wärme ein Gebäude unter Normbedingungen maximal benötigt – Raum für Raum.`,
    details: [
      "Raumweise Berechnung des Wärmebedarfs",
      "Berücksichtigung von Gebäudehülle, Fensterqualität und Lüftung",
      "Grundlage für die korrekte Heizkörper- und Pumpendimensionierung",
      "Pflichtnachweis für Förderprogramme (BEG)",
      "Dokumentation nach aktuellem Normenstand",
    ],
    benefit: "Verhindert Über- oder Unterdimensionierung der Heizung",
    color: "#2D5016",
  },
  {
    id: "hydraulik",
    number: "02",
    title: "Hydraulischer Abgleich",
    norm: "Verfahren B",
    tagline: "Gleichmäßige Wärme in jedem Raum",
    description: `Der hydraulische Abgleich nach Verfahren B sorgt dafür, dass jeder Heizkörper im System
    genau die richtige Wassermenge erhält. Das Ergebnis: gleiche Raumtemperaturen überall, weniger Energieverbrauch
    und ein deutlich leistungsfähigeres Heizsystem.`,
    details: [
      "Raumweise Berechnung der erforderlichen Volumenströme",
      "Einstellung aller Thermostatventile nach Berechnung",
      "Optimierung der Heizungspumpe (Effizienzpumpe)",
      "Pflichtmaßnahme bei Heizungsförderung (BEG)",
      "Nachweis und Protokollierung für den Fördermittelantrag",
    ],
    benefit: "Reduziert Heizkosten um bis zu 15 %",
    color: "#2D5016",
  },
  {
    id: "fahrplan",
    number: "03",
    title: "Individueller Sanierungsfahrplan",
    norm: "iSFP nach GEG",
    tagline: "Ihr persönlicher Weg zur Energieeffizienz",
    description: `Der individuelle Sanierungsfahrplan (iSFP) ist Ihr maßgeschneiderter Leitfaden für die
    schrittweise energetische Sanierung Ihres Gebäudes. Er zeigt Ihnen, welche Maßnahmen in welcher
    Reihenfolge den größten Nutzen bringen – und welche Förderungen Ihnen zustehen.`,
    details: [
      "Vollständige Bestandsaufnahme und Energieanalyse Ihres Gebäudes",
      "Entwicklung eines individuellen Maßnahmenpakets in Stufen",
      "Wirtschaftlichkeitsberechnung für jede Maßnahme",
      "Übersicht aller aktuellen Förderprogramme (BAFA, KfW)",
      "5 % zusätzliche Förderung bei Umsetzung nach iSFP-Stufen",
    ],
    benefit: "+5 % Förderbonus bei stufenweiser Sanierung",
    color: "#2D5016",
  },
  {
    id: "einzelmassnahmen",
    number: "04",
    title: "Begleitung von Einzelmaßnahmen",
    norm: "BAFA-Antragstellung",
    tagline: "Vom Angebot bis zur Abrechnung",
    description: `Bei der Sanierung mit Einzelmaßnahmen begleite ich Sie durch den gesamten Prozess –
    von der ersten Beratung über die Beantragung von Fördermitteln bis zur abschließenden Dokumentation.
    Förderfähige Maßnahmen umfassen unter anderem Dämmung, Fenstererneuerung und Heizungstausch.`,
    details: [
      "Beratung zur optimalen Maßnahmenauswahl",
      "Erstellung der technischen Nachweise für BAFA/KfW",
      "Antragsstellung und Kommunikation mit Förderstellen",
      "Baubegleitende Qualitätssicherung",
      "Abschlussrechnung und Verwendungsnachweis",
    ],
    benefit: "Bis zu 20 % Zuschuss durch BAFA-Förderung",
    color: "#8B4513",
  },
  {
    id: "effizienzhaus",
    number: "05",
    title: "Effizienzhaus-Sanierung & Neubau",
    norm: "KfW-Effizienzhaus",
    tagline: "Ganzheitlich sanieren – maximal fördern",
    description: `Die Effizienzhaus-Sanierung ist die umfangreichste Form der energetischen Gebäudeverbesserung.
    Als zugelassener Energieberater begleite ich Sie von der Planung bis zur Fertigstellung –
    bei der Sanierung bestehender Gebäude ebenso wie beim energieeffizienten Neubau.`,
    details: [
      "Erstellung des Energieausweises und Nachweisplanung",
      "Planung und Koordination aller Gewerke",
      "Technische Baubegleitung nach KfW-Richtlinien",
      "Antragstellung für KfW-Bundesförderung (BEG WG/NWG)",
      "Abschlussdokumentation und Bestätigung nach Durchführung (BnD)",
    ],
    benefit: "Bis zu 45.000 € Zuschuss pro Wohneinheit",
    color: "#8B4513",
  },
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

export default function LeistungenPage() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);

  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          background: "var(--color-background)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: "linear-gradient(135deg, transparent 60%, rgba(45,80,22,0.04) 100%)",
            pointerEvents: "none",
          }}
        />
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
            Leistungsspektrum
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.15,
              maxWidth: "600px",
              marginBottom: "1.5rem",
            }}
          >
            Was ich für Sie
            <br />
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>leisten kann</em>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.75, maxWidth: "560px" }}>
            Als zertifizierter Energieberater biete ich Ihnen das gesamte Spektrum der energetischen
            Gebäudeberatung – von der Norm-Heizlastberechnung bis zur vollständigen Effizienzhaus-Begleitung.
          </p>
        </div>
      </section>

      {/* Service entries */}
      <section style={{ padding: "2rem 2rem 7rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          {services.map((service, i) => (
            <ServiceEntry key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "6rem 2rem",
          background: "var(--color-primary)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#FAF7F2",
              marginBottom: "1.25rem",
            }}
          >
            Fragen zu meinen Leistungen?
          </h2>
          <p style={{ color: "rgba(250,247,242,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Ich berate Sie gerne persönlich – kostenlos und unverbindlich.
          </p>
          <Link
            href="/kontakt"
            style={{
              background: "#FAF7F2",
              color: "var(--color-primary)",
              padding: "0.9rem 2.25rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Jetzt Kontakt aufnehmen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceEntry({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView(0.1);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      id={service.id}
      style={{
        background: expanded ? "var(--color-surface)" : "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, background 0.2s`,
        marginBottom: "1rem",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "1.5rem",
          alignItems: "center",
          textAlign: "left",
        }}
        className="service-button"
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
            opacity: 0.5,
            minWidth: "32px",
          }}
        >
          {service.number}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>
              {service.title}
            </h3>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: service.color, letterSpacing: "0.04em" }}>
              {service.norm}
            </span>
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
            {service.tagline}
          </div>
        </div>
        <div style={{ color: "var(--color-primary)", transition: "transform 0.2s", transform: expanded ? "rotate(45deg)" : "none" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 4v12M4 10h12" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div style={{ padding: "0 2rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="service-detail-grid">
          <div>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              {service.description}
            </p>
            <div
              style={{
                background: "var(--color-primary)",
                color: "#FAF7F2",
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2l1.5 4.5H14l-3.6 2.6 1.4 4.4L8 11 4.2 13.5l1.4-4.4L2 6.5h4.5L8 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {service.benefit}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              Leistungsumfang
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {service.details.map((detail) => (
                <li
                  key={detail}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "0.9rem",
                    color: "var(--color-text)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: service.color, flexShrink: 0, marginTop: "3px" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 7l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <style>{`
        .service-button:hover { background: rgba(45,80,22,0.03); }
        @media (max-width: 768px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
          .service-button { grid-template-columns: auto 1fr auto !important; gap: 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
