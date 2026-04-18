# Kundenportal – Einrichtungsanleitung

Diese Anleitung führt Sie Schritt für Schritt durch die Einrichtung des Kundenportals für Planungsbüro Bless.

---

## 1. Supabase-Konto und Projekt erstellen

1. Gehen Sie auf [supabase.com](https://supabase.com) und erstellen Sie ein kostenloses Konto.
2. Klicken Sie auf **„New project"** und wählen Sie:
   - Name: `planungsbuero-bless`
   - Datenbankpasswort: ein sicheres Passwort (notieren Sie es!)
   - Region: `eu-central-1` (Frankfurt) für beste Latenz
3. Warten Sie, bis das Projekt vollständig bereitgestellt ist (~2 Minuten).

---

## 2. Datenbankschema ausführen

1. Klicken Sie im linken Menü auf **„SQL Editor"**.
2. Klicken Sie auf **„New query"**.
3. Öffnen Sie die Datei `supabase/schema.sql` aus diesem Projektordner.
4. Fügen Sie den gesamten Inhalt in den SQL-Editor ein.
5. Klicken Sie auf **„Run"**.

Sie sollten folgende Tabellen sehen:
- `profiles`
- `projects`
- `tasks`
- `templates`
- `files`
- `activity_log`

---

## 3. Storage-Bucket einrichten

1. Klicken Sie im linken Menü auf **„Storage"**.
2. Klicken Sie auf **„New bucket"**.
3. Name: `project-files`
4. **Öffentlich**: Nein (Bucket auf „Private" belassen)
5. Klicken Sie auf **„Create bucket"**.

### Storage-Richtlinien einrichten

Gehen Sie zu Storage → `project-files` → Policies und fügen Sie folgende Policies hinzu:

**Für Admins (voller Zugriff):**
```sql
CREATE POLICY "Admins verwalten alle Dateien"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'project-files' AND
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
```

**Kunden können Projektdateien lesen:**
```sql
CREATE POLICY "Kunden können eigene Projektdateien sehen"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'project-files' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.projects WHERE client_id = auth.uid()
    )
  );
```

**Kunden können Dateien hochladen:**
```sql
CREATE POLICY "Kunden können in eigene Projektordner hochladen"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'project-files' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.projects WHERE client_id = auth.uid()
    )
  );
```

---

## 4. Umgebungsvariablen konfigurieren

1. Kopieren Sie `.env.local.example` zu `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Öffnen Sie `.env.local` und füllen Sie die Werte aus:

   **Supabase URL und Anon Key:**
   - Gehen Sie zu Supabase → Settings → API
   - Kopieren Sie die **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Kopieren Sie den **anon public** Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   **Service Role Key:**
   - Auf der gleichen Seite: **service_role** Key → `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ Dieser Key darf NIEMALS im Frontend verwendet werden!

   **App URL:**
   - Lokal: `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - Produktion: `NEXT_PUBLIC_APP_URL=https://www.planungsbuero-bless.de`

---

## 5. Abhängigkeiten installieren

```bash
npm install
```

Die folgenden Pakete sollten bereits vorhanden sein:
- `@supabase/ssr` – Supabase SSR-Unterstützung
- `@supabase/supabase-js` – Supabase JavaScript-Client
- `@hello-pangea/dnd` – Drag & Drop für Aufgaben

---

## 6. Erstes Admin-Konto erstellen

### Option A: Über das Supabase-Dashboard (empfohlen)

1. Gehen Sie zu Supabase → Authentication → Users.
2. Klicken Sie auf **„Invite user"**.
3. Geben Sie Ihre E-Mail-Adresse ein.
4. Nehmen Sie die Einladung per E-Mail an und setzen Sie ein Passwort.
5. Gehen Sie dann zu **SQL Editor** und führen Sie folgenden Befehl aus:

```sql
UPDATE public.profiles
SET role = 'admin', full_name = 'Christopher Bless'
WHERE email = 'ihre-email@beispiel.de';
```

### Option B: Direkt im SQL-Editor

```sql
-- Nutzer manuell anlegen (nur für Tests)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@planungsbuero-bless.de',
  crypt('IhrPasswort123!', gen_salt('bf')),
  NOW(),
  '{"role": "admin", "full_name": "Christopher Bless"}'
);
```

---

## 7. Lokale Entwicklung starten

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000/login](http://localhost:3000/login) im Browser.

---

## 8. Deployment auf Vercel

### Repository verbinden

1. Pushen Sie das Projekt auf GitHub.
2. Gehen Sie auf [vercel.com](https://vercel.com) und importieren Sie das Repository.

### Umgebungsvariablen in Vercel konfigurieren

Gehen Sie zu Vercel → Project → Settings → Environment Variables und fügen Sie folgende Variablen hinzu:

| Name | Wert | Umgebung |
|------|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Ihre Supabase URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ihr Anon Key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Ihr Service Role Key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://www.planungsbuero-bless.de` | Production |
| `NEXT_PUBLIC_APP_URL` | Ihre Vercel-Preview-URL | Preview |

### Supabase Auth-URL konfigurieren

1. Gehen Sie zu Supabase → Authentication → URL Configuration.
2. **Site URL**: `https://www.planungsbuero-bless.de`
3. **Redirect URLs**:
   - `https://www.planungsbuero-bless.de/portal`
   - `https://www.planungsbuero-bless.de/admin`
   - `http://localhost:3000/portal` (für lokale Entwicklung)

---

## Portalstruktur

```
/login              → Magic Link Login (ohne Navbar/Footer)
/portal             → Kundenübersicht (eigene Projekte)
/portal/projects/[id] → Projektdetail für Kunden
/admin              → Admin-Dashboard
/admin/clients      → Kundenverwaltung
/admin/projects     → Projektverwaltung
/admin/projects/[id] → Projektdetail
/admin/projects/[id]/tasks → Aufgabenverwaltung
/admin/projects/[id]/files → Dateiverwaltung
/admin/templates    → Vorlagenverwaltung
```

---

## Erste Schritte nach der Einrichtung

1. Melden Sie sich unter `/login` an.
2. Gehen Sie zu `/admin/clients` und laden Sie Ihren ersten Kunden ein.
3. Erstellen Sie unter `/admin/projects` ein Projekt für diesen Kunden.
4. Der Kunde erhält eine Einladungs-E-Mail und kann sich über den Link anmelden.
5. Der Kunde sieht sein Projekt unter `/portal`.

---

## Fehlerbehebung

**Magic Link kommt nicht an:**
- Prüfen Sie den Spam-Ordner.
- In Supabase → Authentication → Settings prüfen Sie die SMTP-Konfiguration.
- Für Produktion empfiehlt sich ein eigener SMTP-Dienst (z.B. Resend).

**"Row Level Security" Fehler:**
- Stellen Sie sicher, dass das Schema korrekt ausgeführt wurde.
- Überprüfen Sie in Supabase → Table Editor ob RLS aktiviert ist.

**Datei-Upload schlägt fehl:**
- Prüfen Sie ob der Bucket `project-files` existiert.
- Prüfen Sie ob die Storage-Policies korrekt gesetzt sind.
