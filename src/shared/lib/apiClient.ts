import { useAuthStore } from '@/features/auth/store/authStore';

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

export async function authPost<T>(path: string, body: unknown): Promise<T | null> {
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
