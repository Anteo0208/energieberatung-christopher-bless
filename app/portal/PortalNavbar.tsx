'use client';

// ============================================================
// Portal Top-Navbar – Client Component (Logout-Funktion)
// ============================================================

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

interface PortalNavbarProps {
  displayName: string;
}

export default function PortalNavbar({ displayName }: PortalNavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Marke */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ backgroundColor: '#1E293B' }}
          >
            PB
          </div>
          <span className="font-semibold text-slate-800 text-sm">
            Planungsbüro Bless
          </span>
          <span className="text-slate-300 text-sm hidden sm:block">|</span>
          <span className="text-slate-500 text-sm hidden sm:block">Kundenportal</span>
        </div>

        {/* Nutzer + Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: '#3B82F6' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              {displayName}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Abmelden
          </button>
        </div>
      </div>
    </header>
  );
}
