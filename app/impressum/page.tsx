import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – Planungsbüro Bless",
};

export default function ImpressumPage() {
  return (
    <section
      style={{
        paddingTop: "140px",
        paddingBottom: "8rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        background: "var(--color-background)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-secondary)",
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          Rechtliches
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "3rem",
            lineHeight: 1.15,
          }}
        >
          Impressum
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {/* Angaben gemäß § 5 TMG */}
          <div>
            <h2 style={sectionHeading}>Angaben gemäß § 5 TMG</h2>
            <p style={bodyText}>
              Planungsbüro Bless<br />
              Christopher Bless<br />
              Mülgaustraße 153a<br />
              41199 Mönchengladbach
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h2 style={sectionHeading}>Kontakt</h2>
            <p style={bodyText}>
              Telefon: <a href="tel:+491725377710" style={linkStyle}>0172 5377710</a><br />
              E-Mail: <a href="mailto:info@planungsbuero-bless.de" style={linkStyle}>info@planungsbuero-bless.de</a>
            </p>
          </div>

          {/* Umsatzsteuer */}
          <div>
            <h2 style={sectionHeading}>Umsatzsteuer-Identifikationsnummer</h2>
            <p style={bodyText}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              DE449623591
            </p>
          </div>

          {/* Berufsbezeichnung */}
          <div>
            <h2 style={sectionHeading}>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p style={bodyText}>
              Berufsbezeichnung: Energieberater<br />
              Zugelassen nach Marktstammdatenregister (MaStR)<br />
              BAFA-zugelassen (Bundesamt für Wirtschaft und Ausfuhrkontrolle)<br />
              KfW-Sachverständiger
            </p>
          </div>

          {/* Haftung für Inhalte */}
          <div>
            <h2 style={sectionHeading}>Haftung für Inhalte</h2>
            <p style={bodyText}>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p style={{ ...bodyText, marginTop: "0.75rem" }}>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          {/* Haftung für Links */}
          <div>
            <h2 style={sectionHeading}>Haftung für Links</h2>
            <p style={bodyText}>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
              Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
              waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </div>

          {/* Urheberrecht */}
          <div>
            <h2 style={sectionHeading}>Urheberrecht</h2>
            <p style={bodyText}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
          <Link
            href="/"
            style={{
              color: "var(--color-primary)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 7H2M6 3L2 7l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}

const sectionHeading: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "var(--color-text)",
  marginBottom: "0.75rem",
};

const bodyText: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "var(--color-text-muted)",
  lineHeight: 1.8,
};

const linkStyle: React.CSSProperties = {
  color: "var(--color-primary)",
  textDecoration: "none",
};
