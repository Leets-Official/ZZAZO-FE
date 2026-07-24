import { CourseTypeBadge } from '@/features/timetable/components/CourseTypeBadge';
import type { Course, DayOfWeek } from '@/features/timetable/type';

interface CourseTableProps {
  courses: Course[];
}

const DAY_LABEL: Record<DayOfWeek, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

function formatLectureTime(course: Course) {
  const groupedTimes = course.lectureTime.reduce<Record<string, DayOfWeek[]>>(
    (acc, { dayOfWeek, startTime, endTime }) => {
      const timeKey = `${startTime}-${endTime}`;
      acc[timeKey] = [...(acc[timeKey] ?? []), dayOfWeek];
      return acc;
    },
    {}
  );

  return Object.entries(groupedTimes)
    .map(([timeKey, days]) => `${days.map((day) => DAY_LABEL[day]).join('·')} ${timeKey}`)
    .join(', ');
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="overflow-x-auto rounded-sm border border-s200 bg-white">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="bg-s100 text-xs text-s500">
            <th className="w-[34%] px-3.5 py-3 text-left font-bold whitespace-nowrap">과목명</th>
            <th className="w-[34%] px-3.5 py-3 text-left font-bold whitespace-nowrap">요일/시간</th>
            <th className="w-[12%] px-3.5 py-3 text-center font-bold whitespace-nowrap">학점</th>
            <th className="w-[20%] px-3.5 py-3 text-left font-bold whitespace-nowrap">이수구분</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.lectureId}
              className="border-t border-s100 transition-colors hover:bg-p50"
            >
              <td className="px-3.5 py-4 font-semibold text-p900">{course.lectureName}</td>
              <td className="px-3.5 py-4 text-s700">{formatLectureTime(course)}</td>
              <td className="px-3.5 py-4 text-center font-bold text-p700">{course.credit}</td>
              <td className="px-3.5 py-4">
                <CourseTypeBadge type={course.lectureClassification} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
