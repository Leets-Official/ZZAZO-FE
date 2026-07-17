import type { LectureTime } from '@/features/timetable/type';

const DAY_LABEL: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
};

/** [{MON 10:30~11:45}, {WED ...}] → "월·수 10:30~11:45" */
export function formatCourseTime(times: LectureTime[]): string {
  if (times.length === 0) return '-';
  const days = times.map((t) => DAY_LABEL[t.dayOfWeek] ?? t.dayOfWeek).join('·');
  const { startTime, endTime } = times[0];
  return `${days} ${startTime}~${endTime}`;
}
