import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../lib/cd';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, id, children, ...props },
  ref
) {
  const selectId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-semibold text-s700">
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        aria-invalid={!!error}
        className={cn(
          'h-11 rounded-sm border bg-white px-3.5 text-sm text-s700 transition-colors',
          'focus:outline-none focus:ring-4 focus:ring-p600/10',
          error ? 'border-e500' : 'border-s200 focus:border-p600',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-e500">{error}</p>}
    </div>
  );
});
