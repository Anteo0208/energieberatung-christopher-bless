"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const qualifications = [
  {
    label: "Gebäudeenergieberater (HWK)",
    detail: "Geprüft von der Handwerkskammer Düsseldorf",
    icon: "✦",
  },
  {
    label: "Eingetragener Energieeffizienz Experte",
    detail: "Listung in der Expertenliste für Förderprogramme des Bundes",
    icon: "✦",
  },
  {
    label: "Staatlich geprüfter Hochbautechniker",
    detail: "Fachkenntnisse in Baukonstruktion und Bauphysik",
    icon: "✦",
  },
];

const values = [
  {
    title: "Präzision",
    text: "Jede Berechnung, jede Empfehlung basiert auf normativen Grundlagen und aktuellen bauphysikalischen Erkenntnissen.",
  },
  {
    title: "Unabhängigkeit",
    text: "Wir sind keinem Hersteller oder Handwerker verpflichtet. Unsere Beratung orientiert sich ausschließlich an Ihren Interessen.",
  },
  {
    title: "Verlässlichkeit",
    text: "Von der ersten Beratung bis zum abschließenden Verwendungsnachweis stehen wir an Ihrer Seite.",
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

export default function UeberUnsPage() {
  const { ref: introRef, inView: introInView } = useInView();
  const { ref: valuesRef, inView: valuesInView } = useInView();
  const { ref: qualRef, inView: qualInView } = useInView();

  return (
    <>
      {/* Hero */}
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
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(45,80,22,0.05) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          {/* Text */}
          <div
            ref={introRef}
            style={{
              opacity: introInView ? 1 : 0,
              transform: introInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
              Über uns
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 700,
                color: "var(--color-text)",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Planungsbüro Bless –
              <br />
              <em style={{ color: "var(--color-primary)", fontStyle: "italic" }}>Ihr Energieberater</em>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Energieberatung ist mehr als das Ausfüllen von Förderanträgen. Es geht darum,
              Gebäude wirklich zu verstehen – die Physik, die Technik, die Menschen, die darin leben.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Mit über 15 Jahren Erfahrung in der energetischen Gebäudeberatung kennen wir die Fallstricke
              und Potenziale eines jeden Sanierungsprojekts. Wir beraten Sie nicht nur – wir begleiten Sie.
            </p>
            <Link
              href="/kontakt"
              style={{
                background: "var(--color-primary)",
                color: "#FAF7F2",
                padding: "0.85rem 1.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Beratungsgespräch vereinbaren
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Illustration */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                background: "#F5F0E8",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                aspectRatio: "4/5",
                maxWidth: "400px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/portrait.png.png"
                alt="Planungsbüro Bless – Christopher Bless"
                fill
                style={{ objectFit: "contain", objectPosition: "center center" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section
        ref={valuesRef}
        style={{ padding: "6rem 2rem", background: "var(--color-surface)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
              Unsere Grundsätze
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
              className="line-accent"
            >
              Wofür wir stehen
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {values.map((value, i) => (
              <div
                key={value.title}
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "2rem",
                  opacity: valuesInView ? 1 : 0,
                  transform: valuesInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    background: "var(--color-secondary)",
                    borderRadius: "2px",
                    marginBottom: "1.25rem",
                  }}
                />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem" }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifikationen */}
      <section
        ref={qualRef}
        style={{ padding: "6rem 2rem", background: "var(--color-background)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="qual-grid">
          <div
            style={{
              opacity: qualInView ? 1 : 0,
              transform: qualInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-secondary)", marginBottom: "1rem", fontWeight: 500 }}>
              Zertifizierungen
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: "1.5rem" }} className="line-accent">
              Qualifikationen
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.75 }}>
              Als zugelassenes Planungsbüro sind wir berechtigt, alle erforderlichen Nachweise
              und Bestätigungen für Förderprogramme von BAFA und KfW zu erstellen.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {qualifications.map((qual, i) => (
              <div
                key={qual.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1.25rem 1.5rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  opacity: qualInView ? 1 : 0,
                  transform: qualInView ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div style={{ color: "var(--color-primary)", fontSize: "1rem", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 2l2 6h6l-5 3.6 1.9 5.9L10 14l-4.9 3.5L7 11.6 2 8h6L10 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-text)" }}>{qual.label}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "2px" }}>{qual.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .qual-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </>
  );
}
