'use client';

import { Navbar } from '../../../_component/Navbar';
import { ConditionForm } from '@/features/timetable/components/ConditionForm';

export function ConditionContent() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-lg px-6 py-10">
        <header className="mb-6">
          <h1 className="text-xl font-bold tracking-[-0.02em] text-p900">시간표 추천 조건 입력</h1>
          <p className="mt-1 text-xs text-s500">조건을 입력하면 최적의 시간표를 추천해드립니다.</p>
        </header>

        <ConditionForm />
      </main>
    </>
  );
}
