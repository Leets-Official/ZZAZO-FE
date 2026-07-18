'use client';

import Link from 'next/link';
import { Navbar } from '../../_component/Navbar';
import { SavedTimetableCard } from '@/features/saved-timetable/components/SavedTimetableCard';
import { useSavedTimetables } from '@/features/saved-timetable/hooks/useSavedTimetables';
import { buttonStyle } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/lib/route';

export function SavedListContent() {
  const { data, isPending, isError } = useSavedTimetables();

  const timetables = data?.timetables ?? [];
  const isLoaded = !isPending && !isError;

  return (
    <>
      <Navbar actions={[{ label: '새 추천 받기', href: ROUTES.timetable }]} />

      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-p900">저장한 시간표</h1>
          {isLoaded && <span className="text-sm text-s500">{timetables.length}개 저장됨</span>}
        </div>

        {isPending && <SavedListSkeleton />}

        {isError && (
          <p className="rounded-sm border border-e400 bg-e50 px-4 py-3 text-sm text-e500">
            시간표를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}

        {isLoaded && timetables.length === 0 && <SavedListEmpty />}

        {/* 목록 */}
        {isLoaded && timetables.length > 0 && (
          <ul className="grid gap-3 md:grid-cols-2">
            {timetables.map((timetable) => (
              <li key={timetable.timetableId}>
                <SavedTimetableCard timetable={timetable} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

function SavedListSkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="h-[152px] animate-pulse rounded-md border border-s200 bg-white" />
      ))}
    </div>
  );
}

function SavedListEmpty() {
  return (
    <div className="rounded-md border border-s200 bg-white px-6 py-14 text-center">
      <p className="text-base font-semibold text-p900">아직 저장한 시간표가 없어요</p>
      <p className="mt-2 text-sm leading-relaxed text-s500">
        조건에 맞는 시간표를 추천받고 마음에 드는 후보를 저장해보세요.
      </p>
      <Link href={ROUTES.timetable} className={buttonStyle('primary', 'md', 'mt-6')}>
        시간표 추천 받기
      </Link>
    </div>
  );
}
