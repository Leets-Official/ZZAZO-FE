import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cd';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({ selected = false, className, type = 'button', ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? 'border-p600 bg-p600 text-white'
          : 'border-s200 bg-white text-s600 hover:border-p400 hover:bg-p50 hover:text-p600',
        className
      )}
      {...props}
    />
  );
}
