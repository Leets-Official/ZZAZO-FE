import { useQuery } from '@tanstack/react-query';
import { getSavedTimetables } from '../api/savedTimetableApi';

export function useSavedTimetables() {
  return useQuery({
    queryKey: ['savedTimetables'],
    queryFn: getSavedTimetables,
  });
}
