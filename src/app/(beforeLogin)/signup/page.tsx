import Link from 'next/link';
import { Navbar } from '../_component/Navbar';
import { SignupForm } from '@/features/auth/components/SignupForm';

export default function SignupPage() {
  return (
    <>
      <Navbar action="login" />
      <main className="mx-auto w-full max-w-md px-6 py-16">
        <h2 className="text-2xl font-bold text-p900">회원가입</h2>
        <p className="mb-8 mt-1 text-sm text-s500">
          학교 이메일로 간편하게 가입하고, 그 자리에서 바로 인증하세요.
        </p>

        <SignupForm />

        <p className="mt-4 text-center text-sm text-s500">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-semibold text-p600">
            로그인
          </Link>
        </p>
      </main>
    </>
  );
}
