'use client';

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../_component/Navbar';
import { TimetableDetail } from '@/features/timetable/components/TimetableDetail';
import { saveTimetable } from '@/features/timetable/api/timetableApi';
import { mapLectureToCourse } from '@/features/timetable/lib/mapLectureToCourse';
import { useRecommendResultStore } from '@/features/timetable/store/recommendResultStore';
import type {
  RecommendConditionRequest,
  RecommendResultData,
  SaveTimetableRequest,
} from '@/features/timetable/type';
import { formatFreeDays } from '@/shared/constants/weekday';
import type { ApiError } from '@/shared/lib/apiClient';
import { ROUTES } from '@/shared/lib/route';
import { useToast } from '@/shared/ui/toast/ToastProvider';

export default function TimetableResultPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const result = useRecommendResultStore((s) => s.result);
  const condition = useRecommendResultStore((s) => s.condition);
  const savedTimetableId = useRecommendResultStore((s) => s.savedTimetableId);
  const setSavedTimetableId = useRecommendResultStore((s) => s.setSavedTimetableId);

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!result || !condition) {
        throw new Error('저장할 시간표 정보가 없습니다.');
      }

      return saveTimetable(createSaveTimetableRequest(result, condition));
    },
    onSuccess: (data) => {
      if (data?.timetableId) {
        setSavedTimetableId(data.timetableId);
      }
      queryClient.invalidateQueries({ queryKey: ['savedTimetables'] });
      showToast(data?.message ?? '시간표가 저장되었습니다.');
    },
    onError: (e) => {
      showToast((e as ApiError | Error).message, 'error');
    },
  });

  useEffect(() => {
    // 추천 결과는 조건 입력 직후에만 스토어에 존재한다.
    // 새로고침 등으로 비어 있으면 조건 입력 화면으로 되돌린다.
    if (!result || !condition) router.replace(ROUTES.timetable);
  }, [condition, result, router]);

  if (!result || !condition) return null;

  return (
    <>
      <Navbar actions={[{ label: '조건 다시 입력', href: ROUTES.timetable }]} />

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <TimetableDetail
          totalCredit={result.totalCredits}
          courses={result.timetables.map(mapLectureToCourse)}
          onSave={() => saveMutation.mutate()}
          isSaving={saveMutation.isPending}
          isSaved={savedTimetableId !== null}
        />
      </main>
    </>
  );
}

function createSaveTimetableRequest(
  result: RecommendResultData,
  condition: RecommendConditionRequest
): SaveTimetableRequest {
  const preferredFreeDays = condition.preferredFreeDays ?? [];
  const candidateName =
    preferredFreeDays.length > 0
      ? `${formatFreeDays(preferredFreeDays)} 공강 추천 시간표`
      : '추천 시간표';

  return {
    candidateName,
    departmentId: condition.departmentId,
    semester: condition.semester,
    grade: condition.grade,
    preferredFreeDays,
    targetCredits: condition.targetCredits,
    selectedLectureIds: result.timetables.map((lecture) => lecture.lectureId),
    totalCredits: result.totalCredits,
  };
}
