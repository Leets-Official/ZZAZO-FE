'use client';

import Link from 'next/link';
import { Navbar } from '../../_component/Navbar';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { ROUTES } from '@/shared/lib/route';

export function DashboardContent() {
  const { logout } = useLogout();

  return (
    <>
      <Navbar
        actions={[
          {
            label: '로그아웃',
            onClick: logout,
          },
        ]}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-14">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[1px] text-s500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-p900">
            무엇부터 시작할까요?
          </h1>
          <p className="mt-2 text-sm text-s500">조건에 맞는 시간표를 찾아드릴게요.</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* 주 액션 */}
          <Link
            href={ROUTES.timetable}
            className="group flex flex-col rounded-md border border-p200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-p600 hover:shadow-[0_4px_16px_rgba(79,57,246,0.12)]"
          >
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-p50 px-2.5 py-1 text-[11px] font-bold tracking-[1px] text-p700">
              추천 받기
            </span>
            <h2 className="text-lg font-semibold text-p900">시간표 추천 받기</h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-s500">
              공강 요일, 목표 학점, 이수구분을 입력하면 조건에 맞는 후보를 찾아드립니다.
            </p>
            <span className="mt-5 text-sm font-semibold text-p600">조건 입력하기 </span>
          </Link>

          {/* 보조 액션 */}
          <Link
            href={ROUTES.saved}
            className="group flex flex-col rounded-md border border-s200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-s300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-s100 px-2.5 py-1 text-[11px] font-bold tracking-[1px] text-s600">
              보관함
            </span>
            <h2 className="text-lg font-semibold text-p900">저장한 시간표</h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-s500">
              마음에 들어 저장해둔 시간표를 다시 확인하고 비교해보세요.
            </p>
            <span className="mt-5 text-sm font-semibold text-s600">목록 보기 </span>
          </Link>
        </div>

        <p className="mt-8 rounded-sm border border-w100 bg-w50 px-4 py-3 text-xs leading-relaxed text-w800">
          ZZAZO는 수강신청 보조 서비스입니다. 최종 수강신청은 반드시 학교 공식 자료를 기준으로
          확인하세요.
        </p>
      </main>
    </>
  );
}
