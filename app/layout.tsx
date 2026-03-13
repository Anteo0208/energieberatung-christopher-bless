import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.planungsbuero-bless.de"),
  title: {
    default: "Planungsbüro Bless – Energieberatung Mönchengladbach",
    template: "%s | Planungsbüro Bless",
  },
  description:
    "Zertifizierter Energieberater in Mönchengladbach: Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan (iSFP) und Effizienzhaus-Begleitung. BAFA & KfW zugelassen.",
  keywords: [
    "Energieberatung Mönchengladbach",
    "Energieberater",
    "Heizlastberechnung",
    "Hydraulischer Abgleich",
    "Sanierungsfahrplan",
    "iSFP",
    "Effizienzhaus",
    "BAFA",
    "KfW",
    "Planungsbüro Bless",
    "Christopher Bless",
    "Gebäudeenergieberater",
  ],
  authors: [{ name: "Christopher Bless", url: "https://www.planungsbuero-bless.de" }],
  creator: "Planungsbüro Bless",
  publisher: "Planungsbüro Bless",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.planungsbuero-bless.de",
    siteName: "Planungsbüro Bless",
    title: "Planungsbüro Bless – Energieberatung Mönchengladbach",
    description:
      "Zertifizierter Energieberater in Mönchengladbach: Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan und Effizienzhaus-Begleitung.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planungsbüro Bless – Energieberatung Mönchengladbach",
    description:
      "Zertifizierter Energieberater in Mönchengladbach: Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan und Effizienzhaus-Begleitung.",
  },
  alternates: {
    canonical: "https://www.planungsbuero-bless.de",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Planungsbüro Bless",
  description:
    "Zertifizierter Energieberater in Mönchengladbach. Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan und Effizienzhaus-Begleitung.",
  url: "https://www.planungsbuero-bless.de",
  telephone: "+491725377710",
  email: "info@planungsbuero-bless.de",
  founder: { "@type": "Person", name: "Christopher Bless" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mülgaustraße 153a",
    addressLocality: "Mönchengladbach",
    postalCode: "41199",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.1657,
    longitude: 6.4576,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.1657, longitude: 6.4576 },
    geoRadius: "80000",
  },
  serviceType: [
    "Heizlastberechnung",
    "Hydraulischer Abgleich",
    "Sanierungsfahrplan",
    "Energieberatung",
    "Effizienzhaus",
  ],
  hasCredential: [
    "Gebäudeenergieberater (HWK)",
    "Eingetragener Energieeffizienz Experte",
    "Staatlich geprüfter Hochbautechniker",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
