// ============================================================
// Admin Dashboard – Server Component
// Zeigt Statistiken, aktuelle Projekte und Aktivitätsprotokoll
// ============================================================

import { createClient } from '@/lib/supabase-server';
import type { Project, ActivityLog } from '@/lib/types';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import Link from 'next/link';

// Stat-Karte
function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Statistiken laden
  const [
    { count: totalProjects },
    { count: activeProjects },
    { count: openTasks },
    { count: totalClients },
    { data: recentProjects },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .in('status', ['In Bearbeitung', 'Planung']),
    supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .in('status', ['Offen', 'In Bearbeitung']),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'client'),
    supabase
      .from('projects')
      .select('*, client:profiles(full_name, company_name, email)')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('activity_log')
      .select('*, user:profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  // Datum formatieren
  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function formatRelativeTime(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 2) return 'Gerade eben';
    if (minutes < 60) return `vor ${minutes} Minuten`;
    if (hours < 24) return `vor ${hours} Stunden`;
    return `vor ${days} Tagen`;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Seitenkopf */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Willkommen zurück – hier ist eine Übersicht aller Aktivitäten.
        </p>
      </div>

      {/* Statistik-Karten */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Projekte gesamt"
          value={totalProjects ?? 0}
          color="#3B82F6"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          }
        />
        <StatCard
          title="Aktive Projekte"
          value={activeProjects ?? 0}
          color="#F59E0B"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          title="Offene Aufgaben"
          value={openTasks ?? 0}
          color="#EF4444"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <StatCard
          title="Kunden gesamt"
          value={totalClients ?? 0}
          color="#22C55E"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>

      {/* Inhalt: Projekte + Aktivitäten */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktuelle Projekte */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Aktuelle Projekte</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Alle anzeigen →
            </Link>
          </div>
          {!recentProjects || recentProjects.length === 0 ? (
            <div className="px-5 py-10 text-center text-slate-400 text-sm">
              Noch keine Projekte vorhanden.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {(recentProjects as (Project & { client: { full_name: string; company_name: string; email: string } | null })[]).map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {project.client?.company_name || project.client?.full_name || project.client?.email || '–'} · {formatDate(project.updated_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-24">
                      <ProgressBar percent={project.progress_percent} size="sm" />
                    </div>
                    <span className="text-xs text-slate-500 w-8 text-right">
                      {project.progress_percent}%
                    </span>
                    <Badge status={project.status} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Aktivitätsprotokoll */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Letzte Aktivitäten</h2>
          </div>
          {!recentActivity || recentActivity.length === 0 ? (
            <div className="px-5 py-10 text-center text-slate-400 text-sm">
              Noch keine Aktivitäten protokolliert.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {(recentActivity as (ActivityLog & { user: { full_name: string } | null })[]).map((log) => (
                <div key={log.id} className="px-5 py-3">
                  <p className="text-sm text-slate-700 leading-snug">{log.action}</p>
                  {log.details && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{log.details}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    {log.user?.full_name || 'Unbekannt'} · {formatRelativeTime(log.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
