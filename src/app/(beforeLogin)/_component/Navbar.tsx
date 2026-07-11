import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-s200 bg-white px-6 py-3">
      <Link href="/" className="text-lg font-black tracking-[6px] text-p600">
        ZZAZO
      </Link>
      <nav className="flex gap-2">
        <Link href="/login">
          <Button variant="secondary" size="sm">
            로그인
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="primary" size="sm">
            회원가입
          </Button>
        </Link>
      </nav>
    </header>
  );
}
