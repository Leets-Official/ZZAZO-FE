import { apiPost } from '@/shared/lib/apiClient';
import type { SignupRequest, SignupResponseData } from '../type';
import type { LoginRequest, LoginResponseData } from '../type';

export const sendEmailCode = (email: string) => apiPost<null>('/auth/email/send', { email });

export const verifyEmailCode = (email: string, verificationCode: string) =>
  apiPost<null>('/auth/email/verify', { email, verificationCode });

export const signup = (body: SignupRequest) => apiPost<SignupResponseData>('/auth/signup', body);
export const login = (body: LoginRequest) => apiPost<LoginResponseData>('/auth/login', body);
export const logout = (refreshToken: string) => apiPost<null>('/auth/logout', { refreshToken });
