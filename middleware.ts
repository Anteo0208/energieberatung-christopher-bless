// ============================================================
// Next.js Middleware – schützt /admin/* und /portal/* Routen
// Leitet nicht angemeldete Nutzer zu /login weiter
// ============================================================

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cookies im Request und Response setzen
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Session auffrischen – WICHTIG: keine anderen Aufrufe dazwischen!
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Geschützte Routen prüfen
  const isProtectedRoute =
    (pathname.startsWith('/admin') || pathname.startsWith('/portal')) &&
    !pathname.startsWith('/auth');

  if (isProtectedRoute && !user) {
    // Nicht eingeloggt → zu Login weiterleiten
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Wenn eingeloggt und auf /login → zu Portal weiterleiten
  if (pathname === '/login' && user) {
    const portalUrl = request.nextUrl.clone();
    portalUrl.pathname = '/portal';
    return NextResponse.redirect(portalUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Alle Routen außer statische Dateien und API-Routen
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
