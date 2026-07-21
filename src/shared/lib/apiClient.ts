import { useAuthStore } from '@/features/auth/store/authStore';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function apiGet<T>(path: string): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: authHeaders(),
    });
  } catch {
    throw new ApiError('NETWORK_ERROR', '네트워크 연결을 확인해주세요.', 0);
  }

  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError('PARSE_ERROR', '일시적인 오류가 발생했습니다.', res.status);
  }

  if (!res.ok || !json.isSuccess) {
    throw new ApiError(json.code, json.message, res.status);
  }
  return json.data;
}

function authHeaders(): HeadersInit {
  const token = useAuthStore.getState().accessToken;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T | null;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const AUTH_BASE = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1`;

export async function apiPost<T>(path: string, body: unknown): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('NETWORK_ERROR', '네트워크 연결을 확인해주세요.', 0);
  }

  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError('PARSE_ERROR', '일시적인 오류가 발생했습니다.', res.status);
  }

  if (!res.ok || !json.isSuccess) {
    throw new ApiError(json.code, json.message, res.status);
  }
  return json.data;
}

export async function apiDelete(path: string): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  } catch {
    throw new ApiError('NETWORK_ERROR', '네트워크 연결을 확인해주세요.', 0);
  }

  // 204 No Content: body가 없으므로 파싱하지 않는다
  if (res.status === 204) return;

  // 그 외(에러)는 envelope을 파싱해 메시지 추출
  let json: ApiResponse<null>;
  try {
    json = (await res.json()) as ApiResponse<null>;
  } catch {
    throw new ApiError('PARSE_ERROR', '일시적인 오류가 발생했습니다.', res.status);
  }
  throw new ApiError(json.code, json.message, res.status);
}
