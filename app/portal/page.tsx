// ============================================================
// Portal-Startseite – Server Component
// Admins werden zu /admin weitergeleitet
// Kunden sehen ihre Projekte als Karten
// ============================================================

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import type { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Profil laden (Rolle prüfen)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, company_name')
    .eq('id', user.id)
    .single();

  // Admins direkt zu /admin weiterleiten
  if (profile?.role === 'admin') {
    redirect('/admin');
  }

  // Projekte des Kunden laden
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Fehler beim Laden der Projekte:', error);
  }

  const clientProjects = (projects as Project[]) || [];
  const displayName = profile?.full_name || profile?.company_name || user.email || '';

  return (
    <div className="space-y-6">
      {/* Begrüßung */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Willkommen{displayName ? `, ${displayName}` : ''}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Hier finden Sie alle Ihre Projekte auf einen Blick.
        </p>
      </div>

      {/* Projekt-Übersicht */}
      {clientProjects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center py-20 text-center">
          <svg
            className="w-14 h-14 text-slate-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-slate-700 mb-1">
            Noch keine Projekte
          </h2>
          <p className="text-slate-400 text-sm max-w-xs">
            Sobald Ihnen ein Projekt zugewiesen wurde, erscheint es hier.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {clientProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portal/projects/${project.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all block"
            >
              {/* Status-Badge + Titel */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-semibold text-slate-900 text-base leading-tight pr-3">
                  {project.title}
                </h2>
                <Badge status={project.status} />
              </div>

              {project.description && (
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}

              {/* Großer Fortschrittsbalken */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">Fortschritt</span>
                  <span className="font-bold text-slate-900 text-lg leading-none">
                    {project.progress_percent}%
                  </span>
                </div>
                <ProgressBar
                  percent={project.progress_percent}
                  size="lg"
                  animated={true}
                />
              </div>

              {/* Datum */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                Zuletzt aktualisiert:{' '}
                {new Date(project.updated_at).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
