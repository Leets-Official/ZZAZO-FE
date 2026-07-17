import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteSavedTimetable } from '../api/savedTimetableApi';
import { useToast } from '@/shared/ui/toast/ToastProvider';
import { ROUTES } from '@/shared/lib/route';
import type { ApiError } from '@/shared/lib/apiClient';

export function useDeleteSavedTimetable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteSavedTimetable(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedTimetables'] });
      showToast('시간표가 삭제되었습니다.');
      router.push(ROUTES.saved);
    },
    onError: (e: ApiError) => {
      showToast(e.message, 'error');
    },
  });
}
