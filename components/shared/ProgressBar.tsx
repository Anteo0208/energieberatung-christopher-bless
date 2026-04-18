'use client';

// ============================================================
// Animierter Fortschrittsbalken – für Projekte und Aufgaben
// ============================================================

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percent: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  percent,
  color,
  size = 'md',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  // Animierter Start bei 0 → echter Wert
  const [displayPercent, setDisplayPercent] = useState(animated ? 0 : percent);

  useEffect(() => {
    if (!animated) {
      setDisplayPercent(percent);
      return;
    }
    // Kurze Verzögerung für Einlauf-Animation
    const timer = setTimeout(() => {
      setDisplayPercent(percent);
    }, 100);
    return () => clearTimeout(timer);
  }, [percent, animated]);

  // Farbe automatisch aus Prozentwert bestimmen (falls nicht vorgegeben)
  const barColor =
    color ||
    (percent >= 100
      ? '#22C55E'
      : percent >= 70
      ? '#3B82F6'
      : percent >= 40
      ? '#F59E0B'
      : '#64748B');

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-slate-600">Fortschritt</span>
          <span className="text-xs font-bold text-slate-800">{percent}%</span>
        </div>
      )}
      <div
        className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(100, Math.max(0, displayPercent))}%`,
            backgroundColor: barColor,
            transition: animated ? 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
