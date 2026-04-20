import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-primary-dark, #1E3610)",
        color: "#FAF7F2",
        padding: "4rem 2rem 2rem",
        marginTop: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(250,247,242,0.15)",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Planungsbüro Bless
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "1.25rem",
            }}
          >
            Energieberatung
          </div>
          <p style={{ fontSize: "0.9rem", opacity: 0.75, lineHeight: 1.7 }}>
            Zertifizierter Energieberater für nachhaltige Gebäudesanierung und Effizienzoptimierung.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Image
              src="/dena.png"
              alt="Deutsche Energie-Agentur (dena)"
              width={240}
              height={96}
              style={{ objectFit: "contain", opacity: 0.85 }}
            />
          </div>
        </div>

        {/* Leistungen */}
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: "1.25rem",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Leistungen
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Heizlastberechnung", slug: "heizlastberechnung" },
              { label: "Hydraulischer Abgleich", slug: "hydraulischer-abgleich" },
              { label: "Sanierungsfahrplan", slug: "sanierungsfahrplan" },
              { label: "Einzelmaßnahmen", slug: "einzelmassnahmen" },
              { label: "Effizienzhaus", slug: "effizienzhaus" },
              { label: "Wärmeschutznachweis", slug: "waermeschutznachweis" },
              { label: "Lebenszyklusanalyse (LCA)", slug: "lebenszyklusanalyse" },
              { label: "Wärmebrückenberechnung", slug: "waermebruecken" },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/leistungen/${item.slug}`}
                  style={{
                    color: "rgba(250,247,242,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: "1.25rem",
            }}
          >
            Kontakt
          </div>
          <div style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: 2 }}>
            <div style={{ fontWeight: 600 }}>Planungsbüro Bless</div>
            <div>Christopher Bless</div>
            <div style={{ marginTop: "0.5rem", opacity: 0.9 }}>Mülgaustraße 153a</div>
            <div>41199 Mönchengladbach</div>
            <div style={{ marginTop: "0.5rem" }}>
              <a href="tel:+4917253777010" style={{ color: "rgba(250,247,242,0.8)", textDecoration: "none" }}>
                +49 172 5377710
              </a>
            </div>
            <div>
              <a href="mailto:info@planungsbuero-bless.de" style={{ color: "rgba(250,247,242,0.8)", textDecoration: "none" }}>
                info@planungsbuero-bless.de
              </a>
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <Link href="/kontakt" style={{ color: "var(--color-accent, #C8A96E)", textDecoration: "none" }}>
                Beratung anfragen →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.8rem",
          opacity: 0.5,
        }}
      >
        <span>© {new Date().getFullYear()} Planungsbüro Bless</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/impressum" style={{ color: "inherit", textDecoration: "none" }}>Impressum</Link>
          <Link href="/datenschutz" style={{ color: "inherit", textDecoration: "none" }}>Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
