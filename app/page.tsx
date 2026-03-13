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
    subtitle: "nach DIN TS 12831",
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
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12h24M10 12v16M22 12v16M4 20h6M22 20h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Wärmeschutznachweis",
    subtitle: "Gebäudeklassen 1 & 2",
    description: "Erstellung des baulichen Wärmeschutznachweises für Wohn- und Nichtwohngebäude der Gebäudeklassen 1 und 2.",
    href: "/leistungen#waermeschutz",
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
            padding: "1rem 2rem 1rem 4rem",
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

          {/* Right: illustration */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: "#F5F0E8",
                border: "1px solid var(--color-border)",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "4/3",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(45,80,22,0.1)",
              }}
            >
              <svg viewBox="0 0 420 315" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
                <rect width="420" height="315" fill="#F5F0E8" />

                {/* Sun */}
                <circle cx="370" cy="55" r="32" fill="#C8A87C" />
                <circle cx="352" cy="65" r="32" fill="none" stroke="#333" strokeWidth="2.5" />

                {/* Ground */}
                <line x1="20" y1="248" x2="400" y2="248" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />

                {/* Tree left */}
                <path d="M52,148 C65,142 73,164 70,196 C67,218 34,219 31,196 C28,164 39,142 52,148Z" fill="#6BBF35" stroke="#333" strokeWidth="2" />
                <line x1="38" y1="167" x2="62" y2="189" stroke="#333" strokeWidth="1.5" />
                <line x1="35" y1="190" x2="59" y2="212" stroke="#333" strokeWidth="1.5" />
                <line x1="52" y1="219" x2="52" y2="248" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />

                {/* House insulation layer (dashed, warm glow) */}
                <path d="M118,178 L118,246 L302,246 L302,178 L210,108 Z" fill="rgba(200,168,124,0.12)" stroke="#C8A87C" strokeWidth="1.5" strokeDasharray="5,4" strokeLinejoin="round" />

                {/* House main */}
                <path d="M130,185 L130,246 L290,246 L290,185" fill="#F5F0E8" stroke="#333" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {/* Roof */}
                <polyline points="118,189 210,118 302,189" fill="none" stroke="#333" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

                {/* Door */}
                <rect x="190" y="210" width="40" height="36" rx="2" fill="none" stroke="#333" strokeWidth="2" />
                <circle cx="225" cy="228" r="2.5" fill="#333" />

                {/* Window left */}
                <rect x="145" y="200" width="30" height="24" rx="2" fill="none" stroke="#333" strokeWidth="1.8" />
                <line x1="160" y1="200" x2="160" y2="224" stroke="#333" strokeWidth="1.2" />
                <line x1="145" y1="212" x2="175" y2="212" stroke="#333" strokeWidth="1.2" />

                {/* Window right */}
                <rect x="245" y="200" width="30" height="24" rx="2" fill="none" stroke="#333" strokeWidth="1.8" />
                <line x1="260" y1="200" x2="260" y2="224" stroke="#333" strokeWidth="1.2" />
                <line x1="245" y1="212" x2="275" y2="212" stroke="#333" strokeWidth="1.2" />

                {/* Heat arrows (showing energy saving) */}
                <g stroke="#C8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                  <line x1="315" y1="170" x2="332" y2="170" />
                  <polyline points="327,165 332,170 327,175" />
                  <line x1="315" y1="185" x2="332" y2="185" />
                  <polyline points="327,180 332,185 327,190" />
                  <line x1="315" y1="200" x2="332" y2="200" />
                  <polyline points="327,195 332,200 327,205" />
                </g>

                {/* Label: Wärmeschutz */}
                <rect x="334" y="158" width="72" height="56" rx="6" fill="var(--color-primary, #2D5016)" opacity="0.92" />
                <text x="370" y="177" textAnchor="middle" fill="#FAF7F2" fontSize="7.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">WÄRME</text>
                <text x="370" y="188" textAnchor="middle" fill="#FAF7F2" fontSize="7.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">SCHUTZ</text>
                <line x1="347" y1="194" x2="393" y2="194" stroke="rgba(250,247,242,0.3)" strokeWidth="1" />
                <text x="370" y="205" textAnchor="middle" fill="rgba(250,247,242,0.85)" fontSize="11" fontFamily="sans-serif" fontWeight="700">✓</text>

                {/* Clipboard person right */}
                <circle cx="88" cy="210" r="11" fill="none" stroke="#333" strokeWidth="2" />
                <line x1="88" y1="221" x2="88" y2="241" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="229" x2="75" y2="238" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="229" x2="101" y2="236" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="241" x2="82" y2="248" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="241" x2="94" y2="248" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                {/* Clipboard */}
                <rect x="100" y="226" width="14" height="18" rx="2" fill="none" stroke="#333" strokeWidth="1.8" />
                <rect x="104" y="223" width="6" height="5" rx="1" fill="none" stroke="#333" strokeWidth="1.5" />
                <line x1="102" y1="232" x2="112" y2="232" stroke="#333" strokeWidth="1.3" />
                <line x1="102" y1="237" x2="112" y2="237" stroke="#333" strokeWidth="1.3" />
                <line x1="102" y1="242" x2="108" y2="242" stroke="#333" strokeWidth="1.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* LEISTUNGEN */}
      <section ref={servicesRef} style={{ padding: "2rem 2rem", background: "var(--color-background)" }}>
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
