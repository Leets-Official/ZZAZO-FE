'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { ApiError } from '@/shared/lib/apiClient';
import { DEPARTMENTS } from '@/shared/lib/constants';
import { GRADES } from '../constants';
import { sendEmailCode, verifyEmailCode, signup } from '../api/authApi';
import { signupSchema, type SignupForm as SignupFormValues } from '../schemas';

type EmailStep = 'idle' | 'sent' | 'verified';

export function SignupForm() {
  const router = useRouter();

  const [emailStep, setEmailStep] = useState<EmailStep>('idle');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [submitError, setSubmitError] = useState<string>();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const sendMutation = useMutation({
    mutationFn: sendEmailCode,
    onSuccess: () => {
      setEmailError(undefined);
      setCode('');
      setCodeError(undefined);
      setEmailStep('sent');
    },
    onError: (e: ApiError) => setEmailError(e.message),
  });

  const verifyMutation = useMutation({
    mutationFn: (vars: { email: string; code: string }) => verifyEmailCode(vars.email, vars.code),
    onSuccess: () => {
      setCodeError(undefined);
      setEmailStep('verified');
    },
    onError: (e: ApiError) => setCodeError(e.message),
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => router.push('/login'),
    onError: (e: ApiError) => setSubmitError(e.message),
  });

  const handleSendCode = async () => {
    const ok = await trigger('email');
    if (!ok) return;
    sendMutation.mutate(getValues('email'));
  };

  const handleVerifyCode = () => {
    if (code.length !== 6) {
      setCodeError('6자리 코드를 입력해주세요.');
      return;
    }
    verifyMutation.mutate({ email: getValues('email'), code });
  };

  const onSubmit = (values: SignupFormValues) => {
    setSubmitError(undefined);
    signupMutation.mutate({
      email: values.email,
      password: values.password,
      grade: Number(values.grade),
      departmentId: Number(values.departmentId),
      studentId: Number(values.studentId),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* 이메일 + 인증하기 */}
      <div className="flex items-start gap-2">
        <Input
          label="이메일"
          type="email"
          placeholder="학교 이메일을 입력하세요"
          hint="xxx@gachon.ac.kr"
          disabled={emailStep !== 'idle'}
          error={errors.email?.message ?? emailError}
          className="w-full"
          containerClassName="flex-1"
          {...register('email')}
        />
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="mt-7 shrink-0"
          disabled={emailStep !== 'idle' || sendMutation.isPending}
          onClick={handleSendCode}
        >
          {emailStep === 'idle' ? '인증하기' : '발송됨'}
        </Button>
      </div>

      {/* 인증 코드 블록 */}
      {emailStep === 'sent' && (
        <div className="rounded-sm border border-p200 bg-white p-4">
          <p className="mb-3 rounded-sm border border-i500 bg-i50 px-3 py-2 text-xs text-i700">
            인증 코드가 발송되었습니다.
          </p>
          <div className="flex items-start gap-2">
            <Input
              label="인증 코드"
              inputMode="numeric"
              maxLength={6}
              placeholder="6자리 코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              error={codeError}
              className="w-full text-center tracking-[4px]"
              containerClassName="flex-1"
            />
            <Button
              type="button"
              size="md"
              className="mt-7 shrink-0"
              disabled={verifyMutation.isPending}
              onClick={handleVerifyCode}
            >
              확인
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-s100 pt-3">
            <button
              type="button"
              className="text-xs font-semibold text-p600 hover:underline disabled:opacity-50 disabled:hover:no-underline"
              disabled={sendMutation.isPending}
              onClick={() => sendMutation.mutate(getValues('email'))}
            >
              인증 코드 재발송
            </button>

            <span className="h-3 w-px bg-s200" aria-hidden />

            <button
              type="button"
              className="text-xs font-medium text-s500 hover:text-s700 hover:underline"
              onClick={() => {
                setEmailStep('idle');
                setCode('');
                setCodeError(undefined);
                setEmailError(undefined);
              }}
            >
              이메일 변경
            </button>
          </div>
        </div>
      )}

      {emailStep === 'verified' && (
        <p className="rounded-sm border border-g200 bg-g50 px-3 py-2 text-xs text-g700">
          이메일 인증이 완료되었습니다.
        </p>
      )}

      {/* 나머지 정보 */}
      <Input
        label="비밀번호"
        type="password"
        placeholder="영문·숫자 조합 8자 이상"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm')}
      />
      <Input
        label="학번"
        inputMode="numeric"
        maxLength={8}
        placeholder="20210001"
        error={errors.studentId?.message}
        {...register('studentId')}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select label="학년" defaultValue="" error={errors.grade?.message} {...register('grade')}>
          <option value="" disabled>
            선택하세요
          </option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}학년
            </option>
          ))}
        </Select>

        <Select
          label="학과"
          defaultValue=""
          error={errors.departmentId?.message}
          {...register('departmentId')}
        >
          <option value="" disabled>
            선택하세요
          </option>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </div>

      {submitError && (
        <p className="rounded-sm border border-e400 bg-e50 px-3 py-2 text-xs text-e500">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
        disabled={emailStep !== 'verified' || signupMutation.isPending}
      >
        회원가입 완료
      </Button>

      {emailStep !== 'verified' && (
        <p className="text-center text-xs text-s500">이메일 인증을 완료해야 가입할 수 있습니다.</p>
      )}
    </form>
  );
}
