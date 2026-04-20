import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Energieberater Mönchengladbach | BAFA & KfW Förderung anfragen",
  description:
    "Energieberater Kosten Mönchengladbach – jetzt kostenloses Erstgespräch anfragen. BAFA Zuschuss Energieberatung beantragen, iSFP Förderung 2026, KfW Fördermittel Heizungstausch. Antwort in 24 Stunden.",
  keywords: [
    "Energieberater Kosten Mönchengladbach",
    "iSFP Förderung BAFA 2026",
    "BAFA Zuschuss Energieberatung beantragen",
    "KfW Fördermittel Heizungstausch Beratung",
    "Energieberatung anfragen Mönchengladbach",
    "Sanierungsfahrplan erstellen lassen Mönchengladbach",
    "Energieberater Kontakt",
    "Planungsbüro Bless Kontakt",
  ],
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/kontakt",
  },
  openGraph: {
    title: "Kontakt – Energieberater Mönchengladbach | BAFA & KfW Förderung anfragen",
    description:
      "Kostenloses Erstgespräch zur Energieberatung anfragen. BAFA Zuschuss & KfW Förderung 2026 – Antwort innerhalb von 24 Stunden.",
    url: "https://www.planungsbuero-bless.de/kontakt",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kontakt – Planungsbüro Bless Mönchengladbach",
      },
    ],
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
