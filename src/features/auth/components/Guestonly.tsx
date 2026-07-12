'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/lib/route';

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const [checked, setChecked] = useState(false);
  const redirecting = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;

    // 진입 시점의 토큰만 확인 (이후 로그인으로 인한 변화는 무시)
    const token = useAuthStore.getState().accessToken;

    if (token) {
      redirecting.current = true;
      router.replace(ROUTES.landing);
      return;
    }
    setChecked(true);
  }, [hasHydrated, router]);

  if (!checked || redirecting.current) return null;

  return <>{children}</>;
}
