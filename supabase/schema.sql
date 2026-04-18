-- ============================================================
-- Datenbankschema für das Kundenportal – Planungsbüro Bless
-- Führe dieses Script im Supabase SQL-Editor aus
-- ============================================================

-- Erweiterungen aktivieren
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABELLEN
-- ============================================================

-- Benutzerprofile (wird automatisch bei Registrierung erstellt)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  full_name TEXT,
  company_name TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Projekte
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Planung' CHECK (
    status IN ('Planung', 'In Bearbeitung', 'Warten auf Kunde', 'Abgeschlossen')
  ),
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (
    progress_percent >= 0 AND progress_percent <= 100
  ),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Aufgaben
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Offen' CHECK (
    status IN ('Offen', 'In Bearbeitung', 'Warten', 'Erledigt')
  ),
  priority TEXT NOT NULL DEFAULT 'Mittel' CHECK (
    priority IN ('Niedrig', 'Mittel', 'Hoch')
  ),
  due_date DATE,
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  parent_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Vorlagen für Projekte
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tasks_json JSONB NOT NULL DEFAULT '[]',
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Projektdateien
CREATE TABLE IF NOT EXISTS public.files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Aktivitätsprotokoll
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- INDIZES für bessere Performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_parent_task_id ON public.tasks(parent_task_id);
CREATE INDEX IF NOT EXISTS idx_files_project_id ON public.files(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_project_id ON public.activity_log(project_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);

-- ============================================================
-- TRIGGER: Profil automatisch bei Nutzerregistrierung erstellen
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger nur anlegen, wenn er noch nicht existiert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: updated_at bei Projektänderung automatisch setzen
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_project_updated ON public.projects;
CREATE TRIGGER on_project_updated
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) aktivieren
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- PROFILES
-- Admins sehen alle Profile
CREATE POLICY "Admins können alle Profile sehen"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Jeder kann sein eigenes Profil sehen
CREATE POLICY "Nutzer können ihr eigenes Profil sehen"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Jeder kann sein eigenes Profil bearbeiten
CREATE POLICY "Nutzer können ihr eigenes Profil bearbeiten"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Admins können Profile erstellen
CREATE POLICY "Admins können Profile erstellen"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- PROJECTS
-- Admins sehen alle Projekte
CREATE POLICY "Admins sehen alle Projekte"
  ON public.projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Kunden sehen nur ihre eigenen Projekte
CREATE POLICY "Kunden sehen ihre eigenen Projekte"
  ON public.projects FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

-- TASKS
-- Admins sehen alle Aufgaben
CREATE POLICY "Admins sehen alle Aufgaben"
  ON public.tasks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Kunden sehen Aufgaben ihrer Projekte
CREATE POLICY "Kunden sehen Aufgaben ihrer Projekte"
  ON public.tasks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects pr
      WHERE pr.id = tasks.project_id AND pr.client_id = auth.uid()
    )
  );

-- TEMPLATES
-- Nur Admins können Vorlagen verwalten
CREATE POLICY "Admins verwalten Vorlagen"
  ON public.templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- FILES
-- Admins sehen alle Dateien
CREATE POLICY "Admins sehen alle Dateien"
  ON public.files FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Kunden sehen Dateien ihrer Projekte
CREATE POLICY "Kunden sehen Dateien ihrer Projekte"
  ON public.files FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects pr
      WHERE pr.id = files.project_id AND pr.client_id = auth.uid()
    )
  );

-- Kunden können Dateien in ihre Projekte hochladen
CREATE POLICY "Kunden können Dateien hochladen"
  ON public.files FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects pr
      WHERE pr.id = files.project_id AND pr.client_id = auth.uid()
    )
  );

-- ACTIVITY LOG
-- Admins sehen alle Aktivitäten
CREATE POLICY "Admins sehen alle Aktivitäten"
  ON public.activity_log FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- Kunden sehen Aktivitäten ihrer Projekte
CREATE POLICY "Kunden sehen Aktivitäten ihrer Projekte"
  ON public.activity_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects pr
      WHERE pr.id = activity_log.project_id AND pr.client_id = auth.uid()
    )
  );

-- Alle authentifizierten Nutzer können Aktivitäten eintragen
CREATE POLICY "Authentifizierte Nutzer können Aktivitäten eintragen"
  ON public.activity_log FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- STORAGE BUCKET SETUP
-- ============================================================
-- HINWEIS: Führe diese Befehle separat im Supabase Dashboard aus
-- oder nutze die Storage-Sektion in der Supabase UI:
--
-- 1. Bucket erstellen: "project-files" (privat)
--    INSERT INTO storage.buckets (id, name, public)
--    VALUES ('project-files', 'project-files', false);
--
-- 2. Storage-Policies für project-files:
--    - Admins: voller Zugriff
--    - Kunden: Lesen/Schreiben nur in ihrem Projektordner
--
-- CREATE POLICY "Admins verwalten alle Dateien"
--   ON storage.objects FOR ALL
--   TO authenticated
--   USING (
--     bucket_id = 'project-files' AND
--     EXISTS (
--       SELECT 1 FROM public.profiles p
--       WHERE p.id = auth.uid() AND p.role = 'admin'
--     )
--   );
--
-- CREATE POLICY "Kunden können eigene Projektdateien sehen"
--   ON storage.objects FOR SELECT
--   TO authenticated
--   USING (
--     bucket_id = 'project-files' AND
--     (storage.foldername(name))[1] IN (
--       SELECT id::text FROM public.projects WHERE client_id = auth.uid()
--     )
--   );
--
-- CREATE POLICY "Kunden können in eigene Projektordner hochladen"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (
--     bucket_id = 'project-files' AND
--     (storage.foldername(name))[1] IN (
--       SELECT id::text FROM public.projects WHERE client_id = auth.uid()
--     )
--   );
