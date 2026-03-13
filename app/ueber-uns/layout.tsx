import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Zertifizierter Energieberater",
  description:
    "Planungsbüro Bless – Ihr zertifizierter Energieberater in Mönchengladbach. Gebäudeenergieberater (HWK), eingetragener Energieeffizienz Experte und staatlich geprüfter Hochbautechniker mit über 10 Jahren Erfahrung.",
  keywords: [
    "Energieberater Mönchengladbach",
    "Gebäudeenergieberater HWK",
    "Energieeffizienz Experte",
    "Christopher Bless",
    "Planungsbüro Bless",
  ],
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/ueber-uns",
  },
  openGraph: {
    title: "Über uns – Planungsbüro Bless",
    description:
      "Zertifizierter Energieberater mit über 10 Jahren Erfahrung. Gebäudeenergieberater (HWK), Eingetragener Energieeffizienz Experte, Staatlich geprüfter Hochbautechniker.",
    url: "https://www.planungsbuero-bless.de/ueber-uns",
  },
};

export default function UeberUnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
