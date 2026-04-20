import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen – Heizlastberechnung & iSFP Mönchengladbach",
  description:
    "Heizlastberechnung nach DIN EN 12831, Hydraulischer Abgleich Förderung, Wärmeschutznachweis für Förderanträge, Individueller Sanierungsfahrplan (iSFP) und Energetische Baubegleitung KfW – Planungsbüro Bless Mönchengladbach.",
  keywords: [
    "Heizlastberechnung nach DIN EN 12831",
    "Hydraulischer Abgleich Förderung",
    "Wärmeschutznachweis für Förderanträge",
    "Individueller Sanierungsfahrplan iSFP Vorteile",
    "Energetische Baubegleitung KfW",
    "iSFP Mönchengladbach",
    "Sanierungsfahrplan erstellen lassen Mönchengladbach",
    "Einzelmaßnahmen BAFA",
    "Effizienzhaus KfW",
    "Energieberatung Mönchengladbach",
  ],
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen",
  },
  openGraph: {
    title: "Leistungen – Heizlastberechnung & iSFP Mönchengladbach | Planungsbüro Bless",
    description:
      "Heizlastberechnung nach DIN EN 12831, Hydraulischer Abgleich, Wärmeschutznachweis, Sanierungsfahrplan (iSFP) und Energetische Baubegleitung KfW – alle Leistungen in Mönchengladbach.",
    url: "https://www.planungsbuero-bless.de/leistungen",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Leistungen – Planungsbüro Bless Mönchengladbach",
      },
    ],
  },
};

export default function LeistungenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
