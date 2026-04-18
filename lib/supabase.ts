// ============================================================
// Browser-seitiger Supabase-Client (für Client Components)
// Verwendet @supabase/ssr createBrowserClient
// ============================================================

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
