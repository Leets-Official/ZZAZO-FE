import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cd';

interface TimetableCardProps {
  children: ReactNode;
  className?: string;
}

export function TimetableCard({ children, className }: TimetableCardProps) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-[520px] rounded-md border border-s200 bg-white p-6 shadow-sm',
        className
      )}
    >
      {children}
    </section>
  );
}
