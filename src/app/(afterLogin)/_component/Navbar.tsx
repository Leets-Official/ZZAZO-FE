'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/lib/route';

export interface NavAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
}

interface NavbarProps {
  /** 우측에 노출할 액션. 페이지마다 다르게 넘긴다. */
  actions?: NavAction[];
}

export function Navbar({ actions = [] }: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-s200 bg-white px-6 py-3">
      <Link href={ROUTES.home} className="text-lg font-black tracking-[6px] text-p600">
        ZZAZO
      </Link>

      <nav className="flex items-center gap-2">
        {actions.map((action) =>
          action.href ? (
            <Link key={action.label} href={action.href}>
              <Button variant={action.variant ?? 'text'} size="sm">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button
              key={action.label}
              variant={action.variant ?? 'text'}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )
        )}
      </nav>
    </header>
  );
}
