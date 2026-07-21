'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/cd';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // 열기 직전 포커스를 기억했다가 닫을 때 복원
    triggerRef.current = document.activeElement as HTMLElement;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      // 모달 밖으로 포커스가 나가지 않도록 순환시킨다
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-s700/40 backdrop-blur-[2px]" onClick={onClose} />

      <div
        ref={panelRef}
        className={cn('relative w-full max-w-sm rounded-md bg-white p-6 shadow-lg', className)}
      >
        <h2 className="text-lg font-bold text-p900">{title}</h2>
        {children && <div className="mt-3 text-sm text-s600">{children}</div>}
        {footer && <div className="mt-6 flex gap-3">{footer}</div>}
      </div>
    </div>
  );
}
