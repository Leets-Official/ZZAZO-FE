import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { logout } from '../api/authApi';
import { ROUTES } from '@/shared/lib/route';

export function useLogout() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        await logout(refreshToken);
      }
    },
    // 서버 호출 성공/실패와 무관하게 로컬 토큰은 항상 제거한다.
    // 서버 장애로 사용자가 로그아웃하지 못하는 상황을 막기 위함.
    onSettled: () => {
      useAuthStore.getState().clearAuth();
      router.replace(ROUTES.landing);
    },
  });

  return {
    logout: () => mutation.mutate(),
    isLoggingOut: mutation.isPending,
  };
}
