// ============================================================
// Typdefinitionen für alle Datenbanktabellen
// ============================================================

export type UserRole = 'admin' | 'client';

// Benutzerprofil – wird automatisch bei Registrierung erstellt
export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  company_name: string | null;
  email: string;
  created_at: string;
}

// Projektstatus-Typen (deutsch)
export type ProjectStatus =
  | 'Planung'
  | 'In Bearbeitung'
  | 'Warten auf Kunde'
  | 'Abgeschlossen';

// Projekt
export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  progress_percent: number;
  client_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Joins (optional)
  client?: Profile;
}

// Aufgabenstatus
export type TaskStatus = 'Offen' | 'In Bearbeitung' | 'Warten' | 'Erledigt';

// Aufgabenpriorität
export type TaskPriority = 'Niedrig' | 'Mittel' | 'Hoch';

// Aufgabe
export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  assignee_id: string | null;
  parent_task_id: string | null;
  order_index: number;
  created_at: string;
  // Joins (optional)
  assignee?: Profile;
  subtasks?: Task[];
}

// Vorlage für Projekte
export interface Template {
  id: string;
  title: string;
  description: string | null;
  tasks_json: TemplateTask[];
  created_by: string;
  created_at: string;
}

// Aufgabe innerhalb einer Vorlage (vereinfacht)
export interface TemplateTask {
  title: string;
  description?: string;
  priority: TaskPriority;
  order_index: number;
  subtasks?: TemplateTask[];
}

// Projektdatei
export interface ProjectFile {
  id: string;
  project_id: string;
  uploaded_by: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  // Joins (optional)
  uploader?: Profile;
}

// Aktivitätsprotokoll
export interface ActivityLog {
  id: string;
  project_id: string | null;
  task_id: string | null;
  user_id: string;
  action: string;
  details: string | null;
  created_at: string;
  // Joins (optional)
  user?: Profile;
}

// Hilfstypes für API-Antworten
export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  open_tasks: number;
  total_clients: number;
}
