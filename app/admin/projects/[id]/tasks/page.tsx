'use client';

// ============================================================
// Aufgabenverwaltung – Admin-Bereich
// Drag & Drop, Statusverwaltung, Unteraufgaben
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { createClient } from '@/lib/supabase';
import Modal from '@/components/shared/Modal';
import Badge from '@/components/shared/Badge';
import type { Task, TaskStatus, TaskPriority } from '@/lib/types';

const TASK_STATUSES: TaskStatus[] = ['Offen', 'In Bearbeitung', 'Warten', 'Erledigt'];
const TASK_PRIORITIES: TaskPriority[] = ['Niedrig', 'Mittel', 'Hoch'];

const statusColors: Record<TaskStatus, string> = {
  'Offen': '#F1F5F9',
  'In Bearbeitung': '#EFF6FF',
  'Warten': '#FFFBEB',
  'Erledigt': '#F0FDF4',
};

interface TaskWithSubtasks extends Task {
  subtasks?: Task[];
}

export default function TasksPage() {
  const params = useParams();
  const projectId = params.id as string;
  const supabase = createClient();

  const [tasks, setTasks] = useState<TaskWithSubtasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  // Modal-State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [parentTaskId, setParentTaskId] = useState<string | null>(null);

  // Formularfelder
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<TaskStatus>('Offen');
  const [formPriority, setFormPriority] = useState<TaskPriority>('Mittel');
  const [formDueDate, setFormDueDate] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index');

    if (error) {
      console.error('Fehler beim Laden der Aufgaben:', error);
      setLoading(false);
      return;
    }

    // Aufgaben und Unteraufgaben strukturieren
    const mainTasks = (data || []).filter((t) => !t.parent_task_id);
    const subTaskMap: Record<string, Task[]> = {};
    (data || [])
      .filter((t) => t.parent_task_id)
      .forEach((t) => {
        if (!subTaskMap[t.parent_task_id!]) subTaskMap[t.parent_task_id!] = [];
        subTaskMap[t.parent_task_id!].push(t);
      });

    setTasks(
      mainTasks.map((t) => ({
        ...t,
        subtasks: subTaskMap[t.id] || [],
      }))
    );
    setLoading(false);
  }, [supabase, projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Drag & Drop Ende
  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    // Reihenfolge lokal aktualisieren
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
    setTasks(reordered);

    // Reihenfolge in DB speichern
    const updates = reordered.map((task, index) =>
      supabase.from('tasks').update({ order_index: index }).eq('id', task.id)
    );
    await Promise.all(updates);
  }

  // Aufgaben nach Status gruppieren
  const tasksByStatus = TASK_STATUSES.reduce<Record<TaskStatus, TaskWithSubtasks[]>>(
    (acc, status) => {
      acc[status] = tasks.filter((t) => t.status === status);
      return acc;
    },
    {} as Record<TaskStatus, TaskWithSubtasks[]>
  );

  function openCreateModal(pid: string | null = null) {
    setEditingTask(null);
    setParentTaskId(pid);
    setFormTitle('');
    setFormDescription('');
    setFormStatus('Offen');
    setFormPriority('Mittel');
    setFormDueDate('');
    setFormError(null);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setParentTaskId(task.parent_task_id);
    setFormTitle(task.title);
    setFormDescription(task.description || '');
    setFormStatus(task.status);
    setFormPriority(task.priority);
    setFormDueDate(task.due_date || '');
    setFormError(null);
    setModalOpen(true);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (editingTask) {
      // Aufgabe aktualisieren
      const { error } = await supabase
        .from('tasks')
        .update({
          title: formTitle.trim(),
          description: formDescription.trim() || null,
          status: formStatus,
          priority: formPriority,
          due_date: formDueDate || null,
        })
        .eq('id', editingTask.id);

      if (error) {
        setFormError('Fehler beim Aktualisieren: ' + error.message);
        setFormLoading(false);
        return;
      }

      if (user) {
        await supabase.from('activity_log').insert({
          project_id: projectId,
          task_id: editingTask.id,
          user_id: user.id,
          action: 'Aufgabe aktualisiert',
          details: formTitle.trim(),
        });
      }
    } else {
      // Neue Aufgabe erstellen
      const maxIndex = tasks.length;
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert({
          project_id: projectId,
          title: formTitle.trim(),
          description: formDescription.trim() || null,
          status: formStatus,
          priority: formPriority,
          due_date: formDueDate || null,
          parent_task_id: parentTaskId,
          order_index: parentTaskId ? 0 : maxIndex,
        })
        .select()
        .single();

      if (error) {
        setFormError('Fehler beim Erstellen: ' + error.message);
        setFormLoading(false);
        return;
      }

      if (user && newTask) {
        await supabase.from('activity_log').insert({
          project_id: projectId,
          task_id: newTask.id,
          user_id: user.id,
          action: 'Aufgabe erstellt',
          details: formTitle.trim(),
        });
      }
    }

    setFormLoading(false);
    setModalOpen(false);
    loadTasks();
  }

  async function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    // Projekt-Fortschritt berechnen und aktualisieren
    const allTasks = [...tasks];
    const total = allTasks.length;
    const erledigt = allTasks.filter(
      (t) => (t.id === taskId ? newStatus : t.status) === 'Erledigt'
    ).length;
    const percent = total > 0 ? Math.round((erledigt / total) * 100) : 0;
    await supabase
      .from('projects')
      .update({ progress_percent: percent })
      .eq('id', projectId);
    loadTasks();
  }

  async function handleDeleteTask(taskId: string) {
    if (!confirm('Aufgabe wirklich löschen?')) return;
    await supabase.from('tasks').delete().eq('id', taskId);
    loadTasks();
  }

  function toggleExpand(taskId: string) {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  }

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/projects" className="hover:text-blue-600">Projekte</Link>
        <span>/</span>
        <Link href={`/admin/projects/${projectId}`} className="hover:text-blue-600">Projektdetail</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Aufgaben</span>
      </nav>

      {/* Seitenkopf */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Aufgaben</h1>
        <button
          onClick={() => openCreateModal(null)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: '#3B82F6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Neue Aufgabe
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        /* Aufgaben nach Status gruppiert */
        <div className="space-y-6">
          {TASK_STATUSES.map((status) => {
            const statusTasks = tasksByStatus[status];
            return (
              <div key={status}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge status={status} />
                  <span className="text-sm text-slate-500">
                    {statusTasks.length} Aufgabe{statusTasks.length !== 1 ? 'n' : ''}
                  </span>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2"
                        style={{ minHeight: '40px' }}
                      >
                        {statusTasks.length === 0 ? (
                          <div
                            className="rounded-xl p-4 text-center text-sm text-slate-400 border-2 border-dashed border-slate-200"
                          >
                            Keine Aufgaben
                          </div>
                        ) : (
                          statusTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(drag, snapshot) => (
                                <div
                                  ref={drag.innerRef}
                                  {...drag.draggableProps}
                                  className={`bg-white rounded-xl border border-slate-200 ${snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'}`}
                                >
                                  {/* Aufgaben-Kopf */}
                                  <div className="flex items-center gap-3 px-4 py-3">
                                    {/* Drag-Handle */}
                                    <div {...drag.dragHandleProps} className="cursor-grab text-slate-300 hover:text-slate-500 flex-shrink-0">
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 5a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zM9 11a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zM9 17a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                                      </svg>
                                    </div>

                                    {/* Checkbox */}
                                    <button
                                      onClick={() =>
                                        handleStatusChange(
                                          task.id,
                                          task.status === 'Erledigt' ? 'Offen' : 'Erledigt'
                                        )
                                      }
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                        task.status === 'Erledigt'
                                          ? 'border-green-500 bg-green-500'
                                          : 'border-slate-300 hover:border-green-400'
                                      }`}
                                    >
                                      {task.status === 'Erledigt' && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </button>

                                    {/* Titel */}
                                    <span
                                      className={`flex-1 text-sm font-medium ${
                                        task.status === 'Erledigt' ? 'line-through text-slate-400' : 'text-slate-800'
                                      }`}
                                    >
                                      {task.title}
                                    </span>

                                    {/* Priorität + Fälligkeitsdatum */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <Badge status={task.priority} size="sm" />
                                      {task.due_date && (
                                        <span className="text-xs text-slate-400">
                                          {new Date(task.due_date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                                        </span>
                                      )}
                                    </div>

                                    {/* Status-Änderung */}
                                    <select
                                      value={task.status}
                                      onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {TASK_STATUSES.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                      ))}
                                    </select>

                                    {/* Aktionen */}
                                    <div className="flex items-center gap-1">
                                      {/* Unteraufgabe hinzufügen */}
                                      {!task.parent_task_id && (
                                        <button
                                          onClick={() => openCreateModal(task.id)}
                                          title="Unteraufgabe hinzufügen"
                                          className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                          </svg>
                                        </button>
                                      )}
                                      <button
                                        onClick={() => openEditModal(task)}
                                        title="Bearbeiten"
                                        className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                      >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        title="Löschen"
                                        className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                      >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                      {/* Unteraufgaben ausklappen */}
                                      {(task.subtasks?.length || 0) > 0 && (
                                        <button
                                          onClick={() => toggleExpand(task.id)}
                                          className="p-1.5 rounded text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                          <svg
                                            className={`w-4 h-4 transition-transform ${expandedTasks.has(task.id) ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Unteraufgaben */}
                                  {(task.subtasks?.length || 0) > 0 && expandedTasks.has(task.id) && (
                                    <div
                                      className="border-t border-slate-100 pl-12 pr-4 py-2 space-y-1.5"
                                      style={{ backgroundColor: statusColors[status] }}
                                    >
                                      {task.subtasks!.map((sub) => (
                                        <div
                                          key={sub.id}
                                          className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-slate-100"
                                        >
                                          <button
                                            onClick={() =>
                                              handleStatusChange(
                                                sub.id,
                                                sub.status === 'Erledigt' ? 'Offen' : 'Erledigt'
                                              )
                                            }
                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                              sub.status === 'Erledigt'
                                                ? 'border-green-500 bg-green-500'
                                                : 'border-slate-300'
                                            }`}
                                          >
                                            {sub.status === 'Erledigt' && (
                                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                              </svg>
                                            )}
                                          </button>
                                          <span
                                            className={`flex-1 text-xs ${
                                              sub.status === 'Erledigt' ? 'line-through text-slate-400' : 'text-slate-700'
                                            }`}
                                          >
                                            {sub.title}
                                          </span>
                                          <Badge status={sub.status} size="sm" />
                                          <button
                                            onClick={() => openEditModal(sub)}
                                            className="p-1 rounded text-slate-300 hover:text-blue-500"
                                          >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                          </button>
                                          <button
                                            onClick={() => handleDeleteTask(sub.id)}
                                            className="p-1 rounded text-slate-300 hover:text-red-500"
                                          >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            );
          })}
        </div>
      )}

      {/* Aufgaben-Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'Aufgabe bearbeiten' : parentTaskId ? 'Unteraufgabe hinzufügen' : 'Neue Aufgabe'}
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Titel *</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
              placeholder="Aufgabentitel..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Beschreibung</label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={3}
              placeholder="Beschreibung (optional)..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TASK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priorität</label>
              <select
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fälligkeitsdatum</label>
              <input
                type="date"
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              {formLoading ? 'Wird gespeichert...' : editingTask ? 'Speichern' : 'Erstellen'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
