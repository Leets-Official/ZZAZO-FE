import Link from 'next/link';
import { buttonStyle } from '@/shared/ui/Button';
import { getDepartmentName } from '@/shared/constants/department';
import { formatFreeDays } from '@/shared/constants/weekday';
import { ROUTES } from '@/shared/lib/route';
import type { SavedTimetableSummary } from '../type';

interface SavedTimetableCardProps {
  timetable: SavedTimetableSummary;
}

/** "2026-07-10T12:00:00" → "2026.07.10" */
function formatDate(iso: string): string {
  const [date] = iso.split('T');
  return date.replaceAll('-', '.');
}

export function SavedTimetableCard({ timetable }: SavedTimetableCardProps) {
  const { timetableId, candidateName, departmentId, totalCredits, preferredFreeDays, createdAt } =
    timetable;

  const meta = [
    getDepartmentName(departmentId),
    preferredFreeDays.length > 0 ? `공강 ${formatFreeDays(preferredFreeDays)}` : '공강 없음',
    `${formatDate(createdAt)} 저장`,
  ].join(' · ');

  return (
    <Link
      href={`${ROUTES.saved}/${timetableId}`}
      className="group block rounded-md border border-s200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(79,57,246,0.12)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-p900">{candidateName}</h2>
        <span className="shrink-0 rounded-full bg-p50 px-2.5 py-1 text-xs font-bold text-p700">
          {totalCredits}학점
        </span>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-s500">{meta}</p>

      <span className={buttonStyle('secondary', 'md', 'mt-5 w-full group-hover:bg-p50')}>
        상세 보기
      </span>
    </Link>
  );
}
