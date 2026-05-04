"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-NF73H3FG72";

export default function CookieBanner() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent") as "accepted" | "declined" | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${GA_ID}');
          `}</Script>
        </>
      )}

      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#1E3610",
            borderTop: "1px solid rgba(200,169,110,0.3)",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(250,247,242,0.85)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              maxWidth: "700px",
            }}
          >
            Wir nutzen Google Analytics, um die Nutzung unserer Website zu analysieren und zu verbessern.
            Ihre Daten werden anonymisiert verarbeitet.{" "}
            <a
              href="/datenschutz"
              style={{ color: "#C8A96E", textDecoration: "underline" }}
            >
              Datenschutzerklärung
            </a>
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                background: "transparent",
                border: "1px solid rgba(250,247,242,0.3)",
                color: "rgba(250,247,242,0.7)",
                padding: "0.5rem 1.25rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(250,247,242,0.6)";
                e.currentTarget.style.color = "#FAF7F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(250,247,242,0.3)";
                e.currentTarget.style.color = "rgba(250,247,242,0.7)";
              }}
            >
              Ablehnen
            </button>
            <button
              onClick={accept}
              style={{
                background: "#C8A96E",
                border: "1px solid #C8A96E",
                color: "#1E3610",
                padding: "0.5rem 1.25rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#b8995e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C8A96E";
              }}
            >
              Akzeptieren
            </button>
          </div>
        </div>
      )}
    </>
  );
}
