'use client';

// ============================================================
// ConditionalLayout – zeigt Navbar/Footer nur auf Hauptseiten
// Portal-, Admin- und Login-Routen haben eigene Layouts
// ============================================================

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const PORTAL_ROUTES = ['/admin', '/portal', '/login'];

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Prüfen ob aktuelle Route eine Portal-Route ist
  const isPortalRoute = PORTAL_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPortalRoute) {
    // Portal-Routen: nur children, keine Haupt-Navigation
    return <>{children}</>;
  }

  // Hauptseite: mit Navbar und Footer
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
