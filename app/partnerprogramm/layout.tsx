import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerprogramm – Planungsbüro Bless",
  description: "Heizungsbauer-Portal: Kunden einfach und sicher an Planungsbüro Bless übermitteln.",
  robots: { index: false, follow: false },
};

export default function PartnerprogrammLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
