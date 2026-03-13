"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, box-shadow 0.3s",
        background: scrolled ? "rgba(250,248,244,0.95)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(154,146,136,0.2)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo.png.png"
            alt="Planungsbüro Bless"
            width={120}
            height={60}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.95rem",
                fontWeight: pathname === link.href ? 600 : 400,
                color: pathname === link.href ? "var(--color-primary)" : "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
                position: "relative",
              }}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--color-secondary)",
                    borderRadius: "1px",
                  }}
                />
              )}
            </Link>
          ))}
          <Link
            href="/kontakt"
            style={{
              background: "var(--color-primary)",
              color: "#FAF7F2",
              padding: "0.5rem 1.25rem",
              borderRadius: "4px",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s",
              letterSpacing: "0.02em",
            }}
          >
            Beratung anfragen
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "var(--color-primary)",
          }}
          className="show-mobile"
          aria-label="Menü öffnen"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-background)",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 2rem 1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--color-surface-dark)",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "1rem",
                fontWeight: pathname === link.href ? 600 : 400,
                color: pathname === link.href ? "var(--color-primary)" : "var(--color-text)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
