import { WEEKDAYS, type Course, type LectureTime } from '../type';
import {
  BASE_START_MINUTES,
  TIME_LABEL_INTERVAL_MINUTES,
  TIME_STEP_MINUTES,
} from './ScheduleGrid.config';

export interface ScheduleItem {
  course: Course;
  lectureTime: LectureTime;
  dayIndex: number;
  startMinutes: number;
  endMinutes: number;
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

export function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(restMinutes).padStart(2, '0')}`;
}

export function getTimeRows(endMinutes: number) {
  return Math.max(Math.ceil((endMinutes - BASE_START_MINUTES) / TIME_STEP_MINUTES), 0);
}

export function getTimeLabels(rowCount: number) {
  const labelGapRows = TIME_LABEL_INTERVAL_MINUTES / TIME_STEP_MINUTES;
  const labelCount = Math.ceil(rowCount / labelGapRows);

  return Array.from(
    { length: labelCount },
    (_, index) => BASE_START_MINUTES + index * TIME_LABEL_INTERVAL_MINUTES
  );
}

export function getScheduleItems(courses: Course[]) {
  return courses
    .flatMap((course) =>
      course.lectureTime.map((lectureTime) => {
        const dayIndex = (WEEKDAYS as readonly string[]).indexOf(lectureTime.dayOfWeek);
        const startMinutes = parseTimeToMinutes(lectureTime.startTime);
        const endMinutes = parseTimeToMinutes(lectureTime.endTime);

        return { course, lectureTime, dayIndex, startMinutes, endMinutes };
      })
    )
    .filter(
      ({ dayIndex, startMinutes, endMinutes }) =>
        dayIndex !== -1 &&
        Number.isFinite(startMinutes) &&
        Number.isFinite(endMinutes) &&
        startMinutes >= BASE_START_MINUTES &&
        endMinutes > startMinutes
    );
}

export function hasOverlappedScheduleItems(scheduleItems: ScheduleItem[]) {
  return WEEKDAYS.some((day) => {
    const dayItems = scheduleItems
      .filter((item) => item.lectureTime.dayOfWeek === day)
      .sort((a, b) => a.startMinutes - b.startMinutes);

    return dayItems.some((item, index) => {
      const nextItem = dayItems[index + 1];

      return nextItem !== undefined && item.endMinutes > nextItem.startMinutes;
    });
  });
}
