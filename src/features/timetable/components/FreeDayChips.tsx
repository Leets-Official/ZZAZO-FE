import { useId } from 'react';
import { Chip } from '@/shared/ui/Chip';
import type { DayOfWeek } from '../type';

const DAY_LABELS: Record<DayOfWeek, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

// 공강 조건은 평일 기준으로만 선택한다 (디자인 시스템 목업/컴포넌트 쇼케이스 모두 월~금만 노출).
const CONDITION_DAYS: DayOfWeek[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const MAX_FREE_DAYS = 2;

interface FreeDayChipsProps {
  value: DayOfWeek[];
  onChange: (value: DayOfWeek[]) => void;
  error?: string;
}

export function FreeDayChips({ value, onChange, error }: FreeDayChipsProps) {
  const labelId = useId();
  const hintId = useId();

  const toggle = (day: DayOfWeek) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else if (value.length < MAX_FREE_DAYS) {
      onChange([...value, day]);
    }
  };

  const isMaxed = value.length >= MAX_FREE_DAYS;
  const hint =
    value.length > 0
      ? `${value.map((d) => `공강 ${DAY_LABELS[d]}요일`).join(' / ')}${isMaxed ? ` · 최대 ${MAX_FREE_DAYS}개까지 선택했습니다` : ''}`
      : `최대 ${MAX_FREE_DAYS}개까지 선택할 수 있습니다.`;

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-sm font-semibold text-s700">
        공강 요일
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="flex flex-wrap gap-1.5"
      >
        {CONDITION_DAYS.map((day) => {
          const selected = value.includes(day);
          return (
            <Chip
              key={day}
              selected={selected}
              disabled={!selected && isMaxed}
              onClick={() => toggle(day)}
            >
              {DAY_LABELS[day]}
            </Chip>
          );
        })}
      </div>
      <p id={hintId} className={error ? 'text-xs text-e500' : 'text-xs text-s500'}>
        {error ?? hint}
      </p>
    </div>
  );
}
