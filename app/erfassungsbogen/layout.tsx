import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erfassungsbogen",
  robots: { index: false, follow: false },
};

export default function ErfassungsbogenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
