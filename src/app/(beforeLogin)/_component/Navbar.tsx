'use client';

import Link from 'next/link';
import { buttonStyle } from '@/shared/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/shared/lib/route';

interface NavbarProps {
  action?: 'both' | 'login' | 'signup';
}

export function Navbar({ action = 'both' }: NavbarProps) {
  const { isReady, isLoggedIn } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-s200 bg-white px-6 py-3">
      <Link href={ROUTES.landing} className="text-lg font-black tracking-[6px] text-p600">
        ZZAZO
      </Link>

      <nav className="flex h-8 gap-2">
        {!isReady ? null : isLoggedIn ? (
          <Link href={ROUTES.home} className={buttonStyle('primary', 'sm')}>
            시간표 추천 시작
          </Link>
        ) : (
          <>
            {action !== 'signup' && (
              <Link
                href={ROUTES.login}
                className={buttonStyle(action === 'both' ? 'secondary' : 'text', 'sm')}
              >
                로그인
              </Link>
            )}
            {action !== 'login' && (
              <Link
                href={ROUTES.signup}
                className={buttonStyle(action === 'both' ? 'primary' : 'text', 'sm')}
              >
                회원가입
              </Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
