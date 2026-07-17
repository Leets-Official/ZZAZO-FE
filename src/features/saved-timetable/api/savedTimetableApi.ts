import { apiGet } from '@/shared/lib/apiClient';
import type { SavedTimetableListData, SavedTimetableDetail } from '../type';

export const getSavedTimetables = () => apiGet<SavedTimetableListData>('/timetables');
export const getSavedTimetableDetail = (id: number) =>
  apiGet<SavedTimetableDetail>(`/timetables/${id}`);
