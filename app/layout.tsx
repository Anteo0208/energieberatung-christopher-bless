import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Planungsbüro Bless – Energieberatung",
  description: "Professionelle Energieberatung: Heizlastberechnung, Hydraulischer Abgleich, Sanierungsfahrplan und Effizienzhaus-Begleitung. Planungsbüro Bless – Christopher Bless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
