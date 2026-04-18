'use client';

// ============================================================
// Magic-Link Login Seite – Kundenportal Planungsbüro Bless
// ============================================================

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(`Fehler: ${authError.message}`);
      return;
    }

    setSent(true);
  }

  return (
    <div className="w-full max-w-sm px-4">
      {/* Karte */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header-Stripe */}
        <div
          className="h-1.5 w-full"
          style={{
            background: 'linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)',
          }}
        />

        <div className="p-8">
          {/* Logo & Titel */}
          <div className="text-center mb-8">
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: '#1E293B' }}
            >
              PB
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Planungsbüro Bless
            </h1>
            <p className="text-slate-500 text-sm mt-1">Kundenportal</p>
          </div>

          {/* Erfolgs-Ansicht */}
          {sent ? (
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: '#F0FDF4' }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: '#22C55E' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                E-Mail wurde gesendet!
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Wir haben einen Anmeldelink an{' '}
                <span className="font-medium text-slate-700">{email}</span>{' '}
                gesendet. Bitte überprüfen Sie Ihr Postfach.
              </p>
              <p className="text-slate-400 text-xs mt-3">
                Kein Link angekommen?{' '}
                <button
                  onClick={() => { setSent(false); setError(null); }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Erneut senden
                </button>
              </p>
            </div>
          ) : (
            /* Anmeldeformular */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  required
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    borderColor: '#E2E8F0',
                    backgroundColor: '#F8FAFC',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.backgroundColor = '#F8FAFC';
                  }}
                />
              </div>

              {/* Fehlermeldung */}
              {error && (
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm"
                  style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#3B82F6' }}
                onMouseEnter={(e) => {
                  if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#3B82F6';
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Wird gesendet...
                  </span>
                ) : (
                  'Anmeldelink senden'
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Impressum-Hinweis */}
      <p className="text-center text-slate-600 text-xs mt-6">
        © 2026 Planungsbüro Bless · Mönchengladbach
      </p>
    </div>
  );
}
