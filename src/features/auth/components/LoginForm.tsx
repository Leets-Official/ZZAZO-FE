'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ApiError } from '@/shared/lib/apiClient';
import { ROUTES } from '@/shared/lib/route';
import { login } from '../api/authApi';
import { loginSchema, type LoginForm as LoginFormValues } from '../schemas';
import { useAuthStore } from '../store/authStore';
import { LoadingOverlay } from '@/shared/ui/LoadingOverlay';

export function LoginForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      setAuth(data);
      router.replace(ROUTES.home);
    },
    onError: (e: ApiError) => setSubmitError(e.message),
  });

  const onSubmit = (values: LoginFormValues) => {
    setSubmitError(undefined);
    loginMutation.mutate(values);
  };

  const setAuth = useAuthStore((s) => s.setAuth);

  const isLoggingIn = loginMutation.isPending || loginMutation.isSuccess;

  return (
    <>
      {isLoggingIn && <LoadingOverlay message="로그인 중입니다" />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="이메일"
          type="email"
          placeholder="test@gachon.ac.kr"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          error={errors.password?.message}
          {...register('password')}
        />

        {submitError && (
          <p className="rounded-sm border border-e400 bg-e50 px-3 py-2 text-xs text-e500">
            {submitError}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={loginMutation.isPending}>
          로그인
        </Button>
      </form>
    </>
  );
}
