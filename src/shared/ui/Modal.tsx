'use client';

import { useEffect } from 'react';
import { cn } from '@/shared/lib/cd';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  /** 하단 버튼 영역 */
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  // 열려 있을 때 ESC로 닫기 + 배경 스크롤 방지
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
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
      {/* 배경 오버레이 (클릭 시 닫기) */}
      <div className="absolute inset-0 bg-s700/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* 본체 */}
      <div className={cn('relative w-full max-w-sm rounded-md bg-white p-6 shadow-lg', className)}>
        <h2 className="text-lg font-bold text-p900">{title}</h2>
        {children && <div className="mt-3 text-sm text-s600">{children}</div>}
        {footer && <div className="mt-6 flex gap-3">{footer}</div>}
      </div>
    </div>
  );
}
