// ============================================================
// Login-Layout – ohne Haupt-Navbar und Footer
// ============================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anmelden – Planungsbüro Bless Portal',
  description: 'Melden Sie sich im Kundenportal an.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0F172A' }}
    >
      {children}
    </div>
  );
}
