'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/shared/lib/route';

export function HeroCta() {
  const { isReady, isLoggedIn } = useAuth();

  // hydration 전에는 높이만 확보 (레이아웃 흔들림 방지)
  if (!isReady) return <div className="h-12" />;

  if (isLoggedIn) {
    return (
      <Link href={ROUTES.home}>
        <Button size="lg">시간표 추천 시작</Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-3">
      <Link href={ROUTES.signup}>
        <Button size="lg">회원가입</Button>
      </Link>
      <Link href={ROUTES.login}>
        <Button variant="secondary" size="lg">
          로그인
        </Button>
      </Link>
    </div>
  );
}
