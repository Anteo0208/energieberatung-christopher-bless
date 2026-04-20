"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BewertungPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href =
        "https://www.google.com/maps?cid=3137483827120784798&action=write_review";
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--color-background)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "520px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "var(--color-primary)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "1rem",
          }}
        >
          Ihre Erfahrung zählt
        </h1>

        <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
          Vielen Dank, dass Sie sich die Zeit nehmen. Ihre Bewertung hilft anderen Hausbesitzern,
          den richtigen Energieberater zu finden.
        </p>

        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "2rem" }}>
          Sie werden in Kürze zu Google weitergeleitet…
        </p>

        <a
          href="https://www.google.com/maps?cid=3137483827120784798&action=write_review"
          style={{
            background: "var(--color-primary)",
            color: "#FAF7F2",
            padding: "0.85rem 1.75rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          Jetzt bewerten
        </a>

        <div style={{ marginTop: "1.5rem" }}>
          <Link
            href="/"
            style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textDecoration: "none" }}
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
