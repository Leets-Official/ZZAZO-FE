import { cn } from '@/shared/lib/cd';
import {
  PERIODS,
  WEEKDAYS,
  type Course,
  type CourseCategory,
  type Period,
  type Weekday,
} from '../type';

interface ScheduleGridProps {
  courses: Course[];
  className?: string;
}

const CATEGORY_STYLE: Record<CourseCategory, { cell: string; bar: string }> = {
  교양필수: { cell: 'bg-p600/[0.07] text-p800', bar: 'bg-p600' },
  교양선택: { cell: 'bg-p600/[0.07] text-p800', bar: 'bg-p600' },
  전공필수: { cell: 'bg-g500/[0.07] text-g800', bar: 'bg-g500' },
  전공선택: { cell: 'bg-g500/[0.07] text-g800', bar: 'bg-g500' },
  전공기초: { cell: 'bg-w500/[0.07] text-w800', bar: 'bg-w500' },
};

const LEGENDS = [
  { label: '교양필수 · 교양선택', bar: CATEGORY_STYLE.교양필수.bar },
  { label: '전공필수 · 전공선택', bar: CATEGORY_STYLE.전공필수.bar },
  { label: '전공기초', bar: CATEGORY_STYLE.전공기초.bar },
];

function getCourseCell(courses: Course[], day: Weekday, period: Period) {
  for (const course of courses) {
    const timeSlot = course.timeSlots.find(
      (slot) => slot.day === day && slot.startPeriod <= period && period <= slot.endPeriod
    );

    if (timeSlot) {
      return {
        course,
        isFirstPeriod: timeSlot.startPeriod === period,
      };
    }
  }
}

function getVisiblePeriods(courses: Course[]) {
  if (courses.length === 0) {
    return [];
  }

  const lastPeriod = Math.max(
    ...courses.flatMap((course) => course.timeSlots.map((timeSlot) => timeSlot.endPeriod))
  );

  return PERIODS.filter((period) => period <= lastPeriod);
}

export function ScheduleGrid({ courses, className }: ScheduleGridProps) {
  const visiblePeriods = getVisiblePeriods(courses);

  return (
    <section
      className={cn('rounded-md border border-s200 bg-white p-5 sm:p-8', className)}
      aria-label="시간표"
    >
      <div className="overflow-x-auto">
        <div className="min-w-[400px] overflow-hidden rounded-sm border border-s200">
          <div className="grid grid-cols-[38px_repeat(5,1fr)] bg-p50 text-[11px] font-bold text-p600">
            <div className="flex min-h-[38px] items-center justify-center border-r border-b border-s200 bg-s100 text-[9px] font-medium text-s400">
              교시
            </div>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="flex min-h-[38px] items-center justify-center border-b border-l border-s200"
              >
                {day}
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-[38px_repeat(5,1fr)]"
            style={{ gridTemplateRows: `repeat(${visiblePeriods.length}, 38px)` }}
          >
            {visiblePeriods.map((period) => (
              <div
                key={`period-${period}`}
                className="flex items-center justify-center border-r border-b border-s200 bg-s100 text-[9px] text-s400"
                style={{ gridColumn: 1, gridRow: period }}
              >
                {period}
              </div>
            ))}

            {visiblePeriods.flatMap((period) =>
              WEEKDAYS.map((day, dayIndex) => {
                const cell = getCourseCell(courses, day, period);

                if (!cell) {
                  return (
                    <div
                      key={`${day}-${period}`}
                      className="border-b border-l border-s200 bg-white"
                      style={{ gridColumn: dayIndex + 2, gridRow: period }}
                      aria-label={`${day}요일 ${period}교시 공강`}
                    />
                  );
                }

                const style = CATEGORY_STYLE[cell.course.category];

                return (
                  <div
                    key={`${cell.course.id}-${day}-${period}`}
                    className={cn(
                      'relative flex items-center justify-center border-b border-l border-s200 px-[5px] py-[7px] text-center text-[10px] font-semibold leading-[1.3]',
                      style.cell
                    )}
                    style={{
                      gridColumn: dayIndex + 2,
                      gridRow: period,
                    }}
                    aria-label={`${cell.course.name}, ${day}요일 ${period}교시`}
                  >
                    <span className={cn('absolute inset-y-0 left-0 w-0.5', style.bar)} />
                    <span className="whitespace-pre-line">
                      {cell.isFirstPeriod ? cell.course.name : '↑'}
                    </span>
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
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {LEGENDS.map(({ label, bar }) => (
            <div key={label} className="flex items-center gap-2 text-xs font-semibold text-s500">
              <span className={cn('h-4 w-1 rounded-full', bar)} />
              {label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
