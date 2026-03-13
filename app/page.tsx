"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4C16 4 8 10 8 18a8 8 0 0016 0c0-8-8-14-8-14z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 20v-6" strokeLinecap="round" />
        <path d="M13 17l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Heizlastberechnung",
    subtitle: "nach DIN TS 12831:2020",
    description: "Präzise Ermittlung des Wärmebedarfs Ihres Gebäudes als Grundlage für die optimale Heizungsauslegung.",
    href: "/leistungen#heizlast",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Hydraulischer Abgleich",
    subtitle: "Verfahren B",
    description: "Gleichmäßige Wärmeverteilung im gesamten Heizsystem – senkt Energieverbrauch und erhöht Komfort.",
    href: "/leistungen#hydraulik",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="20" height="20" rx="2" />
        <path d="M10 12h12M10 16h8M10 20h10" strokeLinecap="round" />
      </svg>
    ),
    title: "Sanierungsfahrplan",
    subtitle: "individuell & förderfähig",
    description: "Ihr persönlicher Stufenplan zur energetischen Sanierung – mit konkreten Maßnahmen und Förderoptionen.",
    href: "/leistungen#fahrplan",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 28V12l10-8 10 8v16" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="18" width="8" height="10" rx="1" />
      </svg>
    ),
    title: "Einzelmaßnahmen",
    subtitle: "Begleitung & Antragstellung",
    description: "Professionelle Begleitung bei der Umsetzung einzelner energetischer Maßnahmen – von der Planung bis zum Abschluss.",
    href: "/leistungen#einzelmassnahmen",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 28l6-8 6 4 6-10 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="8" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Effizienzhaus",
    subtitle: "Sanierung & Neubau",
    description: "Ganzheitliche Begleitung bei der Effizienzhaussanierung und Effizienzhaus-Neubauplanung bis zur Fertigstellung.",
    href: "/leistungen#effizienzhaus",
  },
];

const stats = [
  { value: "10", label: "Jahre Erfahrung" },
  { value: "100+", label: "Projekte abgeschlossen" },
  { value: "100%", label: "zertifiziert nach BAFA" },
];

function useInView(threshold = 0.15) {
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

export default function Home() {
  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "var(--color-background)",
          paddingTop: "72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(45,80,22,0.08) 0%, transparent 70%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(139,69,19,0.07) 0%, transparent 70%)",
            borderRadius: "40% 60% 30% 70% / 60% 40% 50% 50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "6rem 2rem 6rem 4rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            width: "100%",
          }}
          className="hero-grid"
        >
          <div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Energie sparen.
              <br />
              <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>
                Clever sanieren.
              </em>
              <br />
              Wert steigern.
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.75,
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Von der präzisen Heizlastberechnung bis zum individuellen Sanierungsfahrplan –
              ich begleite Sie auf dem Weg zum energieeffizienten Gebäude.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/kontakt"
                style={{
                  background: "var(--color-primary)",
                  color: "#FAF7F2",
                  padding: "0.85rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 20px rgba(45,80,22,0.25)",
                }}
              >
                Kostenlose Beratung anfragen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/leistungen"
                style={{
                  border: "2px solid var(--color-border)",
                  color: "var(--color-text)",
                  padding: "0.85rem 1.75rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Leistungen entdecken
              </Link>
            </div>
          </div>

          {/* Right: energy card visual */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "2.5rem",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 20px 60px rgba(45,80,22,0.1)",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Energieeffizienz-Klassen
                </div>
                {[
                  { label: "A+", width: "95%", color: "#1a6b1a" },
                  { label: "A", width: "80%", color: "#2D5016" },
                  { label: "B", width: "65%", color: "#5a8c2a" },
                  { label: "C", width: "50%", color: "#8fc34a" },
                  { label: "D", width: "38%", color: "#C8A96E" },
                ].map(({ label, width, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 500, width: "24px", color }}>
                      {label}
                    </span>
                    <div style={{ flex: 1, height: "8px", background: "var(--color-surface-dark)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width, background: color, borderRadius: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "var(--color-primary)",
                  color: "#FAF7F2",
                  borderRadius: "8px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7, marginBottom: "2px" }}>Ihr Einsparpotenzial</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700 }}>
                    bis zu 40%
                  </div>
                </div>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(250,247,242,0.6)" strokeWidth="1.5">
                  <path d="M18 8C18 8 10 14 10 22a8 8 0 0016 0c0-8-8-14-8-14z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} style={{ background: "var(--color-primary)", padding: "2.5rem 2rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
              }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "#FAF7F2", lineHeight: 1, marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "rgba(250,247,242,0.65)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEISTUNGEN */}
      <section ref={servicesRef} style={{ padding: "7rem 2rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
              Was ich anbiete
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                lineHeight: 1.2,
                maxWidth: "540px",
              }}
              className="line-accent"
            >
              Mein Leistungsspektrum
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className="service-card"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "2rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  opacity: servicesInView ? 1 : 0,
                  transform: servicesInView ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.2s, border-color 0.2s`,
                }}
              >
                <div style={{ color: "var(--color-primary)", marginBottom: "1.25rem", opacity: 0.85 }}>
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.25rem", lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "var(--color-secondary)", marginBottom: "0.9rem", letterSpacing: "0.04em" }}>
                  {service.subtitle}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                  {service.description}
                </p>
                <div style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  Mehr erfahren
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        style={{
          padding: "7rem 2rem",
          background: "var(--color-surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(45,80,22,0.025) 40px, rgba(45,80,22,0.025) 41px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1.5rem" }}>
            Nächster Schritt
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            Starten Sie jetzt Ihren
            <br />
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>individuellen Sanierungsfahrplan</em>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Gemeinsam analysieren wir Ihr Gebäude und entwickeln einen maßgeschneiderten Stufenplan –
            mit allen Fördermöglichkeiten, die Ihnen zustehen.
          </p>
          <Link
            href="/kontakt"
            style={{
              background: "var(--color-primary)",
              color: "#FAF7F2",
              padding: "1rem 2.5rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 8px 30px rgba(45,80,22,0.25)",
            }}
          >
            Jetzt Termin vereinbaren
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
        .service-card:hover {
          box-shadow: 0 12px 40px rgba(45,80,22,0.12) !important;
          border-color: var(--color-primary) !important;
          transform: translateY(-4px) !important;
        }
      `}</style>
    </>
  );
}
