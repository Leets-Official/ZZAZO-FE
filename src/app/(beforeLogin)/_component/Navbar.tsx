'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/lib/route';

interface NavbarProps {
  action?: 'both' | 'login' | 'signup';
}

export function Navbar({ action = 'both' }: NavbarProps) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const isLoggedIn = hasHydrated && !!accessToken;

  return (
    <header className="flex items-center justify-between border-b border-s200 bg-white px-6 py-3">
      <Link href="/" className="text-lg font-black tracking-[6px] text-p600">
        ZZAZO
      </Link>

      <nav className="flex h-8 gap-2">
        {!hasHydrated ? null : isLoggedIn ? (
          <Link href={ROUTES.home}>
            <Button size="sm">시간표 추천 시작</Button>
          </Link>
        ) : (
          <>
            {action !== 'signup' && (
              <Link href="/login">
                <Button variant={action === 'both' ? 'secondary' : 'text'} size="sm">
                  로그인
                </Button>
              </Link>
            )}
            {action !== 'login' && (
              <Link href="/signup">
                <Button variant={action === 'both' ? 'primary' : 'text'} size="sm">
                  회원가입
                </Button>
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
