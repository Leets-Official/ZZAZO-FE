// src/shared/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cd';

type Variant = 'primary' | 'secondary' | 'text' | 'danger';
type Size = 'lg' | 'md' | 'sm';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-p600 text-white hover:bg-p700 hover:shadow-md',
  secondary: 'bg-white text-p700 border border-p200 hover:bg-p50',
  text: 'text-p600 hover:bg-p50',
  danger: 'bg-white text-e500 border border-e400 hover:bg-e50',
};

const SIZE: Record<Size, string> = {
  lg: 'h-12 px-6 text-base font-semibold',
  md: 'h-10 px-5 text-sm font-semibold',
  sm: 'h-8 px-3.5 text-xs font-semibold',
};

/** Link 등 다른 요소에 버튼 스타일을 입힐 때 사용 */
export function buttonStyle(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-sm transition-all',
    'disabled:opacity-42 disabled:pointer-events-none',
    VARIANT[variant],
    SIZE[size],
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={buttonStyle(variant, size, className)} {...props} />;
}
