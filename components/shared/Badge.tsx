'use client';

// ============================================================
// Status-Badge Komponente für Projekte und Aufgaben
// ============================================================

import type { ProjectStatus, TaskStatus, TaskPriority } from '@/lib/types';

type BadgeStatus = ProjectStatus | TaskStatus | TaskPriority;

interface BadgeProps {
  status: BadgeStatus;
  size?: 'sm' | 'md';
}

// Farben und Labels für jeden Status
const statusConfig: Record<BadgeStatus, { bg: string; text: string; dot: string }> = {
  // Projektstatus
  'Planung': {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
  },
  'In Bearbeitung': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  'Warten auf Kunde': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  'Abgeschlossen': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  // Aufgabenstatus
  'Offen': {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
  'Warten': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  'Erledigt': {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  // Priorität
  'Niedrig': {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
  'Mittel': {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    dot: 'bg-blue-400',
  },
  'Hoch': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
};

export default function Badge({ status, size = 'md' }: BadgeProps) {
  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  };

  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
