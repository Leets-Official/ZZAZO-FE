import { cn } from '@/shared/lib/cd';
import { CATEGORY_BADGE } from './categoryBadge';
import { formatCourseTime } from '../lib/formatCourseTime';
import type { Course } from '@/features/timetable/type';

interface CourseTableProps {
  courses: Course[];
  className?: string;
}

export function CourseTable({ courses, className }: CourseTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-md border border-s200', className)}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-s100 text-xs font-bold text-s500">
            <th className="px-4 py-3">과목명</th>
            <th className="px-4 py-3">요일/시간</th>
            <th className="px-4 py-3 text-center">학점</th>
            <th className="px-4 py-3">이수구분</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const badge = CATEGORY_BADGE[course.lectureClassification];
            return (
              <tr key={course.lectureId} className="border-t border-s100 text-sm">
                <td className="px-4 py-3 font-bold text-p900">{course.lectureName}</td>
                <td className="px-4 py-3 text-s600">{formatCourseTime(course.lectureTime)}</td>
                <td className="px-4 py-3 text-center font-bold text-p700">{course.credit}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', badge)}>
                    {course.lectureClassification}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
