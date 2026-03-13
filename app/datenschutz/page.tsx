import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz – Planungsbüro Bless",
};

export default function DatenschutzPage() {
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
        <div style={eyebrow}>Rechtliches</div>
        <h1 style={pageTitle}>Datenschutzerklärung</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* 1 */}
          <div>
            <h2 style={sectionHeading}>1. Verantwortlicher</h2>
            <p style={bodyText}>
              Planungsbüro Bless<br />
              Christopher Bless<br />
              Mülgaustraße 153a<br />
              41199 Mönchengladbach<br /><br />
              Telefon: <a href="tel:+491725377710" style={linkStyle}>0172 5377710</a><br />
              E-Mail: <a href="mailto:info@planungsbuero-bless.de" style={linkStyle}>info@planungsbuero-bless.de</a>
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 style={sectionHeading}>2. Grundsätzliches zur Datenverarbeitung</h2>
            <p style={bodyText}>
              Wir erheben und verwenden personenbezogene Daten unserer Nutzer grundsätzlich nur,
              soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte
              und Leistungen erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der
              Datenschutz-Grundverordnung (DSGVO) sowie des Bundesdatenschutzgesetzes (BDSG).
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 style={sectionHeading}>3. Hosting und Server-Logfiles</h2>
            <p style={bodyText}>
              Diese Website wird bei einem externen Dienstleister gehostet. Bei jedem Aufruf
              unserer Website werden automatisch folgende Daten durch den Webserver erfasst:
            </p>
            <ul style={{ ...bodyText, paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert)</li>
            </ul>
            <p style={{ ...bodyText, marginTop: "0.75rem" }}>
              Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen
              Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der sicheren und stabilen Bereitstellung der Website).
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 style={sectionHeading}>4. Kontaktformular und E-Mail-Kontakt</h2>
            <p style={bodyText}>
              Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, werden die von Ihnen
              übermittelten Daten (Name, E-Mail-Adresse, Telefonnummer, Nachricht) zwecks
              Bearbeitung Ihrer Anfrage bei uns gespeichert.
            </p>
            <p style={{ ...bodyText, marginTop: "0.75rem" }}>
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden
              gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen
              Aufbewahrungspflichten bestehen.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 style={sectionHeading}>5. Cookies</h2>
            <p style={bodyText}>
              Diese Website verwendet keine Tracking- oder Marketing-Cookies. Es werden
              ausschließlich technisch notwendige Cookies eingesetzt, die für den Betrieb
              der Website erforderlich sind. Diese Cookies werden nach Ende der Browsersitzung
              automatisch gelöscht. Eine Einwilligung ist hierfür nicht erforderlich
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 style={sectionHeading}>6. Ihre Rechte als betroffene Person</h2>
            <p style={bodyText}>Sie haben gegenüber uns folgende Rechte:</p>
            <ul style={{ ...bodyText, paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
              <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
              <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
              <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p style={{ ...bodyText, marginTop: "0.75rem" }}>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:info@planungsbuero-bless.de" style={linkStyle}>
                info@planungsbuero-bless.de
              </a>
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 style={sectionHeading}>7. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p style={bodyText}>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die zuständige
              Aufsichtsbehörde für Nordrhein-Westfalen ist die Landesbeauftragte für Datenschutz
              und Informationsfreiheit NRW (LDI NRW).
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 style={sectionHeading}>8. Datensicherheit</h2>
            <p style={bodyText}>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://"
              auf „https://" wechselt.
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

const eyebrow: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--color-secondary)",
  marginBottom: "1rem",
  fontWeight: 500,
};

const pageTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 700,
  color: "var(--color-text)",
  marginBottom: "3rem",
  lineHeight: 1.15,
};

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
