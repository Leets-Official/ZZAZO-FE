import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.')
    .endsWith('@gachon.ac.kr', '가천대학교 이메일(@gachon.ac.kr)만 사용할 수 있습니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.')
      .endsWith('@gachon.ac.kr', '가천대학교 이메일(@gachon.ac.kr)만 사용할 수 있습니다.'),
    password: z
      .string()
      .min(8, '8자 이상 입력해주세요.')
      .regex(/[a-zA-Z]/, '영문을 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해주세요.'),
    studentId: z.string().regex(/^\d{8}$/, '학번 8자리를 입력해주세요.'),
    grade: z.string().min(1, '학년을 선택해주세요.'),
    departmentId: z.string().min(1, '학과를 선택해주세요.'),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupForm = z.infer<typeof signupSchema>;
