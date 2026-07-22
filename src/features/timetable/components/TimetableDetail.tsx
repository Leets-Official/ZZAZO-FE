import { CourseTable } from '@/features/timetable/components/CourseTable';
import { ScheduleGrid } from '@/features/timetable/components/ScheduleGrid';
import type { Course } from '@/features/timetable/type';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface TimetableDetailProps {
  totalCredit: number;
  courses: Course[];
}

export function TimetableDetail({ totalCredit, courses }: TimetableDetailProps) {
  return (
    <section className="mx-auto w-full overflow-hidden rounded-md border border-s200 bg-s50 shadow-lg">
      <div className="flex items-center justify-between border-b border-s200 bg-white px-6 py-5 sm:px-8">
        <span className="text-lg font-black tracking-[6px] text-p600">ZZAZO</span>
        <Button type="button" variant="text" size="sm" disabled>
          피드백 남기기
        </Button>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-p900">추천 시간표</h1>
          <Badge variant="generalEducationRequired" className="px-4 py-2 text-base font-bold">
            {totalCredit}학점
          </Badge>
        </div>

        <div className="space-y-5">
          <ScheduleGrid courses={courses} />
          <CourseTable courses={courses} />
          <Button type="button" size="lg" className="h-14 w-full text-lg" disabled>
            저장하기
          </Button>
        </div>
      </div>
    </section>
  );
}
