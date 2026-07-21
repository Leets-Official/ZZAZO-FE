import { apiGet } from '@/shared/lib/apiClient';
import type { SavedTimetableListData, SavedTimetableDetail } from '../type';
import { apiDelete } from '@/shared/lib/apiClient';

export const getSavedTimetables = () => apiGet<SavedTimetableListData>('/timetables');

export const getSavedTimetableDetail = (id: number) =>
  apiGet<SavedTimetableDetail>(`/timetables/${id}`);

export const deleteSavedTimetable = (id: number) => apiDelete(`/timetables/${id}`);
