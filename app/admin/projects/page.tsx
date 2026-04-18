'use client';

// ============================================================
// Projektverwaltung – Admin-Bereich
// Zeigt alle Projekte mit Filtern und ermöglicht Erstellung
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import Modal from '@/components/shared/Modal';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import type { Project, Profile, ProjectStatus, Template } from '@/lib/types';

interface ProjectWithClient extends Omit<Project, 'client'> {
  client: Pick<Profile, 'full_name' | 'company_name' | 'email'> | null;
}

const PROJECT_STATUSES: ProjectStatus[] = [
  'Planung',
  'In Bearbeitung',
  'Warten auf Kunde',
  'Abgeschlossen',
];

export default function ProjectsPage() {
  const supabase = createClient();

  const [projects, setProjects] = useState<ProjectWithClient[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'Alle'>('Alle');
  const [clientFilter, setClientFilter] = useState<string>('Alle');

  // Neues Projekt Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState<ProjectStatus>('Planung');
  const [newClientId, setNewClientId] = useState('');
  const [newTemplateId, setNewTemplateId] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);

    const [
      { data: projectsData },
      { data: clientsData },
      { data: templatesData },
    ] = await Promise.all([
      supabase
        .from('projects')
        .select('*, client:profiles!projects_client_id_fkey(full_name, company_name, email)')
        .order('updated_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'client').order('full_name'),
      supabase.from('templates').select('*').order('title'),
    ]);

    setProjects((projectsData as ProjectWithClient[]) || []);
    setClients(clientsData || []);
    setTemplates(templatesData || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newClientId) {
      setCreateError('Bitte wählen Sie einen Kunden aus.');
      return;
    }
    setCreateLoading(true);
    setCreateError(null);

    // Aktuellen Nutzer ermitteln
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCreateError('Nicht eingeloggt.');
      setCreateLoading(false);
      return;
    }

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        title: newTitle.trim(),
        description: newDescription.trim() || null,
        status: newStatus,
        progress_percent: 0,
        client_id: newClientId,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      setCreateError('Fehler beim Erstellen des Projekts: ' + error.message);
      setCreateLoading(false);
      return;
    }

    // Vorlage anwenden (Aufgaben erstellen)
    if (newTemplateId && project) {
      const template = templates.find((t) => t.id === newTemplateId);
      if (template?.tasks_json?.length) {
        const tasksToInsert = template.tasks_json.map((task, index) => ({
          project_id: project.id,
          title: task.title,
          description: task.description || null,
          priority: task.priority,
          status: 'Offen' as const,
          order_index: task.order_index ?? index,
        }));
        await supabase.from('tasks').insert(tasksToInsert);
      }
    }

    // Aktivität protokollieren
    await supabase.from('activity_log').insert({
      project_id: project.id,
      user_id: user.id,
      action: 'Projekt erstellt',
      details: newTitle.trim(),
    });

    setCreateLoading(false);
    setCreateModalOpen(false);
    resetCreateForm();
    loadData();
  }

  function resetCreateForm() {
    setNewTitle('');
    setNewDescription('');
    setNewStatus('Planung');
    setNewClientId('');
    setNewTemplateId('');
    setCreateError(null);
  }

  // Projekte filtern
  const filteredProjects = projects.filter((p) => {
    const matchStatus = statusFilter === 'Alle' || p.status === statusFilter;
    const matchClient = clientFilter === 'Alle' || p.client_id === clientFilter;
    return matchStatus && matchClient;
  });

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <div className="p-6 space-y-5">
      {/* Seitenkopf */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projekte</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {projects.length} Projekt{projects.length !== 1 ? 'e' : ''} insgesamt
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: '#3B82F6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Neues Projekt
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'Alle')}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Alle">Alle Status</option>
          {PROJECT_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Alle">Alle Kunden</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name || c.company_name || c.email}
            </option>
          ))}
        </select>
      </div>

      {/* Projektliste */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center py-16 text-center">
          <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
          </svg>
          <p className="text-slate-500 text-sm font-medium">Keine Projekte gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900 leading-tight pr-2">
                  {project.title}
                </h3>
                <Badge status={project.status} size="sm" />
              </div>

              {project.description && (
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Fortschritt</span>
                  <span className="font-semibold text-slate-700">{project.progress_percent}%</span>
                </div>
                <ProgressBar percent={project.progress_percent} size="sm" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>
                  {project.client?.company_name || project.client?.full_name || project.client?.email || '—'}
                </span>
                <span>{formatDate(project.updated_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Neues Projekt Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => { setCreateModalOpen(false); resetCreateForm(); }}
        title="Neues Projekt erstellen"
        size="lg"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Projekttitel *</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              placeholder="z.B. iSFP – Familie Mustermann"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Beschreibung</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              placeholder="Kurze Beschreibung des Projekts..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kunde *</label>
              <select
                value={newClientId}
                onChange={(e) => setNewClientId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Kunde auswählen...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name || c.company_name || c.email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {templates.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Vorlage anwenden (optional)
              </label>
              <select
                value={newTemplateId}
                onChange={(e) => setNewTemplateId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Keine Vorlage</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          )}

          {createError && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm"
              style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
            >
              {createError}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => { setCreateModalOpen(false); resetCreateForm(); }}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={createLoading || !newTitle.trim() || !newClientId}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: '#3B82F6' }}
            >
              {createLoading ? 'Wird erstellt...' : 'Projekt erstellen'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
