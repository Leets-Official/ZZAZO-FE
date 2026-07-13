import type { ReactNode } from 'react';
import { CourseTable } from '@/features/timetable/components/CourseTable';
import type { TimetableCandidate } from '@/features/timetable/type';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface TimetableDetailProps {
  candidate: TimetableCandidate;
  scheduleGrid?: ReactNode;
}

export function TimetableDetail({ candidate, scheduleGrid }: TimetableDetailProps) {
  return (
    <section className="mx-auto w-full overflow-hidden rounded-md border border-s200 bg-s50 shadow-lg">
      <div className="flex items-center justify-between border-b border-s200 bg-white px-6 py-5 sm:px-8">
        <span className="text-lg font-black tracking-[6px] text-p600">ZZAZO</span>
        <a href="#" className="text-sm font-semibold text-p600 hover:text-p700">
          피드백 남기기
        </a>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-p900">
            {candidate.title} - {candidate.label}
          </h1>
          <Badge variant="generalEducationRequired" className="px-4 py-2 text-base font-bold">
            {candidate.totalCredit}학점
          </Badge>
        </div>

        <div className="space-y-5">
          {scheduleGrid}
          <CourseTable courses={candidate.courses} />
          <Button type="button" size="lg" className="h-14 w-full text-lg">
            저장하기
          </Button>
        </div>
      </div>
    </section>
  );
}
