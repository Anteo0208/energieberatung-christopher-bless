// ============================================================
// API-Route: Kunden per E-Mail einladen
// Verwendet den Service-Role-Key für Admin-Operationen
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, full_name, company_name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'E-Mail-Adresse ist erforderlich.' }, { status: 400 });
    }

    // Prüfen, ob der anfragende Nutzer ein Admin ist
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            } catch { /* ignorieren */ }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
    }

    // Rolle des anfragenden Nutzers prüfen
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Nur Admins können Einladungen senden.' }, { status: 403 });
    }

    // Admin-Client mit Service-Role-Key (für inviteUserByEmail)
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'SUPABASE_SERVICE_ROLE_KEY nicht konfiguriert.' },
        { status: 500 }
      );
    }

    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Nutzer einladen
    const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/portal`,
        data: {
          full_name: full_name || '',
          company_name: company_name || '',
          role: 'client',
        },
      }
    );

    if (inviteError) {
      return NextResponse.json({ error: inviteError.message }, { status: 400 });
    }

    // Profil mit Name und Firma aktualisieren (falls Daten vorhanden)
    if (inviteData.user && (full_name || company_name)) {
      await adminClient
        .from('profiles')
        .update({ full_name: full_name || null, company_name: company_name || null })
        .eq('id', inviteData.user.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Einladungsfehler:', error);
    return NextResponse.json({ error: 'Interner Serverfehler.' }, { status: 500 });
  }
}
