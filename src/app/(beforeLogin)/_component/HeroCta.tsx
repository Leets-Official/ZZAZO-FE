'use client';

import Link from 'next/link';
import { buttonStyle } from '@/shared/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/shared/lib/route';

export function HeroCta() {
  const { isReady, isLoggedIn } = useAuth();

  // hydration 전에는 높이만 확보 (레이아웃 흔들림 방지)
  if (!isReady) return <div className="h-12" />;

  if (isLoggedIn) {
    return (
      <Link href={ROUTES.home} className={buttonStyle('primary', 'lg')}>
        시간표 추천 시작
      </Link>
    );
  }

  return (
    <div className="flex gap-3">
      <Link href={ROUTES.signup} className={buttonStyle('primary', 'lg')}>
        회원가입
      </Link>
      <Link href={ROUTES.login} className={buttonStyle('secondary', 'lg')}>
        로그인
      </Link>
    </div>
  );
}
