import { useQuery } from '@tanstack/react-query';
import { getSavedTimetableDetail } from '../api/savedTimetableApi';

export function useSavedTimetableDetail(id: number) {
  return useQuery({
    queryKey: ['savedTimetable', id],
    queryFn: () => getSavedTimetableDetail(id),
  });
}
