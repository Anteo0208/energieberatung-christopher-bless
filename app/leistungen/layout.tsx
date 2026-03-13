import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen – Energieberatung & Planung",
  description:
    "Unsere Leistungen: Heizlastberechnung nach DIN TS 12831, Hydraulischer Abgleich Verfahren B, Individueller Sanierungsfahrplan (iSFP), Einzelmaßnahmen und Effizienzhaus-Sanierung in Mönchengladbach.",
  keywords: [
    "Heizlastberechnung DIN TS 12831",
    "Hydraulischer Abgleich Verfahren B",
    "Sanierungsfahrplan iSFP",
    "Einzelmaßnahmen BAFA",
    "Effizienzhaus KfW",
    "Energieberatung Leistungen",
  ],
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/leistungen",
  },
  openGraph: {
    title: "Leistungen – Planungsbüro Bless",
    description:
      "Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan, Einzelmaßnahmen und Effizienzhaus – alle Leistungen des Planungsbüros Bless.",
    url: "https://www.planungsbuero-bless.de/leistungen",
  },
};

export default function LeistungenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
