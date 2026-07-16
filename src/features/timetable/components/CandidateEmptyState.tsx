import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/cd';
import { ROUTES } from '@/shared/lib/route';
import { buttonStyle } from '@/shared/ui/Button';

const SUGGESTIONS = [
  '공강 요일을 줄이거나 변경해보세요.',
  '목표 학점을 낮춰보세요.',
  '다른 분반을 선택해보세요.',
  '선택한 과목 수를 줄여보세요.',
];

interface CandidateEmptyStateProps {
  className?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function CandidateEmptyState({
  className,
  actionHref = ROUTES.timetable,
  actionLabel = '조건 다시 설정하기',
}: CandidateEmptyStateProps) {
  return (
    <section
      className={cn('flex w-full flex-col items-center gap-4 px-5 py-16 text-center', className)}
      aria-labelledby="candidate-empty-title"
    >
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-p50">
        <Image src="/icons/search-plus.svg" alt="" width={38} height={38} aria-hidden="true" />
      </div>

      <h1 id="candidate-empty-title" className="text-2xl font-bold leading-relaxed text-p900">
        조건에 맞는 시간표 후보를
        <br />
        찾지 못했습니다.
      </h1>

      <p className="max-w-[360px] text-base leading-relaxed text-s500">
        아래 방법으로 조건을 완화해보세요.
      </p>

      <ul className="w-full max-w-[480px] list-none rounded-sm bg-p50 px-7 py-5 text-left">
        {SUGGESTIONS.map((suggestion) => (
          <li key={suggestion} className="py-1 text-base leading-normal text-p700">
            <span aria-hidden="true" className="text-p600">
              →{' '}
            </span>
            {suggestion}
          </li>
        ))}
      </ul>

      <Link
        href={actionHref}
        className={buttonStyle('primary', 'md', 'mt-4 h-auto rounded-md px-7 py-3.5 text-base')}
      >
        {actionLabel}
      </Link>
    </section>
  );
}
