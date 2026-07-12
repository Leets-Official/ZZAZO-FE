import { authPost } from '@/shared/lib/apiClient';
import type { SignupRequest, SignupResponseData } from '../type';
import type { LoginRequest, LoginResponseData } from '../type';

export const sendEmailCode = (email: string) => authPost<null>('/auth/email/send', { email });

export const verifyEmailCode = (email: string, verificationCode: string) =>
  authPost<null>('/auth/email/verify', { email, verificationCode });

export const signup = (body: SignupRequest) => authPost<SignupResponseData>('/auth/signup', body);
export const login = (body: LoginRequest) => authPost<LoginResponseData>('/auth/login', body);
export const logout = (refreshToken: string) => authPost<null>('/auth/logout', { refreshToken });
