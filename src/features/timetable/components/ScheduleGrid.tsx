import { cn } from '@/shared/lib/cd';
import { PERIODS, WEEKDAYS, type Course, type CourseCategory } from '../type';

interface ScheduleGridProps {
  courses: Course[];
  className?: string;
}

const CATEGORY_STYLE: Record<CourseCategory, { cell: string; bar: string }> = {
  교양필수: { cell: 'bg-p50 text-p800', bar: 'bg-p600' },
  교양선택: { cell: 'bg-p50 text-p800', bar: 'bg-p600' },
  전공필수: { cell: 'bg-g50 text-g800', bar: 'bg-g500' },
  전공선택: { cell: 'bg-g50 text-g800', bar: 'bg-g500' },
  전공기초: { cell: 'bg-w50 text-w800', bar: 'bg-w500' },
};

const LEGENDS = [
  { label: '교양필수 · 교양선택', bar: CATEGORY_STYLE.교양필수.bar },
  { label: '전공필수 · 전공선택', bar: CATEGORY_STYLE.전공필수.bar },
  { label: '전공기초', bar: CATEGORY_STYLE.전공기초.bar },
];

export function ScheduleGrid({ courses, className }: ScheduleGridProps) {
  return (
    <section
      className={cn('rounded-md border border-s200 bg-white p-4 shadow-sm sm:p-6', className)}
      aria-label="시간표"
    >
      <div className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-md border border-s200">
          <div className="grid grid-cols-[56px_repeat(5,minmax(128px,1fr))] bg-p50 text-sm font-bold text-p600">
            <div className="flex h-12 items-center justify-center border-r border-b border-s200 bg-s100 text-xs text-s400">
              교시
            </div>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="flex h-12 items-center justify-center border-b border-l border-s200"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[56px_repeat(5,minmax(128px,1fr))] grid-rows-[repeat(6,56px)]">
            {PERIODS.map((period) => (
              <div
                key={`period-${period}`}
                className="flex items-center justify-center border-r border-b border-s200 bg-s100 text-sm font-medium text-s400"
                style={{ gridColumn: 1, gridRow: period }}
              >
                {period}
              </div>
            ))}

            {PERIODS.flatMap((period) =>
              WEEKDAYS.map((day, dayIndex) => (
                <div
                  key={`${day}-${period}`}
                  className="border-b border-l border-s200 bg-white"
                  style={{ gridColumn: dayIndex + 2, gridRow: period }}
                  aria-label={`${day}요일 ${period}교시 공강`}
                />
              ))
            )}

            {courses.flatMap((course) =>
              course.timeSlots.map((timeSlot) => {
                const dayIndex = WEEKDAYS.indexOf(timeSlot.day);
                const rowSpan = timeSlot.endPeriod - timeSlot.startPeriod + 1;
                const style = CATEGORY_STYLE[course.category];

                return (
                  <div
                    key={`${course.id}-${timeSlot.day}-${timeSlot.startPeriod}`}
                    className={cn(
                      'relative flex items-center justify-center border-b border-l border-s200 px-3 py-2 text-center text-sm font-bold leading-tight',
                      style.cell
                    )}
                    style={{
                      gridColumn: dayIndex + 2,
                      gridRow: `${timeSlot.startPeriod} / span ${rowSpan}`,
                    }}
                    aria-label={`${course.name}, ${timeSlot.day}요일 ${timeSlot.startPeriod}교시부터 ${rowSpan}교시`}
                  >
                    <span className={cn('absolute inset-y-0 left-0 w-1', style.bar)} />
                    <span className="whitespace-pre-line">{course.name}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {courses.length === 0 ? (
        <p className="mt-5 rounded-sm bg-s100 px-4 py-3 text-sm font-medium text-s500">
          표시할 수업이 없습니다.
        </p>
      ) : (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {LEGENDS.map(({ label, bar }) => (
            <div key={label} className="flex items-center gap-2 text-sm font-semibold text-s500">
              <span className={cn('h-4 w-1 rounded-full', bar)} />
              {label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
