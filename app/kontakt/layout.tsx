import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Beratungsgespräch anfragen",
  description:
    "Nehmen Sie Kontakt mit Planungsbüro Bless auf. Kostenloses Erstgespräch zur Energieberatung in Mönchengladbach und Umgebung. Antwort innerhalb von 24 Stunden.",
  keywords: [
    "Energieberater Kontakt",
    "Beratungsgespräch Energieberatung",
    "Energieberatung anfragen",
    "Planungsbüro Bless Kontakt",
    "Mönchengladbach Energieberatung",
  ],
  alternates: {
    canonical: "https://www.planungsbuero-bless.de/kontakt",
  },
  openGraph: {
    title: "Kontakt – Planungsbüro Bless",
    description:
      "Kostenloses Erstgespräch zur Energieberatung anfragen. Antwort innerhalb von 24 Stunden.",
    url: "https://www.planungsbuero-bless.de/kontakt",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
