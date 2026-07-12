import { Spinner } from './Spinner';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm"
    >
      <Spinner className="size-8 text-p600" />
      {message && <p className="text-sm font-medium text-s600">{message}</p>}
    </div>
  );
}
