'use client';

// ============================================================
// Dateiverwaltung – Admin-Bereich
// Drag & Drop Upload, Dateiliste, Download und Löschen
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import type { ProjectFile } from '@/lib/types';

const STORAGE_BUCKET = 'project-files';

type FileWithUploader = ProjectFile & {
  uploader: { full_name: string | null } | null;
};

export default function FilesPage() {
  const params = useParams();
  const projectId = params.id as string;
  const supabase = createClient();

  const [files, setFiles] = useState<FileWithUploader[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('files')
      .select('*, uploader:profiles(full_name)')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fehler beim Laden der Dateien:', error);
    }
    setFiles((data as FileWithUploader[]) || []);
    setLoading(false);
  }, [supabase, projectId]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  async function uploadFiles(fileList: FileList) {
    if (!fileList.length) return;

    setUploading(true);
    setUploadError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setUploadError('Nicht eingeloggt.');
      setUploading(false);
      return;
    }

    const results = await Promise.allSettled(
      Array.from(fileList).map(async (file) => {
        // Dateiname mit Timestamp für Eindeutigkeit
        const uniqueName = `${projectId}/${Date.now()}_${file.name}`;

        // Zu Supabase Storage hochladen
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(uniqueName, file, { upsert: false });

        if (uploadError) throw new Error(uploadError.message);

        // Metadaten in DB speichern
        const { error: dbError } = await supabase.from('files').insert({
          project_id: projectId,
          uploaded_by: user.id,
          file_name: file.name,
          file_path: uniqueName,
          file_type: file.type || 'application/octet-stream',
          file_size: file.size,
        });

        if (dbError) throw new Error(dbError.message);

        // Aktivität protokollieren
        await supabase.from('activity_log').insert({
          project_id: projectId,
          user_id: user.id,
          action: 'Datei hochgeladen',
          details: file.name,
        });
      })
    );

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      setUploadError(`${failures.length} Datei(en) konnten nicht hochgeladen werden.`);
    }

    setUploading(false);
    loadFiles();
  }

  async function handleDownload(file: ProjectFile) {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(file.file_path, 60);

    if (error || !data) {
      alert('Download-Link konnte nicht erstellt werden.');
      return;
    }

    // Link öffnen
    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.download = file.file_name;
    a.click();
  }

  async function handleDelete(file: ProjectFile) {
    if (!confirm(`"${file.file_name}" wirklich löschen?`)) return;

    // Storage löschen
    await supabase.storage.from(STORAGE_BUCKET).remove([file.file_path]);

    // DB-Eintrag löschen
    await supabase.from('files').delete().eq('id', file.id);

    loadFiles();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getFileIcon(fileType: string) {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return '📊';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    return '📁';
  }

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/projects" className="hover:text-blue-600">Projekte</Link>
        <span>/</span>
        <Link href={`/admin/projects/${projectId}`} className="hover:text-blue-600">Projektdetail</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Dateien</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dateien</h1>
        <span className="text-sm text-slate-500">{files.length} Datei{files.length !== 1 ? 'en' : ''}</span>
      </div>

      {/* Upload-Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-300 hover:border-blue-300 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-slate-500">Wird hochgeladen...</p>
          </div>
        ) : (
          <>
            <svg
              className="w-12 h-12 mx-auto mb-3"
              style={{ color: dragOver ? '#3B82F6' : '#94A3B8' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium text-slate-700">
              Dateien hier ablegen oder klicken zum Auswählen
            </p>
            <p className="text-xs text-slate-400 mt-1">
              PDF, Word, Excel, Bilder – bis zu 50 MB je Datei
            </p>
          </>
        )}
      </div>

      {uploadError && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {uploadError}
        </div>
      )}

      {/* Dateiliste */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-500 text-sm font-medium">Noch keine Dateien vorhanden.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Dateiname</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Größe</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Hochgeladen von</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Datum</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getFileIcon(file.file_type)}</span>
                      <span className="text-sm font-medium text-slate-900 truncate max-w-xs">
                        {file.file_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {formatFileSize(file.file_size)}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {file.uploader?.full_name || '—'}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {formatDate(file.created_at)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownload(file)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(file)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
