'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { LoadingOverlay } from '@/shared/ui/LoadingOverlay';
import { ApiError } from '@/shared/lib/apiClient';
import { ROUTES } from '@/shared/lib/route';
import { DEPARTMENTS } from '@/shared/lib/constants';
import { recommendTimetable } from '../api/timetableApi';
import { conditionSchema, type ConditionForm as ConditionFormValues } from '../schemas';
import { FreeDayChips } from './FreeDayChips';

// TODO: 로그인 응답에 학년/학기 정보가 없어 임시 고정값 사용.
// 사용자 프로필 조회 API가 생기면 실제 값으로 교체할 것.
const TEMP_GRADE = 1;
const TEMP_SEMESTER = 2;

export function ConditionForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConditionFormValues>({
    resolver: zodResolver(conditionSchema),
    mode: 'onBlur',
    defaultValues: { departmentId: '', targetCredits: '', preferredFreeDays: [] },
  });

  const recommendMutation = useMutation({
    mutationFn: recommendTimetable,
    onSuccess: () => router.push(ROUTES.timetableResult),
    onError: (e: ApiError) => setSubmitError(e.message),
  });

  const onSubmit = (values: ConditionFormValues) => {
    setSubmitError(undefined);
    recommendMutation.mutate({
      departmentId: Number(values.departmentId),
      grade: TEMP_GRADE,
      semester: TEMP_SEMESTER,
      targetCredits: Number(values.targetCredits),
      preferredFreeDays: values.preferredFreeDays,
    });
  };

  const targetCredits = watch('targetCredits');

  return (
    <>
      {recommendMutation.isPending && (
        <LoadingOverlay message="조건에 맞는 시간표를 찾고 있습니다" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Select
          label="학과"
          defaultValue=""
          error={errors.departmentId?.message}
          {...register('departmentId')}
        >
          <option value="" disabled>
            선택하세요
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>

        <Input
          label="목표 학점"
          type="number"
          inputMode="numeric"
          min={12}
          max={30}
          placeholder="예) 17"
          hint={targetCredits ? `목표 ${targetCredits}학점` : '12~30학점 사이로 입력해주세요'}
          error={errors.targetCredits?.message}
          {...register('targetCredits')}
        />

        <Controller
          name="preferredFreeDays"
          control={control}
          render={({ field }) => (
            <FreeDayChips
              value={field.value}
              onChange={field.onChange}
              error={errors.preferredFreeDays?.message}
            />
          )}
        />

        {submitError && (
          <p className="rounded-sm border border-e400 bg-e50 px-3 py-2 text-xs text-e500">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          size="md"
          className="mt-2 w-full justify-center"
          disabled={recommendMutation.isPending}
        >
          후보 추천 받기 →
        </Button>
      </form>
    </>
  );
}
