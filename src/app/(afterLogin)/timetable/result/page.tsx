'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TimetableDetail } from '@/features/timetable/components/TimetableDetail';
import { mapLectureToCourse } from '@/features/timetable/lib/mapLectureToCourse';
import { useRecommendResultStore } from '@/features/timetable/store/recommendResultStore';
import { ROUTES } from '@/shared/lib/route';

export default function TimetableResultPage() {
  const router = useRouter();
  const result = useRecommendResultStore((s) => s.result);

  useEffect(() => {
    // 추천 결과는 조건 입력 직후에만 스토어에 존재한다.
    // 새로고침 등으로 비어 있으면 조건 입력 화면으로 되돌린다.
    if (!result) router.replace(ROUTES.timetable);
  }, [result, router]);

  if (!result) return null;

  return (
    <main className="min-h-screen bg-s50">
      <div className="w-full px-8 py-10">
        <TimetableDetail
          totalCredit={result.totalCredits}
          courses={result.timetables.map(mapLectureToCourse)}
        />
      </div>
    </main>
  );
}
