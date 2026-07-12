import { useAuthStore } from '../store/authStore';

/**
 * 로그인 상태 판단의 단일 기준.
 * 로그인 여부의 정의가 바뀌면 이 파일만 수정한다.
 */
export function useAuth() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  return {
    /** localStorage 복원 완료 여부. false면 로그인 여부를 아직 알 수 없음 */
    isReady: hasHydrated,
    isLoggedIn: hasHydrated && !!accessToken,
  };
}

/**
 * 구독 없이 현재 로그인 여부만 확인 (진입 시점 가드용).
 * GuestOnly가 토큰 변화에 반응하면 로그인 성공 순간 스스로를
 * 리다이렉트시키므로, 여기서는 의도적으로 구독하지 않는다.
 */
export function getIsLoggedIn() {
  return !!useAuthStore.getState().accessToken;
}
