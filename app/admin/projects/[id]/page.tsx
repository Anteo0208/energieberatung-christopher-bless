// ============================================================
// Projektdetail – Admin-Ansicht (Server Component)
// Zeigt Projektinfo, Aufgabenübersicht, Dateien, Aktivitäten
// ============================================================

import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import type { Task, ProjectFile, ActivityLog } from '@/lib/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Projektdaten laden
  const { data: project, error } = await supabase
    .from('projects')
    .select('*, client:profiles!projects_client_id_fkey(full_name, company_name, email)')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  // Aufgaben, Dateien und Aktivitäten parallel laden
  const [
    { data: tasks },
    { data: files },
    { data: activity },
  ] = await Promise.all([
    supabase
      .from('tasks')
      .select('*')
      .eq('project_id', id)
      .is('parent_task_id', null)
      .order('order_index'),
    supabase
      .from('files')
      .select('*, uploader:profiles(full_name)')
      .eq('project_id', id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('activity_log')
      .select('*, user:profiles(full_name)')
      .eq('project_id', id)
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  // Aufgaben-Statistiken berechnen
  const taskStats = {
    total: tasks?.length || 0,
    erledigt: tasks?.filter((t: Task) => t.status === 'Erledigt').length || 0,
    inBearbeitung: tasks?.filter((t: Task) => t.status === 'In Bearbeitung').length || 0,
    offen: tasks?.filter((t: Task) => t.status === 'Offen').length || 0,
  };

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/projects" className="hover:text-blue-600">Projekte</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate">{project.title}</span>
      </nav>

      {/* Projektkopf */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
            <p className="text-slate-500 text-sm mt-1">
              Kunde: <span className="font-medium text-slate-700">
                {project.client?.company_name || project.client?.full_name || project.client?.email || '—'}
              </span>
            </p>
          </div>
          <Badge status={project.status} />
        </div>

        {project.description && (
          <p className="text-slate-600 text-sm mb-4">{project.description}</p>
        )}

        {/* Fortschrittsbalken */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">Gesamtfortschritt</span>
            <span className="font-bold text-slate-900">{project.progress_percent}%</span>
          </div>
          <ProgressBar percent={project.progress_percent} size="lg" showLabel={false} />
        </div>

        {/* Meta-Daten */}
        <div className="flex flex-wrap gap-6 mt-5 pt-5 border-t border-slate-100 text-sm text-slate-500">
          <span>Erstellt: <span className="text-slate-700">{formatDate(project.created_at)}</span></span>
          <span>Aktualisiert: <span className="text-slate-700">{formatDate(project.updated_at)}</span></span>
        </div>

        {/* Aktionslinks */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/admin/projects/${id}/tasks`}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: '#3B82F6' }}
          >
            Aufgaben verwalten
          </Link>
          <Link
            href={`/admin/projects/${id}/files`}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Dateien verwalten
          </Link>
        </div>
      </div>

      {/* Aufgaben-Überblick + Dateien */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aufgaben */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Aufgaben</h2>
            <Link
              href={`/admin/projects/${id}/tasks`}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Alle →
            </Link>
          </div>
          <div className="p-5">
            {taskStats.total === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                Noch keine Aufgaben erstellt.
              </p>
            ) : (
              <>
                {/* Aufgaben-Statistiken */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Offen', value: taskStats.offen, color: '#64748B' },
                    { label: 'In Bearb.', value: taskStats.inBearbeitung, color: '#3B82F6' },
                    { label: 'Erledigt', value: taskStats.erledigt, color: '#22C55E' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p
                        className="text-2xl font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Aufgabenliste (kurz) */}
                <div className="space-y-2">
                  {(tasks as Task[]).slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-sm text-slate-700 truncate pr-3">{task.title}</span>
                      <Badge status={task.status} size="sm" />
                    </div>
                  ))}
                  {taskStats.total > 4 && (
                    <p className="text-xs text-slate-400 text-center pt-1">
                      +{taskStats.total - 4} weitere
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Aktuelle Dateien */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Dateien</h2>
            <Link
              href={`/admin/projects/${id}/files`}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Alle →
            </Link>
          </div>
          <div className="p-5">
            {!files || files.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                Noch keine Dateien hochgeladen.
              </p>
            ) : (
              <div className="space-y-2">
                {(files as (ProjectFile & { uploader: { full_name: string } | null })[]).map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 truncate font-medium">{file.file_name}</p>
                      <p className="text-xs text-slate-400">{formatFileSize(file.file_size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aktivitätsprotokoll */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Aktivitätsprotokoll</h2>
        </div>
        {!activity || activity.length === 0 ? (
          <div className="px-5 py-8 text-center text-slate-400 text-sm">
            Noch keine Aktivitäten protokolliert.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {(activity as (ActivityLog & { user: { full_name: string } | null })[]).map((log) => (
              <div key={log.id} className="flex gap-4 px-5 py-3.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#1E293B' }}
                >
                  {(log.user?.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{log.user?.full_name || 'Unbekannt'}</span>
                    {' – '}
                    {log.action}
                  </p>
                  {log.details && (
                    <p className="text-xs text-slate-500 mt-0.5">{log.details}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{formatDate(log.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
