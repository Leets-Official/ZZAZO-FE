import { http, HttpResponse } from 'msw';

interface MockUser {
  userId: number;
  email: string;
  password: string;
  grade: number;
  departmentId: number;
  studentId: number;
}

// 목 전용 인메모리 사용자 저장소. 서버 재시작(tsx watch 재시작) 시 초기화된다.
const users: MockUser[] = [];
let nextUserId = 1;

function envelope<T>(data: T) {
  return { isSuccess: true, code: 'COMMON_200_1', message: '요청 응답 성공', data };
}

function errorEnvelope(code: string, message: string) {
  return { isSuccess: false, code, message, data: null };
}

export const authHandlers = [
  http.post('/api/v1/auth/email/send', () => {
    return HttpResponse.json(envelope(null));
  }),

  http.post('/api/v1/auth/email/verify', () => {
    return HttpResponse.json(envelope(null));
  }),

  http.post('/api/v1/auth/signup', async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      grade: number;
      departmentId: number;
      studentId: number;
    };

    if (users.some((u) => u.email === body.email)) {
      return HttpResponse.json(errorEnvelope('AUTH_409_1', '이미 가입된 이메일입니다.'), {
        status: 409,
      });
    }

    const user: MockUser = { userId: nextUserId++, ...body };
    users.push(user);

    return HttpResponse.json(
      envelope({
        userId: user.userId,
        email: user.email,
        grade: user.grade,
        departmentId: user.departmentId,
        studentId: user.studentId,
      }),
      { status: 201 }
    );
  }),

  http.post('/api/v1/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const user = users.find((u) => u.email === body.email && u.password === body.password);

    if (!user) {
      return HttpResponse.json(
        errorEnvelope('AUTH_401_1', '이메일 또는 비밀번호가 일치하지 않습니다.'),
        { status: 401 }
      );
    }

    return HttpResponse.json(
      envelope({
        userId: user.userId,
        email: user.email,
        accessToken: `mock-access-token-${user.userId}`,
        refreshToken: `mock-refresh-token-${user.userId}`,
      })
    );
  }),

  http.post('/api/v1/auth/logout', () => {
    return HttpResponse.json(envelope(null));
  }),

  http.post('/api/v1/auth/refresh', () => {
    return HttpResponse.json(
      envelope({
        accessToken: 'mock-access-token-refreshed',
        refreshToken: 'mock-refresh-token-refreshed',
        tokenType: 'Bearer',
      })
    );
  }),
];
