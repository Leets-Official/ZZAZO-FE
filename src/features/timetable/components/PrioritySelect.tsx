import { useId } from 'react';
import { Chip } from '@/shared/ui/Chip';
import { cn } from '@/shared/lib/cd';
import type { RecommendPriority } from '../type';

const PRIORITY_OPTIONS: Array<{ value: RecommendPriority; label: string; description: string }> = [
  {
    value: 'FREE_PERIOD',
    label: '공강 우선',
    description: '희망 공강 요일을 우선 반영해 추천합니다',
  },
  {
    value: 'LECTURE_CRITERIA',
    label: '수강기준 우선',
    description: '학과·학점 등 수강 조건을 우선 반영해 추천합니다',
  },
];

interface PrioritySelectProps {
  value: RecommendPriority;
  onChange: (value: RecommendPriority) => void;
  error?: string;
  className?: string;
}

export function PrioritySelect({ value, onChange, error, className }: PrioritySelectProps) {
  const labelId = useId();
  const hintId = useId();

  const selectedOption = PRIORITY_OPTIONS.find((option) => option.value === value);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span id={labelId} className="text-sm font-semibold text-s700">
        추천 기준
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="flex flex-wrap gap-1.5"
      >
        {PRIORITY_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
      <p id={hintId} className={error ? 'text-xs text-e500' : 'text-xs text-s500'}>
        {error ?? selectedOption?.description}
      </p>
    </div>
  );
}
