import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.planungsbuero-bless.de"),
  title: {
    default: "Energieberater Mönchengladbach – Planungsbüro Bless | iSFP & Sanierungsfahrplan",
    template: "%s | Planungsbüro Bless",
  },
  description:
    "Ihr Energieberater in Mönchengladbach: Sanierungsfahrplan (iSFP) erstellen lassen, Heizlastberechnung, Hydraulischer Abgleich & Effizienzhaus-Begleitung. BAFA Zuschuss bis zu 80 % – jetzt anfragen.",
  keywords: [
    "Energieberatung Mönchengladbach",
    "Energieberater Mönchengladbach",
    "iSFP Mönchengladbach",
    "Individueller Sanierungsfahrplan Mönchengladbach",
    "Sanierungsfahrplan erstellen lassen Mönchengladbach",
    "Energieeffizienz-Experte Mönchengladbach",
    "Heizlastberechnung nach DIN EN 12831",
    "Hydraulischer Abgleich Förderung",
    "Wärmeschutznachweis für Förderanträge",
    "Energetische Baubegleitung KfW",
    "Energieberater Kosten Mönchengladbach",
    "iSFP Förderung BAFA 2026",
    "BAFA Zuschuss Energieberatung beantragen",
    "KfW Fördermittel Heizungstausch Beratung",
    "Planungsbüro Bless",
    "Christopher Bless",
    "Gebäudeenergieberater HWK",
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
    title: "Energieberater Mönchengladbach – Planungsbüro Bless | iSFP & Sanierungsfahrplan",
    description:
      "Ihr Energieberater in Mönchengladbach: Sanierungsfahrplan (iSFP) erstellen lassen, Heizlastberechnung, Hydraulischer Abgleich & Effizienzhaus-Begleitung. BAFA Zuschuss bis zu 80 %.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Planungsbüro Bless – Energieberater Mönchengladbach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energieberater Mönchengladbach – Planungsbüro Bless | iSFP & Sanierungsfahrplan",
    description:
      "Ihr Energieberater in Mönchengladbach: Sanierungsfahrplan (iSFP) erstellen lassen, Heizlastberechnung, Hydraulischer Abgleich & Effizienzhaus-Begleitung. BAFA Zuschuss bis zu 80 %.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://www.planungsbuero-bless.de",
  },
};

const businessLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
  "@id": "https://www.planungsbuero-bless.de/#business",
  name: "Planungsbüro Bless",
  description:
    "Zertifizierter Energieberater in Mönchengladbach. Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan und Effizienzhaus-Begleitung.",
  url: "https://www.planungsbuero-bless.de",
  telephone: "+49 172 5377710",
  email: "info@planungsbuero-bless.de",
  image: "https://www.planungsbuero-bless.de/opengraph-image",
  logo: "https://www.planungsbuero-bless.de/opengraph-image",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Überweisung, Rechnung",
  foundingDate: "2010",
  founder: {
    "@id": "https://www.planungsbuero-bless.de/ueber-uns#christopher-bless",
  },
  employee: {
    "@id": "https://www.planungsbuero-bless.de/ueber-uns#christopher-bless",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mülgaustraße 153a",
    addressLocality: "Mönchengladbach",
    postalCode: "41199",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.16574,
    longitude: 6.45763,
  },
  areaServed: [
    {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.16574, longitude: 6.45763 },
      geoRadius: "80000",
    },
    { "@type": "City", name: "Mönchengladbach" },
    { "@type": "City", name: "Krefeld" },
    { "@type": "City", name: "Neuss" },
    { "@type": "City", name: "Viersen" },
    { "@type": "City", name: "Düsseldorf" },
  ],
  knowsAbout: [
    "Energieberatung Wohngebäude",
    "Heizlastberechnung nach DIN EN 12831",
    "Hydraulischer Abgleich Verfahren B",
    "Individueller Sanierungsfahrplan iSFP",
    "Wärmeschutznachweis GEG",
    "Energetische Baubegleitung KfW",
    "Effizienzhaus-Sanierung",
    "BAFA Förderanträge Energieberatung",
    "Wärmebrückenberechnung DIN ISO 10211",
    "Lebenszyklusanalyse DIN EN ISO 14040",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.planungsbuero-bless.de/#website",
  name: "Planungsbüro Bless",
  url: "https://www.planungsbuero-bless.de",
  description:
    "Zertifizierter Energieberater in Mönchengladbach – Heizlastberechnung, Sanierungsfahrplan, Hydraulischer Abgleich und Effizienzhaus-Begleitung.",
  inLanguage: "de-DE",
  publisher: {
    "@id": "https://www.planungsbuero-bless.de/#business",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
