import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cd';

export type BadgeVariant =
  | 'generalEducationRequired'
  | 'generalEducationElective'
  | 'majorRequired'
  | 'majorElective'
  | 'majorBasic'
  | 'general'
  | 'success'
  | 'warning'
  | 'danger';

const VARIANT: Record<BadgeVariant, string> = {
  generalEducationRequired: 'bg-p50 text-p700',
  generalEducationElective: 'bg-p100 text-p800',
  majorRequired: 'bg-g200 text-g800',
  majorElective: 'bg-g50 text-g700',
  majorBasic: 'bg-w100 text-w800',
  general: 'bg-purple50 text-purple700',
  success: 'bg-g100 text-g700',
  warning: 'bg-w100 text-w800',
  danger: 'bg-e50 text-e500',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'general', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-normal whitespace-nowrap',
        VARIANT[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
