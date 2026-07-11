import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-30 text-center">
      <h1 className="text-4xl font-bold leading-tight tracking-[-0.025em] text-p900 md:text-6xl">
        조건에 맞는 시간표를,
        <br />
        <span className="text-p600">더 쉽게.</span>
      </h1>

      <p className="mt-5 text-base leading-relaxed text-s500">
        공강 요일, 목표 학점, 이수구분을 입력하면
        <br />
        최적의 시간표를 추천해드립니다.
      </p>

      <div className="mt-8 flex gap-3">
        <Link href="/signup">
          <Button size="lg">회원가입</Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary" size="lg">
            로그인
          </Button>
        </Link>
      </div>

      <p className="mt-10 w-full rounded-sm border border-w100 bg-w50 px-4 py-3 text-left text-xs leading-relaxed text-w800">
        ZZAZO는 수강신청 보조 서비스입니다. 최종 수강신청은 반드시 학교 공식 자료를 기준으로
        확인하세요.
      </p>
    </section>
  );
}
