'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, getIsLoggedIn } from '../hooks/useAuth';
import { ROUTES } from '@/shared/lib/route';

/** 로그인 상태면 랜딩으로 돌려보냄 (로그인/회원가입 페이지 전용) */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isReady } = useAuth();
  const [checked, setChecked] = useState(false);
  const redirecting = useRef(false);

  useEffect(() => {
    if (!isReady) return;

    if (getIsLoggedIn()) {
      redirecting.current = true;
      router.replace(ROUTES.landing);
      return;
    }
    setChecked(true);
  }, [isReady, router]);

  if (!checked || redirecting.current) return null;

  return <>{children}</>;
}
