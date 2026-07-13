'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, getIsLoggedIn } from '../hooks/useAuth';
import { ROUTES } from '@/shared/lib/route';

/** 비로그인 상태면 로그인 페이지로 보냄 (afterLogin 화면 전용) */
export function AuthOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isReady } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    if (!getIsLoggedIn()) {
      router.replace(ROUTES.login);
      return;
    }
    setChecked(true);
  }, [isReady, router]);

  if (!checked) return null;

  return <>{children}</>;
}
