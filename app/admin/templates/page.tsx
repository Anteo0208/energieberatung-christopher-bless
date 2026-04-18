'use client';

// ============================================================
// Vorlagenverwaltung – Admin-Bereich
// Erstellen und Verwalten von Projektvorlagen mit Aufgaben
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import Modal from '@/components/shared/Modal';
import type { Template, TemplateTask, TaskPriority } from '@/lib/types';

const PRIORITIES: TaskPriority[] = ['Niedrig', 'Mittel', 'Hoch'];

export default function TemplatesPage() {
  const supabase = createClient();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal-State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTasks, setFormTasks] = useState<TemplateTask[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fehler beim Laden der Vorlagen:', error);
    }
    setTemplates(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  function openCreateModal() {
    setEditingTemplate(null);
    setFormTitle('');
    setFormDescription('');
    setFormTasks([]);
    setFormError(null);
    setModalOpen(true);
  }

  function openEditModal(template: Template) {
    setEditingTemplate(template);
    setFormTitle(template.title);
    setFormDescription(template.description || '');
    setFormTasks(template.tasks_json || []);
    setFormError(null);
    setModalOpen(true);
  }

  function addTask() {
    setFormTasks((prev) => [
      ...prev,
      {
        title: '',
        description: '',
        priority: 'Mittel',
        order_index: prev.length,
      },
    ]);
  }

  function updateTask(index: number, updates: Partial<TemplateTask>) {
    setFormTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, ...updates } : task))
    );
  }

  function removeTask(index: number) {
    setFormTasks((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setFormError('Nicht eingeloggt.');
      setFormLoading(false);
      return;
    }

    // Leere Aufgabentitel entfernen
    const cleanedTasks = formTasks
      .filter((t) => t.title.trim())
      .map((t, i) => ({ ...t, title: t.title.trim(), order_index: i }));

    if (editingTemplate) {
      const { error } = await supabase
        .from('templates')
        .update({
          title: formTitle.trim(),
          description: formDescription.trim() || null,
          tasks_json: cleanedTasks,
        })
        .eq('id', editingTemplate.id);

      if (error) {
        setFormError('Fehler beim Aktualisieren: ' + error.message);
        setFormLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from('templates').insert({
        title: formTitle.trim(),
        description: formDescription.trim() || null,
        tasks_json: cleanedTasks,
        created_by: user.id,
      });

      if (error) {
        setFormError('Fehler beim Erstellen: ' + error.message);
        setFormLoading(false);
        return;
      }
    }

    setFormLoading(false);
    setModalOpen(false);
    loadTemplates();
  }

  async function handleDelete(templateId: string) {
    if (!confirm('Vorlage wirklich löschen?')) return;
    await supabase.from('templates').delete().eq('id', templateId);
    loadTemplates();
  }

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
          <h1 className="text-2xl font-bold text-slate-900">Vorlagen</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {templates.length} Vorlage{templates.length !== 1 ? 'n' : ''} verfügbar
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: '#3B82F6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Neue Vorlage
        </button>
      </div>

      {/* Vorlagenliste */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center py-16 text-center">
          <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <p className="text-slate-500 text-sm font-medium">Noch keine Vorlagen erstellt.</p>
          <p className="text-slate-400 text-xs mt-1">
            Erstellen Sie Vorlagen für wiederkehrende Projekttypen.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{template.title}</h3>
                    <p className="text-xs text-slate-400">Erstellt {formatDate(template.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(template)}
                    className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {template.description && (
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{template.description}</p>
              )}

              {/* Aufgaben-Vorschau */}
              <div className="space-y-1">
                {(template.tasks_json || []).slice(0, 3).map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    <span className="truncate">{task.title}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-xs flex-shrink-0"
                      style={{
                        backgroundColor:
                          task.priority === 'Hoch' ? '#FEF2F2' :
                          task.priority === 'Mittel' ? '#EFF6FF' : '#F8FAFC',
                        color:
                          task.priority === 'Hoch' ? '#DC2626' :
                          task.priority === 'Mittel' ? '#3B82F6' : '#64748B',
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
                {(template.tasks_json || []).length > 3 && (
                  <p className="text-xs text-slate-400 pl-3.5">
                    +{(template.tasks_json || []).length - 3} weitere Aufgaben
                  </p>
                )}
                {(template.tasks_json || []).length === 0 && (
                  <p className="text-xs text-slate-400">Keine Aufgaben definiert</p>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                {(template.tasks_json || []).length} Aufgabe{(template.tasks_json || []).length !== 1 ? 'n' : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vorlage Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTemplate ? 'Vorlage bearbeiten' : 'Neue Vorlage'}
        size="xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vorlagenname *</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
              placeholder="z.B. Individueller Sanierungsfahrplan (iSFP)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Beschreibung</label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={2}
              placeholder="Kurze Beschreibung..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Aufgaben */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Aufgaben</label>
              <button
                type="button"
                onClick={addTask}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Aufgabe hinzufügen
              </button>
            </div>

            {formTasks.length === 0 ? (
              <div
                className="rounded-lg border-2 border-dashed border-slate-200 p-4 text-center text-sm text-slate-400 cursor-pointer hover:border-blue-300 transition-colors"
                onClick={addTask}
              >
                Klicken, um die erste Aufgabe hinzuzufügen
              </div>
            ) : (
              <div className="space-y-2">
                {formTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <span className="text-xs text-slate-400 w-5 text-center">{index + 1}</span>
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTask(index, { title: e.target.value })}
                      placeholder="Aufgabentitel..."
                      className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(index, { priority: e.target.value as TaskPriority })}
                      className="px-2 py-1.5 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none bg-white"
                    >
                      {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {formError && (
            <div className="px-3 py-2.5 rounded-lg text-sm" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
              {formError}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={formLoading || !formTitle.trim()}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: '#3B82F6' }}
            >
              {formLoading ? 'Wird gespeichert...' : editingTemplate ? 'Speichern' : 'Erstellen'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
