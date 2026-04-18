'use client';

// ============================================================
// Kunden-Projektdetailseite – Lesezugriff
// Zeigt Fortschritt, Status-Timeline, Aufgaben und Dateien
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Badge from '@/components/shared/Badge';
import ProgressBar from '@/components/shared/ProgressBar';
import type { Task, ProjectFile, ActivityLog, Project, ProjectStatus } from '@/lib/types';

const STORAGE_BUCKET = 'project-files';

const STATUS_STEPS: ProjectStatus[] = [
  'Planung',
  'In Bearbeitung',
  'Warten auf Kunde',
  'Abgeschlossen',
];

type FileWithUploader = ProjectFile & {
  uploader: { full_name: string | null } | null;
};

type TaskWithSubtasks = Task & { subtasks?: Task[] };

export default function PortalProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const supabase = createClient();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<TaskWithSubtasks[]>([]);
  const [files, setFiles] = useState<FileWithUploader[]>([]);
  const [activity, setActivity] = useState<(ActivityLog & { user: { full_name: string | null } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const loadProject = useCallback(async () => {
    setLoading(true);

    const [
      { data: proj },
      { data: taskData },
      { data: fileData },
      { data: activityData },
    ] = await Promise.all([
      supabase.from('projects').select('*').eq('id', projectId).single(),
      supabase.from('tasks').select('*').eq('project_id', projectId).order('order_index'),
      supabase.from('files').select('*, uploader:profiles(full_name)').eq('project_id', projectId).order('created_at', { ascending: false }),
      supabase.from('activity_log').select('*, user:profiles(full_name)').eq('project_id', projectId).order('created_at', { ascending: false }).limit(15),
    ]);

    if (proj) {
      setProject(proj as Project);
    }

    // Aufgaben hierarchisch strukturieren
    const mainTasks = (taskData || []).filter((t) => !t.parent_task_id);
    const subMap: Record<string, Task[]> = {};
    (taskData || []).filter((t) => t.parent_task_id).forEach((t) => {
      if (!subMap[t.parent_task_id!]) subMap[t.parent_task_id!] = [];
      subMap[t.parent_task_id!].push(t);
    });
    setTasks(mainTasks.map((t) => ({ ...t, subtasks: subMap[t.id] || [] })));

    setFiles((fileData as FileWithUploader[]) || []);
    setActivity((activityData as (ActivityLog & { user: { full_name: string | null } | null })[]) || []);
    setLoading(false);
  }, [supabase, projectId]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  async function handleFileUpload(fileList: FileList) {
    if (!fileList.length) return;
    setUploading(true);
    setUploadError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploadError('Nicht eingeloggt.'); setUploading(false); return; }

    const results = await Promise.allSettled(
      Array.from(fileList).map(async (file) => {
        const uniqueName = `${projectId}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET).upload(uniqueName, file, { upsert: false });
        if (uploadError) throw new Error(uploadError.message);

        const { error: dbError } = await supabase.from('files').insert({
          project_id: projectId,
          uploaded_by: user.id,
          file_name: file.name,
          file_path: uniqueName,
          file_type: file.type || 'application/octet-stream',
          file_size: file.size,
        });
        if (dbError) throw new Error(dbError.message);

        await supabase.from('activity_log').insert({
          project_id: projectId,
          user_id: user.id,
          action: 'Dokument hochgeladen',
          details: file.name,
        });
      })
    );

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length) setUploadError(`${failures.length} Datei(en) konnten nicht hochgeladen werden.`);
    setUploading(false);
    loadProject();
  }

  async function handleDownload(file: ProjectFile) {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET).createSignedUrl(file.file_path, 60);
    if (error || !data) { alert('Download-Link konnte nicht erstellt werden.'); return; }
    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = file.file_name;
    a.click();
  }

  function toggleExpand(taskId: string) {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId); else next.add(taskId);
      return next;
    });
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Projekt nicht gefunden.</p>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(project.status);

  return (
    <div className="space-y-6">
      {/* Projektkopf mit großem Fortschrittsbalken */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
            {project.description && (
              <p className="text-slate-500 text-sm mt-1">{project.description}</p>
            )}
          </div>
          <Badge status={project.status} />
        </div>

        {/* Großer animierter Fortschrittsbalken */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-600">Gesamtfortschritt</span>
            <span
              className="text-4xl font-black leading-none"
              style={{ color: '#3B82F6' }}
            >
              {project.progress_percent}%
            </span>
          </div>
          <ProgressBar percent={project.progress_percent} size="lg" animated={true} />
        </div>

        {/* Status-Timeline */}
        <div className="relative">
          <div className="flex items-center justify-between relative">
            {/* Verbindungslinie */}
            <div
              className="absolute top-4 left-0 right-0 h-0.5"
              style={{ backgroundColor: '#E2E8F0' }}
            />
            <div
              className="absolute top-4 left-0 h-0.5 transition-all duration-1000"
              style={{
                backgroundColor: '#3B82F6',
                width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
              }}
            />

            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              return (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      backgroundColor: isCompleted || isCurrent ? '#3B82F6' : 'white',
                      borderColor: isCompleted || isCurrent ? '#3B82F6' : '#E2E8F0',
                    }}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isCurrent ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <span
                    className="text-xs mt-2 text-center max-w-20 leading-tight"
                    style={{
                      color: isCurrent ? '#1E293B' : isCompleted ? '#3B82F6' : '#94A3B8',
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aufgaben (schreibgeschützt) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Aufgaben</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {tasks.filter((t) => t.status === 'Erledigt').length} von {tasks.length} abgeschlossen
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="px-6 py-10 text-center text-slate-400 text-sm">
            Noch keine Aufgaben erstellt.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div key={task.id}>
                <div className="flex items-center gap-3 px-6 py-3.5">
                  {/* Status-Icon */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      task.status === 'Erledigt'
                        ? 'border-green-500 bg-green-500'
                        : task.status === 'In Bearbeitung'
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {task.status === 'Erledigt' && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {task.status === 'In Bearbeitung' && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>

                  <span
                    className={`flex-1 text-sm ${
                      task.status === 'Erledigt' ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                    }`}
                  >
                    {task.title}
                  </span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge status={task.status} size="sm" />
                    {task.due_date && (
                      <span className="text-xs text-slate-400 hidden sm:block">
                        bis {new Date(task.due_date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                      </span>
                    )}
                    {(task.subtasks?.length || 0) > 0 && (
                      <button
                        onClick={() => toggleExpand(task.id)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${expandedTasks.has(task.id) ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Unteraufgaben */}
                {(task.subtasks?.length || 0) > 0 && expandedTasks.has(task.id) && (
                  <div className="px-6 pb-2 pl-14 space-y-1.5 bg-slate-50">
                    {task.subtasks!.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-2.5 py-1.5">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            sub.status === 'Erledigt' ? 'border-green-500 bg-green-500' : 'border-slate-300'
                          }`}
                        >
                          {sub.status === 'Erledigt' && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs ${sub.status === 'Erledigt' ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                          {sub.title}
                        </span>
                        <Badge status={sub.status} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dateien */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Dokumente</h2>
        </div>

        {/* Upload */}
        <div className="px-6 pt-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files); }}
            onClick={() => document.getElementById('portal-file-input')?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-4 ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            <input
              id="portal-file-input"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
            {uploading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm text-slate-500">Wird hochgeladen...</span>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-slate-600 font-medium">Dokument hochladen</p>
                <p className="text-xs text-slate-400 mt-0.5">Dateien hier ablegen oder klicken</p>
              </>
            )}
          </div>

          {uploadError && (
            <div className="mb-4 px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
              {uploadError}
            </div>
          )}
        </div>

        {/* Dateiliste */}
        {files.length === 0 ? (
          <div className="px-6 pb-8 text-center text-slate-400 text-sm">
            Noch keine Dokumente vorhanden.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 px-6 pb-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 py-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{file.file_name}</p>
                  <p className="text-xs text-slate-400">
                    {formatFileSize(file.file_size)} · {formatDate(file.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aktivitätsfeed */}
      {activity.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Projektverlauf</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {activity.map((log) => (
              <div key={log.id} className="flex gap-4 px-6 py-3.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: '#1E293B' }}
                >
                  {(log.user?.full_name || 'P').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{log.user?.full_name || 'Planungsbüro Bless'}</span>
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
        </div>
      )}
    </div>
  );
}
