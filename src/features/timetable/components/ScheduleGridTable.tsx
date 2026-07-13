import { cn } from '@/shared/lib/cd';
import { WEEKDAYS } from '../type';
import {
  CATEGORY_STYLE,
  DAY_LABELS,
  TIME_LABEL_INTERVAL_MINUTES,
  TIME_ROW_HEIGHT,
  TIME_STEP_MINUTES,
} from './ScheduleGrid.config';
import { formatMinutes, getTimeRows, type ScheduleItem } from './ScheduleGrid.utils';

interface ScheduleGridTableProps {
  scheduleItems: ScheduleItem[];
  rowCount: number;
  timeLabels: number[];
}

const timeLabelRowSpan = TIME_LABEL_INTERVAL_MINUTES / TIME_STEP_MINUTES;
const timeGuideHeight = TIME_ROW_HEIGHT * timeLabelRowSpan;

export function ScheduleGridTable({ scheduleItems, rowCount, timeLabels }: ScheduleGridTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[400px] overflow-hidden rounded-sm border border-s200">
        <div className="grid grid-cols-[38px_repeat(5,1fr)] bg-p50 text-[11px] font-bold text-p600">
          <div className="flex min-h-[38px] items-center justify-center border-r border-b border-s200 bg-s100 text-[9px] font-medium text-s400">
            시간
          </div>
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="flex min-h-[38px] items-center justify-center border-b border-l border-s200"
            >
              {DAY_LABELS[day]}
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-[38px_repeat(5,1fr)]"
          style={{
            gridTemplateRows:
              rowCount > 0 ? `repeat(${rowCount}, ${TIME_ROW_HEIGHT}px)` : undefined,
          }}
        >
          {timeLabels.map((minutes) => {
            const rowStart = getTimeRows(minutes) + 1;

            return (
              <div
                key={`time-${minutes}`}
                className="flex items-start justify-center border-r border-s200 bg-s100 pt-0.5 text-[9px] text-s400"
                style={{
                  gridColumn: 1,
                  gridRow: `${rowStart} / span ${timeLabelRowSpan}`,
                }}
              >
                {formatMinutes(minutes)}
              </div>
            );
          })}

          {rowCount > 0 &&
            WEEKDAYS.map((day, dayIndex) => (
              <div
                key={day}
                className="border-l border-s200 bg-white"
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: `1 / span ${rowCount}`,
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${
                    timeGuideHeight - 1
                  }px, var(--color-s200) ${timeGuideHeight - 1}px, var(--color-s200) ${timeGuideHeight}px)`,
                }}
                aria-hidden
              />
            ))}

          {scheduleItems.map(({ course, lectureTime, dayIndex, startMinutes, endMinutes }) => {
            const rowSpan = Math.ceil((endMinutes - startMinutes) / TIME_STEP_MINUTES);
            const style = CATEGORY_STYLE[course.lectureClassification];

            return (
              <div
                key={`${course.lectureId}-${lectureTime.dayOfWeek}-${lectureTime.startTime}`}
                className={cn(
                  'relative flex min-w-0 items-center justify-center overflow-hidden border-b border-l border-s200 px-[5px] py-[7px] text-center text-[10px] font-semibold leading-[1.3]',
                  style.cell
                )}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: `${getTimeRows(startMinutes) + 1} / span ${rowSpan}`,
                }}
                aria-label={`${course.lectureName}, ${DAY_LABELS[lectureTime.dayOfWeek]}요일 ${
                  lectureTime.startTime
                }부터 ${lectureTime.endTime}까지`}
              >
                <span className={cn('absolute inset-y-0 left-0 w-0.5', style.bar)} />
                <span className="overflow-hidden break-keep">{course.lectureName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
