"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    href: "/leistungen/heizlastberechnung",
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
    href: "/leistungen/hydraulischer-abgleich",
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
    href: "/leistungen/sanierungsfahrplan",
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
    href: "/leistungen/einzelmassnahmen",
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
    href: "/leistungen/effizienzhaus",
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
    href: "/leistungen/waermeschutznachweis",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 26V10l10-6 10 6v16" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="4" />
        <path d="M16 6v6M16 20v6M6 16h6M20 16h6" strokeLinecap="round" />
      </svg>
    ),
    title: "Lebenszyklusanalyse (LCA)",
    subtitle: "DIN EN ISO 14040",
    description: "Ökologische Bewertung des Gebäudes über den gesamten Lebenszyklus – Pflichtnachweis für QNG-Siegel und KfW-Klimabonus.",
    href: "/leistungen/lebenszyklusanalyse",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <path d="M4 14h24M4 20h24" strokeLinecap="round" />
        <path d="M10 8v16M22 8v16" strokeLinecap="round" strokeDasharray="2,2" />
      </svg>
    ),
    title: "Wärmebrückenberechnung",
    subtitle: "DIN ISO 10211",
    description: "Präzise 2D/3D-Berechnung von Wärmebrücken für optimale Dämmung, Schimmelschutz und besseren Energieausweis.",
    href: "/leistungen/waermebruecken",
  },
];

