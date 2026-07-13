import { cn } from '@/shared/lib/cd';
import { type Course } from '../type';
import { LEGENDS } from './ScheduleGrid.config';
import { ScheduleGridTable } from './ScheduleGridTable';
import {
  getScheduleItems,
  getTimeLabels,
  getTimeRows,
  hasOverlappedScheduleItems,
} from './ScheduleGrid.utils';

interface ScheduleGridProps {
  courses: Course[];
  className?: string;
}

export function ScheduleGrid({ courses, className }: ScheduleGridProps) {
  const scheduleItems = getScheduleItems(courses);
  const rowCount =
    scheduleItems.length > 0
      ? getTimeRows(Math.max(...scheduleItems.map((item) => item.endMinutes)))
      : 0;
  const timeLabels = getTimeLabels(rowCount);
  const hasDisplayableLectureTime = scheduleItems.length > 0;
  const hasOverlappedLectureTime = hasOverlappedScheduleItems(scheduleItems);

  return (
    <section
      className={cn('rounded-md border border-s200 bg-white p-5 sm:p-8', className)}
      aria-label="시간표"
    >
      <ScheduleGridTable
        scheduleItems={scheduleItems}
        rowCount={rowCount}
        timeLabels={timeLabels}
      />

      {!hasDisplayableLectureTime ? (
        <p className="mt-5 rounded-sm bg-s100 px-4 py-3 text-sm font-medium text-s500">
          표시할 수업이 없습니다.
        </p>
      ) : (
        <>
          {hasOverlappedLectureTime && (
            <p className="mt-5 rounded-sm bg-e50 px-4 py-3 text-sm font-medium text-e500">
              같은 시간대에 겹치는 수업이 있습니다.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {LEGENDS.map(({ label, bar }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-semibold text-s500">
                <span className={cn('h-4 w-1 rounded-full', bar)} />
                {label}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
