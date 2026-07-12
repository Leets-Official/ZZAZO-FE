import Link from 'next/link';
import { Navbar } from '../_component/Navbar';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { GuestOnly } from '@/features/auth/components/Guestonly';
export default function LoginPage() {
  return (
    <>
      <GuestOnly>
        <Navbar action="signup" />
        <main className="mx-auto w-full max-w-md px-6 py-16">
          <h2 className="text-center text-2xl font-bold text-p900">로그인</h2>
          <p className="mb-8 mt-1 text-center text-sm text-s500">
            가천대학교 이메일로 로그인하세요.
          </p>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-s500">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="font-semibold text-p600">
              회원가입
            </Link>
          </p>
        </main>
      </GuestOnly>
    </>
  );
}
