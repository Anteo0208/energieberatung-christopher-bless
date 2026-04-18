// ============================================================
// Portal-Layout – ohne Haupt-Navbar und Footer
// Sauberes Layout mit Top-Navigationsbar für Kunden
// ============================================================

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import PortalNavbar from './PortalNavbar';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Profil laden für den Anzeigenamen
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company_name, email, role')
    .eq('id', user.id)
    .single();

  const displayName =
    profile?.full_name ||
    profile?.company_name ||
    user.email ||
    'Konto';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1F5F9' }}>
      <PortalNavbar displayName={displayName} />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
