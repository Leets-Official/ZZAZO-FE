import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cd';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, containerClassName, ...props },
  ref
) {
  const inputId = id ?? props.name;

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      <label htmlFor={inputId} className="text-sm font-semibold text-s700">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          'h-11 rounded-sm border bg-white px-3.5 text-sm text-s700 transition-colors',
          'placeholder:text-s400',
          'focus:outline-none focus:ring-4 focus:ring-p600/10',
          error ? 'border-e500 focus:border-e500' : 'border-s200 focus:border-p600',
          className
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-e500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-s500">{hint}</p>
      ) : null}
    </div>
  );
});