const stats = [
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "100+", label: "Projekte abgeschlossen" },
  { value: "BAFA", label: "anerkannter Sachverständiger" },
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
          display: "grid",
          gridTemplateColumns: "55% 45%",
          position: "relative",
          overflow: "hidden",
          paddingTop: "88px",
        }}
        className="hero-grid"
      >
        {/* LEFT */}
        <div
          style={{
            padding: "5rem 3.5rem 4rem 3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-secondary)",
            }}
          >
            <span style={{ width: "28px", height: "1px", background: "var(--color-secondary)", display: "inline-block" }} />
            Energieberater Mönchengladbach
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              color: "var(--color-text)",
              marginBottom: "2rem",
            }}
          >
            Energie sparen.
            <br />
            <em style={{ fontStyle: "normal", color: "var(--color-primary)" }}>
              Clever sanieren.
            </em>
            <br />
            <span style={{ color: "#8B9180" }}>Wert steigern.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.75,
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            Von der Heizlastberechnung bis zum individuellen Sanierungsfahrplan —
            Ihr zertifizierter BAFA-Energieberater mit über 15 Jahren Erfahrung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}
          >
            <Link
              href="/kontakt"
              style={{
                background: "var(--color-primary)",
                color: "#FAF7F2",
                padding: "0.85rem 2rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "Arial, sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 6px 24px rgba(45,80,22,0.25)",
              }}
            >
              Kostenlose Beratung anfragen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/leistungen"
              style={{
                color: "var(--color-text)",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                borderBottom: "1.5px solid var(--color-border)",
                paddingBottom: "2px",
              }}
            >
              Leistungen entdecken
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — Framer Motion energy flow animation */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#F5F0E8",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: "60px",
              background: "linear-gradient(to right, #FAF7F2, transparent)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
          <svg
            viewBox="0 0 460 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient id="lg1" x1="0" y1="1" x2="0.4" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#2D5016" stopOpacity="0" />
                <stop offset="50%" stopColor="#2D5016" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6BBF35" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="1" x2="0.5" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#8B4513" stopOpacity="0" />
                <stop offset="60%" stopColor="#C8A96E" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="lg3" x1="0" y1="1" x2="0.6" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#6BBF35" stopOpacity="0" />
                <stop offset="100%" stopColor="#6BBF35" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="lg4" x1="0" y1="1" x2="0.5" y2="0" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#3D9BE9" stopOpacity="0" />
                <stop offset="100%" stopColor="#3D9BE9" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="bgGlow" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#2D5016" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="460" height="600" fill="url(#bgGlow)" />

            <g stroke="#C8BFB0" strokeWidth="0.4" strokeOpacity="0.25">
              <line x1="92" y1="0" x2="92" y2="600" />
              <line x1="184" y1="0" x2="184" y2="600" />
              <line x1="276" y1="0" x2="276" y2="600" />
              <line x1="368" y1="0" x2="368" y2="600" />
              <line x1="0" y1="150" x2="460" y2="150" />
              <line x1="0" y1="300" x2="460" y2="300" />
              <line x1="0" y1="450" x2="460" y2="450" />
            </g>

            <motion.path
              d="M 60 600 C 40 500 100 420 80 320 C 60 220 140 160 120 60"
              fill="none" stroke="url(#lg1)" strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3.5, ease: "easeInOut", delay: 0 }}
            />
            <motion.path
              d="M 160 600 C 145 510 200 430 185 330 C 170 230 240 165 225 65"
              fill="none" stroke="url(#lg3)" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M 300 600 C 275 510 340 420 320 320 C 300 220 370 155 355 55"
              fill="none" stroke="url(#lg2)" strokeWidth="3.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.9 }}
            />
            <motion.path
              d="M 420 600 C 400 510 445 430 430 340 C 415 250 455 180 445 80"
              fill="none" stroke="url(#lg4)" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 1.3 }}
            />
            <motion.path
              d="M 110 600 C 95 510 150 420 130 325 C 110 230 185 160 170 60"
              fill="none" stroke="#2D5016" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M 240 600 C 225 510 275 425 260 325 C 245 225 310 158 295 58"
              fill="none" stroke="#C8A96E" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.9 }}
            />

            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <path d="M 140 430 L 140 530 L 320 530 L 320 430" fill="rgba(45,80,22,0.12)" stroke="#2D5016" strokeWidth="2.2" strokeOpacity="0.45" strokeLinejoin="round" />
              <polyline points="126,436 230,345 334,436" fill="none" stroke="#2D5016" strokeWidth="2.2" strokeOpacity="0.45" strokeLinejoin="round" />
              <rect x="200" y="468" width="60" height="62" rx="2" fill="none" stroke="#2D5016" strokeWidth="1.5" strokeOpacity="0.35" />
              <rect x="150" y="472" width="36" height="28" rx="2" fill="none" stroke="#2D5016" strokeWidth="1.2" strokeOpacity="0.32" />
              <rect x="274" y="472" width="36" height="28" rx="2" fill="none" stroke="#2D5016" strokeWidth="1.2" strokeOpacity="0.32" />
            </motion.g>

            {[
              { cx: 75,  cy: 360, r: 6,   fill: "#2D5016", duration: 4.2, delay: 2.8 },
              { cx: 175, cy: 310, r: 4,   fill: "#6BBF35", duration: 5.0, delay: 3.1 },
              { cx: 310, cy: 375, r: 7,   fill: "#C8A96E", duration: 4.6, delay: 3.4 },
              { cx: 120, cy: 220, r: 4,   fill: "#6BBF35", duration: 3.9, delay: 3.8 },
              { cx: 260, cy: 200, r: 5,   fill: "#2D5016", duration: 5.2, delay: 4.1 },
              { cx: 400, cy: 290, r: 4,   fill: "#3D9BE9", duration: 4.4, delay: 4.5 },
              { cx: 50,  cy: 140, r: 3.5, fill: "#FFD700", duration: 4.0, delay: 4.9 },
              { cx: 345, cy: 180, r: 5,   fill: "#6BBF35", duration: 4.8, delay: 5.2 },
              { cx: 200, cy: 400, r: 4.5, fill: "#C8A96E", duration: 3.7, delay: 5.6 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.cx} cy={p.cy} r={p.r} fill={p.fill}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -90, opacity: [0, 0.65, 0.35, 0] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
              />
            ))}

            <text
              transform="rotate(-90,430,300)" x="430" y="300"
              textAnchor="middle" fill="#2D5016" fontSize="8"
              fontFamily="monospace" opacity="0.18" letterSpacing="4"
            >
              WÄRMEFLUSS · ENERGIE
            </text>
          </svg>
        </div>
      </section>


      {/* LEISTUNGEN */}
      <section ref={servicesRef} style={{ padding: "2rem 2rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
              Was wir anbieten
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
              Unser Leistungsspektrum
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
            Starten Sie jetzt
            <br />
            <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>Ihre Sanierung</em>
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
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 88px !important; }
          .hero-grid > div:last-child { display: none; }
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
