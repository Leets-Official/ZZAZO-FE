import { getDepartmentName } from '@/shared/constants/department';
import { formatFreeDays } from '@/shared/constants/weekday';
import { cn } from '@/shared/lib/cd';
import type { SavedTimetableDetail } from '../type';

interface ConditionSummaryProps {
  detail: SavedTimetableDetail;
  className?: string;
}

export function ConditionSummary({ detail, className }: ConditionSummaryProps) {
  const items = [
    { label: '학과', value: getDepartmentName(detail.departmentId) },
    { label: '목표 학점', value: `${detail.targetCredits}학점` },
    {
      label: '공강 요일',
      value:
        detail.preferredFreeDays.length > 0 ? formatFreeDays(detail.preferredFreeDays) : '없음',
    },
    { label: '학년 / 학기', value: `${detail.grade}학년 ${detail.semester}학기` },
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-6 gap-y-5 rounded-md border border-s200 bg-white p-6',
        className
      )}
    >
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-xs font-medium text-s500">{label}</p>
          <p className="mt-1 text-sm font-semibold text-s700">{value}</p>
        </div>
      ))}
    </div>
  );
}
