'use client';

// ============================================================
// Admin-Layout – ohne Haupt-Navbar und Footer
// Enthält die Admin-Sidebar und den Inhaltsbereich
// ============================================================

import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F1F5F9' }}>
      {/* Seitenleiste */}
      <Sidebar />

      {/* Hauptinhalt */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
