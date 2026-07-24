import { CourseTable } from '@/features/timetable/components/CourseTable';
import { ScheduleGrid } from '@/features/timetable/components/ScheduleGrid';
import type { Course } from '@/features/timetable/type';
import { cn } from '@/shared/lib/cd';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface TimetableDetailProps {
  totalCredit: number;
  courses: Course[];
  onSave?: () => void;
  isSaving?: boolean;
  isSaved?: boolean;
  className?: string;
}

export function TimetableDetail({
  totalCredit,
  courses,
  onSave,
  isSaving = false,
  isSaved = false,
  className,
}: TimetableDetailProps) {
  return (
    <section className={cn('w-full', className)}>
      <header className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-p900">추천 시간표</h1>
        <Badge
          variant="generalEducationRequired"
          className="shrink-0 px-4 py-2 text-base font-bold"
        >
          총 {totalCredit}학점
        </Badge>
      </header>

      <div className="space-y-5">
        <ScheduleGrid courses={courses} />
        <CourseTable courses={courses} />
        <div className="flex gap-3">
          <Button type="button" variant="secondary" size="lg" className="flex-1" disabled>
            피드백 남기기
          </Button>
          <Button
            type="button"
            size="lg"
            className="flex-1"
            disabled={!onSave || isSaving || isSaved}
            onClick={onSave}
          >
            {isSaved ? '저장 완료' : isSaving ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </div>
    </section>
  );
}
