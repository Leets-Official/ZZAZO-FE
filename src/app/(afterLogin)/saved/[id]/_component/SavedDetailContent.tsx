'use client';
import Link from 'next/link';
import { Navbar } from '../../../_component/Navbar';
import { ScheduleGrid } from '@/features/timetable/components/ScheduleGrid';
import { useSavedTimetableDetail } from '@/features/saved-timetable/hooks/useSavedTimetableDetail';
import { ConditionSummary } from '@/features/saved-timetable/components/ConditionSummary';
import { CourseTable } from '@/features/saved-timetable/components/CourseTable';
import { Button, buttonStyle } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/lib/route';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { useDeleteSavedTimetable } from '@/features/saved-timetable/hooks/useDeleteSavedTimetable';

export function SavedDetailContent({ id }: { id: number }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteMutation = useDeleteSavedTimetable();
  const { data, isPending, isError, error } = useSavedTimetableDetail(id);

  const notFound = isError && (error as { status?: number })?.status === 404;

  return (
    <>
      <Navbar actions={[{ label: '목록으로', href: ROUTES.saved }]} />

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        {isPending && <DetailSkeleton />}

        {notFound && (
          <StateMessage
            title="시간표를 찾을 수 없어요"
            body="이미 삭제되었거나 존재하지 않는 시간표입니다."
          />
        )}

        {isError && !notFound && (
          <StateMessage title="불러오지 못했어요" body="잠시 후 다시 시도해주세요." />
        )}

        {data && (
          <>
            <header className="mb-6 flex items-baseline justify-between">
              <h1 className="text-2xl font-bold tracking-[-0.02em] text-p900">
                {data.candidateName}
              </h1>
              <span className="shrink-0 rounded-full bg-p50 px-3 py-1 text-sm font-bold text-p700">
                총 {data.totalCredits}학점
              </span>
            </header>

            <ConditionSummary detail={data} className="mb-5" />

            <ScheduleGrid courses={data.courses} className="mb-5" />

            <CourseTable courses={data.courses} className="mb-8" />

            <div className="flex gap-3">
              <Button
                variant="danger"
                size="lg"
                className="flex-1"
                onClick={() => setConfirmOpen(true)}
              >
                삭제하기
              </Button>
              <Link href={ROUTES.saved} className={buttonStyle('primary', 'lg', 'flex-1')}>
                목록으로 돌아가기
              </Link>
            </div>

            <Modal
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              title="시간표를 삭제할까요?"
              footer={
                <>
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    disabled={deleteMutation.isPending}
                    onClick={() => setConfirmOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    className="flex-1"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(data.timetableId)}
                  >
                    삭제
                  </Button>
                </>
              }
            >
              <p>
                <span className="font-semibold text-p900">{data.candidateName}</span> 시간표를
                삭제하면 되돌릴 수 없습니다.
              </p>
            </Modal>
          </>
        )}
      </main>
    </>
  );
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-9 w-1/2 animate-pulse rounded bg-s100" />
      <div className="h-32 animate-pulse rounded-md bg-s100" />
      <div className="h-64 animate-pulse rounded-md bg-s100" />
    </div>
  );
}

function StateMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-s200 bg-white px-6 py-16 text-center">
      <p className="text-base font-semibold text-p900">{title}</p>
      <p className="mt-2 text-sm text-s500">{body}</p>
    </div>
  );
}
