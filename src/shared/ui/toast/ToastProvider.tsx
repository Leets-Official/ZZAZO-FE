'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { cn } from '@/shared/lib/cd';

type ToastType = 'success' | 'error';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={cn(
          'fixed z-[60] flex flex-col gap-2',
          // 모바일: 상단 중앙
          'top-4 left-1/2 -translate-x-1/2 items-center',
          // 데스크톱(sm~): 상단 우측
          'sm:left-auto sm:right-6 sm:translate-x-0 sm:items-end'
        )}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} message={toast.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ type, message }: { type: ToastType; message: string }) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-2.5 rounded-sm border bg-white py-3 pl-3.5 pr-4 shadow-lg',
        'w-fit max-w-[calc(100vw-2rem)] sm:max-w-sm',
        'animate-[toastIn_200ms_ease-out]',
        type === 'success' ? 'border-s200' : 'border-e400'
      )}
    >
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
          type === 'success' ? 'bg-p600' : 'bg-e500'
        )}
        aria-hidden
      >
        {type === 'success' ? '✓' : '!'}
      </span>
      <p className="text-sm font-medium text-s700">{message}</p>
    </div>
  );
}
