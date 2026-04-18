'use client';

// ============================================================
// Kundenverwaltung – Admin-Bereich
// Zeigt alle Kunden und ermöglicht Einladungen
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import Modal from '@/components/shared/Modal';
import type { Profile } from '@/lib/types';

interface ClientWithProjects extends Profile {
  project_count?: number;
}

export default function ClientsPage() {
  const supabase = createClient();

  const [clients, setClients] = useState<ClientWithProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCompany, setInviteCompany] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadClients = useCallback(async () => {
    setLoading(true);

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'client')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fehler beim Laden der Kunden:', error);
      setLoading(false);
      return;
    }

    // Projektanzahl je Kunde laden
    if (profiles && profiles.length > 0) {
      const clientIds = profiles.map((p) => p.id);
      const { data: projectCounts } = await supabase
        .from('projects')
        .select('client_id')
        .in('client_id', clientIds);

      const countMap: Record<string, number> = {};
      projectCounts?.forEach((p) => {
        countMap[p.client_id] = (countMap[p.client_id] || 0) + 1;
      });

      setClients(
        profiles.map((p) => ({ ...p, project_count: countMap[p.id] || 0 }))
      );
    } else {
      setClients([]);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError(null);

    try {
      // Server Action aufrufen
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail.trim().toLowerCase(),
          full_name: inviteName.trim(),
          company_name: inviteCompany.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Einladung fehlgeschlagen');
      }

      setInviteSuccess(true);
      loadClients();
    } catch (err: unknown) {
      setInviteError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setInviteLoading(false);
    }
  }

  function resetInviteModal() {
    setInviteModalOpen(false);
    setInviteEmail('');
    setInviteName('');
    setInviteCompany('');
    setInviteSuccess(false);
    setInviteError(null);
  }

  // Kunden filtern
  const filteredClients = clients.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.email.toLowerCase().includes(term) ||
      (c.full_name || '').toLowerCase().includes(term) ||
      (c.company_name || '').toLowerCase().includes(term)
    );
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
          <h1 className="text-2xl font-bold text-slate-900">Kunden</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {clients.length} Kunde{clients.length !== 1 ? 'n' : ''} registriert
          </p>
        </div>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: '#3B82F6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Kunde einladen
        </button>
      </div>

      {/* Suche */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Nach Name, Unternehmen oder E-Mail suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabelle */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-slate-500 text-sm font-medium">
              {searchTerm ? 'Keine Kunden gefunden.' : 'Noch keine Kunden vorhanden.'}
            </p>
            {!searchTerm && (
              <p className="text-slate-400 text-xs mt-1">
                Laden Sie Ihren ersten Kunden ein.
              </p>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Unternehmen</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">E-Mail</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Projekte</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Registriert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: '#3B82F6' }}
                      >
                        {(client.full_name || client.email).charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {client.full_name || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">
                    {client.company_name || '—'}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">
                    {client.email}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}
                    >
                      {client.project_count} Projekt{client.project_count !== 1 ? 'e' : ''}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">
                    {formatDate(client.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Einladungs-Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={resetInviteModal}
        title="Kunde einladen"
      >
        {inviteSuccess ? (
          <div className="text-center py-4">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#F0FDF4' }}
            >
              <svg className="w-8 h-8" style={{ color: '#22C55E' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">Einladung gesendet!</h3>
            <p className="text-sm text-slate-500">
              {inviteEmail} erhält eine E-Mail mit einem Anmeldelink.
            </p>
            <button
              onClick={resetInviteModal}
              className="mt-5 w-full py-2 px-4 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: '#3B82F6' }}
            >
              Schließen
            </button>
          </div>
        ) : (
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                placeholder="kunde@beispiel.de"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Max Mustermann"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Unternehmen
              </label>
              <input
                type="text"
                value={inviteCompany}
                onChange={(e) => setInviteCompany(e.target.value)}
                placeholder="Muster GmbH"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {inviteError && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm"
                style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
              >
                {inviteError}
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={resetInviteModal}
                className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={inviteLoading || !inviteEmail.trim()}
                className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition-colors"
                style={{ backgroundColor: '#3B82F6' }}
              >
                {inviteLoading ? 'Wird gesendet...' : 'Einladung senden'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
