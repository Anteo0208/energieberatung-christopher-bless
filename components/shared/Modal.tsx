'use client';

// ============================================================
// Wiederverwendbare Modal-Komponente
// ============================================================

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC-Taste schließt Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
      onClick={(e) => {
        // Außerhalb klicken schließt Modal
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl`}
        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Schließen"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Inhalt */}
        <div className="overflow-y-auto px-6 py-5 flex-1">{children}</div>
      </div>
    </div>
  );

  // Portal für korrektes Z-Index-Verhalten
  return typeof document !== 'undefined'
    ? createPortal(modal, document.body)
    : null;
}
